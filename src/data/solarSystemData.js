// src/data/solarSystemData.js

/**
 * @description Tableau contenant les données initiales des corps célestes du système solaire.
 * Chaque objet représente une étoile avec ses propriétés physiques et visuelles.
 * Ces données sont utilisées pour initialiser la simulation et peuvent être modifiées via l'interface utilisateur.
 * @type {Array<Object>}
 */
export const solarSystemData = [
    /**
     * @description Représente le Soleil, l'étoile centrale du système.
     * @property {string} id - Identifiant unique du corps céleste.
     * @property {string} name - Nom du corps céleste.
     * @property {number[]} position - Position initiale [x, y, z] du corps céleste dans la scène 3D.
     * @property {number[]} velocity - Vecteur de vitesse initiale [vx, vy, vz] du corps céleste.
     * @property {number} mass - Masse du corps céleste (utilisée pour les calculs gravitationnels).
     * @property {number} sunRadius - Rayon visuel du corps céleste dans la scène.
     * @property {number} pointLightIntensity - Intensité de la lumière ponctuelle émise par le corps.
     * @property {number} emissiveIntensity - Intensité d'émission du matériau du shader (pour l'éclat).
     * @property {string} color1 - Première couleur hexadécimale pour le dégradé du shader.
     * @property {string} color2 - Deuxième couleur hexadécimale pour le dégradé du shader.
     * @property {number} noiseFrequency - Fréquence du bruit FBM pour le shader.
     * @property {number} noiseAmplitude - Amplitude du bruit FBM pour le shader.
     * @property {number} sunspotIntensity - Intensité des taches solaires pour le shader.
     * @property {number} sunspotSize - Taille des taches solaires pour le shader.
     * @property {number} sunspotSpeed - Vitesse d'animation des taches solaires pour le shader.
     */
    {
        id: 'soleil',
        name: 'Soleil',
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        mass: 1.989e30, // Masse du Soleil en kg

        // --- Paramètres Visuels ---
        sunRadius: 10,
        pointLightIntensity: 50000,
        emissiveIntensity: 2.5, // Augmenté pour plus d'éclat
        color1: '#FFD700',
        color2: '#FF6B00', // Orange plus vif
        noiseFrequency: 2.0, // Augmenté pour plus de détails
        noiseAmplitude: 1.5, // Augmenté pour plus de variation
        sunspotIntensity: 0.8, // Augmenté pour des taches plus visibles
        sunspotSize: 0.15, // Légèrement plus grandes
        sunspotSpeed: 0.2, // Plus rapide pour plus d'animation
        
        // --- Nouveaux Paramètres Stellaires Avancés ---
        granulationFrequency: 12.0, // Augmenté pour plus de détails
        granulationAmplitude: 0.6, // Augmenté pour plus de texture
        flareIntensity: 0.5, // Augmenté pour des éruptions plus visibles
        flareFrequency: 4.0, // Plus fréquent
        prominenceIntensity: 0.4, // Augmenté pour plus de visibilité
        prominenceScale: 1.5, // Réduit pour plus de détails
        coronaIntensity: 0.3, // Augmenté pour une couronne plus visible
        coronaFalloff: 1.5, // Réduit pour une couronne plus étendue
        temperatureVariationIntensity: 0.3, // Corrigé le nom et augmenté
        color3: '#FFAA00', // Orange plus chaud
        color4: '#FF4400', // Rouge plus intense
        limbPower: 2.0, // Puissance du limbe (halo)
        rimColor: '#FFC96B', // Couleur du limbe
        
        // --- Nouveaux Paramètres de Sélection de Bruit ---
        noiseMode: 2, // 0 = Bruit 1, 1 = Bruit 2, 2 = Combiné (plus intéressant visuellement)
        noiseMix: 0.7, // Mélange favorisant le bruit 2 pour plus de complexité
        noiseIntensity1: 1.2, // Intensité du bruit 1 augmentée
        noiseIntensity2: 1.5  // Intensité du bruit 2 augmentée
    },
];