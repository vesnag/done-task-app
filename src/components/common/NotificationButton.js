import React from 'react';

const NotificationButton = ({ notificationsEnabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-full md:w-auto px-2 py-1 text-sm font-semibold rounded-md transition ${notificationsEnabled
      ? 'bg-gray-500 text-white hover:bg-gray-700'
      : 'bg-deepLavender text-white hover:bg-royalPurple'
      } mt-4 md:mt-6`}
    aria-label={
      notificationsEnabled ? 'Disable notifications' : 'Enable notifications'
    }
  >
    {notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
  </button>
);

export default NotificationButton;
