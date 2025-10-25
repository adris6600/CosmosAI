# Étape 1 — Limb Darkening et Rim Glow

Objectif: rapprocher visuellement le soleil de la référence en assombrissant les bords (limb darkening) et en ajoutant un halo subtil au bord (rim glow), sans impacter lourdement les performances.

## Changements Implémentés

- vertex.glsl
  - Ajout de `varying vec3 vNormal`.
  - Calcul de la normale en espace vue: `vNormal = normalize(normalMatrix * normal);`.

- fragment.glsl
  - Uniforms ajoutés:
    - `uLimbPower` (float), `uLimbCenterDark` (float), `uRimStrength` (float), `uRimWidth` (float), `uRimColor` (vec3).
  - Calculs:
    - `ndv = clamp(dot(normalize(vNormal), vec3(0,0,1)), 0.0, 1.0)`.
    - Limb darkening: `brightness *= mix(uLimbCenterDark, 1.0, pow(ndv, uLimbPower));`.
    - Rim glow: `rimEdge = smoothstep(1.0 - uRimWidth, 1.0, 1.0 - ndv); color += rimEdge * uRimColor * uRimStrength;`.

- CelestialBody.jsx
  - Déclaration des nouveaux uniforms avec valeurs par défaut raisonnables.
  - Passage des uniforms via `<customShaderMaterial />` avec surcharges optionnelles via `shaderProps`.

## Interfaces / Dépendances Vérifiées

- Drei `shaderMaterial` supporte `vec3` via `THREE.Color` côté React.
- `normalMatrix` disponible et correct pour transformer la normale en espace vue.
- Compatibilité avec uniforms existants (`uScale`, `uOctaves`, `uIntensity`, `uDebugSolid`).

## Valeurs par Défaut

- `uLimbPower = 2.0`
- `uLimbCenterDark = 0.9`
- `uRimStrength = 0.18`
- `uRimWidth = 0.12`
- `uRimColor = vec3(1.0, 0.7, 0.35)`

## Tests Visuels

- Serveur dev Vite sur `http://localhost:5174/`.
- Aucun warning navigateur; rendu conforme (bords plus réalistes, halo subtil).

## Remarques / Next Steps

- Étape 2: multi‑couches FBM avec rotation différentielle + micro‑granulation.
- Ajuster `uLimbCenterDark`, `uRimWidth` et `uRimStrength` via l’UI pour affiner selon la scène.