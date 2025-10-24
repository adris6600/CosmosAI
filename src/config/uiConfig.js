// src/config/uiConfig.js

export const paramConfig = {
  // Propriétés principales
  objectName: {
    label: 'Nom',
    type: 'text'
  },
  mass: {
    label: 'Masse (M☉)',
    type: 'range',
    min: 0.1,
    max: 100,
    step: 0.1
  },
  radius: {
    label: 'Rayon (km)',
    type: 'range',
    min: 1000,
    max: 1000000,
    step: 1000
  },
  density: {
    label: 'Densité (g/cm³)',
    type: 'range',
    min: 0.1,
    max: 20,
    step: 0.1
  },
  surfaceTemperature: {
    label: 'Température (K)',
    type: 'range',
    min: 1000,
    max: 50000,
    step: 100
  },
  luminosity: {
    label: 'Luminosité (L☉)',
    type: 'range',
    min: 0.01,
    max: 1000000,
    step: 0.01
  },
  velocity: {
    label: 'Vitesse (km/s)',
    type: 'range',
    min: 0,
    max: 1000,
    step: 1
  },
  rotationPeriod: {
    label: 'Période rotation (jours)',
    type: 'range',
    min: 0.1,
    max: 365,
    step: 0.1
  },
  age: {
    label: 'Âge (Ga)',
    type: 'range',
    min: 0.1,
    max: 15,
    step: 0.1
  },
  surfaceGravityKm: {
    label: 'Gravité surface (km/s²)',
    type: 'range',
    min: 0.1,
    max: 100,
    step: 0.1
  },
  distanceFromCamera: {
    label: 'Distance caméra (UA)',
    type: 'range',
    min: 0.1,
    max: 1000,
    step: 0.1
  },
  
  // Section INTERACTIONS
  attractsOthers: {
    label: 'Attire d\'autres',
    type: 'checkbox'
  },
  attractedByOthers: {
    label: 'Attiré par d\'autres',
    type: 'checkbox'
  },
  collisionWithOthers: {
    label: 'Collision avec d\'autres',
    type: 'checkbox'
  },
  nonSphericalGravity: {
    label: 'Gravité non sphérique',
    type: 'checkbox'
  },
  
  // Section MAGIE
  invertedGravity: {
    label: 'Gravité inversée',
    type: 'checkbox'
  },
  negativeLuminosity: {
    label: 'Luminosité négative',
    type: 'checkbox'
  },
  
  // Section SIMULATION D'OBJET
  radiusBasedOn: {
    label: 'Rayon basé sur',
    type: 'select',
    options: ['Composition', 'Masse', 'Densité', 'Température', 'Manuel']
  },
  
  // Boutons d'action rapide
  replaceObject: {
    label: 'Remplacer l\'objet',
    type: 'button',
    action: 'replace'
  },
  deleteObject: {
    label: 'Supprimer l\'objet',
    type: 'button',
    action: 'delete'
  },
  automaticOrbit: {
    label: 'Orbite automatique',
    type: 'button',
    action: 'orbit'
  },
  zeroVelocity: {
    label: 'Vélocité nulle',
    type: 'button',
    action: 'zeroVel'
  },
  
  // Section MOUVEMENT - Paramètres Généraux
  relativeTo: {
    label: 'Relatif à',
    type: 'select',
    options: ['Origine de la simulation', 'Corps Céleste 1', 'Corps Céleste 2', 'Soleil', 'Centre de masse']
  },
  distance: {
    label: 'Distance (UA)',
    type: 'range',
    min: 0,
    max: 1000,
    step: 0.1
  },
  
  // Section PARAMÈTRES ORBITAUX
  orbitalParent: {
    label: 'Parent orbital',
    type: 'text',
    readOnly: true
  },
  
  // Section ROTATION
  axisInclination: {
    label: 'Inclinaison de l\'axe (°)',
    type: 'range',
    min: 0,
    max: 180,
    step: 0.1
  },
  inclinationArgument: {
    label: 'Argument de l\'inclinaison (°)',
    type: 'range',
    min: 0,
    max: 360,
    step: 0.1
  },
  yaw: {
    label: 'Embardée (°)',
    type: 'range',
    min: 0,
    max: 360,
    step: 0.1
  },
  equatorialTangentialSpeed: {
    label: 'Vitesse tangentielle à l\'Équateur (km/s)',
    type: 'text',
    readOnly: true
  },
  synchronousRotation: {
    label: 'Rotation synchrone',
    type: 'button',
    action: 'synchronousRotation'
  },
  
  // Section EFFETS MARÉMOTEURS
  rocheLimit: {
    label: 'Limite de Roche (UA)',
    type: 'range',
    min: 0,
    max: 10,
    step: 0.01
  },
  tidalStressDirectionX: {
    label: 'Direction stress marémoteur X',
    type: 'range',
    min: -1,
    max: 1,
    step: 0.01
  },
  tidalStressDirectionY: {
    label: 'Direction stress marémoteur Y',
    type: 'range',
    min: -1,
    max: 1,
    step: 0.01
  },
  tidalStressDirectionZ: {
    label: 'Direction stress marémoteur Z',
    type: 'range',
    min: -1,
    max: 1,
    step: 0.01
  },
  tidalStressAmplitude: {
    label: 'Amplitude stress marémoteur (GN)',
    type: 'range',
    min: 0,
    max: 100,
    step: 0.1
  },
  tidalHeatingEffect: {
    label: 'Effet chauffe marémotrice (TW)',
    type: 'range',
    min: 0,
    max: 1000,
    step: 1
  },
  
  // Section OBJETS IMPACTEURS
  strongestAttractor: {
    label: 'Attracteur le plus fort',
    type: 'text',
    readOnly: true
  },
  impactorOrbitalParent: {
    label: 'Parent orbital',
    type: 'text',
    readOnly: true
  },
  
  // Section RELATIF À LA CAMÉRA
  normalizedLightCurve: {
    label: 'Courbe de lumière normalisée',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.01
  },
  radialVelocity: {
    label: 'Vitesse radiale (m/s)',
    type: 'range',
    min: -1000,
    max: 1000,
    step: 0.1
  },
  cameraInclination: {
    label: 'Inclinaison de la caméra (°)',
    type: 'range',
    min: 0,
    max: 180,
    step: 0.1
  },
  cameraAzimuth: {
    label: 'Azimuth de la caméra (radians)',
    type: 'range',
    min: 0,
    max: 6.28318,
    step: 0.01
  },
  
  // Section ACTIONS
  lockPosition: {
    label: 'Verrouiller la position',
    type: 'checkbox'
  },
  
  // Section TEMPÉRATURE - Propriétés Thermiques
  surfaceTemperatureK: {
    label: 'Température de surface (K)',
    type: 'range',
    min: 1,
    max: 50000,
    step: 1
  },
  surfaceTemperatureC: {
    label: 'Température de surface (°C)',
    type: 'range',
    min: -272,
    max: 49727,
    step: 1
  },
  coreTemperatureK: {
    label: 'Température au cœur (K)',
    type: 'range',
    min: 1000,
    max: 100000000,
    step: 1000
  },
  coreTemperatureC: {
    label: 'Température au cœur (°C)',
    type: 'range',
    min: 727,
    max: 99999727,
    step: 1000
  },
  luminositySolar: {
    label: 'Luminosité (L☉)',
    type: 'range',
    min: 0.000001,
    max: 1000000,
    step: 0.000001
  },
  absoluteMagnitude: {
    label: 'Magnitude absolue',
    type: 'range',
    min: -15,
    max: 20,
    step: 0.1
  },
  apparentMagnitude: {
    label: 'Magnitude apparente',
    type: 'range',
    min: -30,
    max: 30,
    step: 0.1
  },
  
  // Section FLUX D'ÉNERGIE
  energyAbsorptionRate: {
    label: 'Taux d\'absorption d\'énergie (YW)',
    type: 'range',
    min: 0,
    max: 1000,
    step: 0.1
  },
  energyRadiationRate: {
    label: 'Taux de rayonnement énergétique (YW)',
    type: 'range',
    min: 0,
    max: 1000,
    step: 0.1
  },
  heatingRate: {
    label: 'Taux de chauffage (°C/an)',
    type: 'range',
    min: -100,
    max: 100,
    step: 0.01
  },
  equilibriumTemperature: {
    label: 'Température d\'équilibre (°C)',
    type: 'range',
    min: -273,
    max: 5000,
    step: 1
  },
  surfaceThermalCapacity: {
    label: 'Capacité thermique de surface (MJ/°C/m²)',
    type: 'range',
    min: 0.1,
    max: 100,
    step: 0.1
  },
  averageAlbedo: {
    label: 'Albédo moyen',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.01
  },
  effectiveTemperature: {
    label: 'Température effective (K)',
    type: 'range',
    min: 1,
    max: 50000,
    step: 1
  },

  // === PARAMÈTRES DE COMPOSITION ===
  
  // Actions sur les Matériaux
  evaporateAll: {
    label: 'Tout évaporer',
    type: 'action'
  },
  meltAll: {
    label: 'Tout faire fondre',
    type: 'action'
  },
  freezeAll: {
    label: 'Tout geler',
    type: 'action'
  },
  stabilizePhases: {
    label: 'Stabiliser les phases',
    type: 'action'
  },
  sedimentLiquid: {
    label: 'Liquide de sédimentation',
    type: 'action'
  },
  equalizeGas: {
    label: 'Égaliser le gaz',
    type: 'action'
  },
  modifyColors: {
    label: 'Modifier les couleurs',
    type: 'action'
  },

  // Composition en Matériaux (masse en M SOLEIL)
  hydrogenMass: {
    label: 'Hydrogène (M☉)',
    type: 'range',
    min: 0,
    max: 10,
    step: 0.001
  },
  heliumMass: {
    label: 'Hélium (M☉)',
    type: 'range',
    min: 0,
    max: 5,
    step: 0.001
  },
  argonMass: {
    label: 'Argon (M☉)',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.0001
  },
  sulfurDioxideMass: {
    label: 'Dioxyde de soufre (M☉)',
    type: 'range',
    min: 0,
    max: 0.1,
    step: 0.00001
  },
  oxygenMass: {
    label: 'Oxygène (M☉)',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.0001
  },
  carbonMass: {
    label: 'Carbone (M☉)',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.0001
  },
  nitrogenMass: {
    label: 'Azote (M☉)',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.0001
  },
  siliconMass: {
    label: 'Silicium (M☉)',
    type: 'range',
    min: 0,
    max: 0.5,
    step: 0.0001
  },
  ironMass: {
    label: 'Fer (M☉)',
    type: 'range',
    min: 0,
    max: 0.5,
    step: 0.0001
  },
  waterMass: {
    label: 'Eau (M☉)',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.0001
  },

  // Unités de liaison
  bondingUnits: {
    label: 'Unités de liaison',
    type: 'toggle'
  },

  // Affichage des Matériaux
  displayLayers: {
    label: 'Couches',
    type: 'action'
  },
  displayAll: {
    label: 'Afficher tout',
    type: 'action'
  },

  // Propriétés Cumulatives
  totalMass: {
    label: 'Masse totale (M☉)',
    type: 'range',
    min: 0.001,
    max: 100,
    step: 0.001
  },
  totalRadius: {
    label: 'Rayon total (R☉)',
    type: 'range',
    min: 0.1,
    max: 50,
    step: 0.1
  },
  totalDensity: {
    label: 'Densité (g/cm³)',
    type: 'range',
    min: 0.1,
    max: 20,
    step: 0.1
  },
  totalVolume: {
    label: 'Volume (V☉)',
    type: 'range',
    min: 0.001,
    max: 1000,
    step: 0.001
  },
  radialMassGain: {
    label: 'Gain de masse radial (%)',
    type: 'range',
    min: -50,
    max: 50,
    step: 0.1
  },

  // Propriétés Physiques Détaillées
  surfaceGravityM: {
    label: 'Gravité à la surface (m/s²)',
    type: 'range',
    min: 0.1,
    max: 1000,
    step: 0.1
  },
  escapeVelocity: {
    label: 'Vitesse de libération (km/s)',
    type: 'range',
    min: 0.1,
    max: 1000,
    step: 0.1
  },
  bodyAge: {
    label: 'Âge (milliards d\'années)',
    type: 'range',
    min: 0.1,
    max: 15,
    step: 0.1
  },
  massLossRate: {
    label: 'Taux de perte de masse (M☉/an)',
    type: 'range',
    min: 0,
    max: 0.001,
    step: 0.000001
  },
  cumulativeMassLoss: {
    label: 'Perte de masse cumulée (M☉)',
    type: 'range',
    min: 0,
    max: 10,
    step: 0.001
  },
  resetMassLoss: {
    label: 'Réinitialiser',
    type: 'action'
  },

  // Propriétés Principales (Noyau)
  coreDensity: {
    label: 'Densité de noyau (g/cm³)',
    type: 'range',
    min: 1,
    max: 1000,
    step: 1
  },
  centralPressure: {
    label: 'Pression centrale (GPa)',
    type: 'range',
    min: 0.1,
    max: 10000,
    step: 0.1
  },

  // Comparaisons
  earthSimilarity: {
    label: 'Similitude avec la Terre (%)',
    type: 'range',
    min: 0,
    max: 100,
    step: 1
  },
  lifeProbability: {
    label: 'Probabilité de vie (%)',
    type: 'range',
    min: 0,
    max: 100,
    step: 1
  },

  // Champs Magnétiques
  magneticFieldStrength: {
    label: 'Force du champ magnétique (µT)',
    type: 'range',
    min: 0,
    max: 100000,
    step: 1
  },
  showMagneticAxis: {
    label: 'Afficher l\'axe magnétique',
    type: 'toggle'
  },
  magneticPoleAngle: {
    label: 'Angle pôle magnétique (°)',
    type: 'range',
    min: 0,
    max: 360,
    step: 1
  },
  
  // Paramètres visuels existants
  emissiveIntensity: {
    label: 'Intensité Émissive',
    type: 'range',
    min: 0,
    max: 2,
    step: 0.1
  },
  sunRadius: {
    label: 'Rayon Solaire',
    type: 'range',
    min: 1,
    max: 20,
    step: 0.5
  },
  noiseFrequency: {
    label: 'Fréquence du Bruit',
    type: 'range',
    min: 0.1,
    max: 5,
    step: 0.1
  },
  noiseAmplitude: {
    label: 'Amplitude du Bruit',
    type: 'range',
    min: 0.1,
    max: 3,
    step: 0.1
  },
  pointLightIntensity: {
    label: 'Intensité Lumineuse',
    type: 'range',
    min: 1000,
    max: 100000,
    step: 1000
  },
  sunspotIntensity: {
    label: 'Intensité des Taches Solaires',
    type: 'range',
    min: 0,
    max: 1,
    step: 0.05
  },
  sunspotSize: {
    label: 'Taille des Taches Solaires',
    type: 'range',
    min: 0.01,
    max: 0.5,
    step: 0.01
  },
  sunspotSpeed: {
    label: 'Vitesse des Taches Solaires',
    type: 'range',
    min: 0.01,
    max: 1,
    step: 0.01
  },
  color1: {
    label: 'Couleur Primaire',
    type: 'color'
  },
  color2: {
    label: 'Couleur Secondaire',
    type: 'color'
  },
  
  // Nouveaux paramètres pour les effets stellaires avancés
  granulationFrequency: {
    label: 'Fréquence Granulation',
    type: 'range',
    min: 0.5,
    max: 8.0,
    step: 0.1
  },
  granulationAmplitude: {
    label: 'Amplitude Granulation',
    type: 'range',
    min: 0.1,
    max: 2.0,
    step: 0.05
  },
  flareIntensity: {
    label: 'Intensité Éruptions Solaires',
    type: 'range',
    min: 0.0,
    max: 3.0,
    step: 0.1
  },
  flareFrequency: {
    label: 'Fréquence Éruptions',
    type: 'range',
    min: 0.1,
    max: 5.0,
    step: 0.1
  },
  prominenceIntensity: {
    label: 'Intensité Protubérances',
    type: 'range',
    min: 0.0,
    max: 2.0,
    step: 0.05
  },
  prominenceScale: {
    label: 'Échelle Protubérances',
    type: 'range',
    min: 0.5,
    max: 4.0,
    step: 0.1
  },
  coronaIntensity: {
    label: 'Intensité Couronne Solaire',
    type: 'range',
    min: 0.0,
    max: 1.5,
    step: 0.05
  },
  coronaFalloff: {
    label: 'Atténuation Couronne',
    type: 'range',
    min: 1.0,
    max: 8.0,
    step: 0.2
  },
  temperatureVariationIntensity: {
    label: 'Variation Température',
    type: 'range',
    min: 0.0,
    max: 1.0,
    step: 0.02
  },
  color3: {
    label: 'Couleur Chaude',
    type: 'color'
  },
  color4: {
    label: 'Couleur Froide',
    type: 'color'
  },
  noiseMode: {
    label: 'Mode de Bruit',
    type: 'select',
    options: ['Bruit 1', 'Bruit 2', 'Combiné']
  },
  noiseMix: {
    label: 'Mélange des Bruits',
    type: 'range',
    min: 0.0,
    max: 1.0,
    step: 0.01
  },
  noiseIntensity1: {
    label: 'Intensité Bruit 1',
    type: 'range',
    min: 0.0,
    max: 2.0,
    step: 0.01
  },
  noiseIntensity2: {
    label: 'Intensité Bruit 2',
    type: 'range',
    min: 0.0,
    max: 2.0,
    step: 0.01
  },
  // Contrôles shader avancés
  bandCount: {
    label: 'Nombre de Bandes (expérimental)',
    type: 'range',
    min: 2,
    max: 64,
    step: 1
  },
  bandJitterAmp: {
    label: 'Amplitude Jitter Latitudinal',
    type: 'range',
    min: 0.0,
    max: 0.5,
    step: 0.01
  },
  bandJitterFreq: {
    label: 'Fréquence Jitter Latitudinal',
    type: 'range',
    min: 0.0,
    max: 1.0,
    step: 0.01
  },
  decorrelationMix: {
    label: 'Mix de Décorrélation',
    type: 'range',
    min: 0.0,
    max: 1.0,
    step: 0.01
  },
  advectionStrength: {
    label: 'Force d’Advection',
    type: 'range',
    min: 0.0,
    max: 0.8,
    step: 0.01
  },
  triplanarPower: {
    label: 'Puissance Tri-planar',
    type: 'range',
    min: 1.0,
    max: 6.0,
    step: 0.1
  }
};

export const categories = {
  apercu: {
    name: 'Aperçu',
    icon: '👁️',
    parameters: [
      'objectName',
      'mass',
      'radius',
      'density',
      'surfaceTemperature',
      'luminosity',
      'velocity',
      'rotationPeriod',
      'age',
      'surfaceGravity',
      'distanceFromCamera',
      'attractsOthers',
      'attractedByOthers',
      'collisionWithOthers',
      'nonSphericalGravity',
      'invertedGravity',
      'negativeLuminosity',
      'radiusBasedOn'
    ]
  },
  visuels: {
    name: 'Visuels',
    icon: '🎨',
    parameters: [
      'emissiveIntensity', 
      'sunRadius', 
      'color1', 
      'color2', 
      'pointLightIntensity',
      'noiseFrequency', 
      'noiseAmplitude',
      'granulationFrequency',
      'granulationAmplitude',
      'flareIntensity',
      'flareFrequency',
      'prominenceIntensity',
      'prominenceScale',
      'coronaIntensity',
      'coronaFalloff',
      'temperatureVariationIntensity',
      'color3',
      'color4', 
      'noiseMode',
      'noiseMix',
      'noiseIntensity1',
      'noiseIntensity2',
      'bandJitterAmp',
      'bandJitterFreq',
      'decorrelationMix',
      'advectionStrength',
      'triplanarPower',
      'bandCount',
      'sunspotIntensity',
      'sunspotSize', 
      'sunspotSpeed'
    ]
  },
  mouvement: {
    name: 'Mouvement',
    icon: '🌀',
    parameters: [
      'relativeTo',
      'distance',
      'orbitalParent',
      'axisInclination',
      'inclinationArgument',
      'yaw',
      'equatorialTangentialSpeed',
      'synchronousRotation',
      'rocheLimit',
      'tidalStressDirectionX',
      'tidalStressDirectionY',
      'tidalStressDirectionZ',
      'tidalStressAmplitude',
      'tidalHeatingEffect',
      'strongestAttractor',
      'impactorOrbitalParent',
      'normalizedLightCurve',
      'radialVelocity',
      'cameraInclination',
      'cameraAzimuth',
      'lockPosition'
    ]
  },
  temperature: {
    name: 'Température',
    icon: '🌡️',
    parameters: [
      'surfaceTemperatureK',
      'surfaceTemperatureC',
      'coreTemperatureK',
      'coreTemperatureC',
      'luminositySolar',
      'absoluteMagnitude',
      'apparentMagnitude',
      'energyAbsorptionRate',
      'energyRadiationRate',
      'heatingRate',
      'equilibriumTemperature',
      'surfaceThermalCapacity',
      'averageAlbedo',
      'effectiveTemperature'
    ]
  },
  composition: {
    name: 'Composition',
    icon: '⚛️',
    parameters: [
      // Actions sur les Matériaux
      'evaporateAll', 'meltAll', 'freezeAll', 'stabilizePhases', 'sedimentLiquid', 'equalizeGas', 'modifyColors',
      
      // Composition en Matériaux
      'hydrogenMass', 'heliumMass', 'argonMass', 'sulfurDioxideMass', 'oxygenMass', 'carbonMass', 'nitrogenMass', 'siliconMass', 'ironMass', 'waterMass',
      
      // Unités de liaison
      'bondingUnits',
      
      // Affichage des Matériaux
      'displayLayers', 'displayAll',
      
      // Propriétés Cumulatives
      'totalMass', 'totalRadius', 'totalDensity', 'totalVolume', 'radialMassGain',
      
      // Propriétés Physiques Détaillées
      'surfaceGravity', 'escapeVelocity', 'bodyAge', 'massLossRate', 'cumulativeMassLoss', 'resetMassLoss',
      
      // Propriétés Principales (Noyau)
      'coreDensity', 'centralPressure',
      
      // Comparaisons
      'earthSimilarity', 'lifeProbability',
      
      // Champs Magnétiques
      'magneticFieldStrength', 'showMagneticAxis', 'magneticPoleAngle'
    ]
  },
  action: {
    name: 'Action',
    icon: '⚡',
    parameters: []
  }
};

export const parameterDescriptions = {
  // Propriétés principales
  objectName: "Nom de l'objet céleste (ex: Vela Pulsar, Bételgeuse, Soleil).",
  mass: "Masse de l'objet en multiples de la masse solaire (M☉).",
  radius: "Rayon de l'objet en kilomètres, unités astronomiques ou rayons solaires.",
  density: "Densité de l'objet en g/cm³ ou kg/m³.",
  surfaceTemperature: "Température de surface de l'objet en Kelvin (K).",
  luminosity: "Luminosité en multiples de la luminosité solaire (L☉).",
  velocity: "Vitesse de déplacement de l'objet dans l'espace.",
  rotationPeriod: "Période de rotation de l'objet sur lui-même en jours.",
  age: "Âge de l'objet en mégaannées ou gigaannées.",
  surfaceGravityKmDescription: "Gravité à la surface de l'objet en km/s².",
  distanceFromCamera: "Distance entre la caméra et l'objet en unités astronomiques.",
  
  // Section INTERACTIONS
  attractsOthers: "Détermine si cet objet attire gravitationnellement d'autres objets.",
  attractedByOthers: "Détermine si cet objet est attiré par d'autres objets.",
  collisionWithOthers: "Active ou désactive les collisions avec d'autres objets.",
  nonSphericalGravity: "Active une gravité non sphérique pour des effets plus réalistes.",
  
  // Section MAGIE
  invertedGravity: "Inverse l'effet gravitationnel (répulsion au lieu d'attraction).",
  negativeLuminosity: "Crée un effet de luminosité négative (absorption de lumière).",
  
  // Section SIMULATION D'OBJET
  radiusBasedOn: "Détermine sur quoi baser le calcul automatique du rayon.",
  
  // Boutons d'action rapide
  replaceObject: "Remplace l'objet actuel par un autre type d'objet.",
  deleteObject: "Supprime définitivement cet objet de la simulation.",
  automaticOrbit: "Configure automatiquement une orbite stable pour cet objet.",
  zeroVelocity: "Remet la vélocité de l'objet à zéro.",
  
  // Section MOUVEMENT - Paramètres Généraux
  relativeTo: "Définit le référentiel par rapport auquel les mesures sont effectuées (origine, corps céleste, etc.).",
  distance: "Distance de l'objet par rapport au référentiel sélectionné en unités astronomiques.",
  
  // Section PARAMÈTRES ORBITAUX
  orbitalParent: "Affiche le nom du corps céleste autour duquel cet objet orbite, ou 'Aucun' s'il n'y en a pas.",
  
  // Section ROTATION
  axisInclination: "Inclinaison de l'axe de rotation par rapport au plan orbital en degrés.",
  inclinationArgument: "Argument de l'inclinaison, définit l'orientation de l'axe incliné en degrés.",
  yaw: "Rotation autour de l'axe vertical (embardée) en degrés.",
  equatorialTangentialSpeed: "Vitesse tangentielle à l'équateur due à la rotation propre en km/s.",
  synchronousRotation: "Configure une rotation synchrone avec la période orbitale.",
  
  // Section EFFETS MARÉMOTEURS
  rocheLimit: "Limite de Roche - distance minimale avant désintégration par forces de marée en UA.",
  tidalStressDirectionX: "Composante X de la direction du stress marémoteur (vecteur normalisé).",
  tidalStressDirectionY: "Composante Y de la direction du stress marémoteur (vecteur normalisé).",
  tidalStressDirectionZ: "Composante Z de la direction du stress marémoteur (vecteur normalisé).",
  tidalStressAmplitude: "Amplitude du stress marémoteur exercé sur l'objet en GigaNewtons.",
  tidalHeatingEffect: "Effet de chauffage interne dû aux forces de marée en TéraWatts.",
  
  // Section OBJETS IMPACTEURS
  strongestAttractor: "Nom de l'objet exerçant la plus forte attraction gravitationnelle.",
  impactorOrbitalParent: "Parent orbital pour les calculs d'impact et de trajectoire.",
  
  // Section RELATIF À LA CAMÉRA
  normalizedLightCurve: "Courbe de lumière normalisée vue depuis la position de la caméra.",
  radialVelocity: "Vitesse radiale de l'objet par rapport à la caméra en m/s (positive = s'éloigne).",
  cameraInclination: "Inclinaison de la caméra par rapport au plan de référence en degrés.",
  cameraAzimuth: "Azimuth de la caméra dans le plan horizontal en radians.",
  
  // Section ACTIONS
  lockPosition: "Verrouille la position de l'objet pour empêcher tout mouvement.",
  
  // Section TEMPÉRATURE - Propriétés Thermiques
  surfaceTemperatureK: "Température de surface de l'objet en Kelvin, unité de base du système international.",
  surfaceTemperatureC: "Température de surface de l'objet en degrés Celsius, plus familière pour les mesures terrestres.",
  coreTemperatureK: "Température au centre de l'objet en Kelvin, indique l'activité nucléaire interne.",
  coreTemperatureC: "Température au centre de l'objet en degrés Celsius, pour une lecture plus intuitive.",
  luminositySolar: "Luminosité totale émise par l'objet en multiples de la luminosité solaire (L☉).",
  absoluteMagnitude: "Magnitude absolue - luminosité apparente si l'objet était à 10 parsecs de distance.",
  apparentMagnitude: "Magnitude apparente - luminosité observée depuis la Terre ou la position actuelle.",
  
  // Section FLUX D'ÉNERGIE
  energyAbsorptionRate: "Taux d'absorption d'énergie par l'objet en YottaWatts (10²⁴ W).",
  energyRadiationRate: "Taux de rayonnement énergétique émis par l'objet en YottaWatts (10²⁴ W).",
  heatingRate: "Vitesse de changement de température de l'objet en degrés Celsius par année.",
  equilibriumTemperature: "Température d'équilibre thermique où absorption égale émission en °C.",
  surfaceThermalCapacity: "Capacité thermique de surface - énergie nécessaire pour chauffer 1m² de 1°C (MJ/°C/m²).",
  averageAlbedo: "Albédo moyen - fraction de lumière réfléchie par la surface (0 = absorption totale, 1 = réflexion totale).",
  effectiveTemperature: "Température effective calculée à partir de la luminosité totale en Kelvin.",
  
  // === DESCRIPTIONS DES PARAMÈTRES DE COMPOSITION ===
  
  // Actions sur les Matériaux
  evaporateAll: "Évapore instantanément tous les matériaux solides et liquides en gaz.",
  meltAll: "Fait fondre tous les matériaux solides en liquides selon leur point de fusion.",
  freezeAll: "Solidifie instantanément tous les matériaux liquides et gazeux.",
  stabilizePhases: "Équilibre automatiquement les phases des matériaux selon les conditions locales.",
  sedimentLiquid: "Sépare les liquides par densité, les plus lourds coulant vers le centre.",
  equalizeGas: "Répartit uniformément tous les gaz dans l'atmosphère de l'objet.",
  modifyColors: "Ouvre l'interface de modification des couleurs des matériaux.",
  
  // Composition en Matériaux
  hydrogenMass: "Masse d'hydrogène présente dans l'objet, exprimée en masses solaires (M☉).",
  heliumMass: "Masse d'hélium présente dans l'objet, exprimée en masses solaires (M☉).",
  argonMass: "Masse d'argon présente dans l'objet, exprimée en masses solaires (M☉).",
  sulfurDioxideMass: "Masse de dioxyde de soufre présente dans l'objet, exprimée en masses solaires (M☉).",
  oxygenMass: "Masse d'oxygène présente dans l'objet, exprimée en masses solaires (M☉).",
  carbonMass: "Masse de carbone présente dans l'objet, exprimée en masses solaires (M☉).",
  nitrogenMass: "Masse d'azote présente dans l'objet, exprimée en masses solaires (M☉).",
  siliconMass: "Masse de silicium présente dans l'objet, exprimée en masses solaires (M☉).",
  ironMass: "Masse de fer présente dans l'objet, exprimée en masses solaires (M☉).",
  waterMass: "Masse d'eau (H₂O) présente dans l'objet, exprimée en masses solaires (M☉).",
  
  // Unités de liaison
  bondingUnits: "Active ou désactive l'affichage des liaisons chimiques entre les éléments.",
  
  // Affichage des Matériaux
  displayLayers: "Affiche la composition par couches concentriques de l'objet.",
  displayAll: "Affiche tous les matériaux simultanément avec transparence.",
  
  // Propriétés Cumulatives
  totalMass: "Masse totale de l'objet incluant tous les matériaux, exprimée en masses solaires (M☉).",
  totalRadius: "Rayon total de l'objet incluant toutes les couches, exprimé en rayons solaires (R☉).",
  totalDensity: "Densité moyenne de l'objet calculée à partir de la masse et du volume total (g/cm³).",
  totalVolume: "Volume total de l'objet incluant toutes les couches, exprimé en volumes solaires (V☉).",
  radialMassGain: "Pourcentage de variation de masse par unité de rayon depuis le centre.",
  
  // Propriétés Physiques Détaillées
  surfaceGravityMDescription: "Accélération gravitationnelle à la surface de l'objet en mètres par seconde carrée (m/s²).",
  escapeVelocity: "Vitesse minimale nécessaire pour échapper à l'attraction gravitationnelle (km/s).",
  bodyAge: "Âge estimé de l'objet céleste depuis sa formation, exprimé en milliards d'années.",
  massLossRate: "Taux de perte de masse par évaporation ou éjection, exprimé en masses solaires par an (M☉/an).",
  cumulativeMassLoss: "Masse totale perdue depuis la formation de l'objet, exprimée en masses solaires (M☉).",
  resetMassLoss: "Remet à zéro les compteurs de perte de masse cumulative.",
  
  // Propriétés Principales (Noyau)
  coreDensity: "Densité au centre de l'objet, généralement la plus élevée (g/cm³).",
  centralPressure: "Pression au centre de l'objet due au poids des couches supérieures (GPa).",
  
  // Comparaisons
  earthSimilarity: "Pourcentage de similitude avec la Terre basé sur masse, rayon, composition et conditions.",
  lifeProbability: "Probabilité estimée que l'objet puisse abriter la vie basée sur ses caractéristiques.",
  
  // Champs Magnétiques
  magneticFieldStrength: "Intensité du champ magnétique de l'objet mesurée en microTeslas (µT).",
  showMagneticAxis: "Active ou désactive l'affichage visuel de l'axe du champ magnétique.",
  magneticPoleAngle: "Angle entre l'axe de rotation et l'axe magnétique de l'objet en degrés (°).",
  
  // Paramètres visuels existants
  emissiveIntensity: "Contrôle la luminosité émise par l'étoile. Plus la valeur est élevée, plus l'étoile brille.",
  sunRadius: "Détermine la taille visuelle de l'étoile. Affecte l'apparence générale et l'échelle.",
  noiseFrequency: "Contrôle la fréquence des variations de surface. Plus élevé = plus de détails fins.",
  noiseAmplitude: "Intensité des variations de surface. Plus élevé = surface plus rugueuse.",
  pointLightIntensity: "Puissance de l'éclairage émis par l'étoile sur les objets environnants.",
  sunspotIntensity: "Intensité des taches sombres à la surface de l'étoile.",
  sunspotSize: "Taille des taches solaires. Plus petit = taches plus fines.",
  sunspotSpeed: "Vitesse de mouvement des taches solaires à la surface.",
  color1: "Couleur principale de l'étoile, généralement la couleur dominante.",
  color2: "Couleur secondaire utilisée pour les variations et les détails.",
  
  // Nouveaux paramètres stellaires avancés
  granulationFrequency: "Fréquence de la granulation solaire. Contrôle la finesse des cellules de convection.",
  granulationAmplitude: "Intensité de la granulation. Plus élevé = contraste plus marqué entre les cellules.",
  flareIntensity: "Intensité des éruptions solaires. Contrôle la luminosité des flares.",
  flareFrequency: "Fréquence d'apparition des éruptions solaires dans le temps.",
  prominenceIntensity: "Intensité des protubérances solaires visibles au limbe de l'étoile.",
  prominenceScale: "Échelle des protubérances. Plus grand = structures plus étendues.",
  coronaIntensity: "Intensité de la couronne solaire visible autour de l'étoile.",
  coronaFalloff: "Vitesse d'atténuation de la couronne avec la distance.",
  temperatureVariationIntensity: "Amplitude des variations de température de surface.",
  color3: "Couleur tertiaire pour les zones chaudes et les éruptions solaires.",
  color4: "Couleur quaternaire pour les zones froides et les taches solaires.",
  noiseMode: "Sélectionne le type de bruit à utiliser : Bruit 1 (original), Bruit 2 (avancé), ou Combiné (mélange des deux).",
  noiseMix: "Contrôle le mélange entre les deux types de bruit quand le mode 'Combiné' est sélectionné (0 = Bruit 1, 1 = Bruit 2).",
  noiseIntensity1: "Intensité du premier type de bruit. Affecte la force des effets du bruit original.",
  noiseIntensity2: "Intensité du second type de bruit. Affecte la force des effets du bruit avancé.",
  bandCount: "Expérimental: quantisation latitudinale en bandes. Non utilisé actuellement pour éviter les artefacts; conservé pour une reprise ultérieure.",
  bandJitterAmp: "Amplitude du jitter latitudinal continu. Des valeurs élevées augmentent la variabilité; 0.05–0.15 recommandé.",
  bandJitterFreq: "Fréquence du jitter latitudinal dans le temps. 0 = statique; 0.05–0.20 recommandé.",
  decorrelationMix: "Mélange entre deux champs d’advection (0 = champ A, 1 = champ B). Aide à réduire les motifs répétitifs.",
  advectionStrength: "Force de l’advection appliquée au flux (0–0.8). Trop élevé déforme excessivement; 0.20–0.35 recommandé.",
  triplanarPower: "Puissance du poids tri-planar (1–6). Plus élevé durcit le blending; 2.0 équilibre lissage et détails."
};