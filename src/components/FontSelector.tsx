import React, { useState, useRef, useEffect } from 'react';
import { Type, Search, Clock, Star, ChevronDown } from 'lucide-react';
import { FONT_FAMILIES, loadGoogleFont } from '../data/fonts';
import { COMPREHENSIVE_GOOGLE_FONTS, GoogleFontInfo } from '../data/googleFonts';

interface FontSelectorProps {
  label: string;
  value: string;
  onChange: (font: string) => void;
}

// Web-safe fonts that don't need loading
const WEB_SAFE_FONTS = [
  'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 
  'Courier New', 'Impact', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black'
];

const FONT_CATEGORIES = [
  { id: 'web-safe', label: 'Web Safe Fonts', icon: '🔒' },
  { id: 'recent', label: 'Recently Used', icon: '🕒' },
  { id: 'popular', label: 'Popular', icon: '⭐' },
  { id: 'serif', label: 'Serif', icon: '📖' },
  { id: 'sans-serif', label: 'Sans Serif', icon: '🔤' },
  { id: 'display', label: 'Display', icon: '🎨' },
  { id: 'monospace', label: 'Monospace', icon: '💻' },
  { id: 'handwriting', label: 'Handwriting', icon: '✍️' }
];

export default function FontSelector({ label, value, onChange }: FontSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentFonts, setRecentFonts] = useState<string[]>([]);
  const [previewFont, setPreviewFont] = useState<string | null>(null);
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load recent fonts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentFonts');
    if (stored) {
      setRecentFonts(JSON.parse(stored));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setPreviewFont(null);
        setHoveredFont(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const getFontInfo = (fontFamily: string): GoogleFontInfo | null => {
    return COMPREHENSIVE_GOOGLE_FONTS.find(font => font.family === fontFamily) || null;
  };

  const addToRecentFonts = (fontFamily: string) => {
    const updated = [fontFamily, ...recentFonts.filter(f => f !== fontFamily)].slice(0, 8);
    setRecentFonts(updated);
    localStorage.setItem('recentFonts', JSON.stringify(updated));
  };

  const handleFontSelect = (font: string) => {
    if (!WEB_SAFE_FONTS.includes(font)) {
      loadGoogleFont(font);
    }
    addToRecentFonts(font);
    onChange(font);
    setIsOpen(false);
    setSearchQuery('');
    setPreviewFont(null);
    setHoveredFont(null);
  };

  const handleFontPreview = (font: string) => {
    setPreviewFont(font);
    setHoveredFont(font);
    if (!WEB_SAFE_FONTS.includes(font)) {
      loadGoogleFont(font);
    }
  };

  const getFilteredFonts = () => {
    let fonts: string[] = [];

    // Get fonts by category
    switch (selectedCategory) {
      case 'web-safe':
        fonts = WEB_SAFE_FONTS;
        break;
      case 'recent':
        fonts = recentFonts;
        break;
      case 'popular':
        fonts = COMPREHENSIVE_GOOGLE_FONTS
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20)
          .map(f => f.family);
        break;
      case 'serif':
      case 'sans-serif':
      case 'display':
      case 'monospace':
      case 'handwriting':
        fonts = COMPREHENSIVE_GOOGLE_FONTS
          .filter(font => font.category === selectedCategory)
          .map(f => f.family);
        break;
      default:
        // All fonts: web-safe first, then Google Fonts
        fonts = [...WEB_SAFE_FONTS, ...COMPREHENSIVE_GOOGLE_FONTS.map(f => f.family)];
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      fonts = fonts.filter(font => {
        const fontInfo = getFontInfo(font);
        return font.toLowerCase().includes(query) ||
               (fontInfo && (
                 fontInfo.description.toLowerCase().includes(query) ||
                 fontInfo.bestFor.some(use => use.toLowerCase().includes(query))
               ));
      });
    }

    return fonts;
  };

  const organizedFonts = () => {
    if (selectedCategory !== 'all') {
      return [{ category: selectedCategory, fonts: getFilteredFonts() }];
    }

    const sections = [];

    // Web-safe fonts first
    const webSafeFonts = WEB_SAFE_FONTS.filter(font => 
      !searchQuery || font.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (webSafeFonts.length > 0) {
      sections.push({ category: 'web-safe', fonts: webSafeFonts });
    }

    // Recent fonts
    if (recentFonts.length > 0 && !searchQuery) {
      sections.push({ category: 'recent', fonts: recentFonts });
    }

    // Popular Google Fonts
    const popularFonts = COMPREHENSIVE_GOOGLE_FONTS
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 15)
      .map(f => f.family)
      .filter(font => !searchQuery || font.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (popularFonts.length > 0) {
      sections.push({ category: 'popular', fonts: popularFonts });
    }

    // Other categories
    ['serif', 'sans-serif', 'display', 'monospace'].forEach(category => {
      const categoryFonts = COMPREHENSIVE_GOOGLE_FONTS
        .filter(font => font.category === category)
        .map(f => f.family)
        .filter(font => !searchQuery || font.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (categoryFonts.length > 0) {
        sections.push({ category, fonts: categoryFonts.slice(0, 10) });
      }
    });

    return sections;
  };

  const FontItem = ({ font, isWebSafe }: { font: string; isWebSafe: boolean }) => {
    const fontInfo = getFontInfo(font);
    const isSelected = value === font;
    const isHovered = hoveredFont === font;

    return (
      <button
        onClick={() => handleFontSelect(font)}
        onMouseEnter={() => handleFontPreview(font)}
        onMouseLeave={() => {
          setHoveredFont(null);
          setPreviewFont(null);
        }}
        className={`w-full px-4 py-3 text-left transition-all duration-200 border-l-4 ${
          isSelected 
            ? 'bg-blue-50 border-blue-500 text-blue-900' 
            : isHovered
            ? 'bg-gray-50 border-gray-300'
            : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div 
              className={`text-base font-medium truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}
              style={{ fontFamily: font }}
            >
              {font}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {isWebSafe && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Web Safe
                </span>
              )}
              {fontInfo && (
                <>
                  <span className="text-xs text-gray-500 capitalize">
                    {fontInfo.category}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {fontInfo.variants.length} weights
                  </span>
                  {fontInfo.popularity >= 90 && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    </>
                  )}
                </>
              )}
            </div>
            {fontInfo && (
              <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                {fontInfo.description}
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
        <Type className="h-3 w-3" />
        {label}
      </label>
      
      {/* Current Selection Display */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
          style={{ fontFamily: previewFont || value }}
        >
          <span className="truncate">{previewFont || value}</span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
            {/* Search and Category Filter */}
            <div className="p-3 border-b border-gray-200 space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search fonts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {FONT_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font List */}
            <div className="max-h-80 overflow-y-auto">
              {organizedFonts().map(section => (
                <div key={section.category}>
                  {selectedCategory === 'all' && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          {FONT_CATEGORIES.find(c => c.id === section.category)?.icon}
                          {FONT_CATEGORIES.find(c => c.id === section.category)?.label || section.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({section.fonts.length})
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {section.fonts.map(font => (
                    <FontItem 
                      key={font} 
                      font={font} 
                      isWebSafe={WEB_SAFE_FONTS.includes(font)}
                    />
                  ))}
                </div>
              ))}
              
              {organizedFonts().every(section => section.fonts.length === 0) && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No fonts found matching your search
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Font Preview Info */}
      {(previewFont || value) && (() => {
        const currentFont = previewFont || value;
        const fontInfo = getFontInfo(currentFont);
        const isWebSafe = WEB_SAFE_FONTS.includes(currentFont);
        
        return (
          <div className="text-xs text-gray-500 space-y-1 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 flex-wrap">
              {isWebSafe ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Web Safe Font
                </span>
              ) : fontInfo ? (
                <>
                  <span className="capitalize font-medium">{fontInfo.category}</span>
                  <span>•</span>
                  <span>{fontInfo.variants.length} weights</span>
                  {fontInfo.year && (
                    <>
                      <span>•</span>
                      <span>{fontInfo.year}</span>
                    </>
                  )}
                  {fontInfo.popularity >= 90 && (
                    <>
                      <span>•</span>
                      <Star className="h-3 w-3 text-yellow-500 fill-current inline" />
                      <span>Popular</span>
                    </>
                  )}
                </>
              ) : null}
            </div>
            
            {fontInfo && (
              <div className="text-gray-400">
                {fontInfo.description}
              </div>
            )}
            
            {/* Live Preview */}
            <div 
              className="text-lg text-gray-900 mt-2 p-2 bg-white rounded border"
              style={{ fontFamily: currentFont }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        );
      })()}
    </div>
  );
}