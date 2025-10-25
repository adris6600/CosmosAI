import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './store.js';

// Utilitaire pour réinitialiser un état minimal avant chaque test
function resetStore({ velocity = [1, 0, 0] } = {}) {
  useStore.setState({
    celestialBodies: [{ id: 't1', name: 'TestStar', position: [0, 0, 0], velocity }],
    selectedBodyId: 't1'
  });
}

describe('Zustand store: updateBodyProperty velocity', () => {
  beforeEach(() => {
    resetStore({ velocity: [1, 0, 0] });
  });

  it('accepte un tableau 3D et le stocke tel quel', () => {
    useStore.getState().updateBodyProperty('t1', 'velocity', [2, -3, 4]);
    const v = useStore.getState().celestialBodies[0].velocity;
    expect(v).toEqual([2, -3, 4]);
  });

  it('accepte un objet {x,y,z} et le convertit en tableau', () => {
    useStore.getState().updateBodyProperty('t1', 'velocity', { x: -2, y: 3, z: 0 });
    const v = useStore.getState().celestialBodies[0].velocity;
    expect(v).toEqual([-2, 3, 0]);
  });

  it('scalaire 0 remet la vélocité à [0,0,0]', () => {
    useStore.getState().updateBodyProperty('t1', 'velocity', 0);
    const v = useStore.getState().celestialBodies[0].velocity;
    expect(v).toEqual([0, 0, 0]);
  });

  it('scalaire non nul conserve la direction précédente et ajuste la norme', () => {
    // Direction initiale [1,0,0], norme 1 -> scalaire 5 -> [5,0,0]
    useStore.getState().updateBodyProperty('t1', 'velocity', 5);
    const v = useStore.getState().celestialBodies[0].velocity;
    expect(v).toEqual([5, 0, 0]);
  });

  it('si direction précédente inconnue (norme 0), utilise la direction par défaut [1,0,0]', () => {
    resetStore({ velocity: [0, 0, 0] });
    useStore.getState().updateBodyProperty('t1', 'velocity', 10);
    const v = useStore.getState().celestialBodies[0].velocity;
    expect(v).toEqual([10, 0, 0]);
  });

  it('valeur invalide conserve l’ancienne vélocité', () => {
    useStore.getState().updateBodyProperty('t1', 'velocity', 'abc');
    const v = useStore.getState().celestialBodies[0].velocity;
    expect(v).toEqual([1, 0, 0]);
  });
});