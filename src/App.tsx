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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Type className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Typography Testing Tool
              </h1>
              <p className="text-gray-600">
                Test and preview font combinations with real-time adjustments
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="xl:col-span-1">
            <ControlPanel
              settings={settings}
              breakpoint={breakpoint}
              onSettingsChange={updateSettings}
              onBreakpointChange={setBreakpoint}
            />
          </div>

          {/* Preview */}
          <div className="xl:col-span-2">
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