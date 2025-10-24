precision highp float;

uniform samplerCube uPerlin;

// Déclaration des varyings reçus. Les deux doivent être ici.
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // Échantillonne la texture en utilisant la position du sommet.
    vec3 noiseColor = textureCube(uPerlin, normalize(vPosition)).rgb;
    
    gl_FragColor = vec4(noiseColor, 1.0);
}
