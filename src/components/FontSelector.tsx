import React, { useState } from 'react';
import {
  Box,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/form-control';
import { FONT_FAMILIES, loadGoogleFont } from '../data/fonts';

interface FontSelectorProps {
  label: string;
  value: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
  onChange: (font: string) => void;
}

export default function FontSelector({ label, value, designMode, onChange }: FontSelectorProps) {
  const [previewFont, setPreviewFont] = useState<string | null>(null);

  const handleFontSelect = (font: string) => {
    loadGoogleFont(font);
    onChange(font);
  };

  const handleFontPreview = (font: string) => {
    setPreviewFont(font);
    loadGoogleFont(font);
  };

  const selectBg = useColorModeValue(
    designMode === 'glass' ? 'whiteAlpha.200' : 'white',
    designMode === 'glass' ? 'whiteAlpha.100' : 'gray.700'
  );

  const selectColor = useColorModeValue(
    designMode === 'glass' ? 'white' : 'gray.800',
    'white'
  );

  return (
    <Box w="full">
      <FormLabel fontSize="sm" mb={2} color={useColorModeValue('gray.700', 'gray.300')}>
        {label}
      </FormLabel>
      <Select
        value={value}
        onChange={(e) => handleFontSelect(e.target.value)}
        onMouseOver={(e) => {
          const target = e.target as HTMLSelectElement;
          if (target.value) handleFontPreview(target.value);
        }}
        bg={selectBg}
        color={selectColor}
        border="1px solid"
        borderColor={useColorModeValue('gray.300', 'gray.600')}
        _focus={{
          borderColor: 'brand.500',
          boxShadow: `0 0 0 1px ${useColorModeValue('rgba(59, 130, 246, 0.3)', 'rgba(147, 197, 253, 0.3)')}`,
        }}
        fontFamily={previewFont || value}
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </Select>
      
      {/* Font Preview */}
      <Box
        mt={3}
        p={3}
        rounded="md"
        bg={useColorModeValue('gray.50', 'gray.800')}
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <Text
          fontSize="lg"
          fontFamily={previewFont || value}
          color={useColorModeValue('gray.800', 'gray.200')}
        >
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text
          fontSize="xs"
          color={useColorModeValue('gray.500', 'gray.400')}
          mt={1}
        >
          Preview: {previewFont || value}
        </Text>
      </Box>
    </Box>
  );
}