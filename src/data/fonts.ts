export const FONT_FAMILIES = [
  // Serif Fonts
  'Georgia',
  'Times New Roman',
  'serif',
  'Playfair Display',
  'Merriweather',
  'Lora',
  'Crimson Text',
  'Source Serif Pro',
  'PT Serif',
  'Libre Baskerville',
  
  // Sans-serif Fonts
  'Arial',
  'Helvetica',
  'sans-serif',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Nunito Sans',
  'Work Sans',
  'DM Sans',
  'Plus Jakarta Sans',
  
  // Monospace Fonts
  'Monaco',
  'Consolas',
  'monospace',
  'Fira Code',
  'Source Code Pro',
  'JetBrains Mono',
  
  // Display Fonts
  'Impact',
  'Oswald',
  'Bebas Neue',
  'Archivo Black'
];

export const GOOGLE_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Nunito Sans',
  'Work Sans',
  'DM Sans',
  'Plus Jakarta Sans',
  'Playfair Display',
  'Merriweather',
  'Lora',
  'Crimson Text',
  'Source Serif Pro',
  'PT Serif',
  'Libre Baskerville',
  'Fira Code',
  'Source Code Pro',
  'JetBrains Mono',
  'Oswald',
  'Bebas Neue',
  'Archivo Black'
];

export const loadGoogleFont = (fontFamily: string) => {
  if (!GOOGLE_FONTS.includes(fontFamily)) return;
  
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
  link.rel = 'stylesheet';
  
  // Remove existing font link if it exists
  const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/\s+/g, '+')}"]`);
  if (existingLink) {
    existingLink.remove();
  }
  
  document.head.appendChild(link);
};