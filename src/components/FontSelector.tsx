import React, { useState } from 'react';
import { FONT_FAMILIES, loadGoogleFont } from '../data/fonts';

interface FontSelectorProps {
  label: string;
  value: string;
  darkMode: boolean;
  onChange: (font: string) => void;
}

export default function FontSelector({ label, value, darkMode, onChange }: FontSelectorProps) {
  const [previewFont, setPreviewFont] = useState<string | null>(null);

  const handleFontSelect = (font: string) => {
    loadGoogleFont(font);
    onChange(font);
  };

  const handleFontPreview = (font: string) => {
    setPreviewFont(font);
    loadGoogleFont(font);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2 text-white/80">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => handleFontSelect(e.target.value)}
        onMouseOver={(e) => {
          const target = e.target as HTMLSelectElement;
          if (target.value) handleFontPreview(target.value);
        }}
        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ fontFamily: previewFont || value }}
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font, color: 'black' }}>
            {font}
          </option>
        ))}
      </select>
      
      {/* Font Preview */}
      <div className="mt-3 p-3 rounded-md bg-black/20 border border-white/20">
        <div
          className="text-lg text-white"
          style={{ fontFamily: previewFont || value }}
        >
          The quick brown fox jumps over the lazy dog
        </div>
        <div className="text-xs text-white/60 mt-1">
          Preview: {previewFont || value}
        </div>
      </div>
    </div>
  );
}