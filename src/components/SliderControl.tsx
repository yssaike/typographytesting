import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  darkMode: boolean;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function SliderControl({
  label,
  value,
  darkMode,
  min,
  max,
  step,
  unit = '',
  onChange
}: SliderControlProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-white/80">
          {label}
        </label>
        <span className="text-sm font-mono px-2 py-1 rounded-md bg-black/20 text-white/80">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
      />
    </div>
  );
}