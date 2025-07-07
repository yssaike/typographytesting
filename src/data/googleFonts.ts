export interface GoogleFontVariant {
  weight: number;
  style: 'normal' | 'italic';
}

export interface GoogleFontInfo {
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  variants: GoogleFontVariant[];
  subsets: string[];
  popularity: number;
  description: string;
  bestFor: string[];
  year?: number;
  designer?: string;
}

export const COMPREHENSIVE_GOOGLE_FONTS: GoogleFontInfo[] = [
  {
    family: 'Abel',
    category: 'sans-serif',
    variants: [{ weight: 400, style: 'normal' }],
    subsets: ['latin'],
    popularity: 75,
    description: 'A condensed, modern sans-serif with clean lines',
    bestFor: ['Headlines', 'Logos', 'Modern designs'],
    year: 2011,
    designer: 'MADType'
  },
  {
    family: 'Abril Fatface',
    category: 'display',
    variants: [{ weight: 400, style: 'normal' }],
    subsets: ['latin', 'latin-ext'],
    popularity: 82,
    description: 'A bold, high-contrast display font inspired by French Didot',
    bestFor: ['Headlines', 'Posters', 'Fashion', 'Editorial'],
    year: 2011,
    designer: 'TypeTogether'
  },
  {
    family: 'Aclonica',
    category: 'sans-serif',
    variants: [{ weight: 400, style: 'normal' }],
    subsets: ['latin'],
    popularity: 65,
    description: 'A strong, condensed sans-serif with geometric influences',
    bestFor: ['Headlines', 'Logos', 'Tech brands'],
    year: 2010
  },
  {
    family: 'Acme',
    category: 'sans-serif',
    variants: [{ weight: 400, style: 'normal' }],
    subsets: ['latin'],
    popularity: 70,
    description: 'A condensed sans-serif with a friendly, approachable feel',
    bestFor: ['Headlines', 'Casual designs', 'Youth brands'],
    year: 2011,
    designer: 'Huerta Tipográfica'
  },
  {
    family: 'Alegreya',
    category: 'serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
    popularity: 85,
    description: 'A calligraphic serif designed for literature and long texts',
    bestFor: ['Books', 'Literature', 'Long-form content', 'Academic texts'],
    year: 2011,
    designer: 'Huerta Tipográfica'
  },
  {
    family: 'Alegreya Sans',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
    popularity: 80,
    description: 'Humanist sans-serif companion to Alegreya',
    bestFor: ['Body text', 'UI design', 'Modern layouts'],
    year: 2013,
    designer: 'Huerta Tipográfica'
  },
  {
    family: 'Archivo',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 78,
    description: 'A grotesque sans-serif designed for headlines and display',
    bestFor: ['Headlines', 'Editorial', 'Modern designs'],
    year: 2019,
    designer: 'Omnibus-Type'
  },
  {
    family: 'Archivo Black',
    category: 'sans-serif',
    variants: [{ weight: 400, style: 'normal' }],
    subsets: ['latin', 'latin-ext'],
    popularity: 85,
    description: 'Ultra-bold version of Archivo, perfect for impact',
    bestFor: ['Headlines', 'Posters', 'Bold statements'],
    year: 2012,
    designer: 'Omnibus-Type'
  },
  {
    family: 'Arimo',
    category: 'sans-serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'hebrew', 'vietnamese'],
    popularity: 75,
    description: 'Metrically compatible with Arial, designed for Chrome OS',
    bestFor: ['Body text', 'UI design', 'Cross-platform compatibility'],
    year: 2010,
    designer: 'Steve Matteson'
  },
  {
    family: 'Barlow',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 88,
    description: 'A grotesk variable font superfamily with 54 styles',
    bestFor: ['Modern designs', 'Tech brands', 'UI/UX'],
    year: 2017,
    designer: 'Jeremy Tribby'
  },
  {
    family: 'Bebas Neue',
    category: 'display',
    variants: [{ weight: 400, style: 'normal' }],
    subsets: ['latin', 'latin-ext'],
    popularity: 92,
    description: 'A condensed display font with strong impact',
    bestFor: ['Headlines', 'Posters', 'Bold statements', 'Sports'],
    year: 2018,
    designer: 'Ryoichi Tsunekawa'
  },
  {
    family: 'Bitter',
    category: 'serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
    popularity: 82,
    description: 'A slab serif designed for comfortable reading on screens',
    bestFor: ['Body text', 'Reading', 'Editorial'],
    year: 2011,
    designer: 'Sol Matas'
  },
  {
    family: 'Crimson Text',
    category: 'serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 85,
    description: 'A serif font inspired by old-style typefaces',
    bestFor: ['Books', 'Academic texts', 'Traditional designs'],
    year: 2010,
    designer: 'Sebastian Kosch'
  },
  {
    family: 'DM Sans',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' },
      { weight: 1000, style: 'normal' },
      { weight: 1000, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext'],
    popularity: 90,
    description: 'A geometric sans-serif with low contrast and tall x-height',
    bestFor: ['UI design', 'Modern layouts', 'Digital products'],
    year: 2019,
    designer: 'Colophon Foundry'
  },
  {
    family: 'Fira Code',
    category: 'monospace',
    variants: [
      { weight: 300, style: 'normal' },
      { weight: 400, style: 'normal' },
      { weight: 500, style: 'normal' },
      { weight: 600, style: 'normal' },
      { weight: 700, style: 'normal' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext'],
    popularity: 95,
    description: 'Monospaced font with programming ligatures',
    bestFor: ['Code', 'Programming', 'Technical documentation'],
    year: 2014,
    designer: 'Nikita Prokopov'
  },
  {
    family: 'Fira Sans',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext'],
    popularity: 88,
    description: 'Humanist sans-serif designed for Firefox OS',
    bestFor: ['UI design', 'Body text', 'Modern layouts'],
    year: 2013,
    designer: 'Carrois Apostrophe'
  },
  {
    family: 'IBM Plex Sans',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 92,
    description: 'IBM\'s corporate typeface, designed for clarity and legibility',
    bestFor: ['Corporate', 'Tech brands', 'Professional documents'],
    year: 2017,
    designer: 'Mike Abbink'
  },
  {
    family: 'IBM Plex Serif',
    category: 'serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 85,
    description: 'Serif companion to IBM Plex Sans',
    bestFor: ['Editorial', 'Corporate documents', 'Traditional layouts'],
    year: 2017,
    designer: 'Mike Abbink'
  },
  {
    family: 'IBM Plex Mono',
    category: 'monospace',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 90,
    description: 'Monospace companion to IBM Plex family',
    bestFor: ['Code', 'Technical documentation', 'Data display'],
    year: 2017,
    designer: 'Mike Abbink'
  },
  {
    family: 'Inter',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 200, style: 'normal' },
      { weight: 300, style: 'normal' },
      { weight: 400, style: 'normal' },
      { weight: 500, style: 'normal' },
      { weight: 600, style: 'normal' },
      { weight: 700, style: 'normal' },
      { weight: 800, style: 'normal' },
      { weight: 900, style: 'normal' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
    popularity: 98,
    description: 'Designed specifically for user interfaces with excellent legibility',
    bestFor: ['UI design', 'Digital products', 'Modern layouts'],
    year: 2016,
    designer: 'Rasmus Andersson'
  },
  {
    family: 'JetBrains Mono',
    category: 'monospace',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek'],
    popularity: 95,
    description: 'Monospace font designed for developers by JetBrains',
    bestFor: ['Code', 'IDEs', 'Programming', 'Technical documentation'],
    year: 2020,
    designer: 'Philipp Nurullin'
  },
  {
    family: 'Lato',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext'],
    popularity: 96,
    description: 'Humanist sans-serif with warm, friendly characteristics',
    bestFor: ['Body text', 'Corporate', 'Friendly brands'],
    year: 2010,
    designer: 'Łukasz Dziedzic'
  },
  {
    family: 'Libre Baskerville',
    category: 'serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 700, style: 'normal' }
    ],
    subsets: ['latin', 'latin-ext'],
    popularity: 88,
    description: 'Web-optimized version of Baskerville for body text',
    bestFor: ['Books', 'Academic texts', 'Traditional designs'],
    year: 2012,
    designer: 'Impallari Type'
  },
  {
    family: 'Libre Franklin',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 82,
    description: 'Interpretation of Franklin Gothic with improved legibility',
    bestFor: ['Headlines', 'Editorial', 'Modern designs'],
    year: 2016,
    designer: 'Impallari Type'
  },
  {
    family: 'Lora',
    category: 'serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 92,
    description: 'Well-balanced serif with calligraphic roots',
    bestFor: ['Body text', 'Reading', 'Warm designs'],
    year: 2011,
    designer: 'Cyreal'
  },
  {
    family: 'Merriweather',
    category: 'serif',
    variants: [
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 90,
    description: 'Designed for optimal readability on screens',
    bestFor: ['Body text', 'Reading', 'Editorial'],
    year: 2010,
    designer: 'Sorkin Type'
  },
  {
    family: 'Montserrat',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 95,
    description: 'Geometric sans-serif inspired by urban typography',
    bestFor: ['Headlines', 'Modern designs', 'Branding'],
    year: 2011,
    designer: 'Julieta Ulanovsky'
  },
  {
    family: 'Nunito',
    category: 'sans-serif',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' },
      { weight: 1000, style: 'normal' },
      { weight: 1000, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 88,
    description: 'Rounded sans-serif with friendly appearance',
    bestFor: ['UI design', 'Friendly brands', 'Modern layouts'],
    year: 2014,
    designer: 'Vernon Adams'
  },
  {
    family: 'Nunito Sans',
    category: 'sans-serif',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' },
      { weight: 1000, style: 'normal' },
      { weight: 1000, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 90,
    description: 'Sans-serif version of Nunito with improved legibility',
    bestFor: ['Body text', 'UI design', 'Modern layouts'],
    year: 2016,
    designer: 'Vernon Adams'
  },
  {
    family: 'Open Sans',
    category: 'sans-serif',
    variants: [
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'hebrew', 'vietnamese'],
    popularity: 97,
    description: 'Humanist sans-serif with friendly and open curves',
    bestFor: ['Body text', 'UI design', 'Versatile use'],
    year: 2011,
    designer: 'Steve Matteson'
  },
  {
    family: 'Oswald',
    category: 'sans-serif',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 300, style: 'normal' },
      { weight: 400, style: 'normal' },
      { weight: 500, style: 'normal' },
      { weight: 600, style: 'normal' },
      { weight: 700, style: 'normal' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 93,
    description: 'Condensed sans-serif with strong vertical emphasis',
    bestFor: ['Headlines', 'Posters', 'Bold statements'],
    year: 2011,
    designer: 'Vernon Adams'
  },
  {
    family: 'Playfair Display',
    category: 'serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
    popularity: 94,
    description: 'High-contrast serif inspired by 18th century designs',
    bestFor: ['Headlines', 'Editorial', 'Elegant designs'],
    year: 2010,
    designer: 'Claus Eggers Sørensen'
  },
  {
    family: 'Plus Jakarta Sans',
    category: 'sans-serif',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 85,
    description: 'Modern geometric sans-serif with Indonesian influences',
    bestFor: ['Modern designs', 'Branding', 'Digital products'],
    year: 2020,
    designer: 'Gumpita Rahayu'
  },
  {
    family: 'Poppins',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'devanagari'],
    popularity: 96,
    description: 'Geometric sans-serif with rounded, friendly characteristics',
    bestFor: ['Modern designs', 'Friendly brands', 'Digital products'],
    year: 2014,
    designer: 'Indian Type Foundry'
  },
  {
    family: 'PT Sans',
    category: 'sans-serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
    popularity: 85,
    description: 'Humanist sans-serif designed for Russian language',
    bestFor: ['Body text', 'Multilingual content', 'Editorial'],
    year: 2010,
    designer: 'ParaType'
  },
  {
    family: 'PT Serif',
    category: 'serif',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
    popularity: 82,
    description: 'Transitional serif companion to PT Sans',
    bestFor: ['Body text', 'Traditional designs', 'Editorial'],
    year: 2010,
    designer: 'ParaType'
  },
  {
    family: 'Raleway',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext'],
    popularity: 90,
    description: 'Elegant sans-serif with thin weight options',
    bestFor: ['Headlines', 'Elegant designs', 'Fashion'],
    year: 2012,
    designer: 'Matt McInerney'
  },
  {
    family: 'Roboto',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
    popularity: 99,
    description: 'Neo-grotesque sans-serif with mechanical skeleton and friendly curves',
    bestFor: ['UI design', 'Digital products', 'Android apps'],
    year: 2011,
    designer: 'Christian Robertson'
  },
  {
    family: 'Roboto Mono',
    category: 'monospace',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'],
    popularity: 92,
    description: 'Monospace companion to Roboto',
    bestFor: ['Code', 'Technical documentation', 'Data display'],
    year: 2013,
    designer: 'Christian Robertson'
  },
  {
    family: 'Source Code Pro',
    category: 'monospace',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'],
    popularity: 88,
    description: 'Monospace font designed for coding environments',
    bestFor: ['Code', 'Programming', 'Technical documentation'],
    year: 2012,
    designer: 'Paul D. Hunt'
  },
  {
    family: 'Source Sans Pro',
    category: 'sans-serif',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
    popularity: 94,
    description: 'Sans-serif designed for user interfaces',
    bestFor: ['UI design', 'Body text', 'Professional documents'],
    year: 2010,
    designer: 'Paul D. Hunt'
  },
  {
    family: 'Source Serif Pro',
    category: 'serif',
    variants: [
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'],
    popularity: 85,
    description: 'Serif companion to Source Sans Pro',
    bestFor: ['Body text', 'Editorial', 'Traditional designs'],
    year: 2014,
    designer: 'Frank Grießhammer'
  },
  {
    family: 'Space Grotesk',
    category: 'sans-serif',
    variants: [
      { weight: 300, style: 'normal' },
      { weight: 400, style: 'normal' },
      { weight: 500, style: 'normal' },
      { weight: 600, style: 'normal' },
      { weight: 700, style: 'normal' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 88,
    description: 'Proportional variant of Space Mono',
    bestFor: ['Modern designs', 'Tech brands', 'Headlines'],
    year: 2020,
    designer: 'Florian Karsten'
  },
  {
    family: 'Space Mono',
    category: 'monospace',
    variants: [
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 85,
    description: 'Quirky monospace with unique character',
    bestFor: ['Code', 'Creative projects', 'Retro designs'],
    year: 2016,
    designer: 'Colophon Foundry'
  },
  {
    family: 'Work Sans',
    category: 'sans-serif',
    variants: [
      { weight: 100, style: 'normal' },
      { weight: 100, style: 'italic' },
      { weight: 200, style: 'normal' },
      { weight: 200, style: 'italic' },
      { weight: 300, style: 'normal' },
      { weight: 300, style: 'italic' },
      { weight: 400, style: 'normal' },
      { weight: 400, style: 'italic' },
      { weight: 500, style: 'normal' },
      { weight: 500, style: 'italic' },
      { weight: 600, style: 'normal' },
      { weight: 600, style: 'italic' },
      { weight: 700, style: 'normal' },
      { weight: 700, style: 'italic' },
      { weight: 800, style: 'normal' },
      { weight: 800, style: 'italic' },
      { weight: 900, style: 'normal' },
      { weight: 900, style: 'italic' }
    ],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    popularity: 90,
    description: 'Optimized for on-screen text at medium sizes',
    bestFor: ['Body text', 'UI design', 'Professional documents'],
    year: 2014,
    designer: 'Wei Huang'
  }
];

// Helper functions
export const getFontsByCategory = (category: string): GoogleFontInfo[] => {
  if (category === 'all') return COMPREHENSIVE_GOOGLE_FONTS;
  return COMPREHENSIVE_GOOGLE_FONTS.filter(font => font.category === category);
};

export const searchFonts = (query: string): GoogleFontInfo[] => {
  if (!query.trim()) return COMPREHENSIVE_GOOGLE_FONTS;
  const searchTerm = query.toLowerCase();
  return COMPREHENSIVE_GOOGLE_FONTS.filter(font => 
    font.family.toLowerCase().includes(searchTerm) ||
    font.description.toLowerCase().includes(searchTerm) ||
    font.bestFor.some(use => use.toLowerCase().includes(searchTerm))
  );
};

export const getPopularFonts = (limit: number = 20): GoogleFontInfo[] => {
  return COMPREHENSIVE_GOOGLE_FONTS
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getRecentFonts = (): GoogleFontInfo[] => {
  return COMPREHENSIVE_GOOGLE_FONTS
    .filter(font => font.year && font.year >= 2018)
    .sort((a, b) => (b.year || 0) - (a.year || 0));
};

export const getFontVariantString = (font: GoogleFontInfo): string => {
  const weights = [...new Set(font.variants.map(v => v.weight))].sort((a, b) => a - b);
  const hasItalics = font.variants.some(v => v.style === 'italic');
  
  if (hasItalics) {
    return `${weights.join(';')};${weights.map(w => `${w}i`).join(';')}`;
  }
  return weights.join(';');
};

export const loadGoogleFont = (fontInfo: GoogleFontInfo, specificWeights?: number[]): void => {
  const fontFamily = fontInfo.family.replace(/\s+/g, '+');
  const weights = specificWeights || [...new Set(fontInfo.variants.map(v => v.weight))];
  const hasItalics = fontInfo.variants.some(v => v.style === 'italic');
  
  let weightString = weights.join(';');
  if (hasItalics) {
    weightString += ';' + weights.map(w => `${w}i`).join(';');
  }
  
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weightString}&display=swap`;
  link.rel = 'stylesheet';
  
  // Remove existing font link if it exists
  const existingLink = document.querySelector(`link[href*="${fontFamily}"]`);
  if (existingLink) {
    existingLink.remove();
  }
  
  document.head.appendChild(link);
};