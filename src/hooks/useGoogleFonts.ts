import { useState, useEffect } from 'react';
import { GoogleFont } from '../types/typography';
import { POPULAR_FONTS } from '../utils/googleFonts';

export function useGoogleFonts() {
  const [fonts, setFonts] = useState<GoogleFont[]>(POPULAR_FONTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we'll use the popular fonts list
    // In production, you would implement Google Fonts API integration here
    const loadFonts = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFonts(POPULAR_FONTS);
        setError(null);
      } catch (err) {
        setError('Failed to load fonts');
        setFonts(POPULAR_FONTS); // Fallback to popular fonts
      } finally {
        setLoading(false);
      }
    };

    loadFonts();
  }, []);

  return { fonts, loading, error };
}