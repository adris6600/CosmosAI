// src/components/TimeControls.jsx
import React, { useMemo, useState } from 'react';
import { useStore } from '../state/store.js';
import { useResizableAndDraggablePanel } from '../hooks/useResizableAndDraggablePanel.js';

// Styles alignés sur le panneau principal
const headerStyle = {
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 16px',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.9)',
  background: 'rgba(255, 255, 255, 0.05)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'move',
  margin: '0',
};

const contentStyle = {
  padding: '16px',
  height: 'calc(100% - 50px)',
  overflowY: 'auto',
};

const toggleButtonStyle = {
  position: 'fixed',
  top: '20px',
  right: '80px', // évite le chevauchement avec le bouton ⚙️
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001,
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
};

const resizeHandleStyle = {
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.3)',
  transition: 'background 0.2s ease',
};

export default function TimeControls() {
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  // Store
  const isPaused = useStore((s) => s.isPaused);
  const timeScale = useStore((s) => s.timeScale);
  const time = useStore((s) => s.time);
  const togglePause = useStore((s) => s.togglePause);
  const setTimeScale = useStore((s) => s.setTimeScale);
  const seekTime = useStore((s) => s.seekTime);
  const stepTime = useStore((s) => s.stepTime);
  const resetTime = useStore((s) => s.resetTime);
  const accelerate = useStore((s) => s.accelerate);
  const decelerate = useStore((s) => s.decelerate);
  const setForward = useStore((s) => s.setForward);
  const setReverse = useStore((s) => s.setReverse);

  // Hook panel (cohérence avec CustomParameterPanel)
  const {
    panelRef: panelRef,
    panelStyle,
    handleResizeMouseDown,
    handleDragMouseDown,
  } = useResizableAndDraggablePanel({
    initialSize: { width: 360, height: 280 },
    initialPosition: { x: 420, y: 20 },
    minSize: { width: 300, height: 220 },
  });

  // Vitesse en jours/s (magnitude pour slider)
  const speedDaysPerSec = timeScale / 86400.0;
  const magDays = Math.abs(speedDaysPerSec);
  const speedLabel = useMemo(() => `${speedDaysPerSec.toFixed(2)} jour/s`, [speedDaysPerSec]);

  return (
    <>
      {/* Bouton de bascule du panneau temps */}
      <button
        style={toggleButtonStyle}
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
        aria-label="Afficher/Masquer le panneau du temps"
        title="Contrôle du Temps"
      >
        {isPanelVisible ? '✕' : '⏱️'}
      </button>

      {isPanelVisible && (
        <div ref={panelRef} style={panelStyle} aria-label="Panneau de contrôle du temps">
          {/* Poignées de redimensionnement */}
          <div style={{ ...resizeHandleStyle, top: '-2px', left: '8px', right: '8px', height: '4px', cursor: 'ns-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'top')} />
          <div style={{ ...resizeHandleStyle, bottom: '-2px', left: '8px', right: '8px', height: '4px', cursor: 'ns-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')} />
          <div style={{ ...resizeHandleStyle, left: '-2px', top: '8px', bottom: '8px', width: '4px', cursor: 'ew-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'left')} />
          <div style={{ ...resizeHandleStyle, right: '-2px', top: '8px', bottom: '8px', width: '4px', cursor: 'ew-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'right')} />
          <div style={{ ...resizeHandleStyle, left: '-2px', top: '-2px', width: '8px', height: '8px', cursor: 'nw-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'top left')} />
          <div style={{ ...resizeHandleStyle, right: '-2px', top: '-2px', width: '8px', height: '8px', cursor: 'ne-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'top right')} />
          <div style={{ ...resizeHandleStyle, left: '-2px', bottom: '-2px', width: '8px', height: '8px', cursor: 'sw-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'bottom left')} />
          <div style={{ ...resizeHandleStyle, right: '-2px', bottom: '-2px', width: '8px', height: '8px', cursor: 'se-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, 'bottom right')} />

          {/* En-tête draggable */}
          <div style={headerStyle} onMouseDown={handleDragMouseDown} onPointerDown={handleDragMouseDown}>
            Contrôle du Temps
          </div>

          {/* Contenu */}
          <div style={contentStyle}>
            {/* Groupe Transport */}
            <div className="control-group" aria-label="Transport du temps">
              <label className="label">Transport du temps</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="action-control" title="Redémarrer (temps = 0)" onClick={() => resetTime()}>⟲ Redémarrer</button>
                <button className="action-control" title="Inverser le Temps (sens rétrograde)" onClick={setReverse}>↶ Inverser</button>
                <button className="action-control" title="Avancer le Temps (sens prograde)" onClick={setForward}>↷ Avancer</button>
                <button className="action-control" title={isPaused ? 'Lire' : 'Pause'} onClick={togglePause}>{isPaused ? '⏵ Lire' : '⏸ Pause'}</button>
                <button className="action-control" title="Étape arrière (−1 jour)" onClick={() => stepTime(-86400)}>⏮ Étape -1j</button>
                <button className="action-control" title="Étape avant (+1 jour)" onClick={() => stepTime(86400)}>⏭ Étape +1j</button>
              </div>
            </div>

            {/* Groupe Vitesse */}
            <div className="control-group" aria-label="Contrôle de la vitesse">
              <label className="label">Vitesse (jour/s)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="action-control" title="Ralentir (÷2)" onClick={decelerate}>« Ralentir</button>
                <button className="action-control" title="Accélérer (×2)" onClick={accelerate}>» Accélérer</button>
                <div className="slider-container" style={{ flex: '1 1 160px' }}>
                  <input
                    className="slider-range"
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={magDays}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      const sign = Math.sign(timeScale || 1) || 1;
                      setTimeScale(Number.isFinite(v) ? sign * v * 86400.0 : timeScale);
                    }}
                  />
                  <input
                    className="slider-input"
                    type="number"
                    min={0}
                    max={10}
                    step={0.1}
                    value={Number(magDays.toFixed(2))}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      const sign = Math.sign(timeScale || 1) || 1;
                      setTimeScale(Number.isFinite(v) ? sign * v * 86400.0 : timeScale);
                    }}
                  />
                </div>
              </div>
              <div className="help-text">Actuel: {speedLabel}</div>
            </div>

            {/* Groupe Temps */}
            <div className="control-group" aria-label="Contrôle du temps courant">
              <label className="label">Temps global (secondes)</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  className="text-input"
                  type="number"
                  value={Number(time.toFixed(2))}
                  onChange={(e) => seekTime(parseFloat(e.target.value) || 0)}
                  step={0.1}
                  aria-label="Temps (secondes)"
                  title="Temps global de la simulation (secondes)"
                  style={{ flex: '0 0 140px' }}
                />
                <button className="action-control" title="Aller à 0 s" onClick={() => seekTime(0)}>
                  Aller à 0 s
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}