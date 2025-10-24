// src/components/ui/ParameterSelect.jsx
import React from 'react';

const ParameterSelect = ({ label, value, options, onChange, onHelpClick, helpVisible, helpText }) => (
  <div className="control-group">
    <label className="label">
      <span>{label}</span>
      <button className="help-button" onClick={onHelpClick}>?</button>
    </label>
    <select className="select-control" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {helpVisible && <div className="help-text">{helpText}</div>}
  </div>
);

export default ParameterSelect;