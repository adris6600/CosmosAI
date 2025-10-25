// src/components/SelectedBodySummary.jsx
import React, { useMemo } from 'react';
import { useStore } from '../state/store.js';

const numberFormatter = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const vectorFormatter = (vector) =>
  vector
    .map((component) =>
      numberFormatter.format(Number.isFinite(component) ? component : 0)
    )
    .join(' · ');

const formatSpeed = (speed) => `${numberFormatter.format(speed)} u/s`;

const formatDistance = (distance) => `${numberFormatter.format(distance)} u`;

const formatDirection = (vector) =>
  vector
    .map((component) => component.toFixed(2))
    .join(' · ');

const SelectedBodySummary = () => {
  const selectedBody = useStore((state) =>
    state.celestialBodies.find((body) => body.id === state.selectedBodyId)
  );

  const summary = useMemo(() => {
    if (!selectedBody) {
      return null;
    }

    const position = Array.isArray(selectedBody.position)
      ? selectedBody.position
      : [0, 0, 0];
    const velocity = Array.isArray(selectedBody.velocity)
      ? selectedBody.velocity
      : [0, 0, 0];

    const distanceFromOrigin = Math.hypot(...position);
    const speed = Math.hypot(...velocity);
    const direction = speed > 1e-6
      ? velocity.map((component) => component / speed)
      : [0, 0, 0];

    return {
      position,
      velocity,
      distanceFromOrigin,
      speed,
      direction,
    };
  }, [selectedBody]);

  if (!selectedBody) {
    return (
      <section className="summary-card empty">
        <p className="summary-placeholder">
          Sélectionnez une étoile pour afficher un récapitulatif instantané.
        </p>
      </section>
    );
  }

  return (
    <section className="summary-card" aria-label="Résumé du corps céleste sélectionné">
      <header className="summary-title">Tableau de bord</header>
      <p className="summary-subtitle">{selectedBody.name}</p>
      <dl className="summary-grid">
        <div className="summary-item">
          <dt className="summary-label">Position</dt>
          <dd className="summary-value">{vectorFormatter(summary.position)}</dd>
        </div>
        <div className="summary-item">
          <dt className="summary-label">Distance à l'origine</dt>
          <dd className="summary-value">{formatDistance(summary.distanceFromOrigin)}</dd>
        </div>
        <div className="summary-item">
          <dt className="summary-label">Vitesse vectorielle</dt>
          <dd className="summary-value">{vectorFormatter(summary.velocity)}</dd>
        </div>
        <div className="summary-item">
          <dt className="summary-label">Vitesse</dt>
          <dd className="summary-value">{formatSpeed(summary.speed)}</dd>
        </div>
        <div className="summary-item">
          <dt className="summary-label">Direction</dt>
          <dd className="summary-value">{formatDirection(summary.direction)}</dd>
        </div>
      </dl>
    </section>
  );
};

export default SelectedBodySummary;
