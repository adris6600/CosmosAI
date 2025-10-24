import { createContext, useContext } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useStore } from '../state/store.js'

/**
 * @description Crée un contexte React pour gérer les fonctionnalités de la caméra.
 * Ce contexte permet aux composants enfants d'accéder aux fonctions de contrôle de la caméra.
 */
const CameraContext = createContext()

/**
 * @function useCamera
 * @description Hook personnalisé pour utiliser le contexte de la caméra.
 * Permet aux composants fonctionnels d'accéder facilement aux fonctions de gestion de la caméra.
 * @returns {object} Les fonctions et valeurs fournies par le CameraContext.
 */
const useCamera = () => useContext(CameraContext)
export { useCamera }

/**
 * @function CameraProvider
 * @description Fournit le contexte de la caméra à l'ensemble de l'application ou à une partie de celle-ci.
 * Il initialise la caméra et les contrôles, et expose des fonctions pour interagir avec la caméra.
 * @param {object} { children } - Les composants enfants qui auront accès au contexte de la caméra.
 * @returns {JSX.Element} Le fournisseur de contexte enveloppant les composants enfants.
 */
export const CameraProvider = ({ children }) => {
    // Récupère l'objet caméra et les contrôles (orbitControls) de la scène Three.js.
    const { camera, controls } = useThree()
    
    // Récupère l'action setSelectedBodyId du store Zustand pour gérer la désélection d'un corps céleste.
    const setSelectedBodyId = useStore((state) => state.setSelectedBodyId)

    /**
     * @function handleFocus
     * @description Gère le focus de la caméra sur un objet 3D spécifique.
     * La caméra se déplace et regarde l'objet ciblé.
     * @param {object} event - L'événement de clic qui contient l'objet 3D (mesh) sur lequel cliquer.
     * @returns {void}
     */
    const handleFocus = (event) => {
        event.stopPropagation() // Empêche la propagation de l'événement pour éviter le défocus immédiat.
        const mesh = event.object // L'objet 3D (mesh) sur lequel l'événement a eu lieu.
        const target = new Vector3() // Crée un nouveau vecteur pour stocker la position cible.
        mesh.getWorldPosition(target) // Obtient la position mondiale de l'objet cliqué.
        // Anime la caméra pour regarder la position de l'objet ciblé.
        controls?.setLookAt(camera.position.x, camera.position.y, camera.position.z, target.x, target.y, target.z, true)
    }

    /**
     * @function handleDefocus
     * @description Gère la désélection d'un corps céleste.
     * Réinitialise l'ID du corps sélectionné dans le store global à null.
     * @returns {void}
     */
    const handleDefocus = () => {
        setSelectedBodyId(null) // Définit l'ID du corps sélectionné à null pour le désélectionner.
    }

    /**
     * @function handleResetView
     * @description Réinitialise la vue de la caméra à une position et une orientation par défaut.
     * La caméra est repositionnée à (0, 0, 1000) et regarde l'origine (0, 0, 0).
     * @returns {void}
     */
    const handleResetView = () => {
        // Réinitialise la caméra à la position par défaut et la fait regarder l'origine.
        controls?.setLookAt(0, 0, 1000, 0, 0, 0, true)
    }

    // Définit la valeur du contexte qui sera fournie aux composants enfants.
    const contextValue = { handleFocus, handleDefocus, handleResetView }

    return <CameraContext.Provider value={contextValue}>{children}</CameraContext.Provider>
}
