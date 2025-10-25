# Étape 2 — Multi-couches FBM, rotation différentielle et micro‑granulation

Objectif: enrichir la surface stellaire en combinant plusieurs couches de bruit (FBM), une rotation différentielle latitudinale et une micro‑granulation à haute fréquence.

## Changements clés

- Ajout de nouvelles uniforms dans `fragment.glsl` pour contrôler les couches, vitesses et granulation:
  - Couches principales: `uLayerScale0/1/2`, `uLayerAmp0/1/2`, `uLayerSpeed0/1/2`
  - Rotation différentielle: `uRotEquator`, `uRotPole`, `uLatFlowContrast`
  - Micro‑granulation: `uGranularityScale`, `uGranularityAmp`, `uGranularityMix`
- Fonctions de rotation: `rotY(angle)` et `rotZ(angle)` pour décaler les coordonnées en fonction du temps et de la latitude (simule cisaillement).
- Calcul du `fbm` revisité: combinaison pondérée des 3 couches + couche micro pour un relief fin.
- Conservation des effets Étape 1 (limb darkening, rim glow) afin d’obtenir un rendu lisible et énergique.

## Valeurs par défaut (côté React)

Définies dans `src/components/CelestialBody.jsx` via `shaderMaterial` et surchargeables par `props`:

- Échelles des couches: `2.0`, `4.0`, `8.0`
- Amplitudes: `0.55`, `0.30`, `0.15`
- Vitesses: `0.06`, `0.04`, `0.02`
- Rotation: `uRotEquator=1.0`, `uRotPole=0.6`, `uLatFlowContrast=0.7`
- Micro‑granulation: `uGranularityScale=18.0`, `uGranularityAmp=0.15`, `uGranularityMix=0.40`

Ces valeurs produisent une différence visible, mais ajustez l’amplitude/échelle pour des motifs plus contrastés.

## Câblage React (CelestialBody.jsx)

- Les uniforms Étape 2 sont mappés depuis `props` vers le matériau:
  - Exemple: `const uLayerScale1 = shaderProps?.layerScale1 ?? (uScale * 2.0);`
- Passage au composant `<customShaderMaterial ... />` pour synchroniser GLSL:
  - `uLayerScale0/1/2`, `uLayerAmp0/1/2`, `uLayerSpeed0/1/2`
  - `uRotEquator`, `uRotPole`, `uLatFlowContrast`
  - `uGranularityScale`, `uGranularityAmp`, `uGranularityMix`

## Points d’ajustement recommandés

- Contraste structurel: augmentez `uLayerAmp0` et `uLayerAmp1` (ex: `0.7` et `0.4`) pour accentuer les cellules.
- Taille des motifs: jouez sur `uLayerScale0..2` (multipliez par `uScale`) pour varier la granularité globale.
- Dynamique latitudinale: différenciez davantage `uRotEquator` vs `uRotPole` pour ressentir l’étirement.
- Finesse: augmentez `uGranularityScale` (ex: `24–32`) et ajustez `uGranularityMix` pour une texture plus « croquante ».

### Correctifs contre les stries (appliqués)
- Remplacement du twist dépendant de la latitude et des translations z par un "domain warping" isotrope + rotation Y.
- Les coordonnées de bruit utilisent `normalize(vPosition)` (dir) warpé, ce qui évite les coutures de projection et réduit les motifs lamellaires.
- La micro‑granulation échantillonne sur `base + warp * 2.0` au lieu de `vPosition + time*z`, pour conserver une isotropie.

### Presets pour un rendu plus "solaire"
- `uLayerAmp0=0.7`, `uLayerAmp1=0.4`, `uLayerAmp2=0.18`
- `uLayerScale0=2.0*uScale`, `uLayerScale1=4.0*uScale`, `uLayerScale2=7.0*uScale`
- `uRotEquator=1.1`, `uRotPole=0.5`, `uLatFlowContrast=0.8`
- `uGranularityScale=24`, `uGranularityAmp=0.18`, `uGranularityMix=0.5`

## Vérifications

- Aucune erreur dans le navigateur et compilation des shaders OK.
- La surface présente des motifs plus variés, avec un léger cisaillement différentiel.

## Prochaines étapes (proposées)

- Ajouter flux convectifs animés (déformations advectives des coordonnées).
- Introduire zones actives (plages brillantes) modulées par un masque à long terme.
- Paramétrer via le panneau de contrôle pour exploration en temps réel (Leva/Zustand).