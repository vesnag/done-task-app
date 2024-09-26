import React from 'react';

const availableColors = [
  '#6552cf', '#f84f93', '#f8eaf7', '#9a2e6f', '#df64b5', '#a92237',
  '#e6bcdd', '#cd2e53', '#44207f', '#622f90', '#bb97db', '#913fac',
  '#6c1e48', '#fc67b7', '#f93e65', '#8775e0', '#f490c8', '#34154d',
  '#d93e86', '#4f30ae',
];

function ColorPicker({ selectedColor, onColorSelect }) {
  return (
    <div className="flex space-x-2">
      {availableColors.map((color) => (
        <button
          key={color}
          type="button"
          className={`w-8 h-8 rounded-full border-2 focus:outline-none ${selectedColor === color ? 'border-white' : 'border-gray-700'}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
