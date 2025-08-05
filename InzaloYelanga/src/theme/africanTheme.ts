import { DefaultTheme } from 'react-native-paper';
import { Theme } from '@react-navigation/native';

// African-inspired color palette
export const africanColors = {
  // Primary colors inspired by African earth and sunset
  primary: '#8B4513', // Saddle Brown - representing earth and stability
  primaryVariant: '#A0522D', // Sienna - deeper earth tone
  secondary: '#D2691E', // Chocolate - warm sunset
  secondaryVariant: '#CD853F', // Sandy Brown - desert sand
  
  // Accent colors from African textiles and nature
  accent: '#FFD700', // Gold - representing prosperity and sun
  accentVariant: '#FFA500', // Orange - vibrant sunset
  
  // Background colors inspired by natural materials
  background: '#FFF8DC', // Cornsilk - natural fabric
  surface: '#FFFAF0', // Floral White - clean surface
  surfaceVariant: '#F5F5DC', // Beige - natural variation
  
  // Text colors for readability
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#2F4F4F', // Dark Slate Gray
  onSurface: '#2F4F4F',
  onSurfaceVariant: '#696969', // Dim Gray
  
  // Semantic colors
  success: '#228B22', // Forest Green - nature's prosperity
  warning: '#FF8C00', // Dark Orange - sunset warning
  error: '#DC143C', // Crimson - traditional warning
  info: '#4682B4', // Steel Blue - sky and water
  
  // Utility colors
  outline: '#D2B48C', // Tan - natural borders
  shadow: '#000000',
  scrim: '#000000',
  
  // Cultural celebration colors
  celebration: '#FF6347', // Tomato - festive
  wisdom: '#9370DB', // Medium Purple - spiritual
  community: '#32CD32', // Lime Green - growth and unity
  heritage: '#8B4513', // Same as primary - consistency
};

// African-inspired theme for React Native Paper
export const africanTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: africanColors.primary,
    primaryContainer: africanColors.primaryVariant,
    secondary: africanColors.secondary,
    secondaryContainer: africanColors.secondaryVariant,
    tertiary: africanColors.accent,
    tertiaryContainer: africanColors.accentVariant,
    surface: africanColors.surface,
    surfaceVariant: africanColors.surfaceVariant,
    background: africanColors.background,
    error: africanColors.error,
    errorContainer: '#FFEBEE',
    onPrimary: africanColors.onPrimary,
    onPrimaryContainer: africanColors.onPrimary,
    onSecondary: africanColors.onSecondary,
    onSecondaryContainer: africanColors.onSecondary,
    onTertiary: africanColors.onPrimary,
    onTertiaryContainer: africanColors.onPrimary,
    onSurface: africanColors.onSurface,
    onSurfaceVariant: africanColors.onSurfaceVariant,
    onError: '#FFFFFF',
    onErrorContainer: africanColors.error,
    onBackground: africanColors.onBackground,
    outline: africanColors.outline,
    outlineVariant: '#E0E0E0',
    shadow: africanColors.shadow,
    scrim: africanColors.scrim,
    inverseSurface: africanColors.onSurface,
    inverseOnSurface: africanColors.surface,
    inversePrimary: africanColors.accent,
    elevation: {
      level0: 'transparent',
      level1: africanColors.surface,
      level2: '#F8F8FF',
      level3: '#F5F5F5',
      level4: '#F0F0F0',
      level5: '#EBEBEB',
    },
    surfaceDisabled: '#E0E0E0',
    onSurfaceDisabled: '#A0A0A0',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  fonts: {
    ...DefaultTheme.fonts,
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontWeight: '700',
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontWeight: '600',
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontWeight: '600',
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontWeight: '600',
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontWeight: '600',
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontWeight: '500',
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontWeight: '400',
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontWeight: '400',
    },
  },
};

// Navigation theme
export const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: africanColors.primary,
    background: africanColors.background,
    card: africanColors.surface,
    text: africanColors.onSurface,
    border: africanColors.outline,
    notification: africanColors.accent,
  },
};

// Season-based color schemes
export const seasonColors = {
  Spring: {
    primary: '#90EE90', // Light Green
    secondary: '#32CD32', // Lime Green
    accent: '#228B22', // Forest Green
    background: '#F0FFF0', // Honeydew
  },
  Summer: {
    primary: '#FFD700', // Gold
    secondary: '#FFA500', // Orange
    accent: '#FF6347', // Tomato
    background: '#FFFACD', // Lemon Chiffon
  },
  Autumn: {
    primary: '#D2691E', // Chocolate
    secondary: '#CD853F', // Sandy Brown
    accent: '#A0522D', // Sienna
    background: '#FDF5E6', // Old Lace
  },
  Winter: {
    primary: '#4682B4', // Steel Blue
    secondary: '#2F4F4F', // Dark Slate Gray
    accent: '#191970', // Midnight Blue
    background: '#F0F8FF', // Alice Blue
  },
};

// Cultural pattern colors (inspired by African textiles)
export const patternColors = {
  kuba: ['#8B4513', '#D2691E', '#FFD700', '#228B22'], // Kuba textile colors
  ndebele: ['#FF6347', '#4682B4', '#FFFFFF', '#000000'], // Ndebele geometric colors
  kente: ['#FFD700', '#FF6347', '#228B22', '#4682B4'], // Kente cloth colors
  mudcloth: ['#8B4513', '#D2B48C', '#F5DEB3', '#2F4F4F'], // Mudcloth earth tones
};

// Utility functions for theme
export const getSeasonTheme = (season: string) => {
  return seasonColors[season as keyof typeof seasonColors] || seasonColors.Spring;
};

export const getLunarPhaseColor = (phase: string) => {
  const phaseColors = {
    'New Moon': '#2F2F2F',
    'Waxing Crescent': '#696969',
    'First Quarter': '#A9A9A9',
    'Waxing Gibbous': '#C0C0C0',
    'Full Moon': '#F5F5F5',
    'Waning Gibbous': '#C0C0C0',
    'Last Quarter': '#A9A9A9',
    'Waning Crescent': '#696969',
  };
  return phaseColors[phase as keyof typeof phaseColors] || '#A9A9A9';
};

export const getCulturalEventColor = (eventType: string) => {
  const eventColors = {
    cultural: africanColors.heritage,
    seasonal: africanColors.success,
    lunar: africanColors.info,
    royal: africanColors.accent,
    community: africanColors.community,
  };
  return eventColors[eventType as keyof typeof eventColors] || africanColors.primary;
};