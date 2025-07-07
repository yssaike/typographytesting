import { COMPREHENSIVE_GOOGLE_FONTS } from './googleFonts';

// Extract font families from comprehensive list
export const FONT_FAMILIES = [
  // System fonts
  'Georgia',
  'Times New Roman',
  'serif',
  'Arial',
  'Helvetica',
  'sans-serif',
  'Monaco',
  'Consolas',
  'monospace',
  'Impact',
  // Google Fonts
  ...COMPREHENSIVE_GOOGLE_FONTS.map(font => font.family)
].sort();
export const GOOGLE_FONTS = COMPREHENSIVE_GOOGLE_FONTS.map(font => font.family);

export const loadGoogleFont = (fontFamily: string) => {
  const fontInfo = COMPREHENSIVE_GOOGLE_FONTS.find(font => font.family === fontFamily);
  if (!fontInfo) return;
  
  // Get available weights for this font
  const weights = [...new Set(fontInfo.variants.map(v => v.weight))].sort((a, b) => a - b);
  const hasItalics = fontInfo.variants.some(v => v.style === 'italic');
  
  let weightString = weights.join(';');
  if (hasItalics) {
    weightString += ';' + weights.map(w => `${w}i`).join(';');
  }
  
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@${weightString}&display=swap`;
  link.rel = 'stylesheet';
  
  // Remove existing font link if it exists
  const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/\s+/g, '+')}"]`);
  if (existingLink) {
    existingLink.remove();
  }
  
  document.head.appendChild(link);
};