import React from 'react';
import {
  VStack,
  Card,
  CardBody,
  Heading,
  Button,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Settings, Download, Copy, Shuffle } from 'lucide-react';
import { TypographySettings } from '../types/typography';
import { FontPairing } from '../data/fontPairings';
import FontSelector from './FontSelector';
import SliderControl from './SliderControl';
import ResponsiveControls from './ResponsiveControls';
import FontPairingGenerator from './FontPairingGenerator';

interface ControlPanelProps {
  settings: TypographySettings;
  breakpoint: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
  onSettingsChange: (settings: Partial<TypographySettings>) => void;
  onBreakpointChange: (breakpoint: string) => void;
}

export default function ControlPanel({
  settings,
  breakpoint,
  designMode,
  onSettingsChange,
  onBreakpointChange
}: ControlPanelProps) {
  const [copied, setCopied] = React.useState(false);

  const cardVariant = designMode === 'glass' ? 'glass' : designMode === 'neuro' ? 'neuro' : 'outline';
  const buttonVariant = designMode === 'glass' ? 'glass' : designMode === 'neuro' ? 'neuro' : 'solid';

  const handleApplyPairing = (pairing: FontPairing) => {
    onSettingsChange({
      headingFont: pairing.headingFont,
      bodyFont: pairing.bodyFont
    });
  };

  const generateCSS = () => {
    return `/* Typography Settings */
.heading {
  font-family: ${settings.headingFont};
  font-size: ${settings.headingSize}px;
  font-weight: ${settings.headingWeight};
  line-height: ${settings.headingLineHeight};
  letter-spacing: ${settings.headingLetterSpacing}px;
}

.body {
  font-family: ${settings.bodyFont};
  font-size: ${settings.bodySize}px;
  font-weight: ${settings.bodyWeight};
  line-height: ${settings.lineHeight};
  letter-spacing: ${settings.letterSpacing}px;
}`;
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([generateCSS()], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typography-settings.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Font Pairing Generator */}
      <Card variant={cardVariant}>
        <CardBody>
          <FontPairingGenerator
            designMode={designMode}
            onApplyPairing={handleApplyPairing}
            currentSettings={settings}
          />
        </CardBody>
      </Card>

      {/* Font Selection */}
      <Card variant={cardVariant}>
        <CardBody>
          <Flex align="center" gap={2} mb={4}>
            <Icon as={Settings} color="brand.400" />
            <Heading size="sm">Font Selection</Heading>
          </Flex>
          <VStack spacing={4}>
            <FontSelector
              label="Heading Font"
              value={settings.headingFont}
              designMode={designMode}
              onChange={(font) => onSettingsChange({ headingFont: font })}
            />
            <FontSelector
              label="Body Font"
              value={settings.bodyFont}
              designMode={designMode}
              onChange={(font) => onSettingsChange({ bodyFont: font })}
            />
          </VStack>
        </CardBody>
      </Card>

      {/* Size Controls */}
      <Card variant={cardVariant}>
        <CardBody>
          <Heading size="sm" mb={4}>Font Sizes</Heading>
          <VStack spacing={4}>
            <SliderControl
              label="Heading Size"
              value={settings.headingSize}
              designMode={designMode}
              min={10}
              max={120}
              step={1}
              unit="px"
              onChange={(size) => onSettingsChange({ headingSize: size })}
            />
            <SliderControl
              label="Body Size"
              value={settings.bodySize}
              designMode={designMode}
              min={10}
              max={32}
              step={1}
              unit="px"
              onChange={(size) => onSettingsChange({ bodySize: size })}
            />
          </VStack>
        </CardBody>
      </Card>

      {/* Weight Controls */}
      <Card variant={cardVariant}>
        <CardBody>
          <Heading size="sm" mb={4}>Font Weights</Heading>
          <VStack spacing={4}>
            <SliderControl
              label="Heading Weight"
              value={settings.headingWeight}
              designMode={designMode}
              min={100}
              max={900}
              step={100}
              onChange={(weight) => onSettingsChange({ headingWeight: weight })}
            />
            <SliderControl
              label="Body Weight"
              value={settings.bodyWeight}
              designMode={designMode}
              min={100}
              max={900}
              step={100}
              onChange={(weight) => onSettingsChange({ bodyWeight: weight })}
            />
          </VStack>
        </CardBody>
      </Card>

      {/* Spacing Controls */}
      <Card variant={cardVariant}>
        <CardBody>
          <Heading size="sm" mb={4}>Spacing</Heading>
          <VStack spacing={4}>
            <SliderControl
              label="Heading Line Height"
              value={settings.headingLineHeight}
              designMode={designMode}
              min={0.8}
              max={2.0}
              step={0.1}
              onChange={(height) => onSettingsChange({ headingLineHeight: height })}
            />
            <SliderControl
              label="Body Line Height"
              value={settings.lineHeight}
              designMode={designMode}
              min={0.8}
              max={2.0}
              step={0.1}
              onChange={(height) => onSettingsChange({ lineHeight: height })}
            />
            <SliderControl
              label="Heading Letter Spacing"
              value={settings.headingLetterSpacing}
              designMode={designMode}
              min={-5}
              max={5}
              step={0.1}
              unit="px"
              onChange={(spacing) => onSettingsChange({ headingLetterSpacing: spacing })}
            />
            <SliderControl
              label="Body Letter Spacing"
              value={settings.letterSpacing}
              designMode={designMode}
              min={-5}
              max={5}
              step={0.1}
              unit="px"
              onChange={(spacing) => onSettingsChange({ letterSpacing: spacing })}
            />
          </VStack>
        </CardBody>
      </Card>

      {/* Responsive Controls */}
      <Card variant={cardVariant}>
        <CardBody>
          <Heading size="sm" mb={4}>Preview Size</Heading>
          <ResponsiveControls
            activeBreakpoint={breakpoint}
            designMode={designMode}
            onBreakpointChange={onBreakpointChange}
          />
        </CardBody>
      </Card>

      {/* Export Controls */}
      <Card variant={cardVariant}>
        <CardBody>
          <Heading size="sm" mb={4}>Export</Heading>
          <VStack spacing={3}>
            <Button
              leftIcon={<Copy size={16} />}
              onClick={copyCSS}
              variant={buttonVariant}
              colorScheme="blue"
              w="full"
            >
              {copied ? 'Copied!' : 'Copy CSS'}
            </Button>
            <Button
              leftIcon={<Download size={16} />}
              onClick={downloadCSS}
              variant={buttonVariant}
              colorScheme="green"
              w="full"
            >
              Download CSS
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
}