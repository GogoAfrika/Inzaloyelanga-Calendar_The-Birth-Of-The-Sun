import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Line, Circle, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  calculateAfricanDate, 
  getMonthData, 
  getAllMonths, 
  MONTHS_DATA,
  AfricanMonth,
  SacredDay 
} from '../utils/africanCalendar';
import { africanColors } from '../theme/africanTheme';

const { width, height } = Dimensions.get('window');

interface Event {
  id: string;
  title: string;
  description: string;
  day: number;
  monthIndex: number;
  createdAt: string;
}

interface CalendarScreenProps {
  navigation: any;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(calculateAfricanDate());
  const [selectedMonth, setSelectedMonth] = useState<AfricanMonth>(getMonthData(currentDate.monthIndex));
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayInfoModal, setShowDayInfoModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDayInfo, setSelectedDayInfo] = useState<any>(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [showInzaloModal, setShowInzaloModal] = useState(false);

  const calendarSize = Math.min(width * 0.8, height * 0.4);
  const monthCircleSize = calendarSize * 0.15;
  const centerSize = calendarSize * 0.35;

  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadEvents();
    updateCurrentDate();
    
    const interval = setInterval(updateCurrentDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate calendar rotation
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [selectedMonth]);

  const updateCurrentDate = () => {
    const newDate = calculateAfricanDate();
    setCurrentDate(newDate);
    if (selectedMonth.id !== newDate.monthIndex) {
      setSelectedMonth(getMonthData(newDate.monthIndex));
    }
  };

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('calendar_events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const saveEvents = async (newEvents: Event[]) => {
    try {
      await AsyncStorage.setItem('calendar_events', JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const handleMonthPress = (month: AfricanMonth) => {
    setSelectedMonth(month);
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    
    // Check for sacred day
    const sacredDay = selectedMonth.sacredDays.find(sd => sd.day === day);
    const dayEvents = events.filter(e => e.day === day && e.monthIndex === selectedMonth.id);
    
    setSelectedDayInfo({
      day,
      sacredDay,
      events: dayEvents,
      isCurrentDay: currentDate.africanDay === day && currentDate.monthIndex === selectedMonth.id
    });
    
    setShowDayInfoModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      day: selectedDay!,
      monthIndex: selectedMonth.id,
      createdAt: new Date().toISOString(),
    };

    const updatedEvents = [...events, event];
    saveEvents(updatedEvents);
    
    setNewEvent({ title: '', description: '' });
    setShowEventModal(false);
    setShowDayInfoModal(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedEvents = events.filter(e => e.id !== eventId);
            saveEvents(updatedEvents);
            setShowDayInfoModal(false);
          },
        },
      ]
    );
  };

  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#1C1C1E' : '#F2F2F7';
  };

  const renderMonthSegments = () => {
    const segments = [];
    const angleStep = 360 / MONTHS_DATA.length;
    const radius = calendarSize / 2 - monthCircleSize / 2 - 20;

    MONTHS_DATA.forEach((month, index) => {
      const angle = (index * angleStep - 90) * (Math.PI / 180);
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      const isCurrentMonth = currentDate.monthIndex === index;
      const isSelectedMonth = selectedMonth.id === index;
      const textColor = getContrastColor(month.color);

      segments.push(
        <TouchableOpacity
          key={month.id}
          style={[
            styles.monthSegment,
            {
              width: monthCircleSize,
              height: monthCircleSize,
              backgroundColor: month.color,
              transform: [
                { translateX: x },
                { translateY: y },
                { rotate: `${index * angleStep}deg` }
              ],
              borderWidth: isCurrentMonth ? 4 : isSelectedMonth ? 2 : 1,
              borderColor: isCurrentMonth ? '#FFD700' : isSelectedMonth ? '#007AFF' : '#333',
              zIndex: isSelectedMonth ? 2 : 1,
            },
          ]}
          onPress={() => handleMonthPress(month)}
        >
          <View style={[styles.monthContent, { transform: [{ rotate: `${-index * angleStep}deg` }] }]}>
            <Text style={[styles.monthNumber, { color: textColor }]}>
              {month.monthNumber}.
            </Text>
            <Text style={[styles.monthName, { color: textColor }]}>
              {month.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });

    return segments;
  };

  const renderDaysGrid = () => {
    const days = [];
    for (let day = 1; day <= 28; day++) {
      const isCurrentDay = currentDate.africanDay === day && currentDate.monthIndex === selectedMonth.id;
      const isSacredDay = selectedMonth.sacredDays.some(sd => sd.day === day);
      const hasEvent = events.some(e => e.day === day && e.monthIndex === selectedMonth.id);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCircle,
            {
              backgroundColor: isCurrentDay ? '#FFD700' : isSacredDay ? '#A3E4D7' : '#5D6D7E',
              borderColor: isCurrentDay ? '#2C3E50' : isSacredDay ? '#FFD700' : '#7F8C8D',
            },
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={[
            styles.dayText,
            { color: isCurrentDay || isSacredDay ? '#2C3E50' : '#FDFEFE' }
          ]}>
            {day}
          </Text>
          {hasEvent && <View style={styles.eventDot} />}
        </TouchableOpacity>
      );
    }
    return days;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={africanColors.primary} />
          <Text style={styles.loadingText}>Loading calendar...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[selectedMonth.color, selectedMonth.seasonGradient.split(',')[1]?.trim().replace('100%)', '') || selectedMonth.color]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowInzaloModal(true)}>
              <Text style={styles.appTitle}>Inzalo Yelanga</Text>
            </TouchableOpacity>
            <Text style={styles.headerSubtitle}>The Birth of the Sun</Text>
          </View>

          {/* Current Date Display */}
          <Card style={styles.currentDateCard}>
            <Card.Content>
              <Text style={styles.currentDateText}>
                Current Month: {currentDate.africanMonth} ({currentDate.africanDay}/28)
              </Text>
              <Text style={styles.currentDateText}>
                Season: {currentDate.season}
              </Text>
              <Text style={styles.currentDateText}>
                African Year: {currentDate.africanYear}
              </Text>
            </Card.Content>
          </Card>

          {/* Circular Calendar */}
          <View style={styles.calendarContainer}>
            <View style={[styles.calendarCircle, { width: calendarSize, height: calendarSize }]}>
              {/* Radial Lines */}
              <Svg width={calendarSize} height={calendarSize} style={styles.radialLinesSvg}>
                {MONTHS_DATA.map((_, index) => {
                  const angle = (index * (360 / MONTHS_DATA.length) - 90) * (Math.PI / 180);
                  const radius = calendarSize / 2 - monthCircleSize / 2 - 20;
                  const innerRadius = calendarSize / 2 * 0.35;
                  
                  const x1 = innerRadius * Math.cos(angle);
                  const y1 = innerRadius * Math.sin(angle);
                  const x2 = radius * Math.cos(angle);
                  const y2 = radius * Math.sin(angle);

                  return (
                    <Line
                      key={`radial-${index}`}
                      x1={x1 + calendarSize / 2}
                      y1={y1 + calendarSize / 2}
                      x2={x2 + calendarSize / 2}
                      y2={y2 + calendarSize / 2}
                      stroke="#FFD700"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  );
                })}
              </Svg>

              {/* Month Segments */}
              {renderMonthSegments()}

              {/* Center */}
              <View style={[styles.calendarCenter, { width: centerSize, height: centerSize }]}>
                <MaterialCommunityIcons
                  name="weather-sunny"
                  size={centerSize * 0.4}
                  color="#FFD700"
                />
              </View>
            </View>
          </View>

          {/* Month Details */}
          <Card style={styles.monthDetailsCard}>
            <Card.Content>
              <View style={styles.monthHeader}>
                <View style={[styles.monthColorIndicator, { backgroundColor: selectedMonth.color }]} />
                <Title style={styles.monthTitle}>
                  {selectedMonth.monthNumber}. {selectedMonth.name}
                </Title>
              </View>
              <Text style={styles.monthMeaning}>{selectedMonth.meaning}</Text>
              <Text style={styles.monthActivities}>{selectedMonth.activities}</Text>
            </Card.Content>
          </Card>

          {/* Days Grid */}
          <Card style={styles.daysGridCard}>
            <Card.Content>
              <Title style={styles.daysGridTitle}>28 Days of {selectedMonth.name}</Title>
              <View style={styles.daysGrid}>
                {renderDaysGrid()}
              </View>
            </Card.Content>
          </Card>

          {/* Sacred Days */}
          {selectedMonth.sacredDays.length > 0 && (
            <Card style={styles.sacredDaysCard}>
              <Card.Content>
                <Title style={styles.sacredDaysTitle}>Sacred Days</Title>
                {selectedMonth.sacredDays.map((sacredDay, index) => (
                  <View key={index} style={styles.sacredDayItem}>
                    <Text style={styles.sacredDayName}>
                      Day {sacredDay.day}: {sacredDay.name}
                    </Text>
                    <Text style={styles.sacredDayDescription}>
                      {sacredDay.description}
                    </Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}
        </ScrollView>

        {/* Day Info Modal */}
        <Modal
          visible={showDayInfoModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDayInfoModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>
                Day {selectedDayInfo?.day} Information
              </Title>
              
              {selectedDayInfo?.sacredDay && (
                <View style={styles.sacredDayInfo}>
                  <Text style={styles.sacredDayTitle}>
                    {selectedDayInfo.sacredDay.name}
                  </Text>
                  <Text style={styles.sacredDayDesc}>
                    {selectedDayInfo.sacredDay.description}
                  </Text>
                </View>
              )}

              {selectedDayInfo?.events.length > 0 && (
                <View style={styles.eventsList}>
                  <Text style={styles.eventsTitle}>Events:</Text>
                  {selectedDayInfo.events.map((event: Event) => (
                    <View key={event.id} style={styles.eventItem}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventDescription}>{event.description}</Text>
                      <TouchableOpacity
                        style={styles.deleteEventButton}
                        onPress={() => handleDeleteEvent(event.id)}
                      >
                        <MaterialCommunityIcons name="delete" size={20} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.modalButtons}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setShowDayInfoModal(false);
                    setShowEventModal(true);
                  }}
                  style={styles.addEventButton}
                >
                  Add Event
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setShowDayInfoModal(false)}
                  style={styles.closeButton}
                >
                  Close
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Add Event Modal */}
        <Modal
          visible={showEventModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowEventModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>
                Add Event for Day {selectedDay}
              </Title>
              
              <TextInput
                style={styles.eventInput}
                placeholder="Event Title"
                value={newEvent.title}
                onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                placeholderTextColor="#666"
              />
              
              <TextInput
                style={[styles.eventInput, styles.eventTextarea]}
                placeholder="Description (optional)"
                value={newEvent.description}
                onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                multiline
                numberOfLines={4}
                placeholderTextColor="#666"
              />

              <View style={styles.modalButtons}>
                <Button
                  mode="contained"
                  onPress={handleAddEvent}
                  style={styles.addEventButton}
                >
                  Add Event
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setShowEventModal(false)}
                  style={styles.closeButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Inzalo Yelanga Info Modal */}
        <Modal
          visible={showInzaloModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowInzaloModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>What is Inzalo Yelanga?</Title>
              <Text style={styles.inzaloDescription}>
                Inzalo Yelanga (meaning "Offspring of the Sun" or "Children of the Sun" in isiXhosa) 
                is a decolonial African calendar system. It is designed to reconnect African people 
                with their indigenous understanding of time, seasons, and spiritual cycles, moving 
                away from Eurocentric calendar systems.
              </Text>
              <Text style={styles.inzaloDescription}>
                The calendar is based on a 13-month cycle, with each month having 28 days, totaling 
                364 days. The 365th day (and 366th in a leap year) is considered a "Year Day" or 
                "Transition Day," not belonging to any specific month, emphasizing a continuous 
                flow rather than strict divisions.
              </Text>
              <Text style={styles.inzaloDescription}>
                Each month is named after an ancient African deity or concept, reflecting its unique 
                spiritual, agricultural, and communal significance within the Southern Hemisphere's 
                natural rhythms. The calendar aims to foster cultural identity, spiritual alignment, 
                and sustainable living practices rooted in African heritage.
              </Text>
              <Button
                mode="contained"
                onPress={() => setShowInzaloModal(false)}
                style={styles.closeButton}
              >
                Close
              </Button>
            </View>
          </View>
        </Modal>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: africanColors.onBackground,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: africanColors.onBackground,
    marginTop: 5,
  },
  currentDateCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  currentDateText: {
    fontSize: 16,
    marginBottom: 5,
    color: africanColors.onBackground,
  },
  calendarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  calendarCircle: {
    position: 'relative',
    borderRadius: 1000,
    backgroundColor: '#000000',
    borderWidth: 8,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radialLinesSvg: {
    position: 'absolute',
  },
  monthSegment: {
    position: 'absolute',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  monthContent: {
    alignItems: 'center',
  },
  monthNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  monthName: {
    fontSize: 10,
    textAlign: 'center',
  },
  calendarCenter: {
    borderRadius: 1000,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFD700',
  },
  monthDetailsCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthColorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  monthTitle: {
    fontSize: 20,
    color: africanColors.onBackground,
  },
  monthMeaning: {
    fontSize: 16,
    fontWeight: 'bold',
    color: africanColors.primary,
    marginBottom: 10,
  },
  monthActivities: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 20,
  },
  daysGridCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  daysGridTitle: {
    textAlign: 'center',
    marginBottom: 15,
    color: africanColors.onBackground,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  sacredDaysCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  sacredDaysTitle: {
    textAlign: 'center',
    marginBottom: 15,
    color: africanColors.onBackground,
  },
  sacredDayItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(163, 228, 215, 0.2)',
    borderRadius: 8,
  },
  sacredDayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: africanColors.primary,
    marginBottom: 5,
  },
  sacredDayDescription: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 15,
    color: africanColors.onBackground,
  },
  sacredDayInfo: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(163, 228, 215, 0.2)',
    borderRadius: 8,
  },
  sacredDayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: africanColors.primary,
    marginBottom: 5,
  },
  sacredDayDesc: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 18,
  },
  eventsList: {
    marginBottom: 15,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: africanColors.onBackground,
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  eventTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: africanColors.onBackground,
  },
  eventDescription: {
    flex: 1,
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  deleteEventButton: {
    padding: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  addEventButton: {
    backgroundColor: africanColors.primary,
  },
  closeButton: {
    borderColor: africanColors.outline,
  },
  eventInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: africanColors.onBackground,
  },
  eventTextarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inzaloDescription: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 20,
    marginBottom: 15,
    textAlign: 'justify',
  },
});

export default CalendarScreen;