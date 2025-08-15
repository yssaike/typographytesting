import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  focusElement: (elementId: string) => void;
  skipToContent: () => void;
  highContrastMode: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');

  // Detect user preferences
  useEffect(() => {
    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrastMode(highContrastQuery.matches);
    
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrastMode(e.matches);
    };
    
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(reducedMotionQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Load saved font size preference
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'normal' | 'large' | 'extra-large';
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    return () => {
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    root.classList.add(`font-size-${fontSize}`);
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  // Create live region for screen reader announcements
  useEffect(() => {
    const createLiveRegion = (id: string, priority: 'polite' | 'assertive') => {
      if (!document.getElementById(id)) {
        const liveRegion = document.createElement('div');
        liveRegion.id = id;
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
    };

    createLiveRegion('aria-live-polite', 'polite');
    createLiveRegion('aria-live-assertive', 'assertive');

    return () => {
      const politeRegion = document.getElementById('aria-live-polite');
      const assertiveRegion = document.getElementById('aria-live-assertive');
      if (politeRegion) document.body.removeChild(politeRegion);
      if (assertiveRegion) document.body.removeChild(assertiveRegion);
    };
  }, []);

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.getElementById(`aria-live-${priority}`);
    if (liveRegion) {
      // Clear the region first to ensure the message is announced
      liveRegion.textContent = '';
      // Use setTimeout to ensure the clearing is processed before adding new content
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    }
  };

  const focusElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      // Scroll element into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const skipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      announceToScreenReader('Skipped to main content', 'assertive');
    }
  };

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    focusElement,
    skipToContent,
    highContrastMode,
    reducedMotion,
    fontSize,
    setFontSize,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Accessibility Settings Component
export const AccessibilitySettings: React.FC = () => {
  const { fontSize, setFontSize, announceToScreenReader } = useAccessibility();

  const handleFontSizeChange = (newSize: 'normal' | 'large' | 'extra-large') => {
    setFontSize(newSize);
    announceToScreenReader(`Font size changed to ${newSize}`, 'polite');
  };

  return (
    <div className="accessibility-settings" role="region" aria-labelledby="accessibility-heading">
      <h3 id="accessibility-heading" className="text-primary font-semibold mb-4">
        Accessibility Settings
      </h3>
      
      <div className="space-y-4">
        <fieldset>
          <legend className="text-primary font-medium mb-2">Font Size</legend>
          <div className="space-y-2">
            {[
              { value: 'normal', label: 'Normal (16px)' },
              { value: 'large', label: 'Large (18px)' },
              { value: 'extra-large', label: 'Extra Large (20px)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="font-size"
                  value={option.value}
                  checked={fontSize === option.value}
                  onChange={() => handleFontSizeChange(option.value as any)}
                  className="form-input w-4 h-4"
                />
                <span className="text-primary">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};