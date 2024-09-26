import React from 'react';

const TaskField = ({ type = 'text', value, onChange, placeholder }) => {
  const commonProps = {
    value,
    onChange,
    placeholder,
    className: 'w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white',
  };

  return type === 'textarea' ? (
    <textarea {...commonProps} rows="4" />
  ) : (
    <input type={type} {...commonProps} />
  );
};

export default TaskField;
