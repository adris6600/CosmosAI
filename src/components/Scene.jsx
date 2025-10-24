import { CameraProvider, useCamera } from '../context/Camera'
import CelestialBody from './CelestialBody'
import { useStore } from '../state/store.js'
import { Selection } from '@react-three/postprocessing'
import SimulationOrchestrator from './SimulationOrchestrator'
import { useEffect } from 'react'

/**
 * @function SceneContent
 * @description Composant interne qui gère le contenu principal de la scène 3D.
 * Il utilise le contexte de la caméra et le store global pour afficher les corps célestes
 * et gérer les interactions de défocus et de réinitialisation de la vue.
 * Ce composant est enveloppé par CameraProvider dans le composant Scene.
 *
 * @returns {JSX.Element} Un fragment React contenant l'orchestrateur de simulation,
 * la sélection des corps célestes et une sphère invisible pour les interactions globales.
 */
const SceneContent = () => {
    // Récupère les fonctions handleDefocus et handleResetView du contexte de la caméra.
    const { handleDefocus, handleResetView } = useCamera()
    // Récupère la liste des corps célestes depuis le store global.
    const celestialBodies = useStore((state) => state.celestialBodies)
    useEffect(() => {
        console.info('[DEBUG] Scene mount: bodies', celestialBodies.length, celestialBodies.map(b => ({ id: b.id, name: b.name })))
    }, [celestialBodies])

    return (
        <>
            {/* Composant responsable de l'orchestration et de la mise à jour de la simulation. */}
            <SimulationOrchestrator />
            {/* Le composant Selection permet de gérer la sélection d'objets et d'appliquer des effets (ex: outline). */}
            <Selection>
                {/* Mappe sur la liste des corps célestes pour les afficher. */}
                {celestialBodies.map((body) => (
                    <CelestialBody key={body.id} {...body} />
                ))}
            </Selection>

            {/* Sphère immense et invisible pour capturer les clics "dans le vide" et réinitialiser la vue. */}
            <mesh 
                onClick={handleDefocus} // Gère le défocus (désélection) au simple clic.
                onDoubleClick={handleResetView} // Gère la réinitialisation de la vue au double clic.
                rotation={[-Math.PI / 2, 0, 0]} // Rotation pour aligner la sphère si nécessaire.
            >
                {/* Géométrie de la sphère avec un très grand rayon pour couvrir toute la scène. */}
                <sphereGeometry args={[10000, 32, 32]} />
                {/* Matériau basique transparent pour rendre la sphère invisible mais cliquable. */}
                <meshBasicMaterial transparent opacity={0} side={2} depthWrite={false} />
            </mesh>
        </>
    )
}

/**
 * @function Scene
 * @description Composant principal de la scène 3D qui fournit le contexte de la caméra
 * à tous ses enfants via CameraProvider.
 *
 * @returns {JSX.Element} Le fournisseur de contexte de la caméra enveloppant le contenu de la scène.
 */
const Scene = () => {
    return (
        // Fournit le contexte de la caméra à tous les composants enfants.
        <CameraProvider>
            <SceneContent />
        </CameraProvider>
    )
}

export default Scene
