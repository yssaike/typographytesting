import { GoogleFont, FontPairing } from '../types/typography';

const GOOGLE_FONTS_API_KEY = 'AIzaSyC8YJhqFGNpKySTpJJ4A3WV3qHlRGzXoqs'; // Demo key - replace with actual

// Popular font categories for filtering
export const FONT_CATEGORIES = [
  { value: 'all', label: 'All Fonts' },
  { value: 'serif', label: 'Serif' },
  { value: 'sans-serif', label: 'Sans Serif' },
  { value: 'display', label: 'Display' },
  { value: 'handwriting', label: 'Handwriting' },
  { value: 'monospace', label: 'Monospace' }
];

// Curated font pairings for recommendations
export const FONT_PAIRINGS: FontPairing[] = [
  {
    primary: 'Playfair Display',
    secondary: 'Source Sans Pro',
    name: 'Classic Editorial',
    description: 'Elegant serif with clean sans-serif'
  },
  {
    primary: 'Montserrat',
    secondary: 'Open Sans',
    name: 'Modern Professional',
    description: 'Geometric sans with friendly readability'
  },
  {
    primary: 'Lora',
    secondary: 'Nunito Sans',
    name: 'Warm & Friendly',
    description: 'Approachable serif with rounded sans'
  },
  {
    primary: 'Oswald',
    secondary: 'PT Sans',
    name: 'Bold Impact',
    description: 'Strong display with neutral body'
  },
  {
    primary: 'Crimson Text',
    secondary: 'Work Sans',
    name: 'Academic',
    description: 'Traditional serif with modern sans'
  },
  {
    primary: 'Poppins',
    secondary: 'Inter',
    name: 'Tech Modern',
    description: 'Geometric precision with UI optimization'
  }
];

// Popular Google Fonts (fallback if API fails)
export const POPULAR_FONTS: GoogleFont[] = [
  { family: 'Inter', variants: ['400', '500', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 100 },
  { family: 'Roboto', variants: ['300', '400', '500', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 99 },
  { family: 'Open Sans', variants: ['400', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 98 },
  { family: 'Lato', variants: ['400', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 97 },
  { family: 'Montserrat', variants: ['400', '500', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 96 },
  { family: 'Poppins', variants: ['400', '500', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 95 },
  { family: 'Source Sans Pro', variants: ['400', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 94 },
  { family: 'Playfair Display', variants: ['400', '500', '600', '700'], subsets: ['latin'], category: 'serif', popularity: 93 },
  { family: 'Lora', variants: ['400', '500', '600', '700'], subsets: ['latin'], category: 'serif', popularity: 92 },
  { family: 'Nunito Sans', variants: ['400', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 91 },
  { family: 'Work Sans', variants: ['400', '500', '600'], subsets: ['latin'], category: 'sans-serif', popularity: 90 },
  { family: 'PT Sans', variants: ['400', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 89 },
  { family: 'Crimson Text', variants: ['400', '600'], subsets: ['latin'], category: 'serif', popularity: 88 },
  { family: 'Oswald', variants: ['400', '500', '600'], subsets: ['latin'], category: 'sans-serif', popularity: 87 }
];

export const loadGoogleFont = (fontFamily: string, weights: string[] = ['400', '500', '600', '700']) => {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@${weights.join(';')}&display=swap`;
  link.rel = 'stylesheet';
  
  // Remove existing font link if it exists
  const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/\s+/g, '+')}"]`);
  if (existingLink) {
    existingLink.remove();
  }
  
  document.head.appendChild(link);
};

export const getFontsByCategory = (fonts: GoogleFont[], category: string): GoogleFont[] => {
  if (category === 'all') return fonts;
  return fonts.filter(font => font.category === category);
};

export const searchFonts = (fonts: GoogleFont[], query: string): GoogleFont[] => {
  if (!query.trim()) return fonts;
  const searchTerm = query.toLowerCase();
  return fonts.filter(font => 
    font.family.toLowerCase().includes(searchTerm)
  );
};