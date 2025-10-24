// src/components/ui/ParameterAction.jsx
import React from 'react';

const ParameterAction = ({ label, onClick }) => (
  <div className="control-group">
    <button
      className="action-control"
      onClick={onClick}
      onMouseEnter={(e) => e.target.style.background = 'rgba(100, 100, 115, 0.5)'}
      onMouseLeave={(e) => e.target.style.background = 'rgba(80, 80, 95, 0.3)'}
    >
      {label}
    </button>
  </div>
);

export default ParameterAction;