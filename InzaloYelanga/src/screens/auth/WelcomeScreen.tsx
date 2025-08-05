import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { africanColors } from '../../theme/africanTheme';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const features = [
    {
      icon: 'calendar-star',
      title: 'African Royal Calendar',
      description: 'Discover the solar calendar with African New Year on September 23rd',
      color: africanColors.primary,
    },
    {
      icon: 'moon-waning-crescent',
      title: 'Lunar Calendar',
      description: "Follow the moon's journey and its cultural significance",
      color: africanColors.info,
    },
    {
      icon: 'lightbulb-on',
      title: 'Daily Wisdom',
      description: 'Receive daily decolonial insights and cultural knowledge',
      color: africanColors.wisdom,
    },
    {
      icon: 'account-group',
      title: 'Community',
      description: 'Share and discover traditional celebrations with others',
      color: africanColors.community,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[africanColors.primary, africanColors.secondary, africanColors.accent]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons
                name="weather-sunset"
                size={80}
                color={africanColors.accent}
              />
            </View>
            <Title style={styles.title}>Inzalo Yelanga</Title>
            <Text style={styles.subtitle}>The Birth of the Sun</Text>
            <Paragraph style={styles.description}>
              A decolonial educational tool connecting you with traditional African
              timekeeping and cultural practices
            </Paragraph>
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard}>
                <Card.Content style={styles.featureContent}>
                  <View style={styles.featureIconContainer}>
                    <MaterialCommunityIcons
                      name={feature.icon as any}
                      size={40}
                      color={feature.color}
                    />
                  </View>
                  <View style={styles.featureTextContainer}>
                    <Title style={styles.featureTitle}>{feature.title}</Title>
                    <Paragraph style={styles.featureDescription}>
                      {feature.description}
                    </Paragraph>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* Mission Statement */}
          <Card style={styles.missionCard}>
            <Card.Content>
              <View style={styles.missionHeader}>
                <MaterialCommunityIcons
                  name="earth"
                  size={30}
                  color={africanColors.primary}
                />
                <Title style={styles.missionTitle}>Our Mission</Title>
              </View>
              <Paragraph style={styles.missionText}>
                "To serve as a decolonial educational tool, empowering users to reconnect
                with traditional African timekeeping and cultural practices, promoting a
                worldview rooted in nature and heritage rather than colonial systems."
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Register')}
              style={styles.primaryButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Begin Your Journey
            </Button>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ubuntu Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              "Ubuntu - I am because we are"
            </Text>
            <Text style={styles.quoteAuthor}>African Philosophy</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#F5F5DC',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginVertical: 20,
  },
  featureCard: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 4,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  featureIconContainer: {
    width: 60,
    alignItems: 'center',
  },
  featureTextContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: africanColors.onSurfaceVariant,
    lineHeight: 20,
  },
  missionCard: {
    marginVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 4,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: africanColors.primary,
    marginLeft: 12,
  },
  missionText: {
    fontSize: 16,
    color: africanColors.onSurface,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: africanColors.accent,
    borderRadius: 25,
    marginBottom: 16,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onPrimary,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  quoteContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  quote: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#F5F5DC',
    textAlign: 'center',
  },
});

export default WelcomeScreen;