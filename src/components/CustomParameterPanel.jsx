// Imports React et hooks nécessaires pour la gestion d'état et des références
import React, { useState } from 'react';
// Import du store Zustand pour la gestion globale de l'état
import { useStore } from '../state/store.js';
// Imports des composants UI spécialisés pour différents types de paramètres
import ParameterSlider from './ui/ParameterSlider';
import ParameterButton from './ui/ParameterButton';
import ParameterAction from './ui/ParameterAction';
import ParameterSelect from './ui/ParameterSelect';
import ParameterCheckbox from './ui/ParameterCheckbox';
import ParameterText from './ui/ParameterText';
import ParameterColor from './ui/ParameterColor';
import SelectedBodySummary from './SelectedBodySummary';
// Import de la configuration des paramètres UI
import { paramConfig, categories, parameterDescriptions } from '../config/uiConfig.js';
// Import du hook personnalisé pour le redimensionnement et le déplacement
import { useResizableAndDraggablePanel } from '../hooks/useResizableAndDraggablePanel.js';

/**
 * Composant CustomParameterPanel - Panneau de configuration interactif et redimensionnable
 * Permet de modifier les propriétés des corps célestes sélectionnés
 * Fonctionnalités : redimensionnement, déplacement, catégorisation des paramètres
 */
