import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  WbSunny,
  NightsStay,
  CalendarToday,
  Lightbulb,
  Public,
} from '@mui/icons-material';
import './App.css';

// African Calendar System
interface AfricanCalendarDate {
  gregorianDate: Date;
  africanYear: number;
  africanMonth: string;
  africanDay: number;
  season: string;
  lunarPhase: string;
  significance?: string;
}

interface LunarCalendarDate {
  gregorianDate: Date;
  lunarMonth: number;
  lunarDay: number;
  phase: string;
  phasePercentage: number;
}

// African months based on seasons and cultural significance
const AFRICAN_MONTHS = [
  { name: 'Ukuphila', days: 31, season: 'Spring', meaning: 'The Living' },
  { name: 'Ukuhluma', days: 30, season: 'Spring', meaning: 'The Growing' },
  { name: 'Ukuvuna', days: 31, season: 'Summer', meaning: 'The Harvesting' },
  { name: 'Ubukumkani', days: 31, season: 'Summer', meaning: 'The Royalty' },
  { name: 'Ukuthula', days: 28, season: 'Summer', meaning: 'The Peace' },
  { name: 'Ukuphendula', days: 31, season: 'Autumn', meaning: 'The Returning' },
  { name: 'Ukubuyisa', days: 31, season: 'Autumn', meaning: 'The Restoring' },
  { name: 'Ukugcina', days: 30, season: 'Winter', meaning: 'The Preserving' },
  { name: 'Ukuhlanganisa', days: 31, season: 'Winter', meaning: 'The Gathering' },
  { name: 'Ukuphakama', days: 30, season: 'Winter', meaning: 'The Rising' },
  { name: 'Ukuqonda', days: 31, season: 'Winter', meaning: 'The Understanding' },
  { name: 'Ukulungisa', days: 31, season: 'Spring', meaning: 'The Preparing' },
];

// Key cultural dates
const CULTURAL_EVENTS = {
  'african_new_year': { date: '09-23', name: 'African New Year', significance: 'Beginning of the African Royal Calendar year' },
  'royalty_day': { date: '12-23', name: 'Royalty Day', significance: 'Celebration of African royalty and leadership' },
  'ancestors_day': { date: '03-21', name: 'Ancestors Day', significance: 'Honoring the ancestors and their wisdom' },
  'harvest_festival': { date: '11-15', name: 'Harvest Festival', significance: 'Celebrating the abundance of the harvest' },
  'unity_day': { date: '06-21', name: 'Unity Day', significance: 'Celebrating African unity and solidarity' },
  'wisdom_day': { date: '04-15', name: 'Wisdom Day', significance: 'Celebrating traditional knowledge and wisdom' }
};

// African-inspired theme
const africanTheme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle Brown
      light: '#A0522D',
      dark: '#654321',
    },
    secondary: {
      main: '#D2691E', // Chocolate
      light: '#CD853F',
      dark: '#A0522D',
    },
    background: {
      default: '#FFF8DC', // Cornsilk
      paper: '#FFFAF0', // Floral White
    },
    text: {
      primary: '#2F4F4F', // Dark Slate Gray
      secondary: '#696969', // Dim Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#8B4513',
    },
    h2: {
      fontWeight: 600,
      color: '#8B4513',
    },
    h3: {
      fontWeight: 600,
      color: '#D2691E',
    },
  },
});

