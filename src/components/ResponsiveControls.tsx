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
    <div className="flex flex-col gap-2">
      {BREAKPOINTS.map((breakpoint) => {
        const Icon = BREAKPOINT_ICONS[breakpoint.name as keyof typeof BREAKPOINT_ICONS];
        return (
          <button
            key={breakpoint.name}
            onClick={() => onBreakpointChange(breakpoint.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
              activeBreakpoint === breakpoint.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1 text-left">{breakpoint.label}</span>
            <span className="text-xs opacity-75">{breakpoint.width}px</span>
          </button>
        );
      })}
    </div>
  );
}