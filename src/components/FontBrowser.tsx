import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Download, Eye, Info } from 'lucide-react';
import { GoogleFontInfo, getFontsByCategory, searchFonts, getPopularFonts, getRecentFonts, loadGoogleFont } from '../data/googleFonts';

interface FontBrowserProps {
  onFontSelect: (fontFamily: string) => void;
  selectedFont?: string;
}

export default function FontBrowser({ onFontSelect, selectedFont }: FontBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'popular' | 'recent' | 'all'>('popular');
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [previewSize, setPreviewSize] = useState(24);
  const [expandedFont, setExpandedFont] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Fonts' },
    { value: 'serif', label: 'Serif' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'display', label: 'Display' },
    { value: 'handwriting', label: 'Handwriting' },
    { value: 'monospace', label: 'Monospace' }
  ];

  const filteredFonts = useMemo(() => {
    let fonts: GoogleFontInfo[] = [];
    
    switch (viewMode) {
      case 'popular':
        fonts = getPopularFonts(50);
        break;
      case 'recent':
        fonts = getRecentFonts();
        break;
      case 'all':
      default:
        fonts = getFontsByCategory(selectedCategory);
        break;
    }

    if (searchQuery) {
      fonts = searchFonts(searchQuery).filter(font => 
        selectedCategory === 'all' || font.category === selectedCategory
      );
    }

    return fonts;
  }, [searchQuery, selectedCategory, viewMode]);

  const handleFontSelect = (font: GoogleFontInfo) => {
    loadGoogleFont(font, [400, 500, 600, 700]);
    onFontSelect(font.family);
  };

  const toggleFontDetails = (fontFamily: string) => {
    setExpandedFont(expandedFont === fontFamily ? null : fontFamily);
  };

  const FontCard = ({ font }: { font: GoogleFontInfo }) => {
    const isSelected = selectedFont === font.family;
    const isExpanded = expandedFont === font.family;

    return (
      <div className={`bg-white rounded-lg border transition-all duration-200 ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}>
        <div className="p-4">
          {/* Font Preview */}
          <div 
            className="mb-3 cursor-pointer"
            onClick={() => handleFontSelect(font)}
          >
            <div 
              className="text-gray-900 leading-tight"
              style={{ 
                fontFamily: font.family,
                fontSize: `${previewSize}px`,
                fontWeight: 400
              }}
            >
              {previewText}
            </div>
          </div>

          {/* Font Info */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{font.family}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="capitalize">{font.category}</span>
                <span>•</span>
                <span>{font.variants.length} styles</span>
                {font.year && (
                  <>
                    <span>•</span>
                    <span>{font.year}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3 w-3" />
                <span>{font.popularity}</span>
              </div>
              <button
                onClick={() => toggleFontDetails(font.family)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Font Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleFontSelect(font)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isSelected ? 'Selected' : 'Select Font'}
            </button>
            <button
              onClick={() => {
                loadGoogleFont(font);
                // Trigger download of font CSS
                const link = document.createElement('a');
                link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/\s+/g, '+')}:wght@${font.variants.map(v => v.weight).join(';')}&display=swap`;
                link.download = `${font.family.replace(/\s+/g, '-')}.css`;
                link.click();
              }}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Download font CSS"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Description</h4>
                <p className="text-xs text-gray-600">{font.description}</p>
              </div>

              {font.designer && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-1">Designer</h4>
                  <p className="text-xs text-gray-600">{font.designer}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Best For</h4>
                <div className="flex flex-wrap gap-1">
                  {font.bestFor.map((use, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Available Weights</h4>
                <div className="flex flex-wrap gap-1">
                  {[...new Set(font.variants.map(v => v.weight))].sort((a, b) => a - b).map(weight => (
                    <span 
                      key={weight}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono"
                    >
                      {weight}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Language Support</h4>
                <div className="flex flex-wrap gap-1">
                  {font.subsets.map(subset => (
                    <span 
                      key={subset}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {subset}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weight Previews */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Weight Examples</h4>
                <div className="space-y-1">
                  {[...new Set(font.variants.map(v => v.weight))].sort((a, b) => a - b).slice(0, 4).map(weight => (
                    <div key={weight} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-8 font-mono">{weight}</span>
                      <span 
                        className="text-sm text-gray-900"
                        style={{ 
                          fontFamily: font.family,
                          fontWeight: weight
                        }}
                      >
                        The quick brown fox
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">Font Browser</h2>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* View Mode */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {[
              { value: 'popular', label: 'Popular' },
              { value: 'recent', label: 'Recent' },
              { value: 'all', label: 'All' }
            ].map(mode => (
              <button
                key={mode.value}
                onClick={() => setViewMode(mode.value as any)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  viewMode === mode.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Preview Controls */}
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Preview text..."
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Size:</label>
            <input
              type="range"
              min="12"
              max="48"
              value={previewSize}
              onChange={(e) => setPreviewSize(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-xs text-gray-600 w-8">{previewSize}px</span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          {filteredFonts.length} fonts found
        </p>
      </div>

      {/* Font Grid */}
      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {filteredFonts.map(font => (
          <FontCard key={font.family} font={font} />
        ))}
      </div>

      {filteredFonts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No fonts found matching your criteria</p>
        </div>
      )}
    </div>
  );
}