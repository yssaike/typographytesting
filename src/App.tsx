import React, { useState, useEffect } from 'react';
import { Type, Sun, Moon } from 'lucide-react';
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
  const [darkMode, setDarkMode] = useState(false);

  // Load initial fonts
  useEffect(() => {
    loadGoogleFont(settings.headingFont);
    loadGoogleFont(settings.bodyFont);
  }, [settings.headingFont, settings.bodyFont]);

  const updateSettings = (newSettings: Partial<TypographySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/25 dark:bg-black/25 backdrop-blur-lg border-b border-white/20 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 text-white">
                  <Type size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">
                    Typography Testing Tool
                  </h1>
                  <p className="text-sm text-white/80 hidden sm:block">
                    Real-time font preview and adjustment
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-120px)]">
            {/* Controls Panel */}
            <div className="lg:col-span-2">
              <div className="h-full overflow-y-auto">
                <ControlPanel
                  settings={settings}
                  breakpoint={breakpoint}
                  darkMode={darkMode}
                  onSettingsChange={updateSettings}
                  onBreakpointChange={setBreakpoint}
                />
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-3">
              <div className="h-full overflow-y-auto">
                <TypographyPreview
                  settings={settings}
                  breakpoint={breakpoint}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;