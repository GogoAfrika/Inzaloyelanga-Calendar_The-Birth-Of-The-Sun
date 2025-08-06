import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth';
import { 
  calculateAfricanDate, 
  getMonthData, 
  getAllMonths, 
  getSacredDays, 
  isSacredDay,
  MONTHS_DATA 
} from '../utils/africanCalendar';

const router = express.Router();

// Get today's African calendar information
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    const africanDate = calculateAfricanDate(today);
    const currentMonth = getMonthData(africanDate.monthIndex);
    const sacredDay = isSacredDay(today);
    
    res.json({
      success: true,
      data: {
        gregorian: today.toISOString(),
        african: {
          africanYear: africanDate.africanYear,
          africanMonth: africanDate.africanMonth,
          africanDay: africanDate.africanDay,
          monthIndex: africanDate.monthIndex,
          season: africanDate.season,
          significance: africanDate.significance,
          lunarPhase: africanDate.lunarPhase
        },
        lunar: {
          lunarMonth: Math.floor((today.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 12) + 1,
          lunarDay: Math.floor((today.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 29.53) + 1,
          phase: africanDate.lunarPhase,
          phasePercentage: Math.floor((today.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 1 * 100)
        },
        season: {
          season: currentMonth.season,
          description: currentMonth.activities,
          colors: [currentMonth.color, currentMonth.seasonGradient.split(',')[1]?.trim().replace('100%)', '') || currentMonth.color]
        },
        sacredDay: sacredDay
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

// Get African calendar information for a specific date
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const africanDate = calculateAfricanDate(targetDate);
    const currentMonth = getMonthData(africanDate.monthIndex);
    const sacredDay = isSacredDay(targetDate);
    
    res.json({
      success: true,
      data: {
        gregorian: targetDate.toISOString(),
        african: {
          africanYear: africanDate.africanYear,
          africanMonth: africanDate.africanMonth,
          africanDay: africanDate.africanDay,
          monthIndex: africanDate.monthIndex,
          season: africanDate.season,
          significance: africanDate.significance,
          lunarPhase: africanDate.lunarPhase
        },
        lunar: {
          lunarMonth: Math.floor((targetDate.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 12) + 1,
          lunarDay: Math.floor((targetDate.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 29.53) + 1,
          phase: africanDate.lunarPhase,
          phasePercentage: Math.floor((targetDate.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 1 * 100)
        },
        season: {
          season: currentMonth.season,
          description: currentMonth.activities,
          colors: [currentMonth.color, currentMonth.seasonGradient.split(',')[1]?.trim().replace('100%)', '') || currentMonth.color]
        },
        sacredDay: sacredDay
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

// Get all months data
router.get('/months', async (req, res) => {
  try {
    const months = getAllMonths();
    res.json({
      success: true,
      data: months
    });
  } catch (error) {
    console.error('Calendar months error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting months data'
    });
  }
});

// Get specific month data
router.get('/months/:monthIndex', async (req, res) => {
  try {
    const { monthIndex } = req.params;
    const monthId = parseInt(monthIndex);
    
    if (isNaN(monthId) || monthId < 0 || monthId >= MONTHS_DATA.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid month index'
      });
    }

    const month = getMonthData(monthId);
    const sacredDays = getSacredDays(monthId);
    
    res.json({
      success: true,
      data: {
        month,
        sacredDays
      }
    });
  } catch (error) {
    console.error('Calendar month error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting month data'
    });
  }
});

// Get sacred days for a specific month
router.get('/months/:monthIndex/sacred-days', async (req, res) => {
  try {
    const { monthIndex } = req.params;
    const monthId = parseInt(monthIndex);
    
    if (isNaN(monthId) || monthId < 0 || monthId >= MONTHS_DATA.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid month index'
      });
    }

    const sacredDays = getSacredDays(monthId);
    
    res.json({
      success: true,
      data: sacredDays
    });
  } catch (error) {
    console.error('Calendar sacred days error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting sacred days'
    });
  }
});

// Check if a specific date is a sacred day
router.get('/sacred-day/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const sacredDay = isSacredDay(targetDate);
    
    res.json({
      success: true,
      data: {
        isSacred: !!sacredDay,
        sacredDay: sacredDay
      }
    });
  } catch (error) {
    console.error('Calendar sacred day check error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking sacred day'
    });
  }
});

// Get lunar phase information
router.get('/lunar/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const africanDate = calculateAfricanDate(targetDate); // This line was missing in the original file, but is needed for lunarPhase
    const lunarPhase = africanDate.lunarPhase;
    const phasePercentage = Math.floor((targetDate.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 1 * 100);
    
    res.json({
      success: true,
      data: {
        lunarMonth: Math.floor((targetDate.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 12) + 1,
        lunarDay: Math.floor((targetDate.getTime() / (29.53 * 24 * 60 * 60 * 1000)) % 29.53) + 1,
        phase: lunarPhase,
        phasePercentage: phasePercentage
      }
    });
  } catch (error) {
    console.error('Calendar lunar error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting lunar information'
    });
  }
});

export default router;