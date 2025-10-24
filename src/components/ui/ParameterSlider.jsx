// src/components/ui/ParameterSlider.jsx
import React from 'react';

const ParameterSlider = ({ label, value, min, max, step, onChange, onHelpClick, helpVisible, helpText }) => {
  const handleInputChange = (e) => {
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleBlur = (e) => {
    const numValue = parseFloat(e.target.value);
    if (isNaN(numValue) || numValue < min) {
      onChange(min);
    } else if (numValue > max) {
      onChange(max);
    }
  };

  return (
    <div className="control-group">
      <label className="label">
        <span>{label}</span>
        <button className="help-button" onClick={onHelpClick}>?</button>
      </label>
      <div className="slider-container">
        <input
          className="slider-range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
        />
        <input
          className="slider-input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
      {helpVisible && <div className="help-text">{helpText}</div>}
    </div>
  );
};

export default ParameterSlider;