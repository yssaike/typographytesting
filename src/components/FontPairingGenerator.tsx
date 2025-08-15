import React, { useState } from 'react';
import { Shuffle, Heart, Info, Copy, Check } from 'lucide-react';
import { FontPairing, getRandomFontPairing } from '../data/fontPairings';
import { TypographySettings } from '../types/typography';

interface FontPairingGeneratorProps {
  onApplyPairing: (pairing: FontPairing) => void;
  designMode: 'glass' | 'neuro' | 'hybrid';
  currentSettings: TypographySettings;
}

export default function FontPairingGenerator({ onApplyPairing, designMode, currentSettings }: FontPairingGeneratorProps) {
  const [currentPairing, setCurrentPairing] = useState<FontPairing | null>(null);
  const [savedPairings, setSavedPairings] = useState<FontPairing[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRandomPairing = () => {
    const newPairing = getRandomFontPairing();
    setCurrentPairing(newPairing);
    setShowDetails(true);
  };

  const applyPairing = () => {
    if (currentPairing) {
      onApplyPairing(currentPairing);
    }
  };

  const savePairing = () => {
    if (currentPairing && !savedPairings.find(p => p.id === currentPairing.id)) {
      setSavedPairings(prev => [...prev, currentPairing]);
    }
  };

  const removeSavedPairing = (id: string) => {
    setSavedPairings(prev => prev.filter(p => p.id !== id));
  };

  const copyPairingInfo = async () => {
    if (!currentPairing) return;
    
    const info = `Font Pairing: ${currentPairing.name}
Heading Font: ${currentPairing.headingFont} (${currentPairing.headingCategory})
Body Font: ${currentPairing.bodyFont} (${currentPairing.bodyCategory})
Description: ${currentPairing.description}
Mood: ${currentPairing.mood}
Use Cases: ${currentPairing.useCase.join(', ')}`;

    try {
      await navigator.clipboard.writeText(info);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy pairing info:', err);
    }
  };

  return (
    <div className={`rounded-lg p-3 sm:p-4 ${
      designMode === 'glass' 
        ? 'glass-card' 
        : designMode === 'neuro'
        ? 'neuro-card'
        : 'hybrid-card'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Shuffle className={`h-4 w-4 ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-purple-300' : 'text-purple-500'
        }`} />
        <h3 className={`text-sm font-semibold typography-subheading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Font Pairing Generator</h3>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRandomPairing}
        className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-white rounded-lg transition-colors text-sm font-medium mb-3 sm:mb-4 min-h-touch ${
          designMode === 'glass' 
            ? 'glass-button bg-purple-500/80 hover:bg-purple-600/80' 
            : designMode === 'neuro'
            ? 'neuro-button-primary bg-purple-500 hover:bg-purple-600'
            : 'hybrid-button bg-purple-500/80 hover:bg-purple-600/80'
        }`}
      >
        <Shuffle className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">Generate Random Pairing</span>
      </button>

      {/* Current Pairing Display */}
      {currentPairing && (
        <div className="space-y-3 sm:space-y-4">
          <div className={`rounded-lg p-3 sm:p-4 ${
            designMode === 'glass' 
              ? 'glass-card bg-white/10' 
              : designMode === 'neuro'
              ? 'neuro-card bg-gray-50'
              : 'hybrid-card bg-white/10'
          }`}>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4 className={`font-semibold typography-subheading ${
                designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
              }`}>{currentPairing.name}</h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`p-1.5 transition-colors min-h-touch min-w-touch ${
                  designMode === 'glass' || designMode === 'hybrid' 
                    ? 'text-white/70 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            {/* Font Preview */}
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              <div>
                <div className={`text-xs mb-1 typography-caption ${
                  designMode === 'glass' || designMode === 'hybrid' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  Heading Font: {currentPairing.headingFont} ({currentPairing.headingCategory})
                </div>
                <div 
                  className={`text-xl sm:text-2xl font-semibold leading-tight typography-heading ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ fontFamily: currentPairing.headingFont }}
                >
                  Beautiful Typography
                </div>
              </div>
              <div>
                <div className={`text-xs mb-1 typography-caption ${
                  designMode === 'glass' || designMode === 'hybrid' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  Body Font: {currentPairing.bodyFont} ({currentPairing.bodyCategory})
                </div>
                <div 
                  className={`text-sm leading-relaxed break-words typography-body ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
                  }`}
                  style={{ fontFamily: currentPairing.bodyFont }}
                >
                  This is how your body text will look with this font pairing. 
                  Notice how the fonts complement each other while maintaining excellent readability.
                </div>
              </div>
            </div>

            {/* Pairing Details */}
            {showDetails && (
              <div className={`space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t ${
                designMode === 'glass' || designMode === 'hybrid' 
                  ? 'border-white/20' 
                  : 'border-gray-200'
              }`}>
                <div>
                  <div className={`text-xs font-medium mb-1 typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
                  }`}>Description</div>
                  <div className={`text-xs typography-body ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/80' : 'text-gray-600'
                  }`}>{currentPairing.description}</div>
                </div>
                
                <div>
                  <div className={`text-xs font-medium mb-1 typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
                  }`}>Why This Works</div>
                  <div className={`text-xs typography-body ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/80' : 'text-gray-600'
                  }`}>{currentPairing.reasoning}</div>
                </div>
                
                <div>
                  <div className={`text-xs font-medium mb-1 typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
                  }`}>Mood</div>
                  <div className={`text-xs typography-body ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/80' : 'text-gray-600'
                  }`}>{currentPairing.mood}</div>
                </div>
                
                <div>
                  <div className={`text-xs font-medium mb-1 typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
                  }`}>Best For</div>
                  <div className="flex flex-wrap gap-1">
                    {currentPairing.useCase.map((useCase, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-0.5 text-xs rounded typography-code ${
                          designMode === 'glass' 
                            ? 'glass-card text-blue-200' 
                            : designMode === 'neuro'
                            ? 'neuro-card bg-blue-100 text-blue-700'
                            : 'hybrid-card text-blue-200'
                        }`}
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
              <button
                onClick={applyPairing}
                className={`flex-1 px-3 py-2.5 text-white rounded text-xs font-medium transition-colors min-h-touch ${
                  designMode === 'glass' 
                    ? 'glass-button bg-blue-500/80 hover:bg-blue-600/80' 
                    : designMode === 'neuro'
                    ? 'neuro-button-primary'
                    : 'hybrid-button bg-blue-500/80 hover:bg-blue-600/80'
                }`}
              >
                Apply Pairing
              </button>
              <div className="flex gap-2">
                <button
                onClick={savePairing}
                  className={`px-3 py-2.5 rounded text-xs transition-colors min-h-touch min-w-touch ${
                    designMode === 'glass' 
                      ? 'glass-button text-white/80 hover:text-white' 
                      : designMode === 'neuro'
                      ? 'neuro-button text-gray-700 hover:text-gray-900'
                      : 'hybrid-button text-white/80 hover:text-white'
                  }`}
                disabled={savedPairings.find(p => p.id === currentPairing.id) !== undefined}
              >
                <Heart className={`h-3 w-3 ${savedPairings.find(p => p.id === currentPairing.id) ? 'fill-current text-red-500' : ''}`} />
              </button>
              <button
                onClick={copyPairingInfo}
                  className={`px-3 py-2.5 rounded text-xs transition-colors min-h-touch min-w-touch ${
                    designMode === 'glass' 
                      ? 'glass-button text-white/80 hover:text-white' 
                      : designMode === 'neuro'
                      ? 'neuro-button text-gray-700 hover:text-gray-900'
                      : 'hybrid-button text-white/80 hover:text-white'
                  }`}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Pairings */}
      {savedPairings.length > 0 && (
        <div className="mt-4 sm:mt-6">
          <h4 className={`text-xs font-semibold mb-2 sm:mb-3 typography-caption ${
            designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
          }`}>Saved Pairings</h4>
          <div className="space-y-1 sm:space-y-2">
            {savedPairings.map((pairing) => (
              <div key={pairing.id} className={`flex items-center justify-between p-2 sm:p-3 rounded text-xs ${
                designMode === 'glass' 
                  ? 'glass-card bg-white/5' 
                  : designMode === 'neuro'
                  ? 'neuro-card bg-gray-50'
                  : 'hybrid-card bg-white/5'
              }`}>
                <div className="flex-1">
                  <div className={`font-medium typography-subheading ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
                  }`}>{pairing.name}</div>
                  <div className={`truncate typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/70' : 'text-gray-500'
                  }`}>{pairing.headingFont} + {pairing.bodyFont}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setCurrentPairing(pairing);
                      setShowDetails(true);
                    }}
                    className={`p-1.5 transition-colors min-h-touch min-w-touch ${
                      designMode === 'glass' || designMode === 'hybrid' 
                        ? 'text-white/70 hover:text-blue-300' 
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    <Info className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onApplyPairing(pairing)}
                    className={`p-1.5 transition-colors min-h-touch min-w-touch ${
                      designMode === 'glass' || designMode === 'hybrid' 
                        ? 'text-white/70 hover:text-green-300' 
                        : 'text-gray-500 hover:text-green-600'
                    }`}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => removeSavedPairing(pairing.id)}
                    className={`p-1.5 transition-colors min-h-touch min-w-touch ${
                      designMode === 'glass' || designMode === 'hybrid' 
                        ? 'text-white/70 hover:text-red-300' 
                        : 'text-gray-500 hover:text-red-600'
                    }`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}