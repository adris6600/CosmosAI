// src/shaders/noiseVertex.glsl
varying vec3 vPosition;
varying vec3 vWorldNormal; // Renommé pour plus de clarté : normale en espace monde
varying vec3 vEyeVector;

void main() {
    // Calcule la position du sommet dans l'espace monde 
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Passe la position du modèle (qui est déjà en espace objet local) au fragment shader 
    vPosition = position;
    
    // Calcule et passe la normale en espace monde. 
    // mat3(modelMatrix) extrait la partie rotation/échelle pour transformer correctement la normale. 
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    
    // Le vecteur de vue reste le même (monde -> caméra) 
    vEyeVector = normalize(cameraPosition - worldPosition.xyz);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}