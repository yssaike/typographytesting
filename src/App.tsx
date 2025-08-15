import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Select,
  useColorMode,
  useColorModeValue,
  Container,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Type, Sun, Moon } from 'lucide-react';
import { TypographySettings } from './types/typography';
import { loadGoogleFont } from './data/fonts';
import ControlPanel from './components/ControlPanel';
import TypographyPreview from './components/TypographyPreview';

const DEFAULT_SETTINGS: TypographySettings = {
  headingFont: 'Inter',
  bodyFont: 'Inter',
  headingSize: 48,
  bodySize: 16,
  headingWeight: 600,
  bodyWeight: 400,
  lineHeight: 1.6,
  letterSpacing: 0,
  headingLineHeight: 1.2,
  headingLetterSpacing: -0.5,
};

function App() {
  const [settings, setSettings] = useState<TypographySettings>(DEFAULT_SETTINGS);
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [designMode, setDesignMode] = useState<'glass' | 'neuro' | 'hybrid'>('glass');
  
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.400 0%, purple.500 50%, pink.500 100%)',
    'linear(135deg, gray.900 0%, gray.800 50%, gray.700 100%)'
  );

  const headerBg = useColorModeValue(
    designMode === 'glass' ? 'rgba(255, 255, 255, 0.25)' : 'white',
    designMode === 'glass' ? 'rgba(26, 26, 26, 0.8)' : 'gray.800'
  );

  // Load initial fonts
  useEffect(() => {
    loadGoogleFont(settings.headingFont);
    loadGoogleFont(settings.bodyFont);
  }, [settings.headingFont, settings.bodyFont]);

  const updateSettings = (newSettings: Partial<TypographySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Header */}
      <Box
        position="sticky"
        top={0}
        zIndex={40}
        bg={headerBg}
        backdropFilter={designMode === 'glass' ? 'blur(16px)' : 'none'}
        borderBottom="1px solid"
        borderColor={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
      >
        <Container maxW="container.xl" py={4}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <Box
                p={2}
                rounded="lg"
                bg={designMode === 'glass' ? 'whiteAlpha.200' : 'brand.500'}
                color="white"
              >
                <Type size={20} />
              </Box>
              <Box>
                <Heading size="lg" color={useColorModeValue('white', 'white')}>
                  Typography Testing Tool
                </Heading>
                <Text
                  fontSize="sm"
                  color={useColorModeValue('whiteAlpha.800', 'whiteAlpha.700')}
                  display={{ base: 'none', sm: 'block' }}
                >
                  Real-time font preview and adjustment
                </Text>
              </Box>
            </Flex>
            
            <Flex align="center" gap={2}>
              <Select
                value={designMode}
                onChange={(e) => setDesignMode(e.target.value as any)}
                size="sm"
                bg={designMode === 'glass' ? 'whiteAlpha.200' : 'white'}
                color={designMode === 'glass' ? 'white' : 'gray.800'}
                border="1px solid"
                borderColor={useColorModeValue('whiteAlpha.300', 'whiteAlpha.200')}
                display={{ base: 'none', sm: 'block' }}
              >
                <option value="glass">Glassmorphism</option>
                <option value="neuro">Neuromorphic</option>
                <option value="hybrid">Hybrid</option>
              </Select>
              
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                onClick={toggleColorMode}
                variant={designMode === 'glass' ? 'glass' : 'solid'}
                colorScheme="brand"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={6}>
        <Grid
          templateColumns={{ base: '1fr', lg: '2fr 3fr' }}
          gap={6}
          h={{ lg: 'calc(100vh - 120px)' }}
        >
          {/* Controls Panel */}
          <GridItem>
            <Box
              h="full"
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                },
              }}
            >
              <ControlPanel
                settings={settings}
                breakpoint={breakpoint}
                designMode={designMode}
                onSettingsChange={updateSettings}
                onBreakpointChange={setBreakpoint}
              />
            </Box>
          </GridItem>

          {/* Preview Panel */}
          <GridItem>
            <Box h="full" overflowY="auto">
              <TypographyPreview
                settings={settings}
                breakpoint={breakpoint}
                designMode={designMode}
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;