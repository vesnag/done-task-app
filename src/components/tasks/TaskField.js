/* eslint-disable react/prop-types */

import React from 'react';

function TaskField({
  type = 'text', value, onChange, placeholder,
}) {
  const commonProps = {
    value,
    onChange,
    placeholder,
    className: 'w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white',
  };

  return type === 'textarea' ? (
    <textarea
      value={commonProps.value}
      onChange={commonProps.onChange}
      placeholder={commonProps.placeholder}
      className={commonProps.className}
      rows="4"
    />
  ) : (
    <input
      type={type}
      value={commonProps.value}
      onChange={commonProps.onChange}
      placeholder={commonProps.placeholder}
      className={commonProps.className}
    />
  );
}

export default TaskField;
