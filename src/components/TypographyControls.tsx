import React from 'react';
import { Type, Sliders } from 'lucide-react';
import { SCALE_RATIOS } from '../utils/typographyScale';

interface TypographyControlsProps {
  baseSize: number;
  scaleRatio: number;
  maxHeadingSize: number;
  lineHeight: number;
  letterSpacing: number;
  onBaseSizeChange: (size: number) => void;
  onScaleRatioChange: (ratio: number) => void;
  onMaxHeadingSizeChange: (size: number) => void;
  onLineHeightChange: (height: number) => void;
  onLetterSpacingChange: (spacing: number) => void;
}

export default function TypographyControls({
  baseSize,
  scaleRatio,
  maxHeadingSize,
  lineHeight,
  letterSpacing,
  onBaseSizeChange,
  onScaleRatioChange,
  onMaxHeadingSizeChange,
  onLineHeightChange,
  onLetterSpacingChange
}: TypographyControlsProps) {
  const SliderControl = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    unit = ''
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    unit?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Typography Scale
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SliderControl
            label="Base Font Size"
            value={baseSize}
            onChange={onBaseSizeChange}
            min={12}
            max={24}
            step={0.5}
            unit="px"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Scale Ratio
            </label>
            <select
              value={scaleRatio}
              onChange={(e) => onScaleRatioChange(parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SCALE_RATIOS.map((ratio) => (
                <option key={ratio.value} value={ratio.value}>
                  {ratio.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <SliderControl
          label="Max Heading Size"
          value={maxHeadingSize}
          onChange={onMaxHeadingSizeChange}
          min={24}
          max={120}
          step={2}
          unit="px"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SliderControl
            label="Line Height"
            value={lineHeight}
            onChange={onLineHeightChange}
            min={1.0}
            max={2.0}
            step={0.05}
          />

          <SliderControl
            label="Letter Spacing"
            value={letterSpacing}
            onChange={onLetterSpacingChange}
            min={-0.05}
            max={0.1}
            step={0.005}
            unit="em"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}