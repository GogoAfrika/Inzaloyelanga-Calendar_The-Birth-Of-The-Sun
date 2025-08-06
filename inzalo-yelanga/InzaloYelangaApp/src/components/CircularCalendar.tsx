import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Line, Circle, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { AfricanMonth, AfricanCalendarDate } from '../types';
import { MONTHS_DATA, calculateAfricanDate } from '../constants/africanCalendar';
import { COLORS, CALENDAR_THEME, SPACING, TYPOGRAPHY, SHADOWS } from '../constants/theme';

interface CircularCalendarProps {
  selectedMonth: AfricanMonth;
  onMonthSelect: (month: AfricanMonth) => void;
  currentDate: AfricanCalendarDate;
}

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = CALENDAR_THEME.circleSize;
const SEGMENT_SIZE = CALENDAR_THEME.monthSegmentSize;
const CENTER_SIZE = CALENDAR_THEME.centerSize;

export const CircularCalendar: React.FC<CircularCalendarProps> = ({
  selectedMonth,
  onMonthSelect,
  currentDate,
}) => {
  const [monthHandRotation] = useState(new Animated.Value(0));
  const [dayHandRotation] = useState(new Animated.Value(0));
  const [scarabRotation] = useState(new Animated.Value(0));
  
  const segmentAngle = 360 / MONTHS_DATA.length;

  useEffect(() => {
    // Calculate hand rotations based on current date
    const monthHandAngle = (currentDate.monthIndex * segmentAngle) + (segmentAngle / 2);
    const dayHandAngle = (currentDate.dayOfYear + 0.5) * (360 / (13 * 28));

    // Animate hands to current positions
    Animated.parallel([
      Animated.timing(monthHandRotation, {
        toValue: monthHandAngle,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(dayHandRotation, {
        toValue: dayHandAngle,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Start scarab rotation animation
    const rotateScarab = () => {
      scarabRotation.setValue(0);
      Animated.timing(scarabRotation, {
        toValue: 360,
        duration: 20000, // 20 seconds for full rotation
        useNativeDriver: true,
      }).start(rotateScarab);
    };
    rotateScarab();
  }, [currentDate]);

  const renderRadialLines = () => {
    const lines = [];
    const innerRadius = CIRCLE_SIZE * 0.35;
    const outerRadius = CIRCLE_SIZE * 0.42;

    for (let i = 0; i < MONTHS_DATA.length; i++) {
      const angle = (i * segmentAngle - 90) * (Math.PI / 180);
      const x1 = innerRadius * Math.cos(angle);
      const y1 = innerRadius * Math.sin(angle);
      const x2 = outerRadius * Math.cos(angle);
      const y2 = outerRadius * Math.sin(angle);

      lines.push(
        <Line
          key={`line-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={COLORS.primary}
          strokeWidth="2"
          opacity="0.7"
        />
      );
    }
    return lines;
  };

  const renderMonthSegments = () => {
    const segments = [];
    const radius = CIRCLE_SIZE * 0.35;

    MONTHS_DATA.forEach((month, index) => {
      const angleDegrees = index * segmentAngle;
      const angleRadians = (angleDegrees - 90) * (Math.PI / 180);
      
      const segmentX = radius * Math.cos(angleRadians);
      const segmentY = radius * Math.sin(angleRadians);
      
      const isCurrentMonth = currentDate.monthIndex === index;
      const isSelectedMonth = selectedMonth.id === index;

      segments.push(
        <TouchableOpacity
          key={month.id}
          style={[
            styles.monthSegment,
            {
              backgroundColor: month.color,
              transform: [
                { translateX: segmentX },
                { translateY: segmentY },
              ],
              borderColor: isCurrentMonth 
                ? COLORS.primary 
                : isSelectedMonth 
                ? COLORS.secondary 
                : 'transparent',
              borderWidth: isCurrentMonth ? 3 : isSelectedMonth ? 2 : 0,
              ...SHADOWS.md,
            },
          ]}
          onPress={() => onMonthSelect(month)}
        >
          <View style={[styles.segmentContent, { transform: [{ rotate: `-${angleDegrees}deg` }] }]}>
            <Text style={[styles.monthNumber, { color: getContrastColor(month.color) }]}>
              {month.monthNumber}
            </Text>
            <Text style={[styles.monthName, { color: getContrastColor(month.color) }]}>
              {month.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });

    return segments;
  };

  const renderScarabIcon = () => {
    const scarabRotationInterpolate = scarabRotation.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View
        style={[
          styles.scarabContainer,
          { transform: [{ rotate: scarabRotationInterpolate }] },
        ]}
      >
        <Svg width={60} height={60} viewBox="0 0 100 100">
          {/* Scarab body */}
          <Circle cx="50" cy="60" r="25" fill={COLORS.primary} />
          {/* Scarab head */}
          <Circle cx="50" cy="30" r="15" fill={COLORS.primaryDark} />
          {/* Wings */}
          <Path
            d="M25 45 Q15 35 25 25 Q35 35 50 45 Q65 35 75 25 Q85 35 75 45 Q65 55 50 45 Q35 55 25 45 Z"
            fill={COLORS.secondary}
            opacity={0.8}
          />
        </Svg>
      </Animated.View>
    );
  };

  const renderClockHands = () => {
    const monthHandRotationInterpolate = monthHandRotation.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    const dayHandRotationInterpolate = dayHandRotation.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <>
        {/* Month Hand */}
        <Animated.View
          style={[
            styles.monthHand,
            {
              height: CIRCLE_SIZE * 0.25,
              transform: [{ rotate: monthHandRotationInterpolate }],
            },
          ]}
        />
        {/* Day Hand */}
        <Animated.View
          style={[
            styles.dayHand,
            {
              height: CIRCLE_SIZE * 0.3,
              transform: [{ rotate: dayHandRotationInterpolate }],
            },
          ]}
        />
        {/* Center dot */}
        <View style={styles.centerDot} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[selectedMonth.seasonGradient.split(' ')[0].replace('linear-gradient(135deg, ', '').replace(' 0%,', ''), selectedMonth.seasonGradient.split(' ')[1].replace(' 100%)', '')]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={[styles.calendarCircle, CALENDAR_THEME.shadows.circle]}>
        {/* SVG for radial lines */}
        <Svg
          style={styles.radialLinesSvg}
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          viewBox={`-${CIRCLE_SIZE/2} -${CIRCLE_SIZE/2} ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
        >
          {renderRadialLines()}
        </Svg>

        {/* Month segments */}
        <View style={styles.segmentsContainer}>
          {renderMonthSegments()}
        </View>

        {/* Center circle with scarab and hands */}
        <View style={styles.centerCircle}>
          {renderScarabIcon()}
          {renderClockHands()}
        </View>
      </View>
    </View>
  );
};

// Helper function to determine contrasting text color
const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? COLORS.kubaBlack : COLORS.kubaWhite;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xl,
  },
  backgroundGradient: {
    position: 'absolute',
    width: CIRCLE_SIZE + 40,
    height: CIRCLE_SIZE + 40,
    borderRadius: (CIRCLE_SIZE + 40) / 2,
    opacity: 0.3,
  },
  calendarCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CALENDAR_THEME.colors.circle,
    borderWidth: 4,
    borderColor: CALENDAR_THEME.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  radialLinesSvg: {
    position: 'absolute',
    zIndex: 1,
  },
  segmentsContainer: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  monthSegment: {
    position: 'absolute',
    width: SEGMENT_SIZE,
    height: SEGMENT_SIZE,
    borderRadius: SEGMENT_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthNumber: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.bold,
    marginBottom: 2,
  },
  monthName: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.medium,
    textAlign: 'center',
  },
  centerCircle: {
    position: 'absolute',
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    backgroundColor: CALENDAR_THEME.colors.center,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  scarabContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  monthHand: {
    position: 'absolute',
    width: CALENDAR_THEME.handWidth.month,
    backgroundColor: CALENDAR_THEME.colors.monthHand,
    borderRadius: CALENDAR_THEME.handWidth.month / 2,
    transformOrigin: 'bottom center',
    bottom: '50%',
    zIndex: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  dayHand: {
    position: 'absolute',
    width: CALENDAR_THEME.handWidth.day,
    backgroundColor: CALENDAR_THEME.colors.dayHand,
    borderRadius: CALENDAR_THEME.handWidth.day / 2,
    transformOrigin: 'bottom center',
    bottom: '50%',
    zIndex: 2,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  centerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    zIndex: 3,
  },
});

export default CircularCalendar;