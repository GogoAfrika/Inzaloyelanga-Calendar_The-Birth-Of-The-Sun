import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CircularCalendar } from '../components/CircularCalendar';
import { MonthlyView } from '../components/MonthlyView';
import { AfricanMonth, AfricanCalendarDate, UserEvent } from '../types';
import { MONTHS_DATA, calculateAfricanDate } from '../constants/africanCalendar';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '../constants/theme';

export const HomeScreen: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<AfricanCalendarDate>(calculateAfricanDate());
  const [selectedMonth, setSelectedMonth] = useState<AfricanMonth>(MONTHS_DATA[currentDate.monthIndex]);
  const [userEvents, setUserEvents] = useState<{ [monthId: number]: UserEvent[] }>({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'monthly'>('calendar');

  // Update current date every hour
  useEffect(() => {
    const updateDate = () => {
      const newDate = calculateAfricanDate();
      setCurrentDate(newDate);
      // Update selected month if it's currently showing the current month
      if (selectedMonth.id === currentDate.monthIndex) {
        setSelectedMonth(MONTHS_DATA[newDate.monthIndex]);
      }
    };

    const interval = setInterval(updateDate, 60 * 60 * 1000); // Update every hour
    return () => clearInterval(interval);
  }, [currentDate.monthIndex, selectedMonth.id]);

  const handleMonthSelect = (month: AfricanMonth) => {
    setSelectedMonth(month);
    setViewMode('monthly');
  };

  const handleDayPress = (day: number) => {
    // Handle day press - could open event creation modal
    console.log(`Day ${day} pressed in month ${selectedMonth.name}`);
  };

  const handleEventPress = (event: UserEvent) => {
    // Handle event press - could open event details modal
    console.log(`Event pressed: ${event.title}`);
  };

  const renderCurrentDateInfo = () => (
    <View style={styles.currentDateContainer}>
      <LinearGradient
        colors={[selectedMonth.color + '40', selectedMonth.color + '20']}
        style={styles.currentDateGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.currentDateContent}>
        <Text style={styles.currentDateLabel}>Today in Inzalo Yelanga</Text>
        <Text style={styles.currentDateText}>
          Month {currentDate.monthIndex + 1}: {MONTHS_DATA[currentDate.monthIndex].name}
        </Text>
        <Text style={styles.currentDateText}>
          Day {currentDate.dayOfMonth} of 28
        </Text>
        <Text style={styles.currentSeasonText}>
          {MONTHS_DATA[currentDate.monthIndex].season}
        </Text>
      </View>
    </View>
  );

  const renderInfoModal = () => (
    <Modal
      visible={showInfoModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowInfoModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.infoModalContainer}>
          <ScrollView style={styles.infoModalContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.infoModalTitle}>About Inzalo Yelanga</Text>
            <Text style={styles.infoModalSubtitle}>
              "Children of the Sun" - The African Royal Calendar
            </Text>
            <Text style={styles.infoModalText}>
              Inzalo Yelanga is a decolonial African calendar system designed to reconnect 
              African people with their indigenous understanding of time, seasons, and 
              spiritual cycles.
            </Text>
            <Text style={styles.infoModalText}>
              The calendar features 13 months of 28 days each (364 days total), with each 
              month named after ancient African deities and concepts. The system reflects 
              the Southern Hemisphere's natural rhythms and promotes cultural identity, 
              spiritual alignment, and sustainable living practices.
            </Text>
            <Text style={styles.infoModalText}>
              This digital sanctuary empowers users through knowledge, community connection, 
              and celebration of African heritage, moving away from colonial time systems 
              toward indigenous wisdom.
            </Text>
            <View style={styles.infoModalFeatures}>
              <Text style={styles.infoModalFeaturesTitle}>Key Features:</Text>
              <Text style={styles.infoModalFeature}>• 13-month African Royal Calendar</Text>
              <Text style={styles.infoModalFeature}>• Sacred days and cultural celebrations</Text>
              <Text style={styles.infoModalFeature}>• Educational content and wisdom</Text>
              <Text style={styles.infoModalFeature}>• Community sharing and events</Text>
              <Text style={styles.infoModalFeature}>• Decolonial perspective on time</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.infoModalCloseButton}
            onPress={() => setShowInfoModal(false)}
          >
            <Text style={styles.infoModalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderViewToggle = () => (
    <View style={styles.viewToggleContainer}>
      <TouchableOpacity
        style={[
          styles.viewToggleButton,
          viewMode === 'calendar' && styles.viewToggleButtonActive,
        ]}
        onPress={() => setViewMode('calendar')}
      >
        <Text
          style={[
            styles.viewToggleText,
            viewMode === 'calendar' && styles.viewToggleTextActive,
          ]}
        >
          Calendar View
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.viewToggleButton,
          viewMode === 'monthly' && styles.viewToggleButtonActive,
        ]}
        onPress={() => setViewMode('monthly')}
      >
        <Text
          style={[
            styles.viewToggleText,
            viewMode === 'monthly' && styles.viewToggleTextActive,
          ]}
        >
          Monthly View
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowInfoModal(true)}>
          <Text style={styles.headerTitle}>Inzalo Yelanga</Text>
          <Text style={styles.headerSubtitle}>Children of the Sun</Text>
        </TouchableOpacity>
      </View>

      {/* Current Date Info */}
      {renderCurrentDateInfo()}

      {/* View Toggle */}
      {renderViewToggle()}

      {/* Main Content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {viewMode === 'calendar' ? (
          <CircularCalendar
            selectedMonth={selectedMonth}
            onMonthSelect={handleMonthSelect}
            currentDate={currentDate}
          />
        ) : (
          <MonthlyView
            selectedMonth={selectedMonth}
            currentDate={currentDate}
            events={userEvents[selectedMonth.id] || []}
            onDayPress={handleDayPress}
            onEventPress={handleEventPress}
          />
        )}
      </ScrollView>

      {/* Info Modal */}
      {renderInfoModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY['3xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    textAlign: 'center',
    textShadowColor: COLORS.primaryDark,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  currentDateContainer: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.md,
  },
  currentDateGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  currentDateContent: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  currentDateLabel: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  currentDateText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  currentSeasonText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.primary,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xs,
    ...SHADOWS.sm,
  },
  viewToggleButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  viewToggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  viewToggleText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textSecondary,
  },
  viewToggleTextActive: {
    color: COLORS.kubaBlack,
    fontWeight: TYPOGRAPHY.semibold,
  },
  scrollContainer: {
    flex: 1,
  },
  // Info Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.xl,
  },
  infoModalContent: {
    padding: SPACING.lg,
    maxHeight: '85%',
  },
  infoModalTitle: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  infoModalSubtitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontStyle: 'italic',
  },
  infoModalText: {
    fontSize: TYPOGRAPHY.base,
    lineHeight: TYPOGRAPHY.relaxed * TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textAlign: 'justify',
  },
  infoModalFeatures: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  infoModalFeaturesTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  infoModalFeature: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.sm,
  },
  infoModalCloseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  infoModalCloseText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.kubaBlack,
  },
});

export default HomeScreen;