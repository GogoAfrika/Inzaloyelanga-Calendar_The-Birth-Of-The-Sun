import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, Button } from 'react-native-paper';
import { africanColors } from '../../theme/africanTheme';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Register</Title>
        <Text style={styles.subtitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Create your account to begin your journey with African traditional
          calendar and cultural practices.
        </Text>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          Go to Sign In
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
  loginButton: {
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
  },
});

export default RegisterScreen;