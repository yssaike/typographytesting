import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Input,
  Link,
  UnorderedList,
  ListItem,
  Flex,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { TypographySettings } from '../types/typography';
import { SAMPLE_CONTENT } from '../data/content';

interface TypographyPreviewProps {
  settings: TypographySettings;
  breakpoint: string;
  designMode: 'glass' | 'neuro' | 'hybrid';
}

const BREAKPOINT_MAX_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%'
};

export default function TypographyPreview({ settings, breakpoint, designMode }: TypographyPreviewProps) {
  const cardVariant = designMode === 'glass' ? 'glass' : designMode === 'neuro' ? 'neuro' : 'outline';
  const buttonVariant = designMode === 'glass' ? 'glass' : designMode === 'neuro' ? 'neuro' : 'solid';

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
    <Box h="full">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color={useColorModeValue('white', 'white')}>
          Live Preview
        </Heading>
        <Badge colorScheme="blue" textTransform="capitalize">
          {breakpoint} ({maxWidth})
        </Badge>
      </Flex>

      <Box
        mx="auto"
        maxW={maxWidth}
        h="full"
        overflowY="auto"
      >
        <Card variant={cardVariant} h="full">
          <CardBody>
            <Box spacing={8}>
              {/* Title Section */}
              <Box pb={6} borderBottom="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} mb={6}>
                <Heading style={headingStyle} mb={3} color={useColorModeValue('gray.900', 'gray.100')}>
                  {SAMPLE_CONTENT.headline}
                </Heading>
                <Text style={subheadingStyle} color={useColorModeValue('gray.600', 'gray.400')}>
                  {SAMPLE_CONTENT.subheading}
                </Text>
              </Box>

              {/* Body Content */}
              <Box mb={6}>
                {SAMPLE_CONTENT.body.split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <Text key={index} style={bodyStyle} mb={4} color={useColorModeValue('gray.800', 'gray.200')}>
                    {paragraph}
                  </Text>
                ))}
              </Box>

              {/* Pull Quote */}
              <Box
                borderLeft="4px solid"
                borderColor="blue.500"
                pl={6}
                my={6}
                py={2}
              >
                <Text
                  style={{ ...bodyStyle, fontSize: `${Math.round(settings.bodySize * 1.25)}px`, fontStyle: 'italic' }}
                  color={useColorModeValue('gray.700', 'gray.300')}
                >
                  "{SAMPLE_CONTENT.pullQuote}"
                </Text>
              </Box>

              {/* More Content */}
              <Box mb={6}>
                {SAMPLE_CONTENT.body.split('\n\n').slice(2).map((paragraph, index) => (
                  <Text key={index + 2} style={bodyStyle} mb={4} color={useColorModeValue('gray.800', 'gray.200')}>
                    {paragraph}
                  </Text>
                ))}
              </Box>

              {/* Interactive Elements */}
              <Box pt={6} borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Text style={subheadingStyle} mb={4} color={useColorModeValue('gray.900', 'gray.100')}>
                  Interactive Elements
                </Text>
                
                <Box spacing={4}>
                  <Button
                    variant={buttonVariant}
                    colorScheme="blue"
                    mb={4}
                    style={{ fontFamily: settings.bodyFont, fontSize: `${settings.bodySize}px` }}
                  >
                    Primary Button
                  </Button>
                  
                  <Box mb={4}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      mb={2}
                      color={useColorModeValue('gray.700', 'gray.300')}
                    >
                      Email Address
                    </Text>
                    <Input
                      placeholder="Enter your email"
                      style={bodyStyle}
                      bg={useColorModeValue('white', 'gray.700')}
                    />
                  </Box>
                  
                  <Link
                    color="blue.500"
                    textDecoration="underline"
                    style={bodyStyle}
                    _hover={{ color: 'blue.600' }}
                  >
                    This is a sample link
                  </Link>
                </Box>
              </Box>

              {/* Lists */}
              <Box mt={6}>
                <Text style={subheadingStyle} mb={4} color={useColorModeValue('gray.900', 'gray.100')}>
                  Typography Hierarchy
                </Text>
                <UnorderedList spacing={2}>
                  <ListItem style={bodyStyle} color={useColorModeValue('gray.800', 'gray.200')}>
                    Primary heading for main titles
                  </ListItem>
                  <ListItem style={bodyStyle} color={useColorModeValue('gray.800', 'gray.200')}>
                    Body text for readable content
                  </ListItem>
                  <ListItem style={bodyStyle} color={useColorModeValue('gray.800', 'gray.200')}>
                    Consistent spacing and alignment
                  </ListItem>
                </UnorderedList>
              </Box>

              {/* Caption */}
              <Box pt={6} borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')} mt={6}>
                <Text
                  style={{ ...bodyStyle, fontSize: `${Math.round(settings.bodySize * 0.85)}px` }}
                  color={useColorModeValue('gray.500', 'gray.400')}
                >
                  {SAMPLE_CONTENT.caption}
                </Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}