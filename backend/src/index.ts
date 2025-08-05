import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Import database connection
import connectDB from './config/database';

// Import routes
import authRoutes from './routes/auth';

// Import middleware
import { protect } from './middleware/auth';

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:19006',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(generalLimiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inzalo Yelanga API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);

// African Calendar API endpoints
app.get('/api/calendar/today', (req, res) => {
  try {
    const { getAfricanCalendarDate, getLunarCalendarDate, getSeasonInfo } = require('./utils/africanCalendar');
    const today = new Date();
    
    const africanDate = getAfricanCalendarDate(today);
    const lunarDate = getLunarCalendarDate(today);
    const seasonInfo = getSeasonInfo(today);
    
    res.json({
      success: true,
      data: {
        gregorian: today,
        african: africanDate,
        lunar: lunarDate,
        season: seasonInfo
      }
    });
  } catch (error) {
    console.error('Calendar today error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting today\'s calendar information'
    });
  }
});

app.get('/api/calendar/date/:date', (req, res) => {
  try {
    const { getAfricanCalendarDate, getLunarCalendarDate, getSeasonInfo } = require('./utils/africanCalendar');
    const requestedDate = new Date(req.params.date);
    
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    
    const africanDate = getAfricanCalendarDate(requestedDate);
    const lunarDate = getLunarCalendarDate(requestedDate);
    const seasonInfo = getSeasonInfo(requestedDate);
    
    res.json({
      success: true,
      data: {
        gregorian: requestedDate,
        african: africanDate,
        lunar: lunarDate,
        season: seasonInfo
      }
    });
  } catch (error) {
    console.error('Calendar date error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting calendar information for the specified date'
    });
  }
});

app.get('/api/calendar/events/:year/:month', (req, res) => {
  try {
    const { getMonthEvents } = require('./utils/africanCalendar');
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year or month'
      });
    }
    
    const events = getMonthEvents(year, month);
    
    res.json({
      success: true,
      data: {
        year,
        month,
        events
      }
    });
  } catch (error) {
    console.error('Calendar events error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting calendar events'
    });
  }
});

// Daily wisdom endpoint
app.get('/api/wisdom/today', async (req, res) => {
  try {
    const DailyWisdom = require('./models/DailyWisdom').default;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const wisdom = await DailyWisdom.findOne({ 
      date: today, 
      isActive: true 
    }).populate('createdBy', 'firstName lastName');
    
    if (!wisdom) {
      // Return a default wisdom if none found for today
      return res.json({
        success: true,
        data: {
          title: 'Ubuntu Philosophy',
          content: 'Ubuntu - "I am because we are." This ancient African philosophy reminds us that our humanity is interconnected. We exist in relation to others, and our well-being is tied to the well-being of our community.',
          author: 'African Wisdom',
          type: 'wisdom',
          date: today
        }
      });
    }
    
    res.json({
      success: true,
      data: wisdom
    });
  } catch (error) {
    console.error('Daily wisdom error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting daily wisdom'
    });
  }
});

// Cultural events endpoint
app.get('/api/cultural-events', (req, res) => {
  try {
    const { CULTURAL_EVENTS } = require('./utils/africanCalendar');
    
    res.json({
      success: true,
      data: CULTURAL_EVENTS
    });
  } catch (error) {
    console.error('Cultural events error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting cultural events'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌅 Inzalo Yelanga API server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📅 African Traditional Calendar API ready`);
});