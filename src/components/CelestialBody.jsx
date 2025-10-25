// src/components/CelestialBody.jsx
import { useMemo, useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, Select, Line } from '@react-three/drei';
import { Color } from 'three';
import { useCamera } from '../context/Camera';
import { useStore } from '../state/store.js';

import noiseVertex from '../shaders/noiseVertex.glsl';
import noiseFragment from '../shaders/noiseFragment.glsl';

// Ajout des uniforms pour les effets atmosphériques
const SunMaterial = shaderMaterial(
  {
    time: 0,
    uOctaves: 6.0,
    uLimbPower: 2.0,
    uLimbColor: new Color('#FFC96B'), // Une couleur jaune-orangé pour le halo
  },
  noiseVertex,
  noiseFragment
);

extend({ SunMaterial });

const CelestialBody = (props) => {
  const { handleFocus } = useCamera();
  const setSelectedBodyId = useStore((state) => state.setSelectedBodyId);
  const isSelected = useStore((state) => state.selectedBodyId === props.id);
  const time = useStore((state) => state.time);
  const materialRef = useRef();

  const velocityVector = useMemo(() => {
    if (!props.velocity || props.velocity.length !== 3) {
      return null;
    }

    const [vx, vy, vz] = props.velocity;
    const magnitude = Math.hypot(vx, vy, vz);
    if (!Number.isFinite(magnitude) || magnitude <= 1e-6) {
      return null;
    }

    const maxLength = 30;
    const minLength = 1.5;
    const clampedLength = Math.min(Math.max(magnitude * 0.75, minLength), maxLength);
    const scale = clampedLength / magnitude;

    return {
      points: [
        [0, 0, 0],
        [vx * scale, vy * scale, vz * scale]
      ],
      magnitude
    };
  }, [props.velocity]);

  const handleSelect = (event) => {
    event.stopPropagation();
    handleFocus(event);
    setSelectedBodyId(props.id);
  };

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.time = time;
      materialRef.current.uOctaves = props.granulationFrequency || 6.0;
      
      // Connecter les nouveaux uniforms aux props (qui pourront être ajoutés à l'UI plus tard)
      materialRef.current.uLimbPower = props.limbPower || 2.0;
      materialRef.current.uLimbColor.set(props.rimColor || '#FFC96B');
    }
  });

  return (
    <group position={props.position}>
      <group scale={[props.sunRadius, props.sunRadius, props.sunRadius]}>
        <Select enabled={isSelected}>
          <mesh onClick={handleSelect}>
            <sphereGeometry args={[1, 128, 128]} />
            <sunMaterial ref={materialRef} attach="material" />
          </mesh>
        </Select>
        {velocityVector && (
          <Line
            points={velocityVector.points}
            color={isSelected ? '#00FFFF' : '#AAAAAA'}
            lineWidth={isSelected ? 2.5 : 1.5}
            dashed
            dashSize={0.25}
            gapSize={0.15}
          />
        )}
      </group>
      <pointLight intensity={props.pointLightIntensity} color="#FFD700" />
    </group>
  );
};

export default CelestialBody;