// src/components/ui/ParameterColor.jsx
import React from 'react';

const ParameterColor = ({ label, value, onChange, onHelpClick, helpVisible, helpText }) => (
  <div className="control-group">
    <label className="label">
      <span>{label}</span>
      <button className="help-button" onClick={onHelpClick}>?</button>
    </label>
    <input
      className="color-input"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {helpVisible && <div className="help-text">{helpText}</div>}
  </div>
);

export default ParameterColor;