// Calculate African calendar date from Gregorian date
const getAfricanCalendarDate = (gregorianDate: Date): AfricanCalendarDate => {
  const year = gregorianDate.getFullYear();
  const month = gregorianDate.getMonth() + 1;
  const day = gregorianDate.getDate();

  // Calculate African year (starts on September 23)
  let africanYear: number;
  if (month >= 9 && day >= 23) {
    africanYear = year + 1;
  } else {
    africanYear = year;
  }

  // Calculate days since African New Year
  const africanNewYear = new Date(africanYear - 1, 8, 23);
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

// Calculate lunar phase
const getLunarPhase = (date: Date): string => {
  const knownNewMoon = new Date(2000, 0, 6, 18, 14);
  const lunarCycle = 29.530588853;
  
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

// Get lunar percentage
const getLunarPercentage = (date: Date): number => {
  const knownNewMoon = new Date(2000, 0, 6, 18, 14);
  const lunarCycle = 29.530588853;
  
  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycle = daysSinceKnownNewMoon % lunarCycle;
  
  if (currentCycle < 1.84566) return 0;
  else if (currentCycle < 5.53699) return Math.round((currentCycle / 7.38) * 25);
  else if (currentCycle < 9.22831) return 50;
  else if (currentCycle < 12.91963) return Math.round(50 + ((currentCycle - 7.38) / 7.38) * 25);
  else if (currentCycle < 16.61096) return 100;
  else if (currentCycle < 20.30228) return Math.round(100 - ((currentCycle - 14.76) / 7.38) * 25);
  else if (currentCycle < 23.99361) return 50;
  else return Math.round(((29.53 - currentCycle) / 7.38) * 25);
};

// Season colors
const getSeasonColors = (season: string) => {
  const seasonColors = {
    'Spring': { primary: '#90EE90', secondary: '#32CD32', background: 'linear-gradient(135deg, #90EE90, #32CD32)' },
    'Summer': { primary: '#FFD700', secondary: '#FFA500', background: 'linear-gradient(135deg, #FFD700, #FFA500)' },
    'Autumn': { primary: '#D2691E', secondary: '#CD853F', background: 'linear-gradient(135deg, #D2691E, #CD853F)' },
    'Winter': { primary: '#4682B4', secondary: '#2F4F4F', background: 'linear-gradient(135deg, #4682B4, #2F4F4F)' },
  };
  return seasonColors[season as keyof typeof seasonColors] || seasonColors.Spring;
};

function App() {
  const [calendarData, setCalendarData] = useState<AfricanCalendarDate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and calculate today's date
    setTimeout(() => {
      const today = new Date();
      const africanDate = getAfricanCalendarDate(today);
      setCalendarData(africanDate);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={africanTheme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #8B4513, #D2691E)',
          }}
        >
          <Typography variant="h2" sx={{ color: 'white', mb: 4, textAlign: 'center' }}>
            🌅 Inzalo Yelanga 🌅
          </Typography>
          <Typography variant="h5" sx={{ color: '#F5F5DC', mb: 4, textAlign: 'center' }}>
            The Birth of the Sun
          </Typography>
          <LinearProgress sx={{ width: 300, mb: 2 }} />
          <Typography sx={{ color: 'white' }}>Loading your cultural journey...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  const seasonColors = calendarData ? getSeasonColors(calendarData.season) : null;
  const lunarPercentage = calendarData ? getLunarPercentage(calendarData.gregorianDate) : 0;

  return (
    <ThemeProvider theme={africanTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: seasonColors?.background || 'linear-gradient(135deg, #8B4513, #D2691E)' }}>
        {/* Header */}
        <AppBar position="static" sx={{ background: 'rgba(139, 69, 19, 0.9)' }}>
          <Toolbar>
            <WbSunny sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Inzalo Yelanga - The Birth of the Sun
            </Typography>
            <Typography variant="body2">
              African Traditional Calendar
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Welcome Section */}
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mb: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h3" gutterBottom align="center">
              Sawubona! Welcome to Your Cultural Journey
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              A decolonial educational tool connecting you with traditional African timekeeping and cultural practices
            </Typography>
            <Typography variant="h6" align="center" sx={{ fontStyle: 'italic', color: '#8B4513' }}>
              "Ubuntu - I am because we are"
            </Typography>
          </Paper>

          {calendarData && (
            <Grid container spacing={4}>
              {/* Today's Date */}
              <Grid item xs={12} md={8}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarToday sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h5" color="primary">
                        Today's Date
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          AFRICAN CALENDAR
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                          {calendarData.africanDay} {calendarData.africanMonth}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          Year {calendarData.africanYear}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                          {AFRICAN_MONTHS.find(m => m.name === calendarData.africanMonth)?.meaning}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          GREGORIAN CALENDAR
                        </Typography>
                        <Typography variant="h6" color="textPrimary">
                          {calendarData.gregorianDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      </Grid>
                    </Grid>

                    {calendarData.significance && (
                      <Box sx={{ mt: 3, p: 2, backgroundColor: '#F5F5DC', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          ⭐ {calendarData.significance}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Season & Lunar Info */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card elevation={4}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <WbSunny sx={{ fontSize: 48, color: seasonColors?.primary, mb: 1 }} />
                        <Typography variant="h6" gutterBottom>
                          {calendarData.season}
                        </Typography>
                        <Chip 
                          label={`Season of ${calendarData.season}`} 
                          sx={{ backgroundColor: seasonColors?.primary, color: 'white' }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Card elevation={4}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <NightsStay sx={{ fontSize: 48, color: '#4682B4', mb: 1 }} />
                        <Typography variant="h6" gutterBottom>
                          {calendarData.lunarPhase}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={lunarPercentage} 
                          sx={{ mt: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {lunarPercentage}% illuminated
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Daily Wisdom */}
              <Grid item xs={12}>
                <Card elevation={4}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Lightbulb sx={{ mr: 2, color: '#9370DB' }} />
                      <Typography variant="h5" sx={{ color: '#9370DB' }}>
                        Daily Wisdom
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" gutterBottom>
                      Ubuntu Philosophy
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Ubuntu - "I am because we are." This ancient African philosophy reminds us that our 
                      humanity is interconnected. We exist in relation to others, and our well-being is 
                      tied to the well-being of our community. In the African worldview, individual 
                      success is meaningless without collective prosperity.
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
                      — African Wisdom
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Cultural Events */}
              <Grid item xs={12}>
                <Card elevation={4}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Public sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h5" color="primary">
                        Key Cultural Events
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      {Object.values(CULTURAL_EVENTS).map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Paper sx={{ p: 2, backgroundColor: '#F5F5DC' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {event.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {event.significance}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Mission Statement */}
              <Grid item xs={12}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(210, 105, 30, 0.1))',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom align="center" color="primary">
                    🌍 Our Mission
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                    "To serve as a decolonial educational tool, empowering users to reconnect with 
                    traditional African timekeeping and cultural practices, promoting a worldview 
                    rooted in nature and heritage rather than colonial systems."
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Footer */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              "The best time to plant a tree was 20 years ago. The second best time is now." - African Proverb
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1 }}>
              Asante sana (Thank you) for joining our journey to reconnect with African time and culture.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
