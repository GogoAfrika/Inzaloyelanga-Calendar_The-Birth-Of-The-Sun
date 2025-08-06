import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, ActivityIndicator, Portal, Dialog } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { africanColors, getSeasonTheme } from '../theme/africanTheme';

const { width, height } = Dimensions.get('window');

// African Royal Calendar Data (13 months, 28 days each)
const MONTHS_DATA = [
  {
    id: 0,
    monthNumber: 1,
    name: "Asar",
    meaning: "Month of Genesis / New Beginnings",
    season: "Spring (Southern Hemisphere)",
    activities: `Asar, the first month, marks the African New Year (September 23rd in the Southern Hemisphere), a profound period of genesis and renewal. It is a time for deep spiritual cleansing, shedding old energies, and setting powerful intentions for the cycle ahead. Traditional practices include communal ceremonies for purification, planting the first seeds of the season, and engaging in rites that symbolize rebirth and a fresh start. This month emphasizes reconnecting with ancestral wisdom and the foundational principles of life, promoting a decolonial mindset by recognizing indigenous systems of time and creation. It's a period of vibrant hope and collective re-alignment with natural rhythms.`,
    color: "#E6B0AA",
    seasonGradient: ["#E6B0AA", "#D7BDE2"],
    sacredDays: [
      { day: 23, name: "African New Year", description: "The African New Year (Zep Tepi) on September 23rd marks a profound period of genesis and renewal. It is a time for deep spiritual cleansing, shedding old energies, and setting powerful intentions for the cycle ahead. Traditional practices include communal ceremonies for purification, planting the first seeds of the season, and engaging in rites that symbolize rebirth and a fresh start. This day emphasizes reconnecting with ancestral wisdom and the foundational principles of life, promoting a decolonial mindset by recognizing indigenous systems of time and creation. It's a period of vibrant hope and collective re-alignment with natural rhythms, celebrating the return of the nurturing energy of the Sun in the Southern Hemisphere. This is a day of collective re-alignment and spiritual rebirth." }
    ]
  },
  {
    id: 1,
    monthNumber: 2,
    name: "Geb",
    meaning: "Month of Growth",
    season: "Late Spring / Early Summer",
    activities: `Geb, the second month, is dedicated to nurturing growth, both in the natural world and within oneself. As the earth warms, plants flourish, and this is reflected in human endeavors. Activities focus on tending to young crops, fostering personal development through learning and skill acquisition, and strengthening community bonds. It's a time for active engagement with the environment, understanding the interconnectedness of all life, and building resilient social structures. Decolonially, this month encourages sustainable practices and the cultivation of knowledge systems rooted in African heritage.`,
    color: "#D7BDE2",
    seasonGradient: ["#D7BDE2", "#A9CCE3"],
    sacredDays: []
  },
  {
    id: 2,
    monthNumber: 3,
    name: "Het-Hor",
    meaning: "Month of Fruits",
    season: "Early Summer",
    activities: `Het-Hor, the third month, celebrates the initial bounties of the early summer harvest. It's a period of abundance, where the fruits of earlier labor begin to manifest. Cultural practices include communal feasts, sharing blessings, and expressing gratitude for nature's generosity. This month encourages a spirit of reciprocity and collective well-being, moving away from individualistic consumption towards shared prosperity. It's a joyful time of vibrant energy, preparing for the peak of the sun's power and the full flourishing of the season.`,
    color: "#A9CCE3",
    seasonGradient: ["#A9CCE3", "#FAD7A0"],
    sacredDays: []
  },
  {
    id: 3,
    monthNumber: 4,
    name: "Ra",
    meaning: "Month of the Sun",
    season: "Mid-Summer",
    activities: `Ra, the fourth month, marks the zenith of the sun's power and warmth. This is a time of vibrant energy, celebration, and honoring leadership and royalty. It aligns with African Royalty Day (December 23rd), a day for exalting royalty and traditional forms of governance. Activities include grand community gatherings, traditional dances, storytelling sessions, and ceremonies that reaffirm cultural identity and collective strength. This month is about embracing the brilliance of African heritage and celebrating self-determination.`,
    color: "#FAD7A0",
    seasonGradient: ["#FAD7A0", "#F39C12"],
    sacredDays: [
      { day: 23, name: "African Royalty Day", description: "African Royalty Day (December 23rd) is a powerful day of exaltation and spiritual renewal, marking the time when the Sun is closest to Earth. It's a day to celebrate being Afrikan and to honor the tried and tested forms of governance, Ubukhosi (African Royalty). This day is filled with ceremonies, traditional attire, and communal gatherings that reaffirm cultural identity, leadership, and the enduring strength of African heritage. It promotes a decolonial perspective by recognizing and celebrating indigenous systems of leadership and community organization." }
    ]
  },
  {
    id: 4,
    monthNumber: 5,
    name: "Sobek",
    meaning: "Month of Waters",
    season: "Late Summer",
    activities: `Sobek, the fifth month, is deeply connected to the life-giving force of water. As the peak of summer passes, this period focuses on giving thanks for the rains and engaging in rituals for purification and cleansing. It's a time for reflection on the past season's abundance and preparing for the coming transitions. Water ceremonies, communal baths, and discussions about resource management are common. This month encourages a mindful relationship with natural resources and the understanding of water as a sacred element vital for all life.`,
    color: "#85C1E9",
    seasonGradient: ["#F39C12", "#85C1E9"],
    sacredDays: []
  },
  {
    id: 5,
    monthNumber: 6,
    name: "Shu",
    meaning: "Month of Winds",
    season: "Autumn (Transition)",
    activities: `Shu, the sixth month, embodies the spirit of change and transition as autumn begins. The winds carry away old leaves, symbolizing the release of what no longer serves. This is a period for spiritual cleansing, letting go of burdens, and embracing transformation. Activities may include meditative practices, communal discussions on adapting to change, and preparing homes and communities for cooler weather. It's a time to reflect on personal and collective resilience, understanding that change is a natural and necessary part of life's cycle.`,
    color: "#AED6F1",
    seasonGradient: ["#85C1E9", "#AED6F1"],
    sacredDays: []
  },
  {
    id: 6,
    monthNumber: 7,
    name: "Isis",
    meaning: "Month of Ripening",
    season: "Mid-Autumn",
    activities: `Isis, the seventh month, focuses on the final stages of ripening and the gathering of the last harvests. It's a crucial time for storing provisions, ensuring sustenance through the leaner months. Culturally, this month is rich with storytelling, where elders pass down wisdom, histories, and traditions to younger generations. It emphasizes the importance of knowledge preservation, intergenerational learning, and community resilience through shared resources. This period reinforces the value of collective memory and the continuity of cultural practices.`,
    color: "#F5CBA7",
    seasonGradient: ["#AED6F1", "#F5CBA7"],
    sacredDays: []
  },
  {
    id: 7,
    monthNumber: 8,
    name: "Neb-Het",
    meaning: "Month of Lamentation",
    season: "Late Autumn / Early Winter",
    activities: `Neb-Het, the eighth month, is a period of deep introspection and reflection, aligning with Lamentation Day (March 21st). It marks the sun's official departure from the Southern Hemisphere, signaling the beginning of winter. This is a time for mourning, honoring ancestors, and seeking spiritual guidance in the face of diminishing light. Activities include quiet contemplation, communal rituals of remembrance, and practices that connect individuals to the spiritual realm and the wisdom of those who came before. It's a profound period for acknowledging loss, embracing the cycle of life and death, and finding strength in collective memory and spiritual resilience.`,
    color: "#ABB2B9",
    seasonGradient: ["#F5CBA7", "#ABB2B9"],
    sacredDays: [
      { day: 21, name: "Lamentation Day", description: "Lamentation Day (March 21st) marks the official departure of the Sun from the Southern Hemisphere, signaling the beginning of the winter season. This day is associated with Nomkhubulwane/Auset (Isis) lamenting the departure of her husband. It is a time for deep introspection, honoring ancestors, and seeking spiritual guidance in the face of diminishing light. Activities include quiet contemplation, communal rituals of remembrance, and practices that connect individuals to the spiritual realm and the wisdom of those who came before. It's a profound period for acknowledging loss, embracing the cycle of life and death, and finding strength in collective memory and spiritual resilience." }
    ]
  },
  {
    id: 8,
    monthNumber: 9,
    name: "Set",
    meaning: "Month of Darkness / Depth",
    season: "Mid-Winter",
    activities: `Set, the ninth month, represents the deepest part of winter, a time of profound darkness and introspection. This period encourages spiritual retreats, quiet contemplation, and connecting with inner wisdom. It's not a time of despair, but rather an opportunity for profound self-discovery and internal grounding. Activities may include meditation, dream interpretation, and focusing on personal and collective healing. This month reminds us that even in darkness, there is potential for growth and the emergence of new understanding.`,
    color: "#566573",
    seasonGradient: ["#ABB2B9", "#566573"],
    sacredDays: []
  },
  {
    id: 9,
    monthNumber: 10,
    name: "Djehuti",
    meaning: "Month of Rejuvenation",
    season: "Late Winter",
    activities: `Djehuti, the tenth month, is a time of subtle rejuvenation and the stirring of new life, as the sun begins its journey back towards the Southern Hemisphere. This period focuses on preparing for the return of light, planning for the new cycle, and engaging in communal healing practices. It's a time for nurturing hope, revitalizing spirits, and sharing knowledge that will guide future endeavors. Activities include educational workshops, strategic planning for community projects, and rituals that invite renewed energy and clarity.`,
    color: "#D6EAF8",
    seasonGradient: ["#566573", "#D6EAF8"],
    sacredDays: []
  },
  {
    id: 10,
    monthNumber: 11,
    name: "Horus",
    meaning: "Month of Rebirth",
    season: "Early Spring (Return of Sun)",
    activities: `Horus, the eleventh month, celebrates the official rebirth of the sun's journey towards the Southern Hemisphere, aligning with Rebirth of the Sun (June 21st). This is a joyous period for rituals of new beginnings, expressing profound gratitude for the returning warmth and light. Activities include vibrant outdoor gatherings, ceremonies that welcome new life, and communal expressions of hope and optimism. It's a powerful time to reaffirm connections to the natural world and the cyclical nature of existence.`,
    color: "#F9E79F",
    seasonGradient: ["#D6EAF8", "#F9E79F"],
    sacredDays: [
      { day: 21, name: "Rebirth of the Sun", description: "Rebirth of the Sun (June 21st) is a Day of Hope, marking when the Sun officially begins its journey back towards the Southern Hemisphere. Southerners are filled with hope for the return of the Sun's nurturing energy. This day is celebrated with rituals of new beginnings, expressing profound gratitude for the returning warmth and light. Activities include vibrant outdoor gatherings, ceremonies that welcome new life, and communal expressions of hope and optimism. It's a powerful time to reaffirm connections to the natural world and the cyclical nature of existence, emphasizing resilience and the promise of renewal after the deepest winter." }
    ]
  },
  {
    id: 11,
    monthNumber: 12,
    name: "Neith",
    meaning: "Month of Preparation",
    season: "Mid-Spring",
    activities: `Neith, the twelfth month, is dedicated to final preparations for the upcoming African New Year. This period focuses on organizing, planning, and strengthening social structures. Communities engage in collective efforts to ensure readiness for the new cycle, which might include mending tools, preparing fields, and resolving any outstanding conflicts. It's a time for meticulous attention to detail and ensuring that all aspects of communal life are in order, fostering unity and readiness for the future.`,
    color: "#F0B27A",
    seasonGradient: ["#F9E79F", "#F0B27A"],
    sacredDays: []
  },
  {
    id: 12,
    monthNumber: 13,
    name: "Sokhemet",
    meaning: "Month of Breath / Transition",
    season: "Transition Period",
    activities: `Sokhemet, the thirteenth and final month, is a brief but crucial period of reflection and transition before the new cycle begins with Asar. It's a time to honor the past year's journey, acknowledge lessons learned, and release any lingering attachments. Activities might include quiet introspection, small family gatherings, and rituals that facilitate a smooth transition. This month emphasizes the importance of pause and integration, ensuring that individuals and communities are spiritually and mentally prepared for the fresh start that awaits.`,
    color: "#A3E4D7",
    seasonGradient: ["#F0B27A", "#A3E4D7"],
    sacredDays: []
  }
];

