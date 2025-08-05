// African Royal Calendar System based on solar calendar
// New Year: September 23rd (Autumnal Equinox)
// Royalty Day: December 23rd

export interface AfricanCalendarDate {
  gregorianDate: Date;
  africanYear: number;
  africanMonth: string;
  africanDay: number;
  season: string;
  lunarPhase: string;
  significance?: string;
}

export interface LunarCalendarDate {
  gregorianDate: Date;
  lunarMonth: number;
  lunarDay: number;
  phase: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
  phasePercentage: number;
}

// African months based on seasons and cultural significance
const AFRICAN_MONTHS = [
  { name: 'Ukuphila', days: 31, season: 'Spring', meaning: 'The Living' }, // Sept 23 - Oct 23
  { name: 'Ukuhluma', days: 30, season: 'Spring', meaning: 'The Growing' }, // Oct 24 - Nov 22
  { name: 'Ukuvuna', days: 31, season: 'Summer', meaning: 'The Harvesting' }, // Nov 23 - Dec 23
  { name: 'Ubukumkani', days: 31, season: 'Summer', meaning: 'The Royalty' }, // Dec 24 - Jan 23
  { name: 'Ukuthula', days: 28, season: 'Summer', meaning: 'The Peace' }, // Jan 24 - Feb 20/21
  { name: 'Ukuphendula', days: 31, season: 'Autumn', meaning: 'The Returning' }, // Feb 21/22 - Mar 23
  { name: 'Ukubuyisa', days: 31, season: 'Autumn', meaning: 'The Restoring' }, // Mar 24 - Apr 23
  { name: 'Ukugcina', days: 30, season: 'Winter', meaning: 'The Preserving' }, // Apr 24 - May 23
  { name: 'Ukuhlanganisa', days: 31, season: 'Winter', meaning: 'The Gathering' }, // May 24 - Jun 23
  { name: 'Ukuphakama', days: 30, season: 'Winter', meaning: 'The Rising' }, // Jun 24 - Jul 23
  { name: 'Ukuqonda', days: 31, season: 'Winter', meaning: 'The Understanding' }, // Jul 24 - Aug 23
  { name: 'Ukulungisa', days: 31, season: 'Spring', meaning: 'The Preparing' }, // Aug 24 - Sep 22
];

// Key cultural dates
export const CULTURAL_EVENTS = {
  'african_new_year': { date: '09-23', name: 'African New Year', significance: 'Beginning of the African Royal Calendar year' },
  'royalty_day': { date: '12-23', name: 'Royalty Day', significance: 'Celebration of African royalty and leadership' },
  'ancestors_day': { date: '03-21', name: 'Ancestors Day', significance: 'Honoring the ancestors and their wisdom' },
  'harvest_festival': { date: '11-15', name: 'Harvest Festival', significance: 'Celebrating the abundance of the harvest' },
  'unity_day': { date: '06-21', name: 'Unity Day', significance: 'Celebrating African unity and solidarity' },
  'wisdom_day': { date: '04-15', name: 'Wisdom Day', significance: 'Celebrating traditional knowledge and wisdom' }
};

// Calculate African calendar date from Gregorian date
export const getAfricanCalendarDate = (gregorianDate: Date): AfricanCalendarDate => {
  const year = gregorianDate.getFullYear();
  const month = gregorianDate.getMonth() + 1; // JavaScript months are 0-indexed
  const day = gregorianDate.getDate();

  // Calculate African year (starts on September 23)
  let africanYear: number;
  if (month >= 9 && day >= 23) {
    africanYear = year + 1;
  } else {
    africanYear = year;
  }

  // Calculate days since African New Year
  const africanNewYear = new Date(africanYear - 1, 8, 23); // September 23 of previous Gregorian year
  const daysSinceNewYear = Math.floor((gregorianDate.getTime() - africanNewYear.getTime()) / (1000 * 60 * 60 * 24));

  // Find the African month and day
  let currentDay = daysSinceNewYear;
  let africanMonthIndex = 0;
  
  while (currentDay >= AFRICAN_MONTHS[africanMonthIndex].days && africanMonthIndex < AFRICAN_MONTHS.length - 1) {
    currentDay -= AFRICAN_MONTHS[africanMonthIndex].days;
    africanMonthIndex++;
  }

  const africanMonth = AFRICAN_MONTHS[africanMonthIndex].name;
  const africanDay = currentDay + 1;
  const season = AFRICAN_MONTHS[africanMonthIndex].season;

  // Calculate lunar phase
  const lunarPhase = getLunarPhase(gregorianDate);

  // Check for cultural significance
  const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const significance = Object.values(CULTURAL_EVENTS).find(event => event.date === dateKey)?.significance;

  return {
    gregorianDate,
    africanYear,
    africanMonth,
    africanDay,
    season,
    lunarPhase,
    significance
  };
};

