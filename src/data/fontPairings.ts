export interface FontPairing {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  headingCategory: 'serif' | 'sans-serif' | 'display' | 'monospace';
  bodyCategory: 'serif' | 'sans-serif' | 'display' | 'monospace';
  description: string;
  reasoning: string;
  mood: string;
  useCase: string[];
}

export const CURATED_FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'classic-editorial',
    name: 'Classic Editorial',
    headingFont: 'Playfair Display',
    bodyFont: 'Source Sans Pro',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
    description: 'Elegant serif headlines with clean, readable body text',
    reasoning: 'The high contrast and dramatic serifs of Playfair Display create strong visual hierarchy, while Source Sans Pro provides excellent readability without competing for attention.',
    mood: 'Sophisticated, Editorial, Trustworthy',
    useCase: ['Magazines', 'Blogs', 'News Sites', 'Professional Services']
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
    description: 'Unified modern sans-serif for clean, technical aesthetics',
    reasoning: 'Inter was designed specifically for user interfaces with excellent legibility at all sizes. Using different weights creates hierarchy while maintaining consistency.',
    mood: 'Clean, Modern, Technical',
    useCase: ['SaaS Products', 'Tech Companies', 'Apps', 'Dashboards']
  },
  {
    id: 'warm-friendly',
    name: 'Warm & Friendly',
    headingFont: 'Lora',
    bodyFont: 'Open Sans',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
    description: 'Approachable serif with friendly, rounded sans-serif',
    reasoning: 'Lora\'s calligraphic nature adds warmth and personality, while Open Sans is highly legible and has friendly, rounded characteristics that complement the serif.',
    mood: 'Approachable, Warm, Inviting',
    useCase: ['Lifestyle Blogs', 'Healthcare', 'Education', 'Non-profits']
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    headingFont: 'Oswald',
    bodyFont: 'Lato',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
    description: 'Strong, condensed headlines with balanced body text',
    reasoning: 'Oswald\'s condensed, bold nature creates strong impact for headlines, while Lato\'s humanist qualities provide warmth and readability for body text.',
    mood: 'Bold, Confident, Impactful',
    useCase: ['Sports', 'News', 'Marketing', 'Events']
  },
  {
    id: 'elegant-luxury',
    name: 'Elegant Luxury',
    headingFont: 'Crimson Text',
    bodyFont: 'Nunito Sans',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
    description: 'Traditional serif elegance with modern sans-serif clarity',
    reasoning: 'Crimson Text brings classical elegance and readability, while Nunito Sans offers modern clarity with subtle rounded edges that soften the overall feel.',
    mood: 'Elegant, Refined, Luxurious',
    useCase: ['Luxury Brands', 'Fashion', 'Fine Dining', 'Art Galleries']
  },
  {
    id: 'geometric-precision',
    name: 'Geometric Precision',
    headingFont: 'Montserrat',
    bodyFont: 'Work Sans',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
    description: 'Geometric headlines with optimized body text',
    reasoning: 'Montserrat\'s geometric precision creates strong, modern headlines, while Work Sans was optimized for on-screen reading with excellent legibility.',
    mood: 'Modern, Precise, Professional',
    useCase: ['Architecture', 'Design Studios', 'Corporate', 'Portfolios']
  },
  {
    id: 'academic-scholarly',
    name: 'Academic Scholarly',
    headingFont: 'Libre Baskerville',
    bodyFont: 'Source Sans Pro',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
    description: 'Traditional serif authority with modern readability',
    reasoning: 'Libre Baskerville provides traditional academic authority and gravitas, while Source Sans Pro ensures excellent readability for long-form content.',
    mood: 'Scholarly, Authoritative, Traditional',
    useCase: ['Universities', 'Research', 'Legal', 'Publishing']
  },
  {
    id: 'creative-artistic',
    name: 'Creative Artistic',
    headingFont: 'Poppins',
    bodyFont: 'DM Sans',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
    description: 'Rounded, friendly headlines with clean body text',
    reasoning: 'Poppins\' geometric yet friendly nature creates approachable headlines, while DM Sans provides excellent readability with subtle character.',
    mood: 'Creative, Friendly, Approachable',
    useCase: ['Creative Agencies', 'Startups', 'Personal Brands', 'Portfolios']
  },
  {
    id: 'minimal-zen',
    name: 'Minimal Zen',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Plus Jakarta Sans',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
    description: 'Unified minimal sans-serif for clean aesthetics',
    reasoning: 'Plus Jakarta Sans offers excellent versatility across weights and sizes, creating a cohesive, minimal aesthetic perfect for modern designs.',
    mood: 'Minimal, Clean, Zen',
    useCase: ['Wellness', 'Meditation Apps', 'Minimal Brands', 'Lifestyle']
  },
  {
    id: 'editorial-magazine',
    name: 'Editorial Magazine',
    headingFont: 'Merriweather',
    bodyFont: 'Lato',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
    description: 'Readable serif headlines with versatile body text',
    reasoning: 'Merriweather was designed for optimal screen reading while maintaining serif elegance, paired with Lato\'s humanist warmth for comfortable body text.',
    mood: 'Editorial, Readable, Professional',
    useCase: ['Online Magazines', 'Long-form Content', 'Journalism', 'Blogs']
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    headingFont: 'Roboto',
    bodyFont: 'Roboto',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
    description: 'Google\'s versatile font family for digital products',
    reasoning: 'Roboto\'s mechanical skeleton with friendly curves makes it perfect for digital interfaces, offering excellent legibility across all devices and sizes.',
    mood: 'Digital, Friendly, Reliable',
    useCase: ['Mobile Apps', 'Web Apps', 'Tech Products', 'Digital Services']
  },
  {
    id: 'artisan-craft',
    name: 'Artisan Craft',
    headingFont: 'PT Serif',
    bodyFont: 'PT Sans',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
    description: 'Harmonious serif and sans-serif from the same family',
    reasoning: 'PT Serif and PT Sans were designed as a harmonious pair, sharing similar proportions and characteristics while offering serif/sans-serif contrast.',
    mood: 'Harmonious, Crafted, Balanced',
    useCase: ['Artisan Brands', 'Craft Businesses', 'Traditional Industries', 'Heritage Brands']
  }
];

export const getRandomFontPairing = (): FontPairing => {
  const randomIndex = Math.floor(Math.random() * CURATED_FONT_PAIRINGS.length);
  return CURATED_FONT_PAIRINGS[randomIndex];
};

export const getFontPairingById = (id: string): FontPairing | undefined => {
  return CURATED_FONT_PAIRINGS.find(pairing => pairing.id === id);
};