import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { ResponsiveBreakpoint } from '../types/typography';

interface ResponsiveControlsProps {
  activeBreakpoint: string;
  onBreakpointChange: (breakpoint: string) => void;
}

const BREAKPOINTS: ResponsiveBreakpoint[] = [
  { name: 'mobile', width: 375, label: 'Mobile' },
  { name: 'tablet', width: 768, label: 'Tablet' },
  { name: 'desktop', width: 1200, label: 'Desktop' }
];

const BREAKPOINT_ICONS = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor
};

export default function ResponsiveControls({
  activeBreakpoint,
  onBreakpointChange
}: ResponsiveControlsProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Responsive Preview
      </label>
      <div className="flex gap-2">
        {BREAKPOINTS.map((breakpoint) => {
          const Icon = BREAKPOINT_ICONS[breakpoint.name as keyof typeof BREAKPOINT_ICONS];
          return (
            <button
              key={breakpoint.name}
              onClick={() => onBreakpointChange(breakpoint.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeBreakpoint === breakpoint.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{breakpoint.label}</span>
              <span className="text-xs opacity-75">({breakpoint.width}px)</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}