import React, { useState } from 'react';
import { Shuffle, Heart, Info, Copy, Check } from 'lucide-react';
import { FontPairing, getRandomFontPairing } from '../data/fontPairings';
import { TypographySettings } from '../types/typography';

interface FontPairingGeneratorProps {
  onApplyPairing: (pairing: FontPairing) => void;
  currentSettings: TypographySettings;
}

export default function FontPairingGenerator({ onApplyPairing, currentSettings }: FontPairingGeneratorProps) {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shuffle className="h-4 w-4 text-purple-500" />
        <h3 className="text-sm font-semibold text-gray-900">Font Pairing Generator</h3>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRandomPairing}
        className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium mb-3 sm:mb-4 min-h-touch"
      >
        <Shuffle className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">Generate Random Pairing</span>
      </button>

      {/* Current Pairing Display */}
      {currentPairing && (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4 className="font-semibold text-gray-900">{currentPairing.name}</h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors min-h-touch min-w-touch"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            {/* Font Preview */}
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Heading Font: {currentPairing.headingFont} ({currentPairing.headingCategory})
                </div>
                <div 
                  className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight"
                  style={{ fontFamily: currentPairing.headingFont }}
                >
                  Beautiful Typography
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Body Font: {currentPairing.bodyFont} ({currentPairing.bodyCategory})
                </div>
                <div 
                  className="text-sm text-gray-700 leading-relaxed break-words"
                  style={{ fontFamily: currentPairing.bodyFont }}
                >
                  This is how your body text will look with this font pairing. 
                  Notice how the fonts complement each other while maintaining excellent readability.
                </div>
              </div>
            </div>

            {/* Pairing Details */}
            {showDetails && (
              <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-gray-200">
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Description</div>
                  <div className="text-xs text-gray-600">{currentPairing.description}</div>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Why This Works</div>
                  <div className="text-xs text-gray-600">{currentPairing.reasoning}</div>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Mood</div>
                  <div className="text-xs text-gray-600">{currentPairing.mood}</div>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Best For</div>
                  <div className="flex flex-wrap gap-1">
                    {currentPairing.useCase.map((useCase, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded"
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
                className="flex-1 px-3 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium transition-colors min-h-touch"
              >
                Apply Pairing
              </button>
              <div className="flex gap-2">
                <button
                onClick={savePairing}
                  className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs transition-colors min-h-touch min-w-touch"
                disabled={savedPairings.find(p => p.id === currentPairing.id) !== undefined}
              >
                <Heart className={`h-3 w-3 ${savedPairings.find(p => p.id === currentPairing.id) ? 'fill-current text-red-500' : ''}`} />
              </button>
              <button
                onClick={copyPairingInfo}
                  className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs transition-colors min-h-touch min-w-touch"
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
          <h4 className="text-xs font-semibold text-gray-700 mb-2 sm:mb-3">Saved Pairings</h4>
          <div className="space-y-1 sm:space-y-2">
            {savedPairings.map((pairing) => (
              <div key={pairing.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded text-xs">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{pairing.name}</div>
                  <div className="text-gray-500 truncate">{pairing.headingFont} + {pairing.bodyFont}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setCurrentPairing(pairing);
                      setShowDetails(true);
                    }}
                    className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors min-h-touch min-w-touch"
                  >
                    <Info className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onApplyPairing(pairing)}
                    className="p-1.5 text-gray-500 hover:text-green-600 transition-colors min-h-touch min-w-touch"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => removeSavedPairing(pairing.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 transition-colors min-h-touch min-w-touch"
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