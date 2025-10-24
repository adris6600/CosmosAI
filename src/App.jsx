// src/App.jsx

// Importe le composant Canvas de @react-three/fiber pour créer une scène 3D.
import { Canvas } from '@react-three/fiber'
// Importe CameraControls de @react-three/drei pour permettre la navigation de la caméra.
import { CameraControls } from '@react-three/drei'
// Importe les effets de post-traitement (EffectComposer, Bloom, Outline) de @react-three/postprocessing.
import { EffectComposer, Bloom, Outline } from '@react-three/postprocessing'

// Importe les composants de la scène et du panneau d'édition.
import Scene from './components/Scene'
import CustomParameterPanel from './components/CustomParameterPanel'
import TimeControls from './components/TimeControls'

/**
 * @function App
 * @description Composant racine de l'application.
 * Il configure la scène 3D avec un canevas, une caméra, des lumières et des effets de post-traitement.
 * Il intègre également le panneau d'édition et la scène principale.
 *
 * @returns {JSX.Element} Le composant principal de l'application.
 */
const App = () => {
  return (
    <>
      {/* Panneau d'édition pour contrôler les paramètres de la simulation */}
      <CustomParameterPanel />
      {/* Contrôles temporels globaux */}
      <TimeControls />
      {/*
        Composant Canvas de react-three-fiber.
        Configure la scène 3D et la caméra.
        - position: [0, 0, 50] : Position initiale de la caméra (X, Y, Z).
        - fov: 75 : Champ de vision de la caméra en degrés.
        - far: 200000 : Distance maximale de rendu de la caméra.
      */}
      <Canvas camera={{ position: [0, 0, 50], fov: 75, far: 200000 }}>
          {/* Attache une couleur de fond noire à la scène */}
          <color attach='background' args={['black']} />
          {/* Lumière ambiante pour éclairer uniformément la scène */}
          <ambientLight intensity={0.25} />

          {/* Contrôles de la caméra pour permettre l'interaction utilisateur (rotation, zoom, etc.) */}
          <CameraControls makeDefault />

          {/* Composant Scene qui contient les objets célestes et la logique de simulation */}
          <Scene />

          {/*
            EffectComposer pour appliquer des effets de post-traitement à la scène.
            Cela améliore l'esthétique visuelle.
          */}
          <EffectComposer>
              {/*
                Effet Bloom pour créer un halo lumineux autour des objets brillants.
                - luminanceThreshold: 0.9 : Seuil de luminance pour déclencher l'effet.
                - luminanceSmoothing: 0.9 : Lissage de la luminance.
                - height: 300 : Hauteur de l'effet.
                - intensity: 2.0 : Intensité de l'effet Bloom.
              */}
              <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={300} intensity={2.0} />
              {/*
                Effet Outline pour ajouter un contour aux objets sélectionnés ou mis en évidence.
                - blur: active le flou pour le contour.
                - visibleEdgeColor: "white" : Couleur du contour visible.
                - edgeStrength: 100 : Force du contour.
                - width: 1024 : Largeur de l'effet de contour.
              */}
              <Outline blur visibleEdgeColor="white" edgeStrength={100} width={1024} />
          </EffectComposer>
      </Canvas>
    </>
  )
}

export default App
