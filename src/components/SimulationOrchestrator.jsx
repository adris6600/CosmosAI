// src/components/SimulationOrchestrator.jsx
import { useFrame } from '@react-three/fiber';
import { useStore } from '../state/store.js';

const DEBUG_SIM = true;
let lastLog = 0;

export default function SimulationOrchestrator() {
  const setTime = useStore((state) => state.setTime);
  const setCelestialBodies = useStore((state) => state.setCelestialBodies);

  useFrame(({ clock }, delta) => {
    // Lit le contrôle du temps depuis le store et calcule le delta effectif
    const { isPaused, timeScale, time, celestialBodies } = useStore.getState();

    // Robustesse: protège contre les deltas non-finis et conserve la modulation illimitée
    let effectiveDelta = isPaused ? 0 : (delta * timeScale);
    if (!Number.isFinite(effectiveDelta)) {
      effectiveDelta = 0;
    }

    // Met à jour le temps global pour les shaders, en l'accumulant
    const newTime = time + effectiveDelta;
    setTime(newTime);

    // Calcule les nouvelles positions en fonction de la vélocité et du delta effectif (supporte reverse)
    const updatedBodies = celestialBodies.map(body => {
      const displacement = body.velocity.map(v => v * effectiveDelta);
      const newPosition = body.position.map((pos, i) => pos + displacement[i]);
      return { ...body, position: newPosition };
    });

    setCelestialBodies(updatedBodies);

    if (DEBUG_SIM && clock.elapsedTime - lastLog > 1.0) {
      const daysPerSec = timeScale / 86400.0;
      console.info('[DEBUG] Simulation:', {
        bodyCount: updatedBodies.length,
        firstBody: updatedBodies[0] ? {
          id: updatedBodies[0].id,
          name: updatedBodies[0].name,
          position: updatedBodies[0].position.map(v => Number(v.toFixed(2))),
          velocity: updatedBodies[0].velocity.map(v => Number(v.toFixed(2))),
        } : null,
        isPaused,
        timeScale,
        daysPerSec: Number(daysPerSec.toFixed(4)),
        time: newTime
      });
      lastLog = clock.elapsedTime;
    }
  });

  return null; // Ce composant n'a pas de rendu visuel.
}