# DoneTask

<img width="140" alt="Screenshot 2024-09-27 at 11 39 03" src="https://github.com/user-attachments/assets/53d18e15-2ae3-440b-afc7-6f6970f8b9c7">


**DoneTask** is a task management app designed to help users keep track of their recurring tasks (e.g., daily, weekly, monthly). The app goes beyond simple reminders by learning from the user’s task completion habits and offering **smart notifications** based on actual behavior.

<img width="337" alt="Screenshot 2024-09-27 at 11 39 17" src="https://github.com/user-attachments/assets/0df043b9-cafb-425f-9321-0641ee2c76e5"><img width="768" alt="AppScreenshot" src="https://github.com/user-attachments/assets/b847ac93-325c-4c4e-a2ff-7ba806761886">

## Project Overview

### Current Features:
- **Google Authentication**: Users can log in with their Google accounts using Firebase Authentication.
- **Simple UI**: After logging in, users are greeted with a personalized message.
- **Push Notifications**: Basic setup for push notifications, allowing users to receive notifications when triggered manually.
- **Service Worker Integration**: Notifications are handled using a service worker to show background notifications even when the app is not in focus.

### Task Reminder System (In Progress):
- **Smart Reminders**: The app sends task reminders based on user behavior and schedules. It learns user habits (e.g., completing a task late Monday morning instead of early morning) and adjusts future reminders accordingly. [Code can be found here.](https://github.com/vesnag/task-prediction-algorithm/)
- **Notification Scheduling**: Tasks can have flexible schedules (e.g., "every Monday morning," "every two days," "on weekends"). Notifications are sent only when tasks are overdue, using predicted completion times.

### Future Features:
- **Task Management**: Full task management system allowing users to add, edit, delete tasks, and specify task recurrence (daily, weekly, monthly).
- **Machine Learning-Based Predictions**: The app will predict the ideal time for completing tasks based on past behavior, dynamically adjusting task deadlines and reminders.
- **Advanced Notifications**: Notifications will be sent if a task is not completed by the predicted time, factoring in a grace period (threshold).
- **Task History & Analytics**: Display past task completion data with analytics to provide insights into user habits and trends.
- **UI Enhancements**: Improve the user experience with an updated, mobile-responsive design, task categories, and visual analytics (e.g., charts for task trends).

### Privacy & Security:
- **Consent**: Inform users about data collection and ensure compliance with privacy regulations (GDPR, CCPA).
- **Data Encryption**: Implement secure storage of user data.

## Work in Progress

DoneTask is still under active development, with several key features being built, such as:

- **Task Prediction Using AI**: Implementation of machine learning models to analyse user behavior and predict the optimal time for task completion.
- **Automated Notification System**: A system that automatically triggers reminders if the task isn’t completed by the predicted deadline.
- **Task Recurrence Logic**: Logic to handle recurring tasks based on user-set schedules like "every Monday" or "every two days," combined with actual user behavior patterns.

## Technologies Used

- **Frontend**: React.js

- **Backend & Hosting**: Firebase
  - **Firebase Authentication**: Handles user login via Google.
  - **Firestore**: Database for storing user tasks and notification settings.
  - **Firebase Cloud Messaging (FCM)**: For sending push notifications to users.
  - **Firebase Hosting**: Hosts the app and service worker for notifications.

- **Machine Learning**:
  - **Potential Libraries**: `tensorflow.js` or `ml5.js` for client-side AI, or a backend ML model using Google Cloud AI or AWS for predictive notifications.

- **Notifications**: Push notifications using FCM, with a service worker (`firebase-messaging-sw.js`) to handle background notifications.

## AI Integration for Task Predictions (Planned)

The app will use AI/ML to:
- Analyse historical task completion patterns to predict future task completion times.
- Adjust notifications dynamically based on user behavior (e.g., adjusting a task from "Monday morning" to "Monday at 9:30 AM" based on previous completions).
- A machine learning model will run either client-side (`tensorflow.js`) or server-side (Google Cloud AI, AWS SageMaker) to optimize notification timings.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```plaintext
# OpenAI API key for accessing OpenAI services
REACT_APP_OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# VAPID key for Web Push Notifications
REACT_APP_VAPID_KEY=BK2gx6QeH4GW-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Firebase API key for accessing Firebase services
REACT_APP_FIREBASE_API_KEY=AIzaSyA5Qj3cXXXXXXXXXXXXXXXXXXXXXXXX

# Firebase Auth domain for authentication
REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com

# Firebase project ID
REACT_APP_FIREBASE_PROJECT_ID=your-app

# Firebase storage bucket for file storage
REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com

# Firebase messaging sender ID for cloud messaging
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012

# Firebase app ID
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:XXXXXXXXXXXXXXXX

# Firebase measurement ID for analytics
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Flag to use a fake OpenAI API for testing purposes
REACT_APP_USE_FAKE_OPENAI_API=true

# Skip preflight checks during the build process
SKIP_PREFLIGHT_CHECK=true
```
## Visit the Website

You can access the live version of the app here: [DoneTask Website](https://donetask-f64fe.web.app/)

### Additional Notes
- **Simple Sorting**: Tasks are sorted by their scheduled day. Tasks for today come first, followed by tasks for the rest of the week. This makes it easy for users to see and prioritize today's tasks.

- **Future Enhancements**: In the future, the sorting will be smarter. It will consider how often tasks are completed, user habits, and dynamic scheduling to make task management more personalized and efficient.
