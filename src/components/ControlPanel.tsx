import React from 'react';
import { Settings, Download, Copy } from 'lucide-react';
import { TypographySettings } from '../types/typography';
import FontSelector from './FontSelector';
import SliderControl from './SliderControl';
import ResponsiveControls from './ResponsiveControls';

interface ControlPanelProps {
  settings: TypographySettings;
  breakpoint: string;
  darkMode: boolean;
  onSettingsChange: (settings: Partial<TypographySettings>) => void;
  onBreakpointChange: (breakpoint: string) => void;
}

export default function ControlPanel({
  settings,
  breakpoint,
  darkMode,
  onSettingsChange,
  onBreakpointChange
}: ControlPanelProps) {
  const [copied, setCopied] = React.useState(false);

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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
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
  };

  return (
    <div className="space-y-6">
      {/* Font Selection */}
      <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-purple-300" />
          <h2 className="text-lg font-semibold text-white dark:text-gray-100">Font Selection</h2>
        </div>
        <div className="space-y-4">
          <FontSelector
            label="Heading Font"
            value={settings.headingFont}
            darkMode={darkMode}
            onChange={(font) => onSettingsChange({ headingFont: font })}
          />
          <FontSelector
            label="Body Font"
            value={settings.bodyFont}
            darkMode={darkMode}
            onChange={(font) => onSettingsChange({ bodyFont: font })}
          />
        </div>
      </div>

      {/* Size Controls */}
      <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Font Sizes</h2>
        <div className="space-y-4">
          <SliderControl
            label="Heading Size"
            value={settings.headingSize}
            darkMode={darkMode}
            min={10}
            max={120}
            step={1}
            unit="px"
            onChange={(size) => onSettingsChange({ headingSize: size })}
          />
          <SliderControl
            label="Body Size"
            value={settings.bodySize}
            darkMode={darkMode}
            min={10}
            max={32}
            step={1}
            unit="px"
            onChange={(size) => onSettingsChange({ bodySize: size })}
          />
        </div>
      </div>

      {/* Weight Controls */}
      <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Font Weights</h2>
        <div className="space-y-4">
          <SliderControl
            label="Heading Weight"
            value={settings.headingWeight}
            darkMode={darkMode}
            min={100}
            max={900}
            step={100}
            onChange={(weight) => onSettingsChange({ headingWeight: weight })}
          />
          <SliderControl
            label="Body Weight"
            value={settings.bodyWeight}
            darkMode={darkMode}
            min={100}
            max={900}
            step={100}
            onChange={(weight) => onSettingsChange({ bodyWeight: weight })}
          />
        </div>
      </div>

      {/* Spacing Controls */}
      <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Spacing</h2>
        <div className="space-y-4">
          <SliderControl
            label="Heading Line Height"
            value={settings.headingLineHeight}
            darkMode={darkMode}
            min={0.8}
            max={2.0}
            step={0.1}
            onChange={(height) => onSettingsChange({ headingLineHeight: height })}
          />
          <SliderControl
            label="Body Line Height"
            value={settings.lineHeight}
            darkMode={darkMode}
            min={0.8}
            max={2.0}
            step={0.1}
            onChange={(height) => onSettingsChange({ lineHeight: height })}
          />
          <SliderControl
            label="Heading Letter Spacing"
            value={settings.headingLetterSpacing}
            darkMode={darkMode}
            min={-5}
            max={5}
            step={0.1}
            unit="px"
            onChange={(spacing) => onSettingsChange({ headingLetterSpacing: spacing })}
          />
          <SliderControl
            label="Body Letter Spacing"
            value={settings.letterSpacing}
            darkMode={darkMode}
            min={-5}
            max={5}
            step={0.1}
            unit="px"
            onChange={(spacing) => onSettingsChange({ letterSpacing: spacing })}
          />
        </div>
      </div>

      {/* Responsive Controls */}
      <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Preview Size</h2>
        <ResponsiveControls
          activeBreakpoint={breakpoint}
          darkMode={darkMode}
          onBreakpointChange={onBreakpointChange}
        />
      </div>

      {/* Export Controls */}
      <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">Export</h2>
        <div className="space-y-3">
          <button
            onClick={copyCSS}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <button
            onClick={downloadCSS}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Download size={16} />
            Download CSS
          </button>
        </div>
      </div>
    </div>
  );
}