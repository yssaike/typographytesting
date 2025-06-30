import React, { useState } from 'react';
import { Copy, Download, Share2, Check } from 'lucide-react';
import { TypographyScale } from '../types/typography';
import { generateCSSVariables } from '../utils/typographyScale';

interface ExportPanelProps {
  scale: TypographyScale;
  primaryFont: string;
  secondaryFont: string;
  lineHeight: number;
  letterSpacing: number;
  settings: any;
}

export default function ExportPanel({
  scale,
  primaryFont,
  secondaryFont,
  lineHeight,
  letterSpacing,
  settings
}: ExportPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'json'>('css');

  const cssVariables = generateCSSVariables(scale, primaryFont, secondaryFont, lineHeight, letterSpacing);

  const tailwindConfig = `module.exports = {
  theme: {
    fontFamily: {
      'primary': ['${primaryFont}', 'serif'],
      'secondary': ['${secondaryFont}', 'sans-serif'],
    },
    fontSize: {
      'xs': '${scale.small}px',
      'sm': '${scale.body * 0.875}px',
      'base': '${scale.body}px',
      'lg': '${scale.h6}px',
      'xl': '${scale.h5}px',
      '2xl': '${scale.h4}px',
      '3xl': '${scale.h3}px',
      '4xl': '${scale.h2}px',
      '5xl': '${scale.h1}px',
    },
    lineHeight: {
      'tight': '${lineHeight - 0.25}',
      'normal': '${lineHeight}',
      'relaxed': '${lineHeight + 0.25}',
    },
    letterSpacing: {
      'tight': '${letterSpacing - 0.025}em',
      'normal': '${letterSpacing}em',
      'wide': '${letterSpacing + 0.025}em',
    }
  }
}`;

  const jsonSettings = JSON.stringify(settings, null, 2);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const shareSettings = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('settings', encodeURIComponent(JSON.stringify(settings)));
    
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied('url');
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([cssVariables], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typography-scale.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'css', label: 'CSS Variables' },
    { id: 'tailwind', label: 'Tailwind Config' },
    { id: 'json', label: 'JSON Settings' }
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'css':
        return cssVariables;
      case 'tailwind':
        return tailwindConfig;
      case 'json':
        return jsonSettings;
      default:
        return cssVariables;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Download className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Export Settings
        </h2>
      </div>

      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(getContent(), activeTab)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {copied === activeTab ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied === activeTab ? 'Copied!' : 'Copy Code'}
          </button>

          <button
            onClick={downloadCSS}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Download CSS
          </button>

          <button
            onClick={shareSettings}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            {copied === 'url' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            {copied === 'url' ? 'URL Copied!' : 'Share URL'}
          </button>
        </div>

        {/* Format Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div className="relative">
          <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-800 dark:text-gray-200">
              {getContent()}
            </code>
          </pre>
          <button
            onClick={() => copyToClipboard(getContent(), `${activeTab}-inline`)}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            title="Copy to clipboard"
          >
            {copied === `${activeTab}-inline` ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Usage Instructions
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {activeTab === 'css' && 'Add these CSS variables to your stylesheet and use them with var(--variable-name).'}
            {activeTab === 'tailwind' && 'Add this configuration to your tailwind.config.js file to extend the default theme.'}
            {activeTab === 'json' && 'Save these settings to recreate this typography scale later or share with your team.'}
          </p>
        </div>
      </div>
    </div>
  );
}