const AFRICAN_NEW_YEAR_MONTH = 8; // September (0-indexed)
const AFRICAN_NEW_YEAR_DAY = 23;

// Utility function to calculate current African Royal Calendar date
const calculateAfricanDate = () => {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Determine the start of the African Royal Calendar year (Sept 23)
  let startOfYear = new Date(currentYear, AFRICAN_NEW_YEAR_MONTH, AFRICAN_NEW_YEAR_DAY);

  // If today is before Sept 23 of the current year, the current African year started last Gregorian year.
  if (today < startOfYear) {
    startOfYear = new Date(currentYear - 1, AFRICAN_NEW_YEAR_MONTH, AFRICAN_NEW_YEAR_DAY);
  }

  // Calculate days passed since the start of the African year
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  let dayOfYear = Math.floor((today - startOfYear) / millisecondsPerDay);

  // The African Royal Calendar has 13 months * 28 days = 364 days.
  const totalDaysInCalendarCycle = 13 * 28; // 364 days

  // Adjust dayOfYear to be within the 0-363 range for calculation
  dayOfYear = dayOfYear % totalDaysInCalendarCycle;

  const calculatedMonthIndex = Math.floor(dayOfYear / 28);
  const calculatedDayOfMonth = (dayOfYear % 28) + 1; // +1 because days are 1-indexed (1 to 28)

  return {
    monthIndex: calculatedMonthIndex,
    dayOfMonth: calculatedDayOfMonth,
    dayOfYear: dayOfYear
  };
};

