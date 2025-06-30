export interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  headingSize: number;
  bodySize: number;
  headingWeight: number;
  bodyWeight: number;
  lineHeight: number;
  letterSpacing: number;
  headingLineHeight: number;
  headingLetterSpacing: number;
}

export interface ResponsiveBreakpoint {
  name: string;
  width: number;
  label: string;
}

export interface SampleContent {
  headline: string;
  subheading: string;
  body: string;
  pullQuote: string;
  caption: string;
}