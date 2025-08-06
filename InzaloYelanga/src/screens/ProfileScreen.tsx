import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, Avatar, List, Divider, Portal, Dialog } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { africanColors } from '../theme/africanTheme';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    communityAlerts: boolean;
    culturalReminders: boolean;
    optInAds: boolean;
    language: string;
    theme: 'light' | 'dark' | 'auto';
  };
  stats: {
    eventsAttended: number;
    postsShared: number;
    articlesRead: number;
    daysActive: number;
  };
}

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: user?.firstName || 'User',
    lastName: user?.lastName || 'Name',
    email: user?.email || 'user@example.com',
    joinDate: new Date('2024-01-01'),
    preferences: {
      notifications: true,
      emailUpdates: true,
      communityAlerts: true,
      culturalReminders: true,
      optInAds: false,
      language: 'English',
      theme: 'auto'
    },
    stats: {
      eventsAttended: 12,
      postsShared: 8,
      articlesRead: 25,
      daysActive: 45
    }
  });

  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [showAdInfoDialog, setShowAdInfoDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handlePreferenceChange = (key: keyof UserProfile['preferences'], value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleDonation = () => {
    setShowDonationDialog(true);
  };

  const handleAdToggle = (value: boolean) => {
    if (value) {
      setShowAdInfoDialog(true);
    } else {
      handlePreferenceChange('optInAds', false);
    }
  };

  const confirmAdOptIn = () => {
    handlePreferenceChange('optInAds', true);
    setShowAdInfoDialog(false);
    Alert.alert(
      'Thank You',
      'You have opted in to see ads. This helps support the app\'s development and maintenance. You can change this setting anytime.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://inzaloyelanga.org/privacy');
  };

  const openTermsOfService = () => {
    Linking.openURL('https://inzaloyelanga.org/terms');
  };

  const openSupport = () => {
    Linking.openURL('mailto:support@inzaloyelanga.org');
  };

  const renderStatCard = (icon: string, title: string, value: number, color: string) => (
    <Card style={[styles.statCard, { borderLeftColor: color }]}>
      <Card.Content style={styles.statContent}>
        <MaterialCommunityIcons name={icon as any} size={32} color={color} />
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[africanColors.primary, africanColors.secondary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Iphrofayili</Text>
            <Text style={styles.headerSubtitle}>Your Profile & Settings</Text>
          </View>

          {/* Profile Card */}
          <Card style={styles.profileCard}>
            <Card.Content>
              <View style={styles.profileHeader}>
                <Avatar.Image
                  size={80}
                  source={{ uri: profile.avatar || 'https://via.placeholder.com/80' }}
                />
                <View style={styles.profileInfo}>
                  <Title style={styles.profileName}>
                    {profile.firstName} {profile.lastName}
                  </Title>
                  <Text style={styles.profileEmail}>{profile.email}</Text>
                  <Text style={styles.joinDate}>
                    Member since {profile.joinDate.toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Title style={styles.sectionTitle}>Your Activity</Title>
            <View style={styles.statsGrid}>
              {renderStatCard('calendar-check', 'Events', profile.stats.eventsAttended, '#FF9500')}
              {renderStatCard('account-group', 'Posts', profile.stats.postsShared, '#007AFF')}
              {renderStatCard('book-open-variant', 'Articles', profile.stats.articlesRead, '#A3E4D7')}
              {renderStatCard('calendar-clock', 'Days Active', profile.stats.daysActive, '#FFD700')}
            </View>
          </View>

          {/* Preferences Section */}
          <Card style={styles.preferencesCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Preferences</Title>
              
              <List.Item
                title="Push Notifications"
                description="Receive notifications about cultural events and updates"
                left={() => <MaterialCommunityIcons name="bell" size={24} color={africanColors.primary} />}
                right={() => (
                  <Switch
                    value={profile.preferences.notifications}
                    onValueChange={(value) => handlePreferenceChange('notifications', value)}
                    trackColor={{ false: '#767577', true: africanColors.primary }}
                    thumbColor={profile.preferences.notifications ? '#FFFFFF' : '#f4f3f4'}
                  />
                )}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Email Updates"
                description="Receive cultural insights and app updates via email"
                left={() => <MaterialCommunityIcons name="email" size={24} color={africanColors.primary} />}
                right={() => (
                  <Switch
                    value={profile.preferences.emailUpdates}
                    onValueChange={(value) => handlePreferenceChange('emailUpdates', value)}
                    trackColor={{ false: '#767577', true: africanColors.primary }}
                    thumbColor={profile.preferences.emailUpdates ? '#FFFFFF' : '#f4f3f4'}
                  />
                )}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Community Alerts"
                description="Get notified about community events and gatherings"
                left={() => <MaterialCommunityIcons name="account-group" size={24} color={africanColors.primary} />}
                right={() => (
                  <Switch
                    value={profile.preferences.communityAlerts}
                    onValueChange={(value) => handlePreferenceChange('communityAlerts', value)}
                    trackColor={{ false: '#767577', true: africanColors.primary }}
                    thumbColor={profile.preferences.communityAlerts ? '#FFFFFF' : '#f4f3f4'}
                  />
                )}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Cultural Reminders"
                description="Reminders for important cultural dates and ceremonies"
                left={() => <MaterialCommunityIcons name="calendar-star" size={24} color={africanColors.primary} />}
                right={() => (
                  <Switch
                    value={profile.preferences.culturalReminders}
                    onValueChange={(value) => handlePreferenceChange('culturalReminders', value)}
                    trackColor={{ false: '#767577', true: africanColors.primary }}
                    thumbColor={profile.preferences.culturalReminders ? '#FFFFFF' : '#f4f3f4'}
                  />
                )}
              />
            </Card.Content>
          </Card>

          {/* Support Section */}
          <Card style={styles.supportCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Support the Mission</Title>
              
              <List.Item
                title="Voluntary Donation"
                description="Support the app's development and cultural mission"
                left={() => <MaterialCommunityIcons name="heart" size={24} color="#FF6B6B" />}
                onPress={handleDonation}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Opt-in to Ads"
                description="Help fund the app by viewing optional advertisements"
                left={() => <MaterialCommunityIcons name="advertisement" size={24} color="#4ECDC4" />}
                right={() => (
                  <Switch
                    value={profile.preferences.optInAds}
                    onValueChange={handleAdToggle}
                    trackColor={{ false: '#767577', true: '#4ECDC4' }}
                    thumbColor={profile.preferences.optInAds ? '#FFFFFF' : '#f4f3f4'}
                  />
                )}
              />
            </Card.Content>
          </Card>

          {/* App Settings */}
          <Card style={styles.settingsCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>App Settings</Title>
              
              <List.Item
                title="Language"
                description={profile.preferences.language}
                left={() => <MaterialCommunityIcons name="translate" size={24} color={africanColors.primary} />}
                onPress={() => Alert.alert('Language', 'Language selection would open here')}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Theme"
                description={profile.preferences.theme}
                left={() => <MaterialCommunityIcons name="theme-light-dark" size={24} color={africanColors.primary} />}
                onPress={() => Alert.alert('Theme', 'Theme selection would open here')}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Privacy Policy"
                description="Read our privacy policy"
                left={() => <MaterialCommunityIcons name="shield-account" size={24} color={africanColors.primary} />}
                onPress={openPrivacyPolicy}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Terms of Service"
                description="Read our terms of service"
                left={() => <MaterialCommunityIcons name="file-document" size={24} color={africanColors.primary} />}
                onPress={openTermsOfService}
              />
              
              <Divider style={styles.divider} />
              
              <List.Item
                title="Support & Feedback"
                description="Contact us for help or suggestions"
                left={() => <MaterialCommunityIcons name="help-circle" size={24} color={africanColors.primary} />}
                onPress={openSupport}
              />
            </Card.Content>
          </Card>

          {/* Logout Button */}
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor="#FF6B6B"
            icon="logout"
          >
            Logout
          </Button>

          {/* App Version */}
          <Text style={styles.versionText}>Inzalo Yelanga v1.0.0</Text>
        </ScrollView>

        {/* Donation Dialog */}
        <Portal>
          <Dialog
            visible={showDonationDialog}
            onDismiss={() => setShowDonationDialog(false)}
            style={styles.modal}
          >
            <Dialog.Title>Support Our Mission</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.donationText}>
                Inzalo Yelanga is completely free and will always remain so. However, if you find value in our mission to reconnect people with African culture and timekeeping, you can make a voluntary donation to support our development and maintenance costs.
              </Paragraph>
              <Paragraph style={styles.donationText}>
                Your contribution helps us:
                • Maintain and improve the app
                • Add new cultural content and features
                • Support community initiatives
                • Keep the app ad-free for everyone
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowDonationDialog(false)}>Cancel</Button>
              <Button onPress={() => {
                setShowDonationDialog(false);
                Alert.alert('Thank You', 'Donation link would open here. Thank you for supporting our mission!');
              }}>
                Donate
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Ad Info Dialog */}
        <Portal>
          <Dialog
            visible={showAdInfoDialog}
            onDismiss={() => setShowAdInfoDialog(false)}
            style={styles.modal}
          >
            <Dialog.Title>About Optional Ads</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.adInfoText}>
                Inzalo Yelanga is completely ad-free by default. By opting in to see ads, you help support the app's development and maintenance costs.
              </Paragraph>
              <Paragraph style={styles.adInfoText}>
                • Ads are completely optional and can be turned off anytime
                • We carefully select culturally appropriate advertisements
                • Your privacy is always protected
                • This helps keep the app free for everyone
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowAdInfoDialog(false)}>Cancel</Button>
              <Button onPress={confirmAdOptIn}>Opt In</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Logout Confirmation Dialog */}
        <Portal>
          <Dialog
            visible={showLogoutDialog}
            onDismiss={() => setShowLogoutDialog(false)}
            style={styles.modal}
          >
            <Dialog.Title>Confirm Logout</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to logout from Inzalo Yelanga?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowLogoutDialog(false)}>Cancel</Button>
              <Button onPress={confirmLogout} textColor="#FF6B6B">Logout</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    marginTop: 4,
  },
  profileCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: africanColors.onSurfaceVariant,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderLeftWidth: 4,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  statText: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: africanColors.onSurface,
  },
  statTitle: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  preferencesCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  supportCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  settingsCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    marginBottom: 20,
    borderColor: '#FF6B6B',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#F5F5DC',
    marginBottom: 20,
  },
  modal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  donationText: {
    fontSize: 14,
    lineHeight: 20,
    color: africanColors.onSurface,
    marginBottom: 12,
  },
  adInfoText: {
    fontSize: 14,
    lineHeight: 20,
    color: africanColors.onSurface,
    marginBottom: 12,
  },
});

export default ProfileScreen;