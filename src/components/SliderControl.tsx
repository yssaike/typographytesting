import React from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

interface SliderControlProps {
  label: string;
  value: number;
  designMode: 'glass' | 'neuro' | 'hybrid';
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function SliderControl({
  label,
  value,
  designMode,
  min,
  max,
  step,
  unit = '',
  onChange
}: SliderControlProps) {
  const thumbBg = useColorModeValue('brand.500', 'brand.300');
  const trackBg = useColorModeValue('gray.200', 'gray.600');
  const filledTrackBg = useColorModeValue('brand.500', 'brand.300');

  return (
    <Box w="full">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.700', 'gray.300')}>
          {label}
        </Text>
        <Text
          fontSize="sm"
          fontFamily="mono"
          px={2}
          py={1}
          rounded="md"
          bg={useColorModeValue('gray.100', 'gray.700')}
          color={useColorModeValue('gray.700', 'gray.300')}
        >
          {value}{unit}
        </Text>
      </Flex>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        focusThumbOnChange={false}
      >
        <SliderTrack bg={trackBg} h={2}>
          <SliderFilledTrack bg={filledTrackBg} />
        </SliderTrack>
        <SliderThumb
          bg={thumbBg}
          boxSize={5}
          _focus={{
            boxShadow: `0 0 0 3px ${useColorModeValue('rgba(59, 130, 246, 0.3)', 'rgba(147, 197, 253, 0.3)')}`,
          }}
        />
      </Slider>
    </Box>
  );
}