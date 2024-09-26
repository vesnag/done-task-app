import React from 'react';

function NotificationButton({ notificationsEnabled, onToggle }) {
  return (
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
}

export default NotificationButton;
