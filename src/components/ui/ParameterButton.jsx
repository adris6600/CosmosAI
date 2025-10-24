// src/components/ui/ParameterButton.jsx
import React from 'react';

const ParameterButton = ({ label, onClick, isDelete = false }) => {
  const baseStyle = {
    background: isDelete ? 'rgba(255, 59, 48, 0.3)' : 'rgba(0, 122, 255, 0.3)',
    border: isDelete ? '1px solid rgba(255, 59, 48, 0.5)' : '1px solid rgba(0, 122, 255, 0.5)',
  };
  const hoverStyle = {
    background: isDelete ? 'rgba(255, 59, 48, 0.5)' : 'rgba(0, 122, 255, 0.5)',
  };

  return (
    <div className="control-group">
      <button
        className="button-control"
        style={baseStyle}
        onClick={onClick}
        onMouseEnter={(e) => e.target.style.background = hoverStyle.background}
        onMouseLeave={(e) => e.target.style.background = baseStyle.background}
      >
        {label}
      </button>
    </div>
  );
};

export default ParameterButton;