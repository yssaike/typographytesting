import React, { useState, useRef, useEffect } from 'react';
import { Type, Search, Clock, Star, ChevronDown } from 'lucide-react';
import { FONT_FAMILIES, loadGoogleFont } from '../data/fonts';
import { COMPREHENSIVE_GOOGLE_FONTS, GoogleFontInfo } from '../data/googleFonts';

interface FontSelectorProps {
  label: string;
  value: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
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

export default function FontSelector({ label, value, designMode, onChange }: FontSelectorProps) {
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
            ? designMode === 'glass' 
              ? 'glass-card border-blue-300 text-white' 
              : designMode === 'neuro'
              ? 'neuro-card bg-blue-50 border-blue-500 text-blue-900'
              : 'hybrid-card border-blue-300 text-white'
            : isHovered
            ? designMode === 'glass' 
              ? 'glass-card border-white/30'
              : designMode === 'neuro'
              ? 'neuro-card bg-gray-50 border-gray-300'
              : 'hybrid-card border-white/30'
            : designMode === 'glass' || designMode === 'hybrid'
            ? 'border-transparent hover:glass-card hover:border-white/20'
            : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div 
              className={`text-base font-medium truncate typography-subheading ${
                isSelected 
                  ? designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-blue-900'
                  : designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-900'
              }`}
              style={{ fontFamily: font }}
            >
              {font}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {isWebSafe && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium typography-code ${
                  designMode === 'glass' 
                    ? 'glass-card text-green-200' 
                    : designMode === 'neuro'
                    ? 'neuro-card bg-green-100 text-green-800'
                    : 'hybrid-card text-green-200'
                }`}>
                  Web Safe
                </span>
              )}
              {fontInfo && (
                <>
                  <span className={`text-xs capitalize typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {fontInfo.category}
                  </span>
                  <span className={`text-xs ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/50' : 'text-gray-400'
                  }`}>•</span>
                  <span className={`text-xs typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-white/70' : 'text-gray-500'
                  }`}>
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
              <div className={`text-xs mt-1 line-clamp-1 typography-body ${
                designMode === 'glass' || designMode === 'hybrid' ? 'text-white/60' : 'text-gray-500'
              }`}>
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
      <label className={`flex items-center gap-2 text-xs font-medium typography-caption ${
        designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
      }`}>
        <Type className="h-3 w-3" />
        {label}
      </label>
      
      {/* Current Selection Display */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-sm rounded-lg text-left flex items-center justify-between transition-colors ${
            designMode === 'glass' 
              ? 'glass-input' 
              : designMode === 'neuro'
              ? 'neuro-input'
              : 'glass-input'
          }`}
          style={{ fontFamily: previewFont || value }}
        >
          <span className={`truncate typography-body ${
            designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
          }`}>{previewFont || value}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${
            designMode === 'glass' || designMode === 'hybrid' ? 'text-white/60' : 'text-gray-400'
          }`} />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden ${
            designMode === 'glass' 
              ? 'glass-card' 
              : designMode === 'neuro'
              ? 'neuro-card bg-white'
              : 'hybrid-card bg-white/95'
          }`}>
            {/* Search and Category Filter */}
            <div className={`p-3 space-y-3 border-b ${
              designMode === 'glass' || designMode === 'hybrid' 
                ? 'border-white/20' 
                : 'border-gray-200'
            }`}>
              {/* Search Input */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  designMode === 'glass' || designMode === 'hybrid' ? 'text-white/60' : 'text-gray-400'
                }`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search fonts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg ${
                    designMode === 'glass' 
                      ? 'glass-input' 
                      : designMode === 'neuro'
                      ? 'neuro-input'
                      : 'glass-input'
                  }`}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    selectedCategory === 'all'
                      ? designMode === 'glass' 
                        ? 'glass-button bg-blue-500/80 text-white' 
                        : designMode === 'neuro'
                        ? 'neuro-button-primary text-white'
                        : 'hybrid-button bg-blue-500/80 text-white'
                      : designMode === 'glass' || designMode === 'hybrid'
                        ? 'glass-button text-white/80 hover:text-white'
                        : 'neuro-button text-gray-700 hover:text-gray-900'
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
                        ? designMode === 'glass' 
                          ? 'glass-button bg-blue-500/80 text-white' 
                          : designMode === 'neuro'
                          ? 'neuro-button-primary text-white'
                          : 'hybrid-button bg-blue-500/80 text-white'
                        : designMode === 'glass' || designMode === 'hybrid'
                          ? 'glass-button text-white/80 hover:text-white'
                          : 'neuro-button text-gray-700 hover:text-gray-900'
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
                    <div className={`px-4 py-2 border-b ${
                      designMode === 'glass' 
                        ? 'glass-card bg-white/5 border-white/10' 
                        : designMode === 'neuro'
                        ? 'neuro-card bg-gray-50 border-gray-100'
                        : 'hybrid-card bg-white/5 border-white/10'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold uppercase tracking-wide typography-caption ${
                          designMode === 'glass' || designMode === 'hybrid' ? 'text-white/90' : 'text-gray-700'
                        }`}>
                          {FONT_CATEGORIES.find(c => c.id === section.category)?.icon}
                          {FONT_CATEGORIES.find(c => c.id === section.category)?.label || section.category}
                        </span>
                        <span className={`text-xs typography-caption ${
                          designMode === 'glass' || designMode === 'hybrid' ? 'text-white/70' : 'text-gray-500'
                        }`}>
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
                <div className={`px-4 py-8 text-center text-sm ${
                  designMode === 'glass' || designMode === 'hybrid' ? 'text-white/60' : 'text-gray-500'
                }`}>
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <span className="typography-body">No fonts found matching your search</span>
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
          <div className={`text-xs space-y-1 p-3 rounded-lg ${
            designMode === 'glass' 
              ? 'glass-card text-white/80' 
              : designMode === 'neuro'
              ? 'neuro-card bg-gray-50 text-gray-500'
              : 'hybrid-card text-white/80'
          }`}>
            <div className="flex items-center gap-2 flex-wrap">
              {isWebSafe ? (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium typography-code ${
                  designMode === 'glass' 
                    ? 'glass-card text-green-200' 
                    : designMode === 'neuro'
                    ? 'neuro-card bg-green-100 text-green-800'
                    : 'hybrid-card text-green-200'
                }`}>
                  Web Safe Font
                </span>
              ) : fontInfo ? (
                <>
                  <span className="capitalize font-medium typography-caption">{fontInfo.category}</span>
                  <span>•</span>
                  <span className="typography-caption">{fontInfo.variants.length} weights</span>
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
                      <span className="typography-caption">Popular</span>
                    </>
                  )}
                </>
              ) : null}
            </div>
            
            {fontInfo && (
              <div className={`typography-body ${
                designMode === 'glass' || designMode === 'hybrid' ? 'text-white/60' : 'text-gray-400'
              }`}>
                {fontInfo.description}
              </div>
            )}
            
            {/* Live Preview */}
            <div 
              className={`text-lg mt-2 p-2 rounded border typography-body ${
                designMode === 'glass' 
                  ? 'glass-card text-white border-white/20' 
                  : designMode === 'neuro'
                  ? 'neuro-card bg-white text-gray-900 border-gray-200'
                  : 'hybrid-card bg-white/90 text-gray-900 border-white/20'
              }`}
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