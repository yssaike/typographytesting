import React from 'react';
import { TypographySettings } from '../types/typography';
import { SAMPLE_CONTENT } from '../data/content';

interface TypographyPreviewProps {
  settings: TypographySettings;
  breakpoint: string;
  darkMode: boolean;
}

const BREAKPOINT_MAX_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%'
};

export default function TypographyPreview({ settings, breakpoint, darkMode }: TypographyPreviewProps) {
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

  const maxWidth = BREAKPOINT_MAX_WIDTHS[breakpoint as keyof typeof BREAKPOINT_MAX_WIDTHS];

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100">
          Live Preview
        </h2>
        <span className="px-2 py-1 bg-blue-500 dark:bg-blue-600 text-white text-xs rounded capitalize">
          {breakpoint} ({maxWidth})
        </span>
      </div>

      <div
        className="mx-auto h-full"
        style={{ maxWidth }}
      >
        <div className="bg-white/25 dark:bg-black/25 backdrop-blur-lg rounded-lg p-6 border border-white/20 dark:border-white/10 h-full overflow-y-auto">
          <div className="space-y-8">
            {/* Title Section */}
            <div className="pb-6 border-b border-white/20 dark:border-white/10">
              <h1 style={headingStyle} className="mb-3 text-gray-900 dark:text-gray-100">
                {SAMPLE_CONTENT.headline}
              </h1>
              <p style={subheadingStyle} className="text-gray-600 dark:text-gray-400">
                {SAMPLE_CONTENT.subheading}
              </p>
            </div>

            {/* Body Content */}
            <div>
              {SAMPLE_CONTENT.body.split('\n\n').slice(0, 2).map((paragraph, index) => (
                <p key={index} style={bodyStyle} className="mb-4 text-gray-800 dark:text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pull Quote */}
            <div className="border-l-4 border-blue-500 pl-6 my-6 py-2">
              <p
                style={{ ...bodyStyle, fontSize: `${Math.round(settings.bodySize * 1.25)}px`, fontStyle: 'italic' }}
                className="text-gray-700 dark:text-gray-300"
              >
                "{SAMPLE_CONTENT.pullQuote}"
              </p>
            </div>

            {/* More Content */}
            <div>
              {SAMPLE_CONTENT.body.split('\n\n').slice(2).map((paragraph, index) => (
                <p key={index + 2} style={bodyStyle} className="mb-4 text-gray-800 dark:text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Interactive Elements */}
            <div className="pt-6 border-t border-white/20 dark:border-white/10">
              <h3 style={subheadingStyle} className="mb-4 text-gray-900 dark:text-gray-100">
                Interactive Elements
              </h3>
              
              <div className="space-y-4">
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  style={{ fontFamily: settings.bodyFont, fontSize: `${settings.bodySize}px` }}
                >
                  Primary Button
                </button>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={bodyStyle}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Lists */}
            <div>
              <h3 style={subheadingStyle} className="mb-4 text-gray-900 dark:text-gray-100">
                Typography Hierarchy
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li style={bodyStyle} className="text-gray-800 dark:text-gray-200">
                  Primary heading for main titles
                </li>
                <li style={bodyStyle} className="text-gray-800 dark:text-gray-200">
                  Body text for readable content
                </li>
                <li style={bodyStyle} className="text-gray-800 dark:text-gray-200">
                  Consistent spacing and alignment
                </li>
              </ul>
            </div>

            {/* Caption */}
            <div className="pt-6 border-t border-white/20 dark:border-white/10">
              <p
                style={{ ...bodyStyle, fontSize: `${Math.round(settings.bodySize * 0.85)}px` }}
                className="text-gray-500 dark:text-gray-400"
              >
                {SAMPLE_CONTENT.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}