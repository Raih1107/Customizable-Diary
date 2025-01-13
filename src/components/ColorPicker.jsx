import React, { useState } from 'react';
 // Import your CSS file

const ColorPicker = ({ onColorChange }) => {
  // Predefined set of beautiful colors
  const colorOptions = [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6",
    "#1ABC9C", "#E74C3C", "#F39C12", "#2C3E50"
  ];       

  const [activeColor, setActiveColor] = useState(colorOptions[0]); // Default color

  const handleColorChange = (color) => {
    setActiveColor(color);
    onColorChange(color);
  };

  return (
    <div>
      <h3>Choose Diary Color</h3>
      <div className="color-picker">
        {colorOptions.map((col, index) => (
          <button
            key={index}
            className={`color-button ${col === activeColor ? 'active' : ''}`}
            style={{ backgroundColor: col }}
            onClick={() => handleColorChange(col)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            aria-label={`Select color ${col}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
