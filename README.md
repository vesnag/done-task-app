# DoneTask

**DoneTask** is a task management app designed to help users keep track of their recurring tasks (e.g., daily, weekly, monthly). The app goes beyond simple reminders by learning from the user’s task completion habits and offering **smart notifications** based on actual behavior. DoneTask aims to reduce the cognitive load of planning and to provide personalized assistance to keep users on track.

![App Screenshot](./images/appScreenshot.png)

## Project Overview

### Current Features:
- **Google Authentication**: Users can log in with their Google accounts using Firebase Authentication.
- **Simple UI**: After logging in, users are greeted with a personalized message and their profile picture.
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

## Visit the Website

You can access the live version of the app here: [DoneTask Website](https://donetask-f64fe.web.app/)
