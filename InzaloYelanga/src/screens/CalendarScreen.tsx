import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title } from 'react-native-paper';
import { africanColors } from '../theme/africanTheme';

const CalendarScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>African Calendar</Title>
        <Text style={styles.subtitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Explore the full African Royal Calendar with detailed cultural events,
          lunar phases, and seasonal celebrations.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: africanColors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: africanColors.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: africanColors.secondary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: africanColors.onBackground,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CalendarScreen;