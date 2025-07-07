import React from 'react';
import { Type, Search } from 'lucide-react';
import { FONT_FAMILIES, loadGoogleFont } from '../data/fonts';
import { COMPREHENSIVE_GOOGLE_FONTS } from '../data/googleFonts';

interface FontSelectorProps {
  label: string;
  value: string;
  onChange: (font: string) => void;
}

export default function FontSelector({ label, value, onChange }: FontSelectorProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  
  const filteredFonts = React.useMemo(() => {
    if (!searchQuery) return FONT_FAMILIES;
    return FONT_FAMILIES.filter(font => 
      font.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleFontChange = (font: string) => {
    loadGoogleFont(font);
    onChange(font);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getFontInfo = (fontFamily: string) => {
    return COMPREHENSIVE_GOOGLE_FONTS.find(font => font.family === fontFamily);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
        <Type className="h-3 w-3" />
        {label}
      </label>
      
      <div className="relative">
        {/* Current Selection Display */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex items-center justify-between"
          style={{ fontFamily: value }}
        >
          <span>{value}</span>
          <Search className="h-4 w-4 text-gray-400" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search fonts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-3 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Font List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredFonts.map((font) => {
                const fontInfo = getFontInfo(font);
                return (
                  <button
                    key={font}
                    onClick={() => handleFontChange(font)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                      value === font ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                    }`}
                    style={{ fontFamily: font }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{font}</span>
                      {fontInfo && (
                        <span className="text-xs text-gray-500 capitalize">
                          {fontInfo.category}
                        </span>
                      )}
                    </div>
                    {fontInfo && (
                      <div className="text-xs text-gray-500 mt-1 font-sans">
                        {fontInfo.description}
                      </div>
                    )}
                  </button>
                );
              })}
              
              {filteredFonts.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-gray-500">
                  No fonts found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Font Info */}
      {(() => {
        const fontInfo = getFontInfo(value);
        if (!fontInfo) return null;
        
        return (
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <span className="capitalize">{fontInfo.category}</span>
              <span>•</span>
              <span>{fontInfo.variants.length} weights</span>
              {fontInfo.year && (
                <>
                  <span>•</span>
                  <span>{fontInfo.year}</span>
                </>
              )}
            </div>
            <div className="text-gray-400">
              {fontInfo.description}
            </div>
          </div>
        );
      })()}
    </div>
  );
}