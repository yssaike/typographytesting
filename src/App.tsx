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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg flex-shrink-0">
                <Type className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  Typography Testing Tool
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Real-time font preview and adjustment
                </p>
              </div>
            </div>
            
            {/* Mobile breakpoint indicator */}
            <div className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded hidden xs:block sm:hidden">
              {breakpoint}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Controls Panel - Full width on mobile, sidebar on desktop */}
        <div className="w-full lg:w-2/5 xl:w-1/3 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <ControlPanel
              settings={settings}
              breakpoint={breakpoint}
              onSettingsChange={updateSettings}
              onBreakpointChange={setBreakpoint}
            />
          </div>
        </div>

        {/* Preview Panel - Full width on mobile, main content on desktop */}
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-4 sm:p-6 h-full">
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