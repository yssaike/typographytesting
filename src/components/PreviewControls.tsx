import React from 'react';
import { Monitor, Tablet, Smartphone, Moon, Sun, Palette } from 'lucide-react';

interface PreviewControlsProps {
  darkMode: boolean;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  backgroundColor: string;
  onDarkModeToggle: () => void;
  onBreakpointChange: (breakpoint: 'mobile' | 'tablet' | 'desktop') => void;
  onBackgroundColorChange: (color: string) => void;
}

export default function PreviewControls({
  darkMode,
  breakpoint,
  backgroundColor,
  onDarkModeToggle,
  onBreakpointChange,
  onBackgroundColorChange
}: PreviewControlsProps) {
  const breakpoints = [
    { value: 'mobile' as const, label: 'Mobile', icon: Smartphone, width: '375px' },
    { value: 'tablet' as const, label: 'Tablet', icon: Tablet, width: '768px' },
    { value: 'desktop' as const, label: 'Desktop', icon: Monitor, width: '1200px' }
  ];

  const backgroundColors = [
    { value: '#ffffff', label: 'White' },
    { value: '#f8fafc', label: 'Gray 50' },
    { value: '#f1f5f9', label: 'Gray 100' },
    { value: '#e2e8f0', label: 'Gray 200' },
    { value: '#1e293b', label: 'Gray 800' },
    { value: '#0f172a', label: 'Gray 900' },
    { value: '#fef3c7', label: 'Warm' },
    { value: '#ecfccb', label: 'Cool' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Monitor className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Preview Controls
        </h2>
      </div>

      <div className="space-y-6">
        {/* Responsive Breakpoints */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Viewport Size
          </label>
          <div className="flex gap-2">
            {breakpoints.map((bp) => {
              const Icon = bp.icon;
              return (
                <button
                  key={bp.value}
                  onClick={() => onBreakpointChange(bp.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    breakpoint === bp.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{bp.label}</span>
                  <span className="text-xs opacity-75">({bp.width})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Dark Mode
          </label>
          <button
            onClick={onDarkModeToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
            <span className="sr-only">Toggle dark mode</span>
          </button>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Background Color
            </label>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {backgroundColors.map((color) => (
              <button
                key={color.value}
                onClick={() => onBackgroundColorChange(color.value)}
                className={`relative h-10 w-full rounded-lg border-2 transition-all hover:scale-105 ${
                  backgroundColor === color.value
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.label}
              >
                {backgroundColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}