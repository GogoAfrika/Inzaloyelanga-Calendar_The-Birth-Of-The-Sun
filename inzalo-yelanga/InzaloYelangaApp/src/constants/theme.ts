import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// African-inspired color palette
export const COLORS = {
  // Primary African colors
  primary: '#FFD700', // Gold - representing the sun and royalty
  primaryDark: '#DAA520', // Darker gold
  secondary: '#A3E4D7', // Mint green - representing nature and growth
  secondaryDark: '#76D7C4', // Darker mint
  
  // Earth tones inspired by African landscapes
  terracotta: '#CD853F', // Clay/earth
  ochre: '#CC7722', // Traditional ochre pigment
  sienna: '#A0522D', // Rich brown earth
  mahogany: '#C04000', // Deep reddish-brown
  
  // Kuba textile inspired colors
  kubaRed: '#B22222', // Deep red
  kubaBlack: '#1C1C1C', // Rich black
  kubaWhite: '#F5F5DC', // Cream white
  kubaYellow: '#FFD700', // Golden yellow
  
  // Ndebele art inspired colors
  ndebeleBlue: '#4169E1', // Royal blue
  ndebeleGreen: '#228B22', // Forest green
  ndebeleRed: '#DC143C', // Crimson red
  ndebeleWhite: '#FFFFFF', // Pure white
  ndebeleBlack: '#000000', // Pure black
  
  // UI colors
  background: '#1C1C1E', // Dark background
  surface: '#2C2C2E', // Card/surface color
  text: '#F2F2F7', // Primary text
  textSecondary: '#E5E5EA', // Secondary text
  textTertiary: '#8E8E93', // Tertiary text
  border: '#48484A', // Border color
  error: '#FF3B30', // Error red
  success: '#34C759', // Success green
  warning: '#FF9500', // Warning orange
  
  // Transparency levels
  overlay: 'rgba(0, 0, 0, 0.5)',
  cardOverlay: 'rgba(44, 44, 46, 0.95)',
  
  // Seasonal gradients
  springGradient: ['#E6B0AA', '#D7BDE2'],
  summerGradient: ['#FAD7A0', '#F39C12'],
  autumnGradient: ['#F5CBA7', '#ABB2B9'],
  winterGradient: ['#566573', '#D6EAF8'],
};

// Typography inspired by traditional African aesthetics
export const TYPOGRAPHY = {
  // Font families
  primary: 'Inter', // Modern, clean font
  display: 'Playfair Display', // For headers and titles
  mono: 'Fira Code', // For code/technical text
  
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  
  // Font weights
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  
  // Line heights
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Spacing system based on traditional African proportions
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

// Border radius values
export const RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadow configurations
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Screen dimensions
export const SCREEN = {
  width,
  height,
  isSmall: width < 375,
  isMedium: width >= 375 && width < 414,
  isLarge: width >= 414,
};

// African pattern configurations
export const PATTERNS = {
  kuba: {
    // Traditional Kuba textile patterns
    raffia: {
      colors: [COLORS.kubaRed, COLORS.kubaBlack, COLORS.kubaWhite],
      pattern: 'geometric',
    },
    shoowa: {
      colors: [COLORS.kubaYellow, COLORS.kubaBlack],
      pattern: 'maze',
    },
  },
  ndebele: {
    // Traditional Ndebele patterns
    geometric: {
      colors: [COLORS.ndebeleBlue, COLORS.ndebeleRed, COLORS.ndebeleWhite],
      pattern: 'triangular',
    },
    house: {
      colors: [COLORS.ndebeleGreen, COLORS.ndebeleBlack, COLORS.ndebeleWhite],
      pattern: 'architectural',
    },
  },
};

// Animation durations
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

// Component-specific styles
export const COMPONENTS = {
  header: {
    height: 88,
    paddingTop: 44, // Status bar height
  },
  tabBar: {
    height: 83,
    paddingBottom: 34, // Home indicator height on newer iPhones
  },
  button: {
    height: 44,
    borderRadius: RADIUS.lg,
  },
  input: {
    height: 44,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  card: {
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  modal: {
    borderRadius: RADIUS.xl,
    margin: SPACING.lg,
  },
};

// Calendar specific styling
export const CALENDAR_THEME = {
  circleSize: Math.min(width * 0.8, 400),
  monthSegmentSize: 80,
  centerSize: 120,
  handWidth: {
    month: 4,
    day: 2,
  },
  colors: {
    circle: COLORS.kubaBlack,
    border: COLORS.primary,
    center: COLORS.primaryDark,
    monthHand: COLORS.primary,
    dayHand: COLORS.secondary,
    radialLines: COLORS.primary,
  },
  shadows: {
    circle: {
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.7,
      shadowRadius: 20,
      elevation: 10,
    },
    segments: SHADOWS.md,
  },
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  SCREEN,
  PATTERNS,
  ANIMATIONS,
  COMPONENTS,
  CALENDAR_THEME,
};