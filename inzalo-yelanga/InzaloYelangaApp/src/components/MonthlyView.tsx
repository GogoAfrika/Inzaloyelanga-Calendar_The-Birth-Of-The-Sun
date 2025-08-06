import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MonthImage } from './MonthImage';
import { AfricanMonth, AfricanCalendarDate, UserEvent, SacredDay } from '../types';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '../constants/theme';

interface MonthlyViewProps {
  selectedMonth: AfricanMonth;
  currentDate: AfricanCalendarDate;
  events: UserEvent[];
  onDayPress: (day: number) => void;
  onEventPress: (event: UserEvent) => void;
}

interface DayModalContent {
  day: number;
  sacredDay?: SacredDay;
  events: UserEvent[];
  isCurrentDay: boolean;
}

const { width } = Dimensions.get('window');
const DAYS_PER_ROW = 7;
const DAY_SIZE = (width - SPACING.xl * 2 - SPACING.sm * (DAYS_PER_ROW - 1)) / DAYS_PER_ROW;

export const MonthlyView: React.FC<MonthlyViewProps> = ({
  selectedMonth,
  currentDate,
  events,
  onDayPress,
  onEventPress,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [dayModalContent, setDayModalContent] = useState<DayModalContent | null>(null);

  const handleDayPress = (day: number) => {
    const sacredDay = selectedMonth.sacredDays.find(sd => sd.day === day);
    const dayEvents = events.filter(event => event.day === day);
    const isCurrentDay = selectedMonth.id === currentDate.monthIndex && day === currentDate.dayOfMonth;

    setDayModalContent({
      day,
      sacredDay,
      events: dayEvents,
      isCurrentDay,
    });
    setDayModalVisible(true);
    onDayPress(day);
  };

  const renderDayGrid = () => {
    const days = [];
    for (let day = 1; day <= 28; day++) {
      const isCurrentDay = selectedMonth.id === currentDate.monthIndex && day === currentDate.dayOfMonth;
      const sacredDay = selectedMonth.sacredDays.find(sd => sd.day === day);
      const dayEvents = events.filter(event => event.day === day);
      const hasEvents = dayEvents.length > 0;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCircle,
            {
              backgroundColor: isCurrentDay 
                ? COLORS.primary 
                : sacredDay 
                ? COLORS.secondary 
                : COLORS.surface,
              borderColor: isCurrentDay 
                ? COLORS.primaryDark 
                : sacredDay 
                ? COLORS.secondaryDark 
                : selectedDay === day
                ? COLORS.primary
                : 'transparent',
              borderWidth: 2,
            },
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text
            style={[
              styles.dayText,
              {
                color: isCurrentDay || sacredDay 
                  ? COLORS.kubaBlack 
                  : COLORS.text,
                fontWeight: isCurrentDay ? TYPOGRAPHY.bold : TYPOGRAPHY.medium,
              },
            ]}
          >
            {day}
          </Text>
          {hasEvents && <View style={styles.eventDot} />}
          {sacredDay && <View style={styles.sacredDayIndicator} />}
        </TouchableOpacity>
      );
    }
    return days;
  };

  const renderDayModal = () => {
    if (!dayModalContent) return null;

    return (
      <Modal
        visible={dayModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDayModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={[selectedMonth.color, COLORS.surface]}
              style={styles.modalGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                Day {dayModalContent.day}
                {dayModalContent.isCurrentDay && " (Today)"}
              </Text>
              
              {dayModalContent.sacredDay && (
                <View style={styles.sacredDaySection}>
                  <Text style={styles.sacredDayTitle}>
                    🌟 {dayModalContent.sacredDay.name}
                  </Text>
                  <Text style={styles.sacredDayDescription}>
                    {dayModalContent.sacredDay.description}
                  </Text>
                </View>
              )}
              
              {dayModalContent.events.length > 0 && (
                <View style={styles.eventsSection}>
                  <Text style={styles.eventsSectionTitle}>Events on this Day</Text>
                  {dayModalContent.events.map((event) => (
                    <TouchableOpacity
                      key={event.id}
                      style={styles.eventItem}
                      onPress={() => onEventPress(event)}
                    >
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      {event.description && (
                        <Text style={styles.eventDescription}>{event.description}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              
              {!dayModalContent.sacredDay && dayModalContent.events.length === 0 && (
                <Text style={styles.noContentText}>
                  No special events or significance for this day.
                </Text>
              )}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDayModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Month Header */}
      <View style={styles.monthHeader}>
        <LinearGradient
          colors={[selectedMonth.color + '40', selectedMonth.color + '20']}
          style={styles.monthHeaderGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <MonthImage
          monthName={selectedMonth.name}
          color={selectedMonth.color}
          size={80}
        />
        <View style={styles.monthInfo}>
          <Text style={styles.monthTitle}>
            {selectedMonth.monthNumber}. {selectedMonth.name}
          </Text>
          <Text style={styles.monthMeaning}>{selectedMonth.meaning}</Text>
          <Text style={styles.monthSeason}>{selectedMonth.season}</Text>
        </View>
      </View>

      {/* Days Grid */}
      <View style={styles.daysContainer}>
        <Text style={styles.daysTitle}>28 Days of {selectedMonth.name}</Text>
        <View style={styles.daysGrid}>
          {renderDayGrid()}
        </View>
      </View>

      {/* Educational Content */}
      <View style={styles.educationalContent}>
        <Text style={styles.educationalTitle}>Cultural Significance</Text>
        <ScrollView style={styles.educationalScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.educationalText}>{selectedMonth.activities}</Text>
        </ScrollView>
      </View>

      {renderDayModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  monthHeader: {
    height: 200,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.lg,
  },
  monthHeaderGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  monthImage: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
  },
  monthInfo: {
    position: 'absolute',
    top: SPACING.md,
    left: 120,
    right: SPACING.md,
  },
  monthTitle: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  monthMeaning: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  monthSeason: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
  },
  daysContainer: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
  },
  daysTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  dayCircle: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: DAY_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.sm,
  },
  dayText: {
    fontSize: TYPOGRAPHY.base,
    textAlign: 'center',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  sacredDayIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  educationalContent: {
    flex: 1,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  educationalTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  educationalScroll: {
    flex: 1,
  },
  educationalText: {
    fontSize: TYPOGRAPHY.base,
    lineHeight: TYPOGRAPHY.relaxed * TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    textAlign: 'justify',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - SPACING.xl * 2,
    maxHeight: '80%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.xl,
  },
  modalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    opacity: 0.3,
  },
  modalContent: {
    padding: SPACING.lg,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  sacredDaySection: {
    backgroundColor: COLORS.secondary + '20',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  sacredDayTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.secondary,
    marginBottom: SPACING.sm,
  },
  sacredDayDescription: {
    fontSize: TYPOGRAPHY.base,
    lineHeight: TYPOGRAPHY.relaxed * TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    textAlign: 'justify',
  },
  eventsSection: {
    marginBottom: SPACING.lg,
  },
  eventsSectionTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  eventItem: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  eventTitle: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  eventDescription: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  noContentText: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textTertiary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: SPACING.xl,
  },
  modalCloseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.kubaBlack,
  },
});

export default MonthlyView;