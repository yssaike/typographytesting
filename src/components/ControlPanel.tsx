import React from 'react';
import { Settings, Download, Copy, Check } from 'lucide-react';
import { TypographySettings } from '../types/typography';
import { FontPairing } from '../data/fontPairings';
import { useAccessibility } from './AccessibilityProvider';
import FontSelector from './FontSelector';
import SliderControl from './SliderControl';
import ResponsiveControls from './ResponsiveControls';
import FontPairingGenerator from './FontPairingGenerator';
import FontBrowser from './FontBrowser';

interface ControlPanelProps {
  settings: TypographySettings;
  breakpoint: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
  darkMode: boolean;
  onSettingsChange: (settings: Partial<TypographySettings>) => void;
  onBreakpointChange: (breakpoint: string) => void;
}

export default function ControlPanel({
  settings,
  breakpoint,
  designMode,
  darkMode,
  onSettingsChange,
  onBreakpointChange
}: ControlPanelProps) {
  const [copied, setCopied] = React.useState(false);
  const [showFontBrowser, setShowFontBrowser] = React.useState(false);
  const { announceToScreenReader } = useAccessibility();

  const handleApplyPairing = (pairing: FontPairing) => {
    onSettingsChange({
      headingFont: pairing.headingFont,
      bodyFont: pairing.bodyFont
    });
    announceToScreenReader(`Applied font pairing: ${pairing.name}`, 'polite');
  };

  const generateCSS = () => {
    return `/* Typography Settings */
.heading {
  font-family: ${settings.headingFont};
  font-size: ${settings.headingSize}px;
  font-weight: ${settings.headingWeight};
  line-height: ${settings.headingLineHeight};
  letter-spacing: ${settings.headingLetterSpacing}px;
}

.body {
  font-family: ${settings.bodyFont};
  font-size: ${settings.bodySize}px;
  font-weight: ${settings.bodyWeight};
  line-height: ${settings.lineHeight};
  letter-spacing: ${settings.letterSpacing}px;
}`;
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      announceToScreenReader('CSS copied to clipboard', 'polite');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
      announceToScreenReader('Failed to copy CSS', 'assertive');
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([generateCSS()], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typography-settings.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    announceToScreenReader('CSS file downloaded', 'polite');
  };

  return (
    <div className="space-y-4 sm:space-y-6" role="region" aria-label="Typography controls">
      {/* Font Browser Toggle */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      aria-labelledby="font-browser-heading"
      >
        <h2 id="font-browser-heading" className="sr-only">Font Browser</h2>
        <button
          onClick={() => setShowFontBrowser(!showFontBrowser)}
          aria-expanded={showFontBrowser}
          aria-controls="font-browser-content"
          className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-white rounded-lg transition-colors text-sm font-medium min-h-touch ${
            designMode === 'glass' 
              ? 'glass-button bg-purple-500/80 hover:bg-purple-600/80' 
              : designMode === 'neuro'
              ? 'neuro-button-primary'
              : 'hybrid-button bg-purple-500/80 hover:bg-purple-600/80'
          }`}
        >
          <Settings className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">
            {showFontBrowser ? 'Hide Font Browser' : 'Browse All Google Fonts'}
          </span>
        </button>
      </section>

      {/* Font Browser */}
      {showFontBrowser && (
        <div id="font-browser-content" role="region" aria-label="Font browser">
          <FontBrowser
            designMode={designMode}
            onFontSelect={(font) => {
              onSettingsChange({ headingFont: font });
              setShowFontBrowser(false);
              announceToScreenReader(`Selected font: ${font}`, 'polite');
            }}
            selectedFont={settings.headingFont}
          />
        </div>
      )}

      {/* Font Pairing Generator */}
      <section role="region" aria-labelledby="font-pairing-heading">
        <FontPairingGenerator
          designMode={designMode}
          onApplyPairing={handleApplyPairing}
          currentSettings={settings}
        />
      </section>

      {/* Font Selection */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      role="region"
      aria-labelledby="font-selection-heading"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Settings className={`h-4 w-4 ${
            designMode === 'glass' || designMode === 'hybrid' ? 'text-blue-300' : 'text-blue-500'
          }`} aria-hidden="true" />
          <h3 id="font-selection-heading" className={`text-sm font-semibold typography-subheading ${
            designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
          }`}>Font Selection</h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <FontSelector
            label="Heading Font"
            value={settings.headingFont}
            designMode={designMode}
            onChange={(font) => {
              onSettingsChange({ headingFont: font });
              announceToScreenReader(`Heading font changed to ${font}`, 'polite');
            }}
          />
          <FontSelector
            label="Body Font"
            value={settings.bodyFont}
            designMode={designMode}
            onChange={(font) => {
              onSettingsChange({ bodyFont: font });
              announceToScreenReader(`Body font changed to ${font}`, 'polite');
            }}
          />
        </div>
      </section>

      {/* Size Controls */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      role="region"
      aria-labelledby="font-sizes-heading"
      >
        <h3 id="font-sizes-heading" className={`text-sm font-semibold mb-3 sm:mb-4 typography-subheading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Font Sizes</h3>
        <div className="space-y-3 sm:space-y-4">
          <SliderControl
            label="Heading Size"
            value={settings.headingSize}
            designMode={designMode}
            min={10}
            max={120}
            step={1}
            unit="px"
            onChange={(size) => {
              onSettingsChange({ headingSize: size });
              announceToScreenReader(`Heading size changed to ${size} pixels`, 'polite');
            }}
          />
          <SliderControl
            label="Body Size"
            value={settings.bodySize}
            designMode={designMode}
            min={10}
            max={32}
            step={1}
            unit="px"
            onChange={(size) => {
              onSettingsChange({ bodySize: size });
              announceToScreenReader(`Body size changed to ${size} pixels`, 'polite');
            }}
          />
        </div>
      </section>

      {/* Weight Controls */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      role="region"
      aria-labelledby="font-weights-heading"
      >
        <h3 id="font-weights-heading" className={`text-sm font-semibold mb-3 sm:mb-4 typography-subheading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Font Weights</h3>
        <div className="space-y-3 sm:space-y-4">
          <SliderControl
            label="Heading Weight"
            value={settings.headingWeight}
            designMode={designMode}
            min={100}
            max={900}
            step={100}
            onChange={(weight) => {
              onSettingsChange({ headingWeight: weight });
              announceToScreenReader(`Heading weight changed to ${weight}`, 'polite');
            }}
          />
          <SliderControl
            label="Body Weight"
            value={settings.bodyWeight}
            designMode={designMode}
            min={100}
            max={900}
            step={100}
            onChange={(weight) => {
              onSettingsChange({ bodyWeight: weight });
              announceToScreenReader(`Body weight changed to ${weight}`, 'polite');
            }}
          />
        </div>
      </section>

      {/* Spacing Controls */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      role="region"
      aria-labelledby="spacing-heading"
      >
        <h3 id="spacing-heading" className={`text-sm font-semibold mb-3 sm:mb-4 typography-subheading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Spacing</h3>
        <div className="space-y-3 sm:space-y-4">
          <SliderControl
            label="Heading Line Height"
            value={settings.headingLineHeight}
            designMode={designMode}
            min={0.8}
            max={2.0}
            step={0.1}
            onChange={(height) => {
              onSettingsChange({ headingLineHeight: height });
              announceToScreenReader(`Heading line height changed to ${height}`, 'polite');
            }}
          />
          <SliderControl
            label="Body Line Height"
            value={settings.lineHeight}
            designMode={designMode}
            min={0.8}
            max={2.0}
            step={0.1}
            onChange={(height) => {
              onSettingsChange({ lineHeight: height });
              announceToScreenReader(`Body line height changed to ${height}`, 'polite');
            }}
          />
          <SliderControl
            label="Heading Letter Spacing"
            value={settings.headingLetterSpacing}
            designMode={designMode}
            min={-5}
            max={5}
            step={0.1}
            unit="px"
            onChange={(spacing) => {
              onSettingsChange({ headingLetterSpacing: spacing });
              announceToScreenReader(`Heading letter spacing changed to ${spacing} pixels`, 'polite');
            }}
          />
          <SliderControl
            label="Body Letter Spacing"
            value={settings.letterSpacing}
            designMode={designMode}
            min={-5}
            max={5}
            step={0.1}
            unit="px"
            onChange={(spacing) => {
              onSettingsChange({ letterSpacing: spacing });
              announceToScreenReader(`Body letter spacing changed to ${spacing} pixels`, 'polite');
            }}
          />
        </div>
      </section>

      {/* Responsive Controls */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      role="region"
      aria-labelledby="preview-size-heading"
      >
        <h3 id="preview-size-heading" className={`text-sm font-semibold mb-3 sm:mb-4 typography-subheading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Preview Size</h3>
        <ResponsiveControls
          activeBreakpoint={breakpoint}
          designMode={designMode}
          onBreakpointChange={(bp) => {
            onBreakpointChange(bp);
            announceToScreenReader(`Preview breakpoint changed to ${bp}`, 'polite');
          }}
        />
      </section>

      {/* Export Controls */}
      <section className={`rounded-lg p-3 sm:p-4 ${
        designMode === 'glass' 
          ? 'glass-card' 
          : designMode === 'neuro'
          ? 'neuro-card'
          : 'hybrid-card'
      }`}
      role="region"
      aria-labelledby="export-heading"
      >
        <h3 id="export-heading" className={`text-sm font-semibold mb-3 sm:mb-4 typography-subheading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Export</h3>
        <div className="flex flex-col gap-2 sm:gap-3">
          <button
            onClick={copyCSS}
            aria-describedby="copy-css-description"
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-white rounded-lg transition-colors text-sm min-h-touch ${
              designMode === 'glass' 
                ? 'glass-button bg-blue-500/80 hover:bg-blue-600/80' 
                : designMode === 'neuro'
                ? 'neuro-button-primary'
                : 'hybrid-button bg-blue-500/80 hover:bg-blue-600/80'
            }`}
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <div id="copy-css-description" className="sr-only">
            Copy CSS styles to clipboard for use in your project
          </div>
          <button
            onClick={downloadCSS}
            aria-describedby="download-css-description"
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-white rounded-lg transition-colors text-sm min-h-touch ${
              designMode === 'glass' 
                ? 'glass-button bg-green-500/80 hover:bg-green-600/80' 
                : designMode === 'neuro'
                ? 'neuro-button-primary bg-green-500 hover:bg-green-600'
                : 'hybrid-button bg-green-500/80 hover:bg-green-600/80'
            }`}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CSS
          </button>
          <div id="download-css-description" className="sr-only">
            Download CSS file containing all typography settings
          </div>
        </div>
      </section>
    </div>
  );
}