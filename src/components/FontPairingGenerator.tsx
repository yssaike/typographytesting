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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shuffle className="h-4 w-4 text-purple-500" />
        <h3 className="text-sm font-semibold text-gray-900">Font Pairing Generator</h3>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRandomPairing}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium mb-4"
      >
        <Shuffle className="h-4 w-4" />
        Generate Random Pairing
      </button>

      {/* Current Pairing Display */}
      {currentPairing && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{currentPairing.name}</h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            {/* Font Preview */}
            <div className="space-y-3 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Heading Font: {currentPairing.headingFont} ({currentPairing.headingCategory})
                </div>
                <div 
                  className="text-2xl font-semibold text-gray-900"
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
                  className="text-sm text-gray-700 leading-relaxed"
                  style={{ fontFamily: currentPairing.bodyFont }}
                >
                  This is how your body text will look with this font pairing. 
                  Notice how the fonts complement each other while maintaining excellent readability.
                </div>
              </div>
            </div>

            {/* Pairing Details */}
            {showDetails && (
              <div className="space-y-3 pt-3 border-t border-gray-200">
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
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={applyPairing}
                className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium transition-colors"
              >
                Apply Pairing
              </button>
              <button
                onClick={savePairing}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs transition-colors"
                disabled={savedPairings.find(p => p.id === currentPairing.id) !== undefined}
              >
                <Heart className={`h-3 w-3 ${savedPairings.find(p => p.id === currentPairing.id) ? 'fill-current text-red-500' : ''}`} />
              </button>
              <button
                onClick={copyPairingInfo}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs transition-colors"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Pairings */}
      {savedPairings.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-semibold text-gray-700 mb-3">Saved Pairings</h4>
          <div className="space-y-2">
            {savedPairings.map((pairing) => (
              <div key={pairing.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{pairing.name}</div>
                  <div className="text-gray-500">{pairing.headingFont} + {pairing.bodyFont}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setCurrentPairing(pairing);
                      setShowDetails(true);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Info className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onApplyPairing(pairing)}
                    className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => removeSavedPairing(pairing.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
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