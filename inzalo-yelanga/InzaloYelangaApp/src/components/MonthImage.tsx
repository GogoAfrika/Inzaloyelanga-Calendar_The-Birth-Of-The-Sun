import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, RADIUS } from '../constants/theme';

interface MonthImageProps {
  monthName: string;
  color: string;
  size?: number;
}

// Simple African-inspired symbols for each month
const getMonthSymbol = (monthName: string): string => {
  const symbols: { [key: string]: string } = {
    'Asar': '☀️', // Sun for new beginnings
    'Geb': '🌱', // Plant for growth
    'Het-Hor': '🍇', // Fruits
    'Ra': '👑', // Crown for sun/royalty
    'Sobek': '💧', // Water drop
    'Shu': '🌪️', // Wind
    'Isis': '🌾', // Grain for ripening
    'Neb-Het': '🕯️', // Candle for lamentation
    'Set': '🌑', // New moon for darkness
    'Djehuti': '🌿', // Herb for rejuvenation
    'Horus': '🦅', // Eagle for rebirth
    'Neith': '🔨', // Hammer for preparation
    'Sokhemet': '💨', // Wind for breath/transition
  };
  return symbols[monthName] || '◯';
};

export const MonthImage: React.FC<MonthImageProps> = ({ 
  monthName, 
  color, 
  size = 80 
}) => {
  const symbol = getMonthSymbol(monthName);
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          backgroundColor: color,
        }
      ]}
    >
      <Text style={[styles.symbol, { fontSize: size * 0.4 }]}>
        {symbol}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  symbol: {
    textAlign: 'center',
  },
});

export default MonthImage;