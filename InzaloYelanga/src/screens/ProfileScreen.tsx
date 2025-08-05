import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, Button } from 'react-native-paper';
import { africanColors } from '../theme/africanTheme';
import { useAuth } from '../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Profile</Title>
        <Text style={styles.welcomeText}>
          Welcome, {user?.firstName} {user?.lastName}!
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={logout}
            style={styles.logoutButton}
            buttonColor={africanColors.error}
          >
            Sign Out
          </Button>
        </View>
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
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 20,
    color: africanColors.onBackground,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: africanColors.onSurfaceVariant,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 200,
  },
  logoutButton: {
    borderRadius: 25,
  },
});

export default ProfileScreen;