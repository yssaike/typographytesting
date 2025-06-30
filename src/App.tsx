import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';
import { TypographySettings } from './types/typography';
import { loadGoogleFont } from './data/fonts';
import ControlPanel from './components/ControlPanel';
import TypographyPreview from './components/TypographyPreview';

const DEFAULT_SETTINGS: TypographySettings = {
  headingFont: 'Inter',
  bodyFont: 'Inter',
  headingSize: 48,
  bodySize: 16,
  headingWeight: 600,
  bodyWeight: 400,
  lineHeight: 1.6,
  letterSpacing: 0,
  headingLineHeight: 1.2,
  headingLetterSpacing: -0.5,
};

function App() {
  const [settings, setSettings] = useState<TypographySettings>(DEFAULT_SETTINGS);
  const [breakpoint, setBreakpoint] = useState('desktop');

  // Load initial fonts
  useEffect(() => {
    loadGoogleFont(settings.headingFont);
    loadGoogleFont(settings.bodyFont);
  }, [settings.headingFont, settings.bodyFont]);

  const updateSettings = (newSettings: Partial<TypographySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Type className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Typography Testing Tool
              </h1>
              <p className="text-sm text-gray-600">
                Real-time font preview and adjustment
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Split Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Controls (40% width) */}
        <div className="w-2/5 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <ControlPanel
              settings={settings}
              breakpoint={breakpoint}
              onSettingsChange={updateSettings}
              onBreakpointChange={setBreakpoint}
            />
          </div>
        </div>

        {/* Right Panel - Preview (60% width) */}
        <div className="w-3/5 bg-white overflow-y-auto">
          <div className="p-6 h-full">
            <TypographyPreview
              settings={settings}
              breakpoint={breakpoint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;