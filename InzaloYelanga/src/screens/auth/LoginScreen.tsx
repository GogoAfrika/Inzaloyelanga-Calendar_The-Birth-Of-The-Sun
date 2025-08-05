import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, Button } from 'react-native-paper';
import { africanColors } from '../../theme/africanTheme';
import { useAuth } from '../../context/AuthContext';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useAuth();

  const handleTestLogin = async () => {
    // For demo purposes, create a test user
    const testUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      preferences: {
        notifications: {
          dailyWisdom: true,
          communityUpdates: true,
          eventReminders: true,
        },
        privacy: {
          showProfile: true,
          allowMessages: true,
        },
        donations: {
          optedIn: false,
        },
        ads: {
          optedIn: false,
        },
      },
      createdAt: new Date().toISOString(),
    };

    // Simulate login success
    await login('test@example.com', 'password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Sign In</Title>
        <Text style={styles.subtitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Full authentication system with secure login, registration,
          and password reset functionality.
        </Text>
        
        <Button
          mode="contained"
          onPress={handleTestLogin}
          style={styles.testButton}
          buttonColor={africanColors.primary}
        >
          Continue as Test User
        </Button>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate('Welcome')}
          style={styles.backButton}
        >
          Back to Welcome
        </Button>
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
    marginBottom: 32,
  },
  testButton: {
    borderRadius: 25,
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
  },
});

export default LoginScreen;