interface Event {
  id: string;
  title: string;
  day: number;
  description: string;
  monthId: number;
}

const CalendarScreen: React.FC = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [currentDayOfMonth, setCurrentDayOfMonth] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(MONTHS_DATA[0]);
  const [events, setEvents] = useState<{ [key: number]: Event[] }>({});
  const [showDayInfoModal, setShowDayInfoModal] = useState(false);
  const [dayInfoModalContent, setDayInfoModalContent] = useState<any>(null);
  const [selectedDayForEvent, setSelectedDayForEvent] = useState<number | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState(1);
  const [newEventDescription, setNewEventDescription] = useState('');
  const [showInzaloModal, setShowInzaloModal] = useState(false);

  useEffect(() => {
    const updateCalendar = () => {
      const { monthIndex, dayOfMonth } = calculateAfricanDate();
      setCurrentMonthIndex(monthIndex);
      setCurrentDayOfMonth(dayOfMonth);
      setSelectedMonth(MONTHS_DATA[monthIndex]);
    };

    updateCalendar();
    const interval = setInterval(updateCalendar, 60 * 60 * 1000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  const handleMonthClick = (month: typeof MONTHS_DATA[0]) => {
    setSelectedMonth(month);
    setShowDayInfoModal(false);
    setSelectedDayForEvent(null);
  };

  const handleDayClick = (day: number) => {
    setSelectedDayForEvent(day);
    setNewEventDay(day);

    const sacredDay = selectedMonth.sacredDays.find(sd => sd.day === day);
    const dayEvents = events[selectedMonth.id]?.filter(e => e.day === day) || [];

    setDayInfoModalContent({
      day: day,
      isSacred: !!sacredDay,
      sacredInfo: sacredDay,
      eventsForDay: dayEvents
    });

    setShowDayInfoModal(true);
  };

  const handleAddEvent = () => {
    if (!newEventTitle || !newEventDay) {
      Alert.alert('Error', 'Please enter event title and select a day.');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newEventTitle,
      day: parseInt(newEventDay.toString()),
      description: newEventDescription,
      monthId: selectedMonth.id
    };

    setEvents(prevEvents => ({
      ...prevEvents,
      [selectedMonth.id]: [...(prevEvents[selectedMonth.id] || []), newEvent]
    }));

    setNewEventTitle('');
    setNewEventDay(1);
    setNewEventDescription('');
    setShowEventForm(false);
    setSelectedDayForEvent(null);
  };

  const eventsForSelectedMonth = events[selectedMonth.id] || [];
  const segmentAngle = 360 / MONTHS_DATA.length;
  const calendarRadius = Math.min(width * 0.35, 180);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={selectedMonth.seasonGradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowInzaloModal(true)}>
              <Text style={styles.appTitle}>Inzalo Yelanga</Text>
            </TouchableOpacity>
          </View>

          {/* Current Date Display */}
          <Card style={styles.currentDateCard}>
            <Card.Content>
              <Text style={styles.currentDateText}>
                <Text style={styles.currentDateLabel}>Current Month:</Text> {MONTHS_DATA[currentMonthIndex].monthNumber}. {MONTHS_DATA[currentMonthIndex].name}
              </Text>
              <Text style={styles.currentDateText}>
                <Text style={styles.currentDateLabel}>Day:</Text> {currentDayOfMonth} / 28
              </Text>
              <Text style={styles.currentDateText}>
                <Text style={styles.currentDateLabel}>Season:</Text> {MONTHS_DATA[currentMonthIndex].season}
              </Text>
            </Card.Content>
          </Card>

          {/* Circular Calendar */}
          <View style={styles.calendarContainer}>
            <View style={styles.calendarCircle}>
              <Svg width={calendarRadius * 2} height={calendarRadius * 2}>
                <G transform={`translate(${calendarRadius}, ${calendarRadius})`}>
                  {/* Radial lines */}
                  {MONTHS_DATA.map((_, i) => {
                    const angle = (i * segmentAngle - 90) * Math.PI / 180;
                    const innerRadius = calendarRadius * 0.35;
                    const outerRadius = calendarRadius * 0.85;
                    
                    const x1 = innerRadius * Math.cos(angle);
                    const y1 = innerRadius * Math.sin(angle);
                    const x2 = outerRadius * Math.cos(angle);
                    const y2 = outerRadius * Math.sin(angle);

                    return (
                      <Line
                        key={`radial-line-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#FFD700"
                        strokeWidth="2"
                        opacity="0.7"
                      />
                    );
                  })}
                </G>
              </Svg>

              {/* Month segments */}
              {MONTHS_DATA.map((month, index) => {
                const angleDegrees = index * segmentAngle;
                const angleRadians = (angleDegrees - 90) * Math.PI / 180;
                const monthCenterRadius = calendarRadius * 0.6;
                
                const segmentX = monthCenterRadius * Math.cos(angleRadians);
                const segmentY = monthCenterRadius * Math.sin(angleRadians);

                const isCurrentMonth = currentMonthIndex === index;
                const isSelectedMonth = selectedMonth.id === index;

                return (
                  <TouchableOpacity
                    key={month.id}
                    style={[
                      styles.monthSegment,
                      {
                        transform: [
                          { translateX: segmentX - 30 },
                          { translateY: segmentY - 30 },
                          { rotate: `${-angleDegrees}deg` }
                        ],
                        backgroundColor: month.color,
                        borderColor: isCurrentMonth ? '#FFD700' : (isSelectedMonth ? '#007AFF' : '#333'),
                        borderWidth: isCurrentMonth ? 4 : (isSelectedMonth ? 2 : 1),
                        zIndex: isSelectedMonth ? 2 : 1,
                      }
                    ]}
                    onPress={() => handleMonthClick(month)}
                  >
                    <Text style={[styles.monthNumber, { color: getContrastColor(month.color) }]}>
                      {month.monthNumber}.
                    </Text>
                    <Text style={[styles.monthName, { color: getContrastColor(month.color) }]}>
                      {month.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {/* Center scarab */}
              <View style={styles.calendarCenter}>
                <MaterialCommunityIcons
                  name="bug"
                  size={40}
                  color="#FFD700"
                />
              </View>
            </View>
          </View>

          {/* Month Details */}
          <Card style={styles.monthDetailsCard}>
            <Card.Content>
              <Title style={styles.detailTitle}>
                {selectedMonth.monthNumber}. {selectedMonth.name}: {selectedMonth.meaning}
              </Title>

              {/* 28 Days Grid */}
              <View style={styles.daysGridContainer}>
                {[...Array(28)].map((_, dayIndex) => {
                  const day = dayIndex + 1;
                  const isCurrentDay = selectedMonth.id === currentMonthIndex && day === currentDayOfMonth;
                  const isSacredDay = selectedMonth.sacredDays.some(sd => sd.day === day);
                  const hasEvent = eventsForSelectedMonth.some(event => event.day === day);
                  const isSelectedForEvent = selectedDayForEvent === day;

                  return (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayCircle,
                        {
                          backgroundColor: isCurrentDay ? '#FFD700' : (isSacredDay ? '#A3E4D7' : '#5D6D7E'),
                          borderColor: isCurrentDay ? '#2C3E50' : (isSacredDay ? '#FFD700' : (isSelectedForEvent ? '#007AFF' : '#7F8C8D')),
                          borderWidth: isCurrentDay ? 2 : (isSacredDay ? 2 : (isSelectedForEvent ? 2 : 1)),
                        }
                      ]}
                      onPress={() => handleDayClick(day)}
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
                })}
              </View>

              {/* Educational Information */}
              <Paragraph style={styles.detailText}>
                <Text style={styles.detailLabel}>Season:</Text> {selectedMonth.season}
              </Paragraph>
              <Paragraph style={styles.detailText}>
                <Text style={styles.detailLabel}>Activities & Significance:</Text> {selectedMonth.activities}
              </Paragraph>

              {/* Event Creation Form */}
              <View style={styles.eventFormContainer}>
                <Button
                  mode="contained"
                  onPress={() => setShowEventForm(true)}
                  style={styles.addEventButton}
                >
                  Create New Event
                </Button>
              </View>

              {/* Events List */}
              {eventsForSelectedMonth.length > 0 && (
                <View style={styles.eventsListContainer}>
                  <Title style={styles.eventsListTitle}>Events for {selectedMonth.name}</Title>
                  {eventsForSelectedMonth.map(event => (
                    <Card key={event.id} style={styles.eventItem}>
                      <Card.Content>
                        <Title style={styles.eventItemTitle}>{event.title} - Day {event.day}</Title>
                        {event.description && (
                          <Paragraph style={styles.eventItemDescription}>{event.description}</Paragraph>
                        )}
                      </Card.Content>
                    </Card>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>
        </ScrollView>

        {/* Day Information Modal */}
        <Portal>
          <Dialog
            visible={showDayInfoModal}
            onDismiss={() => setShowDayInfoModal(false)}
            style={styles.modal}
          >
            <Dialog.Title>Day {dayInfoModalContent?.day} Information</Dialog.Title>
            <Dialog.Content>
              {dayInfoModalContent?.isSacred && (
                <>
                  <Title style={styles.modalSubtitle}>{dayInfoModalContent.sacredInfo.name}</Title>
                  <Paragraph style={styles.modalText}>{dayInfoModalContent.sacredInfo.description}</Paragraph>
                </>
              )}
              {dayInfoModalContent?.eventsForDay?.length > 0 && (
                <>
                  <Title style={styles.modalSubtitle}>Events on this Day:</Title>
                  {dayInfoModalContent.eventsForDay.map((event: Event) => (
                    <Paragraph key={event.id} style={styles.modalEventItem}>
                      <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>: {event.description || 'No description'}
                    </Paragraph>
                  ))}
                </>
              )}
              {!dayInfoModalContent?.isSacred && dayInfoModalContent?.eventsForDay?.length === 0 && (
                <Paragraph style={styles.modalText}>No special information or events for this day.</Paragraph>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { setShowDayInfoModal(false); setShowEventForm(true); }}>
                Create Event
              </Button>
              <Button onPress={() => setShowDayInfoModal(false)}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Event Creation Modal */}
        <Portal>
          <Dialog
            visible={showEventForm}
            onDismiss={() => setShowEventForm(false)}
            style={styles.modal}
          >
            <Dialog.Title>Create New Event for Day {newEventDay}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder="Event Title"
                value={newEventTitle}
                onChangeText={setNewEventTitle}
                style={styles.eventInput}
              />
              <TextInput
                placeholder="Description (optional)"
                value={newEventDescription}
                onChangeText={setNewEventDescription}
                multiline
                numberOfLines={3}
                style={styles.eventTextarea}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleAddEvent}>Add Event</Button>
              <Button onPress={() => setShowEventForm(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Inzalo Yelanga Info Modal */}
        <Portal>
          <Dialog
            visible={showInzaloModal}
            onDismiss={() => setShowInzaloModal(false)}
            style={styles.modal}
          >
            <Dialog.Title>What is Inzalo Yelanga?</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.modalText}>
                <Text style={{ fontWeight: 'bold' }}>Inzalo Yelanga</Text> (meaning "Offspring of the Sun" or "Children of the Sun" in isiXhosa) is a decolonial African calendar system. It is designed to reconnect African people with their indigenous understanding of time, seasons, and spiritual cycles, moving away from Eurocentric calendar systems.
              </Paragraph>
              <Paragraph style={styles.modalText}>
                The calendar is based on a 13-month cycle, with each month having 28 days, totaling 364 days. The 365th day (and 366th in a leap year) is considered a "Year Day" or "Transition Day," not belonging to any specific month, emphasizing a continuous flow rather than strict divisions.
              </Paragraph>
              <Paragraph style={styles.modalText}>
                Each month is named after an ancient African deity or concept, reflecting its unique spiritual, agricultural, and communal significance within the Southern Hemisphere's natural rhythms. The calendar aims to foster cultural identity, spiritual alignment, and sustainable living practices rooted in African heritage.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowInzaloModal(false)}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Helper function to determine contrasting text color
function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#1C1C1E' : '#F2F2F7';
}

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
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  currentDateCard: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  currentDateText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#2C3E50',
  },
  currentDateLabel: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  calendarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  calendarCircle: {
    position: 'relative',
    width: Math.min(width * 0.7, 360),
    height: Math.min(width * 0.7, 360),
    borderRadius: Math.min(width * 0.35, 180),
    backgroundColor: '#000000',
    borderWidth: 8,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthSegment: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFD700',
  },
  monthDetailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  detailTitle: {
    fontSize: 20,
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  daysGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    elevation: 2,
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
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#2C3E50',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#A3E4D7',
  },
  eventFormContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  addEventButton: {
    backgroundColor: '#FF9500',
  },
  eventsListContainer: {
    marginTop: 20,
  },
  eventsListTitle: {
    fontSize: 18,
    color: '#A3E4D7',
    marginBottom: 15,
    textAlign: 'center',
  },
  eventItem: {
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  eventItemTitle: {
    fontSize: 16,
    color: '#FFD700',
  },
  eventItemDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  modal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#A3E4D7',
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2C3E50',
    marginBottom: 10,
  },
  modalEventItem: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 8,
  },
  eventInput: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  eventTextarea: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
});

export default CalendarScreen;