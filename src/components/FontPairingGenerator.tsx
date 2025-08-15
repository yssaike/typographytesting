import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Shuffle, Heart } from 'lucide-react';
import { FontPairing, getRandomFontPairing } from '../data/fontPairings';
import { TypographySettings } from '../types/typography';

interface FontPairingGeneratorProps {
  onApplyPairing: (pairing: FontPairing) => void;
  designMode: 'glass' | 'neuro' | 'hybrid';
  currentSettings: TypographySettings;
}

export default function FontPairingGenerator({ onApplyPairing, designMode }: FontPairingGeneratorProps) {
  const [currentPairing, setCurrentPairing] = useState<FontPairing | null>(null);
  const [savedPairings, setSavedPairings] = useState<FontPairing[]>([]);

  const buttonVariant = designMode === 'glass' ? 'glass' : designMode === 'neuro' ? 'neuro' : 'solid';

  const generateRandomPairing = () => {
    const newPairing = getRandomFontPairing();
    setCurrentPairing(newPairing);
  };

  const applyPairing = () => {
    if (currentPairing) {
      onApplyPairing(currentPairing);
    }
  };

  const savePairing = () => {
    if (currentPairing && !savedPairings.find(p => p.id === currentPairing.id)) {
      setSavedPairings(prev => [...prev, currentPairing]);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Icon as={Shuffle} color="purple.400" />
        <Text fontWeight="semibold">Font Pairing Generator</Text>
      </HStack>

      <Button
        leftIcon={<Shuffle size={16} />}
        onClick={generateRandomPairing}
        variant={buttonVariant}
        colorScheme="purple"
        w="full"
      >
        Generate Random Pairing
      </Button>

      {currentPairing && (
        <Box
          p={4}
          rounded="lg"
          bg={useColorModeValue('gray.50', 'gray.800')}
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Text fontWeight="semibold" mb={3}>
            {currentPairing.name}
          </Text>
          
          <VStack spacing={3} align="stretch">
            <Box>
              <Text fontSize="xs" color="gray.500" mb={1}>
                Heading: {currentPairing.headingFont}
              </Text>
              <Text
                fontSize="2xl"
                fontWeight="semibold"
                fontFamily={currentPairing.headingFont}
                color={useColorModeValue('gray.800', 'gray.200')}
              >
                Beautiful Typography
              </Text>
            </Box>
            
            <Box>
              <Text fontSize="xs" color="gray.500" mb={1}>
                Body: {currentPairing.bodyFont}
              </Text>
              <Text
                fontSize="sm"
                fontFamily={currentPairing.bodyFont}
                color={useColorModeValue('gray.700', 'gray.300')}
              >
                This is how your body text will look with this font pairing.
              </Text>
            </Box>
          </VStack>

          <HStack mt={4} spacing={2}>
            <Button
              onClick={applyPairing}
              variant={buttonVariant}
              colorScheme="blue"
              flex={1}
              size="sm"
            >
              Apply Pairing
            </Button>
            <Button
              onClick={savePairing}
              variant="outline"
              size="sm"
              leftIcon={<Heart size={14} />}
              isDisabled={savedPairings.find(p => p.id === currentPairing.id) !== undefined}
            >
              Save
            </Button>
          </HStack>
        </Box>
      )}
    </VStack>
  );
}