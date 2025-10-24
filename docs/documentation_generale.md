# Documentation Générale - Mon Soleil V-0.6

## Vue d'ensemble

**Mon Soleil** est une application de simulation interactive de corps célestes développée avec React et Three.js. Elle permet aux utilisateurs de visualiser, manipuler et configurer des étoiles dans un environnement 3D immersif.

## Architecture de l'Application

### Structure des Dossiers

```
src/
├── components/          # Composants React principaux
│   ├── CelestialBody.jsx    # Rendu 3D des corps célestes
│   ├── Scene.jsx            # Scène 3D principale
│   ├── CustomParameterPanel.jsx  # Panneau de configuration
│   ├── EditorPanel.jsx      # Wrapper du panneau d'édition
│   └── ui/                  # Composants d'interface utilisateur
├── context/             # Contextes React
│   └── Camera.jsx           # Gestion de la caméra
├── data/               # Données de configuration
│   └── solarSystemData.js   # Données des corps célestes
├── state/              # Gestion d'état globale
│   └── store.js            # Store Zustand
├── config/             # Configuration de l'interface
│   └── uiConfig.js         # Configuration des paramètres UI
├── App.jsx             # Composant racine
└── main.jsx            # Point d'entrée de l'application
```

## Composants Principaux

### 1. App.jsx
- **Rôle** : Composant racine de l'application
- **Fonctionnalités** :
  - Configuration de la scène 3D avec React Three Fiber
  - Gestion des effets post-processing (Bloom, Outline)
  - Intégration du panneau d'édition

### 2. Scene.jsx
- **Rôle** : Orchestration de la scène 3D
- **Fonctionnalités** :
  - Rendu des corps célestes
  - Gestion des interactions utilisateur (clic, double-clic)
  - Intégration du contexte caméra

### 3. CelestialBody.jsx
- **Rôle** : Rendu individuel des corps célestes
- **Fonctionnalités** :
  - Shaders personnalisés pour l'apparence des étoiles
  - Animation des taches solaires (sunspots)
  - Gestion des interactions (sélection, survol)
  - Éclairage dynamique

### 4. CustomParameterPanel.jsx
- **Rôle** : Interface de configuration des corps célestes
- **Fonctionnalités** :
  - Panneau redimensionnable et déplaçable
  - Catégorisation des paramètres (Visuels, Mouvement, Température, etc.)
  - Contrôles spécialisés (sliders, couleurs, boutons)
  - Système d'aide contextuelle

### 5. Camera.jsx (Context)
- **Rôle** : Gestion centralisée de la caméra
- **Fonctionnalités** :
  - Focus automatique sur les corps célestes
  - Animations de transition fluides
  - Réinitialisation de la vue

## Gestion d'État

### Store Zustand (store.js)
L'application utilise Zustand pour la gestion d'état globale :

**État Principal :**
- `celestialBodies` : Liste des corps célestes
- `selectedBodyId` : ID du corps sélectionné
- `time` : Temps de simulation

**Actions Principales :**
- `updateBodyProperty()` : Modification des propriétés
- `addCelestialBody()` : Ajout de nouveaux corps
- `removeCelestialBody()` : Suppression de corps
- `setSelectedBodyId()` : Sélection d'un corps

## Système de Rendu 3D

### Technologies Utilisées
- **React Three Fiber** : Intégration de Three.js avec React
- **Three.js** : Moteur de rendu 3D
- **Shaders personnalisés** : Rendu réaliste des étoiles

### Effets Visuels
- **Bloom** : Effet de halo lumineux
- **Outline** : Contour de sélection
- **Noise FBM** : Texture procédurale des surfaces
- **Animation temporelle** : Mouvement des taches solaires

## Configuration des Paramètres

### Types de Contrôles
- **Range** : Sliders pour valeurs numériques
- **Color** : Sélecteurs de couleur
- **Select** : Listes déroulantes
- **Checkbox** : Cases à cocher
- **Button/Action** : Boutons d'action

### Catégories de Paramètres
1. **Aperçu** : Propriétés générales (masse, rayon, densité)
2. **Visuels** : Apparence (couleurs, intensité, effets)
3. **Mouvement** : Dynamique et orbites
4. **Température** : Propriétés thermiques
5. **Composition** : Matériaux et structure interne
6. **Action** : Outils d'interaction

## Données des Corps Célestes

### Structure des Données (solarSystemData.js)
Chaque corps céleste contient :
- **Identité** : id, name
- **Position** : position, velocity
- **Propriétés physiques** : mass, sunRadius
- **Apparence** : color1, color2, emissiveIntensity
- **Éclairage** : pointLightIntensity
- **Effets** : noiseFrequency, sunspotIntensity, etc.

## Interactions Utilisateur

### Navigation
- **Clic** : Sélection d'un corps céleste
- **Double-clic** : Focus automatique sur le corps
- **Molette** : Zoom avant/arrière
- **Glisser** : Rotation de la caméra

### Configuration
- **Panneau de paramètres** : Modification en temps réel
- **Catégories** : Organisation logique des propriétés
- **Aide contextuelle** : Descriptions des paramètres

## Performance et Optimisation

### Optimisations Implémentées
- **Mémorisation React** : Évite les recalculs inutiles
- **Sélecteurs Zustand** : Abonnements optimisés
- **Shaders GPU** : Calculs sur carte graphique
- **Gestion des événements** : Capture de pointeur efficace

### Bonnes Pratiques
- Utilisation de `useCallback` pour les gestionnaires d'événements
- Mémorisation des objets complexes avec `useMemo`
- Nettoyage des écouteurs d'événements
- Limitation des re-rendus avec des sélecteurs précis

## Installation et Développement

### Prérequis
- Node.js (version 16+)
- npm ou yarn

### Commandes de Développement
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Construction pour la production
npm run build

# Prévisualisation de la build
npm run preview
```

### Technologies Principales
- **React 18** : Framework frontend
- **Vite** : Outil de build et serveur de développement
- **Three.js** : Moteur 3D
- **Zustand** : Gestion d'état
- **React Three Fiber** : Intégration React/Three.js

## Extensibilité

### Ajout de Nouveaux Paramètres
1. Définir le paramètre dans `uiConfig.js`
2. Ajouter la logique dans `CustomParameterPanel.jsx`
3. Mettre à jour les données dans `solarSystemData.js`

### Nouveaux Types de Corps Célestes
1. Étendre la structure de données
2. Créer de nouveaux shaders si nécessaire
3. Adapter les contrôles d'interface

### Nouvelles Fonctionnalités
- Système de physique avancé
- Simulation temporelle
- Export/import de configurations
- Mode multi-utilisateur

## Dépannage

### Problèmes Courants
1. **Soleil invisible** : Vérifier `sunRadius` et position de la caméra
2. **Erreurs HMR** : Redémarrer le serveur de développement
3. **Performance** : Réduire le nombre de corps ou la complexité des shaders

### Logs et Débogage
- Console du navigateur pour les erreurs JavaScript
- Outils de développement React pour l'état des composants
- Three.js Inspector pour le débogage 3D

## Contribution

### Standards de Code
- Utilisation d'ESLint pour la cohérence
- Commentaires JSDoc pour les fonctions importantes
- Nommage descriptif des variables et fonctions
- Structure modulaire et réutilisable

### Tests
- Tests unitaires pour la logique métier
- Tests d'intégration pour les interactions
- Tests visuels pour le rendu 3D

---

*Cette documentation est maintenue à jour avec l'évolution de l'application Mon Soleil.*