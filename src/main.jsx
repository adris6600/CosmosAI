// src/main.jsx

// Importe React pour la création de composants.
import React from 'react'
// Importe ReactDOM pour le rendu de l'application React dans le DOM.
import ReactDOM from 'react-dom/client'
// Importe le composant racine de l'application.
import App from './App.jsx'
// Importe les styles globaux de l'application.
import './assets/styles/global.css'
// Importe les styles spécifiques au panneau personnalisé.
import './assets/styles/CustomPanel.css'

/**
 * Point d'entrée principal de l'application React.
 * Il initialise l'application en rendant le composant <App /> dans l'élément DOM avec l'ID 'root'.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    // React.StrictMode active des vérifications supplémentaires et des avertissements
    // pour les problèmes potentiels dans une application React.
    <React.StrictMode>
        {/* Le composant racine de l'application. */}
        <App />
    </React.StrictMode>
)
