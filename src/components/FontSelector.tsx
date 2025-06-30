import React from 'react';
import { Type } from 'lucide-react';
import { FONT_FAMILIES, loadGoogleFont } from '../data/fonts';

interface FontSelectorProps {
  label: string;
  value: string;
  onChange: (font: string) => void;
}

export default function FontSelector({ label, value, onChange }: FontSelectorProps) {
  const handleFontChange = (font: string) => {
    loadGoogleFont(font);
    onChange(font);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Type className="h-4 w-4" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => handleFontChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        style={{ fontFamily: value }}
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}