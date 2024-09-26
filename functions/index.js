const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

// Cloud Function to check tasks and send reminders if needed
exports.checkAndSendReminders = onSchedule({
  schedule: "every 1 hours",
}, async () => {
  const now = new Date();
  const tasksSnapshot = await db.collection("tasks").get();

  tasksSnapshot.forEach(async (doc) => {
    const task = doc.data();
    const {
      mostFrequentDay, mostFrequentHour, completedAt, userFcmToken,
    } = task;

    // Check if today is the predicted day
    if (shouldSendReminderToday(now, mostFrequentDay)) {
      const lastCompletion = getLastCompletion(completedAt);
      const reminderTime = getPredictedReminderTime(now, mostFrequentHour);

      // Check if task hasnt been marked as done and we're past the grace period
      if (
        !lastCompletion ||
        (lastCompletion < reminderTime && now > reminderTime)
      ) {
        // Send a nice reminder to the user
        await sendReminder(userFcmToken, task.task.description);
      }
    }
  });
});

// Helper function to check if today is the predicted day (e.g., Monday)
const shouldSendReminderToday = (now, mostFrequentDay) => now.getDay() === mostFrequentDay;

// Helper function to find the most recent task completion
const getLastCompletion = (completedAt) => {
  if (!completedAt || completedAt.length === 0) return null;
  const completionTimes = completedAt.map((t) => new Date(t).getTime());
  const maxCompletionTime = Math.max.apply(null, completionTimes);
  return new Date(maxCompletionTime);
};

// Helper function to get the predicted reminder time
// (e.g., 9:00 AM plus a grace period)
const getPredictedReminderTime = (now, mostFrequentHour, graceMinutes = 30) => {
  const reminderTime = new Date(now);
  reminderTime.setHours(mostFrequentHour);
  reminderTime.setMinutes(graceMinutes);
  return reminderTime;
};

// Function to send the reminder via FCM
const sendReminder = async (token, taskDescription) => {
  const message = {
    notification: {
      title: "Reminder: Time for your task!",
      body: `It looks like you haven’t completed "${
        taskDescription
      }" yet. ` +
            `Don’t forget to mark it done!`,
    },
    token,
  };

  try {
    await admin.messaging().send(message);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
