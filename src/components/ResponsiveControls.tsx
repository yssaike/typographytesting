import React from 'react';
import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
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
  const buttonVariant = designMode === 'glass' ? 'glass' : designMode === 'neuro' ? 'neuro' : 'outline';

  return (
    <ButtonGroup isAttached w="full" variant={buttonVariant}>
      {BREAKPOINTS.map((breakpoint) => {
        const IconComponent = BREAKPOINT_ICONS[breakpoint.name as keyof typeof BREAKPOINT_ICONS];
        return (
          <Button
            key={breakpoint.name}
            onClick={() => onBreakpointChange(breakpoint.name)}
            colorScheme={activeBreakpoint === breakpoint.name ? 'brand' : 'gray'}
            variant={activeBreakpoint === breakpoint.name ? 'solid' : buttonVariant}
            flex={1}
            leftIcon={<Icon as={IconComponent} />}
            size="sm"
          >
            {breakpoint.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}