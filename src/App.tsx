import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';
import { TypographySettings } from './types/typography';
import { loadGoogleFont } from './data/fonts';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import ControlPanel from './components/ControlPanel';
import TypographyPreview from './components/TypographyPreview';
import './styles/designSystem.css';
import './styles/accessibility.css';
import './styles/darkTheme.css';

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
  const [designMode, setDesignMode] = useState<'glass' | 'neuro' | 'hybrid'>('hybrid');
  const [darkMode, setDarkMode] = useState(false);

  // Load initial fonts
  useEffect(() => {
    loadGoogleFont(settings.headingFont);
    loadGoogleFont(settings.bodyFont);
  }, [settings.headingFont, settings.bodyFont]);

  const updateSettings = (newSettings: Partial<TypographySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  // Initialize theme based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  return (
    <AccessibilityProvider>
      {/* Skip Links */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#controls-panel" className="skip-link">
        Skip to controls
      </a>
      
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${darkMode ? 'dark-theme' : ''} ${
      designMode === 'glass' 
        ? 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500' 
        : designMode === 'neuro'
        ? 'bg-gray-200'
        : 'bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 bg-gray-100'
    }`}>
      {/* Header */}
      <header 
        className={`flex-shrink-0 sticky top-0 z-40 ${
        designMode === 'glass' 
          ? 'glass-nav' 
          : designMode === 'neuro'
          ? 'bg-gray-200 shadow-lg'
          : 'hybrid-card border-b border-white/20'
        }`}
        role="banner"
        aria-label="Typography Testing Tool Header"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                designMode === 'glass' 
                  ? 'glass-button' 
                  : designMode === 'neuro'
                  ? 'neuro-button-primary'
                  : 'hybrid-button'
              }`}>
                <Type 
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white" 
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <h1 className={`text-lg sm:text-xl font-bold truncate typography-heading ${
                  designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
                }`}>
                  Typography Testing Tool
                </h1>
                <p className={`text-xs sm:text-sm hidden sm:block typography-caption ${
                  designMode === 'glass' || designMode === 'hybrid' ? 'text-white/80' : 'text-gray-600'
                }`}>
                  Real-time font preview and adjustment
                </p>
              </div>
            </div>
            
            {/* Design Mode Toggle & Breakpoint Indicator */}
            <div className="flex items-center gap-2">
              <label htmlFor="design-mode-select" className="sr-only">
                Select design mode
              </label>
              <select
                id="design-mode-select"
                value={designMode}
                onChange={(e) => setDesignMode(e.target.value as any)}
                aria-label="Design mode selection"
                className={`text-xs px-2 py-1 rounded hidden sm:block ${
                  designMode === 'glass' 
                    ? 'glass-input' 
                    : designMode === 'neuro'
                    ? 'neuro-input'
                    : 'hybrid-button'
                }`}
              >
                <option value="glass">Glassmorphism</option>
                <option value="neuro">Neuromorphic</option>
                <option value="hybrid">Hybrid</option>
              </select>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  designMode === 'glass' 
                    ? 'glass-button hover:bg-white/20' 
                    : designMode === 'neuro'
                    ? 'neuro-button hover:shadow-lg'
                    : 'hybrid-button hover:bg-white/20'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              <div className={`text-xs capitalize px-2 py-1 rounded hidden xs:block sm:hidden ${
                designMode === 'glass' 
                  ? 'glass-card text-white' 
                  : designMode === 'neuro'
                  ? 'neuro-card'
                  : 'hybrid-card text-white'
              }`}
              role="status"
              aria-label={`Current breakpoint: ${breakpoint}`}
              >
                {breakpoint}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <main 
        id="main-content"
        className="flex-1 flex flex-col lg:flex-row overflow-hidden"
        role="main"
        aria-label="Typography testing interface"
      >
        {/* Controls Panel - Full width on mobile, sidebar on desktop */}
        <aside 
          id="controls-panel"
          className={`w-full lg:w-2/5 xl:w-1/3 border-b lg:border-b-0 lg:border-r overflow-y-auto ${
          designMode === 'glass' 
            ? 'bg-white/10 border-white/20' 
            : designMode === 'neuro'
            ? 'bg-gray-200 border-gray-300'
            : 'bg-white/5 border-white/20'
          }`}
          role="complementary"
          aria-label="Typography controls and settings"
        >
          <div className="p-4 sm:p-6">
            <ControlPanel
              settings={settings}
              breakpoint={breakpoint}
              designMode={designMode}
              darkMode={darkMode}
              onSettingsChange={updateSettings}
              onBreakpointChange={setBreakpoint}
            />
          </div>
        </aside>

        {/* Preview Panel - Full width on mobile, main content on desktop */}
        <section 
          className={`flex-1 overflow-y-auto ${
          designMode === 'glass' 
            ? 'bg-white/5' 
            : designMode === 'neuro'
            ? 'bg-gray-200'
            : 'bg-white/5'
          }`}
          role="region"
          aria-label="Typography preview area"
        >
          <div className="p-4 sm:p-6 h-full">
            <TypographyPreview
              settings={settings}
              breakpoint={breakpoint}
              designMode={designMode}
              darkMode={darkMode}
            />
          </div>
        </section>
      </main>
    </div>
    </AccessibilityProvider>
  );
}

export default App;