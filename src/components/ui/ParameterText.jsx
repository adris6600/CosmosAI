// src/components/ui/ParameterText.jsx
import React from 'react';

const ParameterText = ({ label, value, onChange, onHelpClick, helpVisible, helpText }) => (
  <div className="control-group">
    <label className="label">
      <span>{label}</span>
      <button className="help-button" onClick={onHelpClick}>?</button>
    </label>
    <input
      className="text-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Entrez une valeur..."
    />
    {helpVisible && <div className="help-text">{helpText}</div>}
  </div>
);

export default ParameterText;