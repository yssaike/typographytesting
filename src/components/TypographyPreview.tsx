import React from 'react';
import { TypographySettings } from '../types/typography';
import { SAMPLE_CONTENT } from '../data/content';

interface TypographyPreviewProps {
  settings: TypographySettings;
  breakpoint: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
  darkMode: boolean;
}

const BREAKPOINT_WIDTHS = {
  mobile: '100%',
  tablet: '100%',
  desktop: '100%'
};

const BREAKPOINT_MAX_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1200px'
};

export default function TypographyPreview({ settings, breakpoint, designMode, darkMode }: TypographyPreviewProps) {
  const headingStyle = {
    fontFamily: settings.headingFont,
    fontSize: `${Math.max(settings.headingSize * (breakpoint === 'mobile' ? 0.8 : breakpoint === 'tablet' ? 0.9 : 1), 24)}px`,
    fontWeight: settings.headingWeight,
    lineHeight: settings.headingLineHeight,
    letterSpacing: `${settings.headingLetterSpacing}px`,
  };

  const bodyStyle = {
    fontFamily: settings.bodyFont,
    fontSize: `${Math.max(settings.bodySize * (breakpoint === 'mobile' ? 0.9 : breakpoint === 'tablet' ? 0.95 : 1), 14)}px`,
    fontWeight: settings.bodyWeight,
    lineHeight: settings.lineHeight,
    letterSpacing: `${settings.letterSpacing}px`,
  };

  const subheadingStyle = {
    ...headingStyle,
    fontSize: `${Math.max(Math.round(settings.headingSize * 0.7 * (breakpoint === 'mobile' ? 0.8 : breakpoint === 'tablet' ? 0.9 : 1)), 18)}px`,
  };

  const pullQuoteStyle = {
    ...bodyStyle,
    fontSize: `${Math.max(Math.round(settings.bodySize * 1.25 * (breakpoint === 'mobile' ? 0.9 : breakpoint === 'tablet' ? 0.95 : 1)), 16)}px`,
    fontStyle: 'italic',
  };

  const captionStyle = {
    ...bodyStyle,
    fontSize: `${Math.max(Math.round(settings.bodySize * 0.85 * (breakpoint === 'mobile' ? 0.9 : breakpoint === 'tablet' ? 0.95 : 1)), 12)}px`,
    color: '#6b7280',
  };

  const containerWidth = BREAKPOINT_WIDTHS[breakpoint as keyof typeof BREAKPOINT_WIDTHS];
  const maxWidth = BREAKPOINT_MAX_WIDTHS[breakpoint as keyof typeof BREAKPOINT_MAX_WIDTHS];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
        <h2 className={`text-base sm:text-lg font-semibold typography-heading ${
          designMode === 'glass' || designMode === 'hybrid' ? 'text-white' : 'text-gray-900'
        }`}>Live Preview</h2>
        <div className={`text-xs sm:text-sm capitalize px-2 py-1 rounded typography-caption ${
          designMode === 'glass' 
            ? 'glass-card text-white' 
            : designMode === 'neuro'
            ? 'neuro-card text-gray-600'
            : 'hybrid-card text-white'
        }`}>
          {breakpoint} ({maxWidth})
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div 
          className={`mx-auto rounded-lg transition-all duration-300 ${
            designMode === 'glass' 
              ? 'glass-card' 
              : designMode === 'neuro'
              ? 'neuro-card bg-white'
              : 'hybrid-card bg-white/90'
          }`}
          style={{ 
            width: containerWidth,
            maxWidth: maxWidth,
            minHeight: '100%'
          }}
        >
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Title Frame - Always Visible */}
            <div className={`pb-4 sm:pb-6 border-b ${
              designMode === 'glass' || designMode === 'hybrid' 
                ? 'border-white/20' 
                : 'border-gray-100'
            }`}>
              <h1 style={headingStyle} className="text-gray-900 mb-2 sm:mb-3 leading-tight">
                {SAMPLE_CONTENT.headline}
              </h1>
              <h2 style={subheadingStyle} className="text-gray-600 leading-snug">
                {SAMPLE_CONTENT.subheading}
              </h2>
            </div>

            {/* Body Content */}
            <div className="space-y-4 sm:space-y-6">
              {SAMPLE_CONTENT.body.split('\n\n').slice(0, 2).map((paragraph, index) => (
                <p key={index} style={bodyStyle} className="text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pull Quote */}
            <blockquote className={`border-l-4 pl-4 sm:pl-6 my-4 sm:my-6 ${
              designMode === 'glass' || designMode === 'hybrid' 
                ? 'border-blue-300' 
                : 'border-blue-500'
            }`}>
              <p style={pullQuoteStyle} className="text-gray-700">
                "{SAMPLE_CONTENT.pullQuote}"
              </p>
            </blockquote>

            {/* More Body Content */}
            <div className="space-y-4 sm:space-y-6">
              {SAMPLE_CONTENT.body.split('\n\n').slice(2).map((paragraph, index) => (
                <p key={index + 2} style={bodyStyle} className="text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* UI Elements */}
            <div className={`space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t ${
              designMode === 'glass' || designMode === 'hybrid' 
                ? 'border-white/20' 
                : 'border-gray-100'
            }`}>
              <h3 style={subheadingStyle} className="text-gray-900">
                Interactive Elements
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <button 
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 text-white rounded-lg transition-colors min-h-touch w-full sm:w-auto ${
                    designMode === 'glass' 
                      ? 'glass-button bg-blue-500/80 hover:bg-blue-600/80' 
                      : designMode === 'neuro'
                      ? 'neuro-button-primary'
                      : 'hybrid-button bg-blue-500/80 hover:bg-blue-600/80'
                  }`}
                  style={{ fontFamily: settings.bodyFont, fontSize: `${settings.bodySize}px` }}
                >
                  Primary Button
                </button>
                
                <div className="space-y-1 sm:space-y-2">
                  <label style={captionStyle} className={`block font-medium typography-caption ${
                    designMode === 'glass' || designMode === 'hybrid' ? 'text-gray-600' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className={`w-full px-3 sm:px-4 py-2.5 rounded-lg min-h-touch ${
                      designMode === 'glass' 
                        ? 'glass-input' 
                        : designMode === 'neuro'
                        ? 'neuro-input'
                        : 'glass-input'
                    }`}
                    style={bodyStyle}
                  />
                </div>
                
                <a 
                  href="#" 
                  className={`underline inline-block transition-colors ${
                    designMode === 'glass' || designMode === 'hybrid' 
                      ? 'text-blue-300 hover:text-blue-200' 
                      : 'text-blue-500 hover:text-blue-600'
                  }`}
                  style={bodyStyle}
                >
                  This is a sample link
                </a>
              </div>
            </div>

            {/* Lists */}
            <div className="space-y-3 sm:space-y-4">
              <h4 style={subheadingStyle} className="text-gray-900">
                Typography Hierarchy
              </h4>
              <ul className="space-y-2 list-disc list-inside">
                <li style={bodyStyle} className="text-gray-800">
                  Primary heading for main titles
                </li>
                <li style={bodyStyle} className="text-gray-800">
                  Body text for readable content
                </li>
                <li style={bodyStyle} className="text-gray-800">
                  Consistent spacing and alignment
                </li>
              </ul>
            </div>

            {/* Caption */}
            <div className={`pt-4 sm:pt-6 border-t ${
              designMode === 'glass' || designMode === 'hybrid' 
                ? 'border-white/20' 
                : 'border-gray-100'
            }`}>
              <p style={captionStyle}>
                {SAMPLE_CONTENT.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}