// src/state/store.js
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { solarSystemData } from '../data/solarSystemData.js';

export const useStore = create((set, get) => ({
  celestialBodies: solarSystemData,
  selectedBodyId: null,
  time: 0,
  isPaused: false,
  timeScale: 1.0,
  lastTimeDirection: 1,

  // Actions
  setTime: (time) => set((state) => ({ time: Number.isFinite(time) ? time : state.time })),
  setSelectedBodyId: (id) => set({ selectedBodyId: id }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  setTimeScale: (scale) => set((state) => {
    if (!Number.isFinite(scale)) {
      return { timeScale: state.timeScale };
    }
    if (scale === 0) {
      return { timeScale: 0 };
    }
    const dir = Math.sign(scale) || (state.lastTimeDirection || 1);
    return { timeScale: scale, lastTimeDirection: dir };
  }),
  seekTime: (t) => set((state) => ({ time: Number.isFinite(t) ? t : state.time })),
  stepTime: (dt) => set((state) => ({ time: state.time + dt })),
  resetTime: () => set({ time: 0 }),
  // Contrôles avancés de vitesse (illimités via multiplication)
  accelerate: () => set((state) => {
    if (state.timeScale === 0) {
      const dir = state.lastTimeDirection || 1;
      return { timeScale: 1 * dir };
    }
    return { timeScale: state.timeScale * 2 };
  }),
  decelerate: () => set((state) => {
    if (state.timeScale === 0) {
      const dir = state.lastTimeDirection || 1;
      return { timeScale: 0.5 * dir };
    }
    return { timeScale: state.timeScale * 0.5 };
  }),
  setForward: () => set((state) => ({ timeScale: Math.abs(state.timeScale || 1), lastTimeDirection: 1 })),
  setReverse: () => set((state) => ({ timeScale: -Math.abs(state.timeScale || 1), lastTimeDirection: -1 })),

  // NOUVELLE ACTION : Met à jour l'ensemble du tableau des corps célestes.
  setCelestialBodies: (bodies) => set({ celestialBodies: bodies }),

  getSelectedBody: () => {
    const { celestialBodies, selectedBodyId } = get();
    return celestialBodies.find(body => body.id === selectedBodyId) || null;
  },

  updateBodyProperty: (id, property, value) => set((state) => ({
    celestialBodies: state.celestialBodies.map(body => {
      if (body.id !== id) return body;
      if (property === 'velocity') {
        const prev = Array.isArray(body.velocity) && body.velocity.length === 3
          ? body.velocity
          : [0, 0, 0];

        let newVel = prev;
        if (Array.isArray(value) && value.length === 3) {
          newVel = value.map(n => (Number.isFinite(n) ? n : 0));
        } else if (value && typeof value === 'object' && 'x' in value && 'y' in value && 'z' in value) {
          newVel = [value.x, value.y, value.z].map(n => (Number.isFinite(n) ? n : 0));
        } else if (Number.isFinite(value)) {
          if (value === 0) {
            newVel = [0, 0, 0];
          } else {
            const mag = Math.sqrt(prev[0] * prev[0] + prev[1] * prev[1] + prev[2] * prev[2]);
            const dir = mag > 0 ? [prev[0] / mag, prev[1] / mag, prev[2] / mag] : [1, 0, 0];
            newVel = dir.map(c => c * value);
          }
        } else {
          // Valeur invalide: conserver l'ancienne vélocité
          newVel = prev;
        }
        return { ...body, velocity: newVel };
      }
      return { ...body, [property]: value };
    })
  })),

  addCelestialBody: () => set((state) => {
    const newStar = {
      id: uuidv4(),
      name: `Étoile ${state.celestialBodies.length + 1}`,
      position: [
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      ],
      // MODIFICATION : Ajout d'une vélocité initiale aléatoire.
      velocity: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        0 // Mouvement principalement sur le plan XY pour une meilleure visibilité.
      ],
      emissiveIntensity: 0.8,
      sunRadius: 10,
      noiseFrequency: 1.0,
      noiseAmplitude: 1.0,
      pointLightIntensity: 50000,
      sunspotIntensity: 0.5,
      sunspotSize: 0.1,
      sunspotSpeed: 0.1,
      color1: '#FF4500',
      color2: '#FFD700',
      // Nouveaux paramètres stellaires avancés
      granulationFrequency: 8.0,
      granulationAmplitude: 0.3,
      flareIntensity: 0.2,
      flareFrequency: 3.0,
      prominenceIntensity: 0.15,
      prominenceScale: 2.0,
      coronaIntensity: 0.1,
      coronaFalloff: 2.0,
      temperatureVariation: 0.1,
      color3: '#FFA500', // Couleur chaude (orange)
      color4: '#CC3300', // Couleur froide (rouge sombre)
      limbPower: 2.0, // Puissance du limbe
      rimColor: '#FFC96B', // Couleur du limbe
      // Nouveaux paramètres de sélection de bruit
      noiseMode: 0, // 0 = Bruit 1, 1 = Bruit 2, 2 = Combiné
      noiseMix: 0.5, // Mélange entre les deux bruits (0-1)
      noiseIntensity1: 1.0, // Intensité du bruit 1
      noiseIntensity2: 1.0  // Intensité du bruit 2
    };

    return {
      celestialBodies: [...state.celestialBodies, newStar]
    };
  }),

  removeCelestialBody: (id) => set((state) => ({
    celestialBodies: state.celestialBodies.filter(body => body.id !== id),
    selectedBodyId: null
  }))
}));