import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    glass: {
      bg: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 0.18)',
      shadow: 'rgba(31, 38, 135, 0.37)',
    },
    neuro: {
      bg: '#e0e5ec',
      shadowDark: '#a3b1c6',
      shadowLight: '#ffffff',
    },
  },
  components: {
    Button: {
      variants: {
        glass: {
          bg: 'glass.bg',
          backdropFilter: 'blur(16px)',
          border: '1px solid',
          borderColor: 'glass.border',
          color: 'white',
          _hover: {
            bg: 'rgba(59, 130, 246, 0.3)',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        neuro: {
          bg: 'neuro.bg',
          boxShadow: '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff',
          border: 'none',
          _hover: {
            boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff',
          },
          _active: {
            boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
          },
        },
      },
    },
    Card: {
      variants: {
        glass: {
          container: {
            bg: 'glass.bg',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: 'glass.border',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          },
        },
        neuro: {
          container: {
            bg: 'neuro.bg',
            boxShadow: '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
            border: 'none',
          },
        },
      },
    },
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
});

export default theme;