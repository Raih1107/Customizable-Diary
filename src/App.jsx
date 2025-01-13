import React, { useState } from 'react';
import Diary from './components/Diary';
import ColorPicker from './components/ColorPicker';

const App = () => {
  const [color, setColor] = useState('#FF5733'); // Default color
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1); // State for the scale effect

  const handleMouseDrag = (e) => {
    if (e.buttons === 1) {
      setRotation({
        x: rotation.x + e.movementY * 0.01,
        y: rotation.y + e.movementX * 0.01,
      });
    }
  };

  const handleColorChange = (color) => {
    setColor(color);
    setScale(1.2); // Increase the size momentarily
    setTimeout(() => {
      setScale(1); // Reset the size after animation
    }, 300);
  };

  return (
    <div className="app-container">
      <div className="diary-container" onMouseMove={handleMouseDrag}>
        <Diary color={color} rotation={rotation} scale={scale} />
      </div>
      <div className="sidebar">
        <h3>Customize Diary</h3>
        <ColorPicker onColorChange={handleColorChange} />
      </div>
    </div>
  );
};

export default App;
