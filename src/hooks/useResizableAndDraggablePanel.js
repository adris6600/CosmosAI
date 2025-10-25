// src/hooks/useResizableAndDraggablePanel.js
import { useState, useRef, useCallback, useEffect } from 'react';

export function useResizableAndDraggablePanel({ initialSize, initialPosition, minSize }) {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [panelSize, setPanelSize] = useState(initialSize);
  const [panelPosition, setPanelPosition] = useState(initialPosition);

  const panelRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const startPosition = useRef({ x: 0, y: 0 });

  const handleResizeMouseDown = useCallback((e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { ...panelSize };
    startPosition.current = { ...panelPosition };
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  }, [panelSize, panelPosition]);

  const handleDragMouseDown = useCallback((e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      startPos.current = { x: e.clientX, y: e.clientY };
      startPosition.current = { ...panelPosition };
      if (e.target.setPointerCapture) {
        e.target.setPointerCapture(e.pointerId);
      }
    }
  }, [panelPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isResizing) {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      
      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;
      let newX = startPosition.current.x;
      let newY = startPosition.current.y;

      if (resizeDirection.includes('right')) {
        newWidth = Math.max(minSize.width, startSize.current.width + deltaX);
      }
      if (resizeDirection.includes('left')) {
        newWidth = Math.max(minSize.width, startSize.current.width - deltaX);
        newX = startPosition.current.x + (startSize.current.width - newWidth);
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(minSize.height, startSize.current.height + deltaY);
      }
      if (resizeDirection.includes('top')) {
        newHeight = Math.max(minSize.height, startSize.current.height - deltaY);
        newY = startPosition.current.y + (startSize.current.height - newHeight);
      }

      setPanelSize({ width: newWidth, height: newHeight });
      setPanelPosition({ x: newX, y: newY });
    } else if (isDragging) {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      
      setPanelPosition({
        x: Math.max(0, Math.min(window.innerWidth - panelSize.width, startPosition.current.x + deltaX)),
        y: Math.max(0, Math.min(window.innerHeight - panelSize.height, startPosition.current.y + deltaY))
      });
    }
  }, [isResizing, isDragging, resizeDirection, panelSize, minSize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setIsDragging(false);
    setResizeDirection('');
  }, []);

  useEffect(() => {
    if (isResizing || isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      
      document.addEventListener('pointermove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('pointerup', handleGlobalMouseUp);
      
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('pointermove', handleGlobalMouseMove);
        document.removeEventListener('pointerup', handleGlobalMouseUp);
        
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, isDragging, handleMouseMove, handleMouseUp]);

  const panelStyle = {
    position: 'absolute',
    top: `${panelPosition.y}px`,
    left: `${panelPosition.x}px`,
    width: `${panelSize.width}px`,
    height: `${panelSize.height}px`,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '0',
    color: 'white',
    zIndex: 1000,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    userSelect: 'none',
  };

  return {
    panelRef,
    panelStyle,
    handleResizeMouseDown,
    handleDragMouseDown
  };
}