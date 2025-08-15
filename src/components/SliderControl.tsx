import React from 'react';

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
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex justify-between items-center gap-2">
        <label className={`text-xs font-medium typography-caption ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
        }`}>
          {label}
        </label>
        <span className={`text-xs font-mono px-2 py-1 rounded flex-shrink-0 typography-code ${
          designMode === 'glass' 
            ? 'glass-card text-white' 
            : designMode === 'neuro'
            ? 'neuro-card text-gray-600'
            : 'hybrid-card text-white'
        }`}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        className={`w-full h-3 sm:h-2 rounded-lg appearance-none cursor-pointer touch-manipulation ${
          designMode === 'neuro' ? 'neuro-slider' : 'slider'
        }`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
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
        .slider {
          background: ${designMode === 'glass' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : '#e5e7eb'};
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