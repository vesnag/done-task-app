/**
 * Sorts tasks based on their scheduled day relative to the current day.
 * @param {Array} tasks - Array of task objects.
 * @param {Date} currentDate - The current date.
 * @returns {Array} - Sorted array of task objects.
 */
const sortTasksByNextScheduledTime = (tasks, currentDate = new Date()) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDayIndex = currentDate.getUTCDay(); // 0 (Sunday) to 6 (Saturday)
  console.log('currentDayIndex', currentDayIndex);

  return tasks.sort((a, b) => {
    const dayAIndex = daysOfWeek.indexOf(a.schedule.day);
    const dayBIndex = daysOfWeek.indexOf(b.schedule.day);

    // Calculate days until next scheduled day
    let deltaA = dayAIndex - currentDayIndex;
    if (deltaA < 0) deltaA += 7;

    let deltaB = dayBIndex - currentDayIndex;
    if (deltaB < 0) deltaB += 7;

    return deltaA - deltaB;
  });
};

module.exports = {
  sortTasksByNextScheduledTime,
};