// Calculate lunar phase for a given date
export const getLunarPhase = (date: Date): string => {
  // Simplified lunar phase calculation
  // This is an approximation; for production, consider using a more accurate astronomical library
  const knownNewMoon = new Date(2000, 0, 6, 18, 14); // January 6, 2000, 18:14 UTC
  const lunarCycle = 29.530588853; // Average lunar cycle in days
  
  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycle = daysSinceKnownNewMoon % lunarCycle;
  
  if (currentCycle < 1.84566) return 'New Moon';
  else if (currentCycle < 5.53699) return 'Waxing Crescent';
  else if (currentCycle < 9.22831) return 'First Quarter';
  else if (currentCycle < 12.91963) return 'Waxing Gibbous';
  else if (currentCycle < 16.61096) return 'Full Moon';
  else if (currentCycle < 20.30228) return 'Waning Gibbous';
  else if (currentCycle < 23.99361) return 'Last Quarter';
  else return 'Waning Crescent';
};

// Get detailed lunar calendar information
export const getLunarCalendarDate = (date: Date): LunarCalendarDate => {
  const knownNewMoon = new Date(2000, 0, 6, 18, 14);
  const lunarCycle = 29.530588853;
  
  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycle = daysSinceKnownNewMoon % lunarCycle;
  
  // Calculate lunar month and day
  const lunarMonth = Math.floor(daysSinceKnownNewMoon / lunarCycle) + 1;
  const lunarDay = Math.floor(currentCycle) + 1;
  
  // Determine phase
  let phase: LunarCalendarDate['phase'];
  let phasePercentage: number;
  
  if (currentCycle < 1.84566) {
    phase = 'new';
    phasePercentage = 0;
  } else if (currentCycle < 5.53699) {
    phase = 'waxing_crescent';
    phasePercentage = (currentCycle / 7.38) * 25;
  } else if (currentCycle < 9.22831) {
    phase = 'first_quarter';
    phasePercentage = 50;
  } else if (currentCycle < 12.91963) {
    phase = 'waxing_gibbous';
    phasePercentage = 50 + ((currentCycle - 7.38) / 7.38) * 25;
  } else if (currentCycle < 16.61096) {
    phase = 'full';
    phasePercentage = 100;
  } else if (currentCycle < 20.30228) {
    phase = 'waning_gibbous';
    phasePercentage = 100 - ((currentCycle - 14.76) / 7.38) * 25;
  } else if (currentCycle < 23.99361) {
    phase = 'last_quarter';
    phasePercentage = 50;
  } else {
    phase = 'waning_crescent';
    phasePercentage = ((29.53 - currentCycle) / 7.38) * 25;
  }
  
  return {
    gregorianDate: date,
    lunarMonth,
    lunarDay,
    phase,
    phasePercentage: Math.round(phasePercentage)
  };
};

// Get events for a specific month
export const getMonthEvents = (year: number, month: number): any[] => {
  const events = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const culturalEvent = Object.values(CULTURAL_EVENTS).find(event => event.date === dateKey);
    if (culturalEvent) {
      events.push({
        date,
        type: 'cultural',
        name: culturalEvent.name,
        significance: culturalEvent.significance
      });
    }
    
    // Add lunar events (new moon, full moon)
    const lunarInfo = getLunarCalendarDate(date);
    if (lunarInfo.phase === 'new' || lunarInfo.phase === 'full') {
      events.push({
        date,
        type: 'lunar',
        name: lunarInfo.phase === 'new' ? 'New Moon' : 'Full Moon',
        significance: lunarInfo.phase === 'new' 
          ? 'Time for new beginnings and setting intentions'
          : 'Time for completion, gratitude, and release'
      });
    }
  }
  
  return events;
};

// Convert Gregorian date to African calendar string
export const formatAfricanDate = (date: Date): string => {
  const africanDate = getAfricanCalendarDate(date);
  return `${africanDate.africanDay} ${africanDate.africanMonth}, ${africanDate.africanYear}`;
};

// Get season information
export const getSeasonInfo = (date: Date): { season: string; description: string; colors: string[] } => {
  const africanDate = getAfricanCalendarDate(date);
  
  const seasonInfo = {
    'Spring': {
      description: 'Time of renewal, growth, and new beginnings. Nature awakens and life flourishes.',
      colors: ['#90EE90', '#32CD32', '#228B22'] // Light green, lime green, forest green
    },
    'Summer': {
      description: 'Time of abundance, harvest, and celebration. The sun is at its strongest.',
      colors: ['#FFD700', '#FFA500', '#FF6347'] // Gold, orange, tomato
    },
    'Autumn': {
      description: 'Time of reflection, wisdom, and preparation. Nature prepares for rest.',
      colors: ['#D2691E', '#CD853F', '#A0522D'] // Chocolate, sandy brown, sienna
    },
    'Winter': {
      description: 'Time of introspection, preservation, and ancestral connection. Rest and renewal.',
      colors: ['#4682B4', '#2F4F4F', '#191970'] // Steel blue, dark slate gray, midnight blue
    }
  };
  
  return {
    season: africanDate.season,
    ...seasonInfo[africanDate.season as keyof typeof seasonInfo]
  };
};