import React from 'react';
import { TypographySettings } from '../types/typography';
import { SAMPLE_CONTENT } from '../data/content';

interface TypographyPreviewProps {
  settings: TypographySettings;
  breakpoint: string;
}

const BREAKPOINT_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%'
};

export default function TypographyPreview({ settings, breakpoint }: TypographyPreviewProps) {
  const headingStyle = {
    fontFamily: settings.headingFont,
    fontSize: `${settings.headingSize}px`,
    fontWeight: settings.headingWeight,
    lineHeight: settings.headingLineHeight,
    letterSpacing: `${settings.headingLetterSpacing}px`,
  };

  const bodyStyle = {
    fontFamily: settings.bodyFont,
    fontSize: `${settings.bodySize}px`,
    fontWeight: settings.bodyWeight,
    lineHeight: settings.lineHeight,
    letterSpacing: `${settings.letterSpacing}px`,
  };

  const subheadingStyle = {
    ...headingStyle,
    fontSize: `${Math.round(settings.headingSize * 0.7)}px`,
  };

  const pullQuoteStyle = {
    ...bodyStyle,
    fontSize: `${Math.round(settings.bodySize * 1.25)}px`,
    fontStyle: 'italic',
  };

  const captionStyle = {
    ...bodyStyle,
    fontSize: `${Math.round(settings.bodySize * 0.85)}px`,
    color: '#6b7280',
  };

  const containerWidth = BREAKPOINT_WIDTHS[breakpoint as keyof typeof BREAKPOINT_WIDTHS];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Typography Preview</h2>
        <div className="text-sm text-gray-500 capitalize">
          {breakpoint} View ({containerWidth})
        </div>
      </div>

      <div 
        className="mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden"
        style={{ 
          width: containerWidth,
          maxWidth: '100%',
          minHeight: '600px'
        }}
      >
        <div className="p-8 space-y-8">
          {/* Headline */}
          <div>
            <h1 style={headingStyle} className="text-gray-900 mb-4">
              {SAMPLE_CONTENT.headline}
            </h1>
            <h2 style={subheadingStyle} className="text-gray-600">
              {SAMPLE_CONTENT.subheading}
            </h2>
          </div>

          {/* Body Content */}
          <div className="space-y-6">
            {SAMPLE_CONTENT.body.split('\n\n').map((paragraph, index) => (
              <p key={index} style={bodyStyle} className="text-gray-800">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pull Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 my-8">
            <p style={pullQuoteStyle} className="text-gray-700">
              "{SAMPLE_CONTENT.pullQuote}"
            </p>
          </blockquote>

          {/* UI Elements */}
          <div className="space-y-6 pt-8 border-t border-gray-200">
            <h3 style={subheadingStyle} className="text-gray-900">
              Interactive Elements
            </h3>
            
            <div className="space-y-4">
              <button 
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                style={{ fontFamily: settings.bodyFont, fontSize: `${settings.bodySize}px` }}
              >
                Primary Button
              </button>
              
              <div className="space-y-2">
                <label style={captionStyle} className="block font-medium">
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={bodyStyle}
                />
              </div>
              
              <a 
                href="#" 
                className="text-blue-500 hover:text-blue-600 underline"
                style={bodyStyle}
              >
                This is a sample link
              </a>
            </div>
          </div>

          {/* Caption */}
          <div className="pt-4 border-t border-gray-100">
            <p style={captionStyle}>
              {SAMPLE_CONTENT.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}