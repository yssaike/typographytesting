import { TypographyScale } from '../types/typography';

export const SCALE_RATIOS = [
  { value: 1.067, label: 'Minor Second (1.067)' },
  { value: 1.125, label: 'Major Second (1.125)' },
  { value: 1.2, label: 'Minor Third (1.2)' },
  { value: 1.25, label: 'Major Third (1.25)' },
  { value: 1.333, label: 'Perfect Fourth (1.333)' },
  { value: 1.414, label: 'Augmented Fourth (1.414)' },
  { value: 1.5, label: 'Perfect Fifth (1.5)' },
  { value: 1.618, label: 'Golden Ratio (1.618)' }
];

export const calculateTypographyScale = (
  baseSize: number,
  scaleRatio: number,
  maxHeadingSize?: number
): TypographyScale => {
  const scale = {
    small: Math.round((baseSize / scaleRatio) * 100) / 100,
    body: baseSize,
    h6: Math.round((baseSize * scaleRatio) * 100) / 100,
    h5: Math.round((baseSize * Math.pow(scaleRatio, 2)) * 100) / 100,
    h4: Math.round((baseSize * Math.pow(scaleRatio, 3)) * 100) / 100,
    h3: Math.round((baseSize * Math.pow(scaleRatio, 4)) * 100) / 100,
    h2: Math.round((baseSize * Math.pow(scaleRatio, 5)) * 100) / 100,
    h1: Math.round((baseSize * Math.pow(scaleRatio, 6)) * 100) / 100
  };

  // Apply max heading size if specified
  if (maxHeadingSize && scale.h1 > maxHeadingSize) {
    const ratio = maxHeadingSize / scale.h1;
    scale.h1 = maxHeadingSize;
    scale.h2 = Math.round(scale.h2 * ratio * 100) / 100;
    scale.h3 = Math.round(scale.h3 * ratio * 100) / 100;
    scale.h4 = Math.round(scale.h4 * ratio * 100) / 100;
    scale.h5 = Math.round(scale.h5 * ratio * 100) / 100;
    scale.h6 = Math.round(scale.h6 * ratio * 100) / 100;
  }

  return scale;
};

export const generateCSSVariables = (
  scale: TypographyScale,
  primaryFont: string,
  secondaryFont: string,
  lineHeight: number,
  letterSpacing: number
): string => {
  return `/* Typography Scale CSS Variables */
:root {
  /* Font Families */
  --font-primary: "${primaryFont}", serif;
  --font-secondary: "${secondaryFont}", sans-serif;
  
  /* Font Sizes */
  --text-xs: ${scale.small}px;
  --text-base: ${scale.body}px;
  --text-lg: ${scale.h6}px;
  --text-xl: ${scale.h5}px;
  --text-2xl: ${scale.h4}px;
  --text-3xl: ${scale.h3}px;
  --text-4xl: ${scale.h2}px;
  --text-5xl: ${scale.h1}px;
  
  /* Line Heights */
  --leading-tight: ${lineHeight - 0.25};
  --leading-normal: ${lineHeight};
  --leading-relaxed: ${lineHeight + 0.25};
  
  /* Letter Spacing */
  --tracking-tight: ${letterSpacing - 0.025}em;
  --tracking-normal: ${letterSpacing}em;
  --tracking-wide: ${letterSpacing + 0.025}em;
}

/* Typography Classes */
.typography-h1 {
  font-family: var(--font-primary);
  font-size: var(--text-5xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  font-weight: 700;
}

.typography-h2 {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-normal);
  font-weight: 600;
}

.typography-h3 {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
  font-weight: 600;
}

.typography-body {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-normal);
  font-weight: 400;
}`;
};