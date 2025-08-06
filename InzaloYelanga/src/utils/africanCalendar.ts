// African Royal Calendar Implementation
// Based on the 13-month system with 28 days each (364 days total)
// The 365th day (and 366th in leap years) is considered a "Year Day"

export interface AfricanMonth {
  id: number;
  monthNumber: number;
  name: string;
  meaning: string;
  season: string;
  activities: string;
  color: string;
  imageUrl: string;
  seasonGradient: string;
  sacredDays: SacredDay[];
}

export interface SacredDay {
  day: number;
  name: string;
  description: string;
}

export interface AfricanDate {
  africanYear: number;
  africanMonth: string;
  africanDay: number;
  monthIndex: number;
  season: string;
  significance?: string;
  lunarPhase: string;
}

export interface LunarDate {
  lunarMonth: number;
  lunarDay: number;
  phase: string;
  phasePercentage: number;
}

export interface SeasonInfo {
  season: string;
  description: string;
  colors: string[];
}

// Define the 13 months with their names, meanings, seasons, activities, colors, and image URLs
export const MONTHS_DATA: AfricanMonth[] = [
  {
    id: 0,
    monthNumber: 1,
    name: "Asar",
    meaning: "Month of Genesis / New Beginnings",
    season: "Spring (Southern Hemisphere)",
    activities: `Asar, the first month, marks the African New Year (September 23rd in the Southern Hemisphere), a profound period of genesis and renewal. It is a time for deep spiritual cleansing, shedding old energies, and setting powerful intentions for the cycle ahead. Traditional practices include communal ceremonies for purification, planting the first seeds of the season, and engaging in rites that symbolize rebirth and a fresh start. This month emphasizes reconnecting with ancestral wisdom and the foundational principles of life, promoting a decolonial mindset by recognizing indigenous systems of time and creation. It's a period of vibrant hope and collective re-alignment with natural rhythms.`,
    color: "#E6B0AA",
    imageUrl: "https://placehold.co/150x150/E6B0AA/000000?text=Asar",
    seasonGradient: "linear-gradient(135deg, #E6B0AA 0%, #D7BDE2 100%)",
    sacredDays: [
      {
        day: 23,
        name: "African New Year",
        description: "The African New Year (Zep Tepi) on September 23rd marks a profound period of genesis and renewal. It is a time for deep spiritual cleansing, shedding old energies, and setting powerful intentions for the cycle ahead. Traditional practices include communal ceremonies for purification, planting the first seeds of the season, and engaging in rites that symbolize rebirth and a fresh start. This day emphasizes reconnecting with ancestral wisdom and the foundational principles of life, promoting a decolonial mindset by recognizing indigenous systems of time and creation. It's a period of vibrant hope and collective re-alignment with natural rhythms, celebrating the return of the nurturing energy of the Sun in the Southern Hemisphere. This is a day of collective re-alignment and spiritual rebirth."
      }
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
    imageUrl: "https://placehold.co/150x150/D7BDE2/000000?text=Geb",
    seasonGradient: "linear-gradient(135deg, #D7BDE2 0%, #A9CCE3 100%)",
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
    imageUrl: "https://placehold.co/150x150/A9CCE3/000000?text=Het-Hor",
    seasonGradient: "linear-gradient(135deg, #A9CCE3 0%, #FAD7A0 100%)",
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
    imageUrl: "https://placehold.co/150x150/FAD7A0/000000?text=Ra",
    seasonGradient: "linear-gradient(135deg, #FAD7A0 0%, #F39C12 100%)",
    sacredDays: [
      {
        day: 23,
        name: "African Royalty Day",
        description: "African Royalty Day (December 23rd) is a powerful day of exaltation and spiritual renewal, marking the time when the Sun is closest to Earth. It's a day to celebrate being Afrikan and to honor the tried and tested forms of governance, Ubukhosi (African Royalty). This day is filled with ceremonies, traditional attire, and communal gatherings that reaffirm cultural identity, leadership, and the enduring strength of African heritage. It promotes a decolonial perspective by recognizing and celebrating indigenous systems of leadership and community organization."
      }
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
    imageUrl: "https://placehold.co/150x150/85C1E9/000000?text=Sobek",
    seasonGradient: "linear-gradient(135deg, #F39C12 0%, #85C1E9 100%)",
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
    imageUrl: "https://placehold.co/150x150/AED6F1/000000?text=Shu",
    seasonGradient: "linear-gradient(135deg, #85C1E9 0%, #AED6F1 100%)",
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
    imageUrl: "https://placehold.co/150x150/F5CBA7/000000?text=Isis",
    seasonGradient: "linear-gradient(135deg, #AED6F1 0%, #F5CBA7 100%)",
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
    imageUrl: "https://placehold.co/150x150/ABB2B9/000000?text=Neb-Het",
    seasonGradient: "linear-gradient(135deg, #F5CBA7 0%, #ABB2B9 100%)",
    sacredDays: [
      {
        day: 21,
        name: "Lamentation Day",
        description: "Lamentation Day (March 21st) marks the official departure of the Sun from the Southern Hemisphere, signaling the beginning of the winter season. This day is associated with Nomkhubulwane/Auset (Isis) lamenting the departure of her husband. It is a time for deep introspection, honoring ancestors, and seeking spiritual guidance in the face of diminishing light. Activities include quiet contemplation, communal rituals of remembrance, and practices that connect individuals to the spiritual realm and the wisdom of those who came before. It's a profound period for acknowledging loss, embracing the cycle of life and death, and finding strength in collective memory and spiritual resilience."
      }
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
    imageUrl: "https://placehold.co/150x150/566573/FFFFFF?text=Set",
    seasonGradient: "linear-gradient(135deg, #ABB2B9 0%, #566573 100%)",
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
    imageUrl: "https://placehold.co/150x150/D6EAF8/000000?text=Djehuti",
    seasonGradient: "linear-gradient(135deg, #566573 0%, #D6EAF8 100%)",
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
    imageUrl: "https://placehold.co/150x150/F9E79F/000000?text=Horus",
    seasonGradient: "linear-gradient(135deg, #D6EAF8 0%, #F9E79F 100%)",
    sacredDays: [
      {
        day: 21,
        name: "Rebirth of the Sun",
        description: "Rebirth of the Sun (June 21st) is a Day of Hope, marking when the Sun officially begins its journey back towards the Southern Hemisphere. Southerners are filled with hope for the return of the Sun's nurturing energy. This day is celebrated with rituals of new beginnings, expressing profound gratitude for the returning warmth and light. Activities include vibrant outdoor gatherings, ceremonies that welcome new life, and communal expressions of hope and optimism. It's a powerful time to reaffirm connections to the natural world and the cyclical nature of existence, emphasizing resilience and the promise of renewal after the deepest winter."
      }
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
    imageUrl: "https://placehold.co/150x150/F0B27A/000000?text=Neith",
    seasonGradient: "linear-gradient(135deg, #F9E79F 0%, #F0B27A 100%)",
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
    imageUrl: "https://placehold.co/150x150/A3E4D7/000000?text=Sokhemet",
    seasonGradient: "linear-gradient(135deg, #F0B27A 0%, #A3E4D7 100%)",
    sacredDays: []
  }
];

// Constants for African New Year
const AFRICAN_NEW_YEAR_MONTH = 8; // September (0-indexed)
const AFRICAN_NEW_YEAR_DAY = 23;

// Utility function to calculate current African Royal Calendar date
export const calculateAfricanDate = (date: Date = new Date()): AfricanDate => {
  const currentYear = date.getFullYear();

  // Determine the start of the African Royal Calendar year (Sept 23)
  let startOfYear = new Date(currentYear, AFRICAN_NEW_YEAR_MONTH, AFRICAN_NEW_YEAR_DAY);

  // If the date is before Sept 23 of the current year, the current African year started last Gregorian year
  if (date < startOfYear) {
    startOfYear = new Date(currentYear - 1, AFRICAN_NEW_YEAR_MONTH, AFRICAN_NEW_YEAR_DAY);
  }

  // Calculate days passed since the start of the African year
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  let dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / millisecondsPerDay);

  // The African Royal Calendar has 13 months * 28 days = 364 days
  // The 365th day (and 366th in a Gregorian leap year) is considered a "Year Day" or "Transition Day"
  const totalDaysInCalendarCycle = 13 * 28; // 364 days

  // Adjust dayOfYear to be within the 0-363 range for calculation
  dayOfYear = dayOfYear % totalDaysInCalendarCycle;

  const calculatedMonthIndex = Math.floor(dayOfYear / 28);
  const calculatedDayOfMonth = (dayOfYear % 28) + 1; // +1 because days are 1-indexed (1 to 28)

  const currentMonth = MONTHS_DATA[calculatedMonthIndex];
  
  // Check if this is a sacred day
  const sacredDay = currentMonth.sacredDays.find(sd => sd.day === calculatedDayOfMonth);
  
  return {
    africanYear: startOfYear.getFullYear(),
    africanMonth: currentMonth.name,
    africanDay: calculatedDayOfMonth,
    monthIndex: calculatedMonthIndex,
    season: currentMonth.season,
    significance: sacredDay?.name,
    lunarPhase: getLunarPhase(date)
  };
};

// Calculate lunar phase
export const getLunarPhase = (date: Date = new Date()): string => {
  // Simplified lunar phase calculation
  // In a real implementation, you would use astronomical algorithms
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const phaseIndex = Math.floor((date.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 8);
  return phases[phaseIndex];
};

// Get lunar calendar date
export const getLunarCalendarDate = (date: Date = new Date()): LunarDate => {
  // Simplified lunar calculation
  const lunarPhase = getLunarPhase(date);
  const phasePercentage = Math.floor((date.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 1 * 100);
  
  return {
    lunarMonth: Math.floor((date.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 12) + 1,
    lunarDay: Math.floor((date.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 29.53) + 1,
    phase: lunarPhase,
    phasePercentage: phasePercentage
  };
};

// Get season information
export const getSeasonInfo = (date: Date = new Date()): SeasonInfo => {
  const africanDate = calculateAfricanDate(date);
  const currentMonth = MONTHS_DATA[africanDate.monthIndex];
  
  return {
    season: currentMonth.season,
    description: currentMonth.activities,
    colors: [currentMonth.color, currentMonth.seasonGradient.split(',')[1]?.trim().replace('100%)', '') || currentMonth.color]
  };
};

// Get month data by index
export const getMonthData = (monthIndex: number): AfricanMonth => {
  return MONTHS_DATA[monthIndex] || MONTHS_DATA[0];
};

// Get sacred days for a specific month
export const getSacredDays = (monthIndex: number): SacredDay[] => {
  return MONTHS_DATA[monthIndex]?.sacredDays || [];
};

// Check if a specific date is a sacred day
export const isSacredDay = (date: Date = new Date()): SacredDay | null => {
  const africanDate = calculateAfricanDate(date);
  const sacredDays = getSacredDays(africanDate.monthIndex);
  return sacredDays.find(sd => sd.day === africanDate.africanDay) || null;
};

// Get all months data
export const getAllMonths = (): AfricanMonth[] => {
  return MONTHS_DATA;
};