export default function CustomParameterPanel() {
  // États pour l'interface utilisateur
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState('visuels');
  const [parameterHelp, setParameterHelp] = useState({});
  
  // Initialisation du hook pour le redimensionnement et le déplacement (préparatoire - non actif)
  const { 
    panelRef: newPanelRef, 
    panelStyle: newPanelStyle, 
    handleResizeMouseDown: newHandleResizeMouseDown, 
    handleDragMouseDown: newHandleDragMouseDown 
  } = useResizableAndDraggablePanel({
    initialSize: { width: 320, height: 600 },
    initialPosition: { x: 20, y: 20 },
    minSize: { width: 280, height: 400 }
  });
  
  // SÉLECTEUR OPTIMISÉ - Le composant ne se met à jour que si l'objet sélectionné lui-même change.
  const selectedBody = useStore((state) => 
    state.celestialBodies.find(body => body.id === state.selectedBodyId)
  );
  
  // Actions du store pour modifier les corps célestes
  const updateBodyProperty = useStore((state) => state.updateBodyProperty);
  const addCelestialBody = useStore((state) => state.addCelestialBody);
  const removeCelestialBody = useStore((state) => state.removeCelestialBody);



  /**
   * Fonction pour rendre les contrôles de paramètres selon leur type
   * @param {string} paramName - Nom du paramètre
   * @param {Object} selectedBody - Corps céleste sélectionné
   * @returns {JSX.Element|null} - Composant de contrôle approprié
   */
  const renderParameterControl = (paramName, selectedBody) => {

    const config = paramConfig[paramName];
    if (!config) return null;

    // Rendu des différents types de contrôles selon la configuration
    if (config.type === 'button') {
      return (
        <ParameterButton
          key={paramName}
          label={config.label}
          onClick={() => handleActionButton(config.action, selectedBody)}
          isDelete={config.action === 'delete'}
        />
      );
    }

    if (config.type === 'action') {
      return (
        <ParameterAction
          key={paramName}
          label={config.label}
          onClick={() => handleActionButton(paramName, selectedBody)}
        />
      );
    }

    if (config.type === 'select') {
      return (
        <ParameterSelect
          key={paramName}
          label={config.label}
          value={selectedBody[paramName] || config.options[0]}
          options={config.options}
          onChange={(value) => updateBodyProperty(selectedBody.id, paramName, value)}
          onHelpClick={() => toggleParameterHelp(paramName)}
          helpVisible={parameterHelp[paramName]}
          helpText={parameterDescriptions[paramName]}
        />
      );
    }

    if (config.type === 'checkbox') {
      return (
        <ParameterCheckbox
          key={paramName}
          label={config.label}
          checked={selectedBody[paramName] || false}
          onChange={(value) => updateBodyProperty(selectedBody.id, paramName, value)}
          onHelpClick={() => toggleParameterHelp(paramName)}
          helpVisible={parameterHelp[paramName]}
          helpText={parameterDescriptions[paramName]}
        />
      );
    }

    if (config.type === 'text') {
      return (
        <ParameterText
          key={paramName}
          label={config.label}
          value={selectedBody[paramName] || ''}
          onChange={(value) => updateBodyProperty(selectedBody.id, paramName, value)}
          onHelpClick={() => toggleParameterHelp(paramName)}
          helpVisible={parameterHelp[paramName]}
          helpText={parameterDescriptions[paramName]}
        />
      );
    }

    // Contrôles de plage (sliders)
    if (config.type === 'range') {
      return (
        <ParameterSlider
          key={paramName}
          label={config.label}
          value={selectedBody[paramName] || config.min}
          min={config.min}
          max={config.max}
          step={config.step}
          onChange={(value) => updateBodyProperty(selectedBody.id, paramName, value)}
          onHelpClick={() => toggleParameterHelp(paramName)}
          helpVisible={parameterHelp[paramName]}
          helpText={parameterDescriptions[paramName]}
        />
      );
    }

    // Contrôles de couleur
    if (config.type === 'color') {
      return (
        <ParameterColor
          key={paramName}
          label={config.label}
          value={selectedBody[paramName] || '#ffffff'}
          onChange={(value) => updateBodyProperty(selectedBody.id, paramName, value)}
          onHelpClick={() => toggleParameterHelp(paramName)}
          helpVisible={parameterHelp[paramName]}
          helpText={parameterDescriptions[paramName]}
        />
      );
    }

    return null;
  };

  /**
   * Fonction pour basculer l'affichage de l'aide d'un paramètre
   * @param {string} paramName - Nom du paramètre
   */
  const toggleParameterHelp = (paramName) => {
    setParameterHelp(prev => ({
      ...prev,
      [paramName]: !prev[paramName]
    }));
  };

  /**
   * Gestionnaire pour les boutons d'action
   * @param {string} action - Type d'action à exécuter
   * @param {Object} selectedBody - Corps céleste sélectionné
   */
  const handleActionButton = (action, selectedBody) => {
    switch (action) {
      case 'replace':
        // Logique pour remplacer l'objet
        console.log('Remplacer l\'objet:', selectedBody.name);
        // TODO: Implémenter la logique de remplacement
        break;
      case 'delete':
        // Utiliser la fonction existante de suppression
        if (selectedBody) {
          removeCelestialBody(selectedBody.id);
        }
        break;
      case 'orbit':
        // Logique pour orbite automatique
        console.log('Orbite automatique pour:', selectedBody.name);
        // TODO: Implémenter la logique d'orbite automatique
        break;
      case 'zeroVel':
        // Remettre la vélocité à zéro
        if (selectedBody) {
          updateBodyProperty(selectedBody.id, 'velocity', [0, 0, 0]);
        }
        break;
      case 'synchronousRotation':
        // Configurer une rotation synchrone
        if (selectedBody) {
          console.log('Configuration rotation synchrone pour:', selectedBody.name);
          // TODO: Implémenter la logique de rotation synchrone
          // Calculer la période de rotation basée sur la période orbitale
          // updateBodyProperty(selectedBody.id, 'rotationPeriod', orbitalPeriod);
        }
        break;
      
      // Actions de composition - Gestion des états de la matière
      case 'evaporateAll':
        if (selectedBody) {
          console.log('Évaporation de tous les matériaux pour:', selectedBody.name);
          // TODO: Implémenter la logique d'évaporation complète
        }
        break;
      case 'meltAll':
        if (selectedBody) {
          console.log('Fusion de tous les matériaux pour:', selectedBody.name);
          // TODO: Implémenter la logique de fusion complète
        }
        break;
      case 'freezeAll':
        if (selectedBody) {
          console.log('Congélation de tous les matériaux pour:', selectedBody.name);
          // TODO: Implémenter la logique de congélation complète
        }
        break;
      case 'stabilizePhases':
        if (selectedBody) {
          console.log('Stabilisation des phases pour:', selectedBody.name);
          // TODO: Implémenter la logique de stabilisation des phases
        }
        break;
      case 'sedimentLiquid':
        if (selectedBody) {
          console.log('Sédimentation des liquides pour:', selectedBody.name);
          // TODO: Implémenter la logique de sédimentation
        }
        break;
      case 'equalizeGas':
        if (selectedBody) {
          console.log('Égalisation des gaz pour:', selectedBody.name);
          // TODO: Implémenter la logique d'égalisation des gaz
        }
        break;
      case 'modifyColors':
        if (selectedBody) {
          console.log('Modification des couleurs pour:', selectedBody.name);
          // TODO: Implémenter l'interface de modification des couleurs
        }
        break;
      case 'displayLayers':
        if (selectedBody) {
          console.log('Affichage par couches pour:', selectedBody.name);
          // TODO: Implémenter l'affichage par couches
        }
        break;
      case 'displayAll':
        if (selectedBody) {
          console.log('Affichage de tous les matériaux pour:', selectedBody.name);
          // TODO: Implémenter l'affichage complet
        }
        break;
      case 'resetMassLoss':
        if (selectedBody) {
          console.log('Réinitialisation de la perte de masse pour:', selectedBody.name);
          // TODO: Implémenter la réinitialisation des compteurs de perte de masse
          // updateBodyProperty(selectedBody.id, 'cumulativeMassLoss', 0);
        }
        break;
      
      default:
        console.log('Action non reconnue:', action);
    }
  };





  const headerStyle = {
    fontSize: '16px',
    fontWeight: '600',
    padding: '12px 16px',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(255, 255, 255, 0.05)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'move',
    margin: '0',
    userSelect: 'none',
    touchAction: 'none'
  };

  const contentStyle = {
    padding: '16px',
    height: 'calc(100% - 50px)',
    overflowY: 'auto',
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '6px',
    padding: '6px 12px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    marginBottom: '10px',
    width: '100%',
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    padding: '3px 6px',
    color: 'white',
    fontSize: '11px',
    width: '100%',
    marginTop: '3px',
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const controlGroupStyle = {
    marginBottom: '8px',
    padding: '6px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const helpButtonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    fontSize: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4px',
  };

  const helpTextStyle = {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '4px',
    padding: '4px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
    lineHeight: '1.3',
  };

  const categoryButtonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '8px 12px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    margin: '2px',
    flex: '1',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  };

  const activeCategoryButtonStyle = {
    ...categoryButtonStyle,
    background: 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  };

  const toggleButtonStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  };

  const resizeHandleStyle = {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.3)',
    transition: 'background 0.2s ease',
  };

  return (
    <>
      <button style={toggleButtonStyle} onClick={() => setIsPanelVisible(!isPanelVisible)} onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}>
        {isPanelVisible ? '✕' : '⚙️'}
      </button>

      {isPanelVisible && (
        <div ref={newPanelRef} style={newPanelStyle}>
          <div style={{ ...resizeHandleStyle, top: '-2px', left: '8px', right: '8px', height: '4px', cursor: 'ns-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'top')} />
          <div style={{ ...resizeHandleStyle, bottom: '-2px', left: '8px', right: '8px', height: '4px', cursor: 'ns-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'bottom')} />
          <div style={{ ...resizeHandleStyle, left: '-2px', top: '8px', bottom: '8px', width: '4px', cursor: 'ew-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'left')} />
          <div style={{ ...resizeHandleStyle, right: '-2px', top: '8px', bottom: '8px', width: '4px', cursor: 'ew-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'right')} />
          <div style={{ ...resizeHandleStyle, left: '-2px', top: '-2px', width: '8px', height: '8px', cursor: 'nw-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'top left')} />
          <div style={{ ...resizeHandleStyle, right: '-2px', top: '-2px', width: '8px', height: '8px', cursor: 'ne-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'top right')} />
          <div style={{ ...resizeHandleStyle, left: '-2px', bottom: '-2px', width: '8px', height: '8px', cursor: 'sw-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'bottom left')} />
          <div style={{ ...resizeHandleStyle, right: '-2px', bottom: '-2px', width: '8px', height: '8px', cursor: 'se-resize' }} onPointerDown={(e) => newHandleResizeMouseDown(e, 'bottom right')} />

          <div style={headerStyle} onPointerDown={newHandleDragMouseDown}>
            Panneau de Configuration
          </div>
      
          <div style={contentStyle}>
            <SelectedBodySummary />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px', padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              {Object.entries(categories).map(([key, category]) => (
                <button key={key} style={activeCategory === key ? activeCategoryButtonStyle : categoryButtonStyle} onClick={() => setActiveCategory(key)} onMouseEnter={(e) => { if (activeCategory !== key) e.target.style.background = 'rgba(255, 255, 255, 0.2)'; }} onMouseLeave={(e) => { if (activeCategory !== key) e.target.style.background = 'rgba(255, 255, 255, 0.1)'; }}>
                  <span style={{ fontSize: '14px' }}>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {activeCategory === 'action' ? (
              <div>
                <div style={{...headerStyle, fontSize: '14px', marginBottom: '10px', background: 'none', border: 'none', padding: '0', cursor: 'default'}}>🎯 Actions Disponibles</div>
                <div style={controlGroupStyle}>
                  <button style={{...buttonStyle, background: 'rgba(0, 122, 255, 0.3)', border: '1px solid rgba(0, 122, 255, 0.5)', marginBottom: '10px'}} onClick={() => addCelestialBody()} onMouseEnter={(e) => e.target.style.background = 'rgba(0, 122, 255, 0.5)'} onMouseLeave={(e) => e.target.style.background = 'rgba(0, 122, 255, 0.3)'}>
                    ✨ Ajouter une Étoile
                  </button>
                  {selectedBody && (
                    <button style={{...buttonStyle, background: 'rgba(255, 59, 48, 0.3)', border: '1px solid rgba(255, 59, 48, 0.5)'}} onClick={() => removeCelestialBody(selectedBody.id)} onMouseEnter={(e) => e.target.style.background = 'rgba(255, 59, 48, 0.5)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255, 59, 48, 0.3)'}>
                      🗑️ Supprimer l'Étoile Sélectionnée
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {selectedBody ? (
                  <div>
                    <div style={{...headerStyle, fontSize: '14px', marginBottom: '10px', background: 'none', border: 'none', padding: '0', cursor: 'default'}}>🌟 {selectedBody.name}</div>
                    {categories[activeCategory] && categories[activeCategory].parameters.map(paramName => renderParameterControl(paramName, selectedBody))}
                  </div>
                ) : (
                  <div style={{ ...controlGroupStyle, textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                    Cliquez sur une étoile pour la configurer
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}