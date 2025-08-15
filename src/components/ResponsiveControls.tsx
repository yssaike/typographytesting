import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { ResponsiveBreakpoint } from '../types/typography';

interface ResponsiveControlsProps {
  activeBreakpoint: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
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
  designMode,
  onBreakpointChange
}: ResponsiveControlsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
      {BREAKPOINTS.map((breakpoint) => {
        const Icon = BREAKPOINT_ICONS[breakpoint.name as keyof typeof BREAKPOINT_ICONS];
        return (
          <button
            key={breakpoint.name}
            onClick={() => onBreakpointChange(breakpoint.name)}
            className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full min-h-touch ${
              activeBreakpoint === breakpoint.name
                ? designMode === 'glass' 
                  ? 'glass-button bg-blue-500/80 text-white' 
                  : designMode === 'neuro'
                  ? 'neuro-button-primary text-white'
                  : 'hybrid-button bg-blue-500/80 text-white'
                : designMode === 'glass' 
                  ? 'glass-button text-white/80 hover:text-white' 
                  : designMode === 'neuro'
                  ? 'neuro-button text-gray-700 hover:text-gray-900'
                  : 'hybrid-button text-white/80 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1 text-left">{breakpoint.label}</span>
            <span className="text-xs opacity-75 hidden sm:inline typography-code">{breakpoint.width}px</span>
          </button>
        );
      })}
    </div>
  );
}