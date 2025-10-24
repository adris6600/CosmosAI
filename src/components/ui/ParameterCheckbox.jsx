// src/components/ui/ParameterCheckbox.jsx
import React from 'react';

const ParameterCheckbox = ({ label, checked, onChange, onHelpClick, helpVisible, helpText }) => (
  <div className="control-group">
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
      <button className="help-button" onClick={onHelpClick}>?</button>
    </label>
    {helpVisible && <div className="help-text">{helpText}</div>}
  </div>
);

export default ParameterCheckbox;