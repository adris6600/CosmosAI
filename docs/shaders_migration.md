# Migration des Shaders – CosmosAI vers Mon Soleil

Ce document décrit la migration complète des anciens shaders vers le nouveau système basé sur `vertex.glsl` et `fragment.glsl`, ainsi que les impacts, la compatibilité et les bonnes pratiques.

## Résumé
- Suppression des anciens shaders: `src/shaders/noise.glsl`, `src/shaders/noise2.glsl`, `src/shaders/noiseSelector.glsl` et tous les shaders sous `src/shaders/sun/`.
- Ajout et intégration des nouveaux shaders: `src/shaders/vertex.glsl` et `src/shaders/fragment.glsl`.
- Mise à jour du matériau personnalisé dans `src/components/CelestialBody.jsx` pour utiliser les nouveaux uniforms.
- Vérification visuelle réalisée via le serveur de développement: pas d’erreur navigateur, rendu OK.

## Nouveaux Fichiers
- `src/shaders/vertex.glsl`: Passe la position du sommet au fragment shader via `vPosition`.
- `src/shaders/fragment.glsl`: Implémente `snoise` (bruit Simplex), `fbm`, et une fonction `brightnessToColor` pour un rendu de type « feu/étoile ».

## Uniforms et Compatibilité
### Nouveaux uniforms
- `time` (float): Temps d’animation.
- `uScale` (float): Échelle spatiale du bruit.
- `uOctaves` (float): Nombre d’octaves FBM (max 20, entier arrondi).
- `uIntensity` (float): Contraste/éclat en exposant.

### Mapping depuis l’architecture existante
- `noiseFrequency` → `uScale`
- `emissiveIntensity` → `uIntensity`
- `granulationFrequency` (valeur arrondie et bornée) → `uOctaves`

Ces correspondances sont appliquées dans `CelestialBody.jsx` pour conserver la compatibilité avec les props existantes et l’UI.

## Composant mis à jour
- `src/components/CelestialBody.jsx`:
  - Remplacement du matériau inline par `shaderMaterial({ time, uScale, uOctaves, uIntensity }, vertexShader, fragmentShader)`.
  - Nettoyage des imports obsolètes (`noise.glsl`, `noise2.glsl`, `noiseSelector.glsl`).
  - Passage des uniforms via JSX: `<customShaderMaterial time={time} uScale={uScale} uOctaves={uOctaves} uIntensity={uIntensity} />`.

## Fichiers supprimés
- `src/shaders/noise.glsl`
- `src/shaders/noise2.glsl`
- `src/shaders/noiseSelector.glsl`
- `src/shaders/sun/atmosphereFragment.glsl`
- `src/shaders/sun/atmosphereVertex.glsl`
- `src/shaders/sun/fragment.glsl`
- `src/shaders/sun/vertex.glsl`

## Bonnes pratiques respectées
- Uniforms minimalistes, clairement nommés.
- Matériau déclaré hors composant pour la performance.
- Imports explicites des shaders (fichiers dédiés). 
- Commentaires concis dans les shaders.

## Vérification et Tests
- Le serveur de dev (`npm run dev`) tourne sur `http://localhost:5173/`.
- Rendu visuel: aucune erreur console navigateur, rafraîchissement HMR correct.
- Ajuster interactivement: 
  - `noiseFrequency` pour la densité des motifs → `uScale`.
  - `granulationFrequency` pour la complexité → `uOctaves`.
  - `emissiveIntensity` pour le contraste → `uIntensity`.

## Points d’attention / limitations
- Les anciens paramètres spécifiques (taches solaires, flares, corona, etc.) ne sont plus pris en charge par ce shader simplifié. Si nécessaire, ils devront être réintroduits dans `fragment.glsl` avec des uniforms dédiés et une logique FBM adaptée.
- `uOctaves` est borné à `[1, 20]` et arrondi.

## Étapes de migration (checklist)
1. Intégrer `vertex.glsl` et `fragment.glsl` dans `src/shaders/`.
2. Mettre à jour `CelestialBody.jsx` pour le nouveau `shaderMaterial`.
3. Supprimer les imports GLSL obsolètes.
4. Supprimer les fichiers shaders obsolètes.
5. Vérifier visuellement et ajuster les paramètres UI.

## Historique
- Migration effectuée à la date de la modification, en lien avec la demande d’alignement sur les shaders de CosmosAI.