import React from 'react';
import { useAccessibility } from './AccessibilityProvider';

interface SliderControlProps {
  label: string;
  value: number;
  designMode: 'glass' | 'neuro' | 'hybrid';
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function SliderControl({
  label,
  value,
  designMode,
  min,
  max,
  step,
  unit = '',
  onChange
}: SliderControlProps) {
  const { announceToScreenReader } = useAccessibility();
  const sliderId = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const labelId = `${sliderId}-label`;
  const valueId = `${sliderId}-value`;

  const handleChange = (newValue: number) => {
    onChange(newValue);
    // Announce value changes for screen readers
    announceToScreenReader(`${label}: ${newValue}${unit}`, 'polite');
  };

  return (
    <div className="space-y-2 sm:space-y-3" role="group" aria-labelledby={labelId}>
      <div className="flex justify-between items-center gap-2">
        <label 
          id={labelId}
          htmlFor={sliderId}
          className={`text-xs font-medium typography-caption ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
        }`}>
          {label}
        </label>
        <span 
          id={valueId}
          className={`text-xs font-mono px-2 py-1 rounded flex-shrink-0 typography-code ${
          designMode === 'glass' 
            ? 'glass-card text-white' 
            : designMode === 'neuro'
            ? 'neuro-card text-gray-600'
            : 'hybrid-card text-white'
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {value}{unit}
        </span>
      </div>
      <input
        id={sliderId}
        type="range"
        role="slider"
        aria-labelledby={labelId}
        aria-describedby={valueId}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        className={`w-full h-3 sm:h-2 rounded-lg appearance-none cursor-pointer touch-manipulation ${
          designMode === 'neuro' ? 'neuro-slider' : 'slider'
        }`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
      />
      <style jsx>{`${
        designMode !== 'neuro' ? `
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${designMode === 'glass' ? 'rgba(59, 130, 246, 0.8)' : '#3b82f6'};
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: ${designMode === 'glass' 
            ? '0 4px 8px rgba(59, 130, 246, 0.3)' 
            : '0 1px 3px rgba(0, 0, 0, 0.1)'};
          touch-action: manipulation;
          backdrop-filter: ${designMode === 'glass' ? 'blur(4px)' : 'none'};
        }
        .slider::-webkit-slider-thumb:focus {
          outline: 3px solid var(--focus-ring-color);
          outline-offset: 2px;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${designMode === 'glass' ? 'rgba(59, 130, 246, 0.8)' : '#3b82f6'};
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: ${designMode === 'glass' 
            ? '0 4px 8px rgba(59, 130, 246, 0.3)' 
            : '0 1px 3px rgba(0, 0, 0, 0.1)'};
          touch-action: manipulation;
        }
        .slider::-moz-range-thumb:focus {
          outline: 3px solid var(--focus-ring-color);
          outline-offset: 2px;
        }
        .slider {
          background: ${designMode === 'glass' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : '#e5e7eb'};
        }
        .slider:focus {
          outline: 3px solid var(--focus-ring-color);
          outline-offset: 2px;
        }
        ` : ''}
        
        @media (max-width: 768px) {
          .slider::-webkit-slider-thumb {
            height: 24px;
            width: 24px;
          }
          .slider::-moz-range-thumb {
            height: 24px;
            width: 24px;
          }
        }
      `}</style>
    </div>
  );
}