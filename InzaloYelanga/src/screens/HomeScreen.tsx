import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { africanColors, getSeasonTheme, getLunarPhaseColor } from '../theme/africanTheme';
import { calendarService, wisdomService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

interface CalendarData {
  gregorian: string;
  african: {
    africanYear: number;
    africanMonth: string;
    africanDay: number;
    season: string;
    lunarPhase: string;
    significance?: string;
  };
  lunar: {
    lunarMonth: number;
    lunarDay: number;
    phase: string;
    phasePercentage: number;
  };
  season: {
    season: string;
    description: string;
    colors: string[];
  };
}

interface WisdomData {
  title: string;
  content: string;
  author: string;
  type: string;
  date: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [wisdomData, setWisdomData] = useState<WisdomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      const [calendarResponse, wisdomResponse] = await Promise.all([
        calendarService.getToday(),
        wisdomService.getToday(),
      ]);

      if (calendarResponse.success) {
        setCalendarData(calendarResponse.data);
      }

      if (wisdomResponse.success) {
        setWisdomData(wisdomResponse.data);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Sawubona'; // Good morning in Zulu
    if (hour < 18) return 'Sanibonani'; // Good afternoon in Zulu
    return 'Ngiyakujabulela'; // Good evening in Zulu
  };

  const getMoonIcon = (phase: string) => {
    const phaseIcons: { [key: string]: string } = {
      'new': 'moon-new',
      'waxing_crescent': 'moon-waxing-crescent',
      'first_quarter': 'moon-first-quarter',
      'waxing_gibbous': 'moon-waxing-gibbous',
      'full': 'moon-full',
      'waning_gibbous': 'moon-waning-gibbous',
      'last_quarter': 'moon-last-quarter',
      'waning_crescent': 'moon-waning-crescent',
    };
    return phaseIcons[phase] || 'moon-full';
  };

  const getSeasonIcon = (season: string) => {
    const seasonIcons: { [key: string]: string } = {
      'Spring': 'flower',
      'Summer': 'weather-sunny',
      'Autumn': 'leaf',
      'Winter': 'snowflake',
    };
    return seasonIcons[season] || 'weather-sunny';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={africanColors.primary} />
          <Text style={styles.loadingText}>Loading your journey...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const seasonTheme = calendarData ? getSeasonTheme(calendarData.african.season) : null;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={seasonTheme ? [seasonTheme.primary, seasonTheme.secondary] : [africanColors.primary, africanColors.secondary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>
              {getGreeting()}, {user?.firstName}!
            </Text>
            <Text style={styles.headerSubtitle}>Welcome to your cultural journey</Text>
          </View>

          {/* Today's Date Card */}
          {calendarData && (
            <Card style={styles.dateCard}>
              <Card.Content>
                <View style={styles.dateHeader}>
                  <MaterialCommunityIcons
                    name="calendar-today"
                    size={30}
                    color={africanColors.primary}
                  />
                  <Title style={styles.dateTitle}>Today's Date</Title>
                </View>
                
                <View style={styles.dateContent}>
                  <View style={styles.dateSection}>
                    <Text style={styles.dateLabel}>African Calendar</Text>
                    <Text style={styles.africanDate}>
                      {calendarData.african.africanDay} {calendarData.african.africanMonth}
                    </Text>
                    <Text style={styles.africanYear}>
                      Year {calendarData.african.africanYear}
                    </Text>
                  </View>
                  
                  <View style={styles.dateDivider} />
                  
                  <View style={styles.dateSection}>
                    <Text style={styles.dateLabel}>Gregorian Calendar</Text>
                    <Text style={styles.gregorianDate}>
                      {new Date(calendarData.gregorian).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>

                {calendarData.african.significance && (
                  <View style={styles.significanceContainer}>
                    <MaterialCommunityIcons
                      name="star"
                      size={20}
                      color={africanColors.accent}
                    />
                    <Text style={styles.significance}>
                      {calendarData.african.significance}
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>
          )}

          {/* Season and Lunar Info */}
          {calendarData && (
            <View style={styles.infoRow}>
              <Card style={[styles.infoCard, { flex: 1, marginRight: 8 }]}>
                <Card.Content style={styles.infoContent}>
                  <MaterialCommunityIcons
                    name={getSeasonIcon(calendarData.african.season)}
                    size={40}
                    color={seasonTheme?.primary || africanColors.primary}
                  />
                  <Text style={styles.infoTitle}>{calendarData.african.season}</Text>
                  <Text style={styles.infoDescription}>
                    {calendarData.season.description}
                  </Text>
                </Card.Content>
              </Card>

              <Card style={[styles.infoCard, { flex: 1, marginLeft: 8 }]}>
                <Card.Content style={styles.infoContent}>
                  <MaterialCommunityIcons
                    name={getMoonIcon(calendarData.lunar.phase)}
                    size={40}
                    color={getLunarPhaseColor(calendarData.african.lunarPhase)}
                  />
                  <Text style={styles.infoTitle}>
                    {calendarData.african.lunarPhase}
                  </Text>
                  <Text style={styles.infoDescription}>
                    {calendarData.lunar.phasePercentage}% illuminated
                  </Text>
                </Card.Content>
              </Card>
            </View>
          )}

          {/* Daily Wisdom */}
          {wisdomData && (
            <Card style={styles.wisdomCard}>
              <Card.Content>
                <View style={styles.wisdomHeader}>
                  <MaterialCommunityIcons
                    name="lightbulb-on"
                    size={30}
                    color={africanColors.wisdom}
                  />
                  <Title style={styles.wisdomTitle}>Daily Wisdom</Title>
                </View>
                
                <Title style={styles.wisdomContentTitle}>{wisdomData.title}</Title>
                <Paragraph style={styles.wisdomContent}>
                  {wisdomData.content}
                </Paragraph>
                
                <View style={styles.wisdomFooter}>
                  <Text style={styles.wisdomAuthor}>— {wisdomData.author}</Text>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Calendar')}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={30}
                color={africanColors.primary}
              />
              <Text style={styles.actionText}>Explore Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Community')}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={30}
                color={africanColors.community}
              />
              <Text style={styles.actionText}>Join Community</Text>
            </TouchableOpacity>
          </View>

          {/* Cultural Quote */}
          <Card style={styles.quoteCard}>
            <Card.Content>
              <Text style={styles.quote}>
                "The best time to plant a tree was 20 years ago. The second best time is now."
              </Text>
              <Text style={styles.quoteAuthor}>African Proverb</Text>
            </Card.Content>
          </Card>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: africanColors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: africanColors.onBackground,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    marginTop: 4,
  },
  dateCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 4,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: africanColors.primary,
    marginLeft: 12,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSection: {
    flex: 1,
  },
  dateDivider: {
    width: 1,
    height: 60,
    backgroundColor: africanColors.outline,
    marginHorizontal: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  africanDate: {
    fontSize: 20,
    fontWeight: '600',
    color: africanColors.primary,
  },
  africanYear: {
    fontSize: 14,
    color: africanColors.onSurfaceVariant,
    marginTop: 2,
  },
  gregorianDate: {
    fontSize: 16,
    color: africanColors.onSurface,
    lineHeight: 22,
  },
  significanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: africanColors.surfaceVariant,
    borderRadius: 8,
  },
  significance: {
    fontSize: 14,
    color: africanColors.onSurface,
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 4,
  },
  infoContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginTop: 8,
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 4,
  },
  wisdomCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 4,
  },
  wisdomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  wisdomTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: africanColors.wisdom,
    marginLeft: 12,
  },
  wisdomContentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 8,
  },
  wisdomContent: {
    fontSize: 16,
    color: africanColors.onSurface,
    lineHeight: 24,
    marginBottom: 12,
  },
  wisdomFooter: {
    alignItems: 'flex-end',
  },
  wisdomAuthor: {
    fontSize: 14,
    color: africanColors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 120,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    color: africanColors.onSurface,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 4,
  },
  quote: {
    fontSize: 18,
    color: africanColors.onSurface,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: africanColors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default HomeScreen;