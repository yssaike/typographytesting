import React from 'react';
import { Settings, Download, Copy, Check } from 'lucide-react';
import { TypographySettings } from '../types/typography';
import FontSelector from './FontSelector';
import SliderControl from './SliderControl';
import ResponsiveControls from './ResponsiveControls';

interface ControlPanelProps {
  settings: TypographySettings;
  breakpoint: string;
  onSettingsChange: (settings: Partial<TypographySettings>) => void;
  onBreakpointChange: (breakpoint: string) => void;
}

export default function ControlPanel({
  settings,
  breakpoint,
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
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900">Typography Controls</h2>
        </div>

        {/* Font Selection */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FontSelector
              label="Heading Font"
              value={settings.headingFont}
              onChange={(font) => onSettingsChange({ headingFont: font })}
            />
            <FontSelector
              label="Body Font"
              value={settings.bodyFont}
              onChange={(font) => onSettingsChange({ bodyFont: font })}
            />
          </div>

          {/* Size Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SliderControl
              label="Heading Size"
              value={settings.headingSize}
              min={10}
              max={120}
              step={1}
              unit="px"
              onChange={(size) => onSettingsChange({ headingSize: size })}
            />
            <SliderControl
              label="Body Size"
              value={settings.bodySize}
              min={10}
              max={32}
              step={1}
              unit="px"
              onChange={(size) => onSettingsChange({ bodySize: size })}
            />
          </div>

          {/* Weight Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SliderControl
              label="Heading Weight"
              value={settings.headingWeight}
              min={100}
              max={900}
              step={100}
              onChange={(weight) => onSettingsChange({ headingWeight: weight })}
            />
            <SliderControl
              label="Body Weight"
              value={settings.bodyWeight}
              min={100}
              max={900}
              step={100}
              onChange={(weight) => onSettingsChange({ bodyWeight: weight })}
            />
          </div>

          {/* Line Height Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SliderControl
              label="Heading Line Height"
              value={settings.headingLineHeight}
              min={0.8}
              max={2.0}
              step={0.1}
              onChange={(height) => onSettingsChange({ headingLineHeight: height })}
            />
            <SliderControl
              label="Body Line Height"
              value={settings.lineHeight}
              min={0.8}
              max={2.0}
              step={0.1}
              onChange={(height) => onSettingsChange({ lineHeight: height })}
            />
          </div>

          {/* Letter Spacing Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SliderControl
              label="Heading Letter Spacing"
              value={settings.headingLetterSpacing}
              min={-5}
              max={5}
              step={0.1}
              unit="px"
              onChange={(spacing) => onSettingsChange({ headingLetterSpacing: spacing })}
            />
            <SliderControl
              label="Body Letter Spacing"
              value={settings.letterSpacing}
              min={-5}
              max={5}
              step={0.1}
              unit="px"
              onChange={(spacing) => onSettingsChange({ letterSpacing: spacing })}
            />
          </div>
        </div>
      </div>

      {/* Responsive Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ResponsiveControls
          activeBreakpoint={breakpoint}
          onBreakpointChange={onBreakpointChange}
        />
      </div>

      {/* Export Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Settings</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyCSS}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <button
            onClick={downloadCSS}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Download CSS
          </button>
        </div>
      </div>
    </div>
  );
}