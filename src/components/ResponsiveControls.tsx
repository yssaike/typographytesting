import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { ResponsiveBreakpoint } from '../types/typography';

interface ResponsiveControlsProps {
  activeBreakpoint: string;
  darkMode: boolean;
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
  darkMode,
  onBreakpointChange
}: ResponsiveControlsProps) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-white/20 dark:border-white/10">
      {BREAKPOINTS.map((breakpoint, index) => {
        const IconComponent = BREAKPOINT_ICONS[breakpoint.name as keyof typeof BREAKPOINT_ICONS];
        const isActive = activeBreakpoint === breakpoint.name;
        
        return (
          <button
            key={breakpoint.name}
            onClick={() => onBreakpointChange(breakpoint.name)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-500 dark:bg-blue-600 text-white'
                : 'bg-white/10 dark:bg-white/5 text-white/80 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10'
            } ${index > 0 ? 'border-l border-white/20 dark:border-white/10' : ''}`}
          >
            <IconComponent size={16} />
            <span className="hidden sm:inline">{breakpoint.label}</span>
          </button>
        );
      })}
    </div>
  );
}