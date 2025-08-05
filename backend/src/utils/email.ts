import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Inzalo Yelanga" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

// Send welcome email after email verification
export const sendWelcomeEmail = async (to: string, firstName: string): Promise<void> => {
  try {
    await sendEmail({
      to,
      subject: 'Welcome to Inzalo Yelanga - Your Journey Begins!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #8B4513, #D2691E); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px;">
            <h1 style="color: #8B4513; text-align: center; margin-bottom: 10px;">🌅 Inzalo Yelanga 🌅</h1>
            <h2 style="color: #2F4F4F; text-align: center; margin-bottom: 30px;">The Birth of the Sun</h2>
            
            <p style="font-size: 18px;">Dear ${firstName},</p>
            
            <p>Your email has been verified successfully! Welcome to our community dedicated to African traditional calendar systems and decolonial education.</p>
            
            <h3 style="color: #8B4513;">🎯 What You Can Explore:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>African Royal Calendar:</strong> Discover the solar calendar with African New Year on September 23rd</li>
              <li><strong>Lunar Calendar:</strong> Follow the moon's journey and its cultural significance</li>
              <li><strong>Daily Wisdom:</strong> Receive daily decolonial insights and cultural knowledge</li>
              <li><strong>Community Celebrations:</strong> Share and discover traditional celebrations</li>
              <li><strong>Cultural Library:</strong> Access articles, videos, and traditional practices</li>
            </ul>
            
            <div style="background: #F5F5DC; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h4 style="color: #8B4513; margin-top: 0;">🌍 Our Mission</h4>
              <p style="margin-bottom: 0; font-style: italic;">"To serve as a decolonial educational tool, empowering users to reconnect with traditional African timekeeping and cultural practices, promoting a worldview rooted in nature and heritage rather than colonial systems."</p>
            </div>
            
            <p>Start your journey by exploring the calendar and discovering the rich cultural significance of each day.</p>
            
            <p style="margin-top: 30px;">Asante sana (Thank you) for joining our community!</p>
            <p><strong>The Inzalo Yelanga Team</strong></p>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error for welcome email failure
  }
};

// Send notification email for community features
export const sendNotificationEmail = async (
  to: string, 
  firstName: string, 
  type: string, 
  content: string
): Promise<void> => {
  try {
    let subject = '';
    let title = '';
    
    switch (type) {
      case 'daily_wisdom':
        subject = 'Daily Wisdom from Inzalo Yelanga';
        title = 'Today\'s Wisdom';
        break;
      case 'event_reminder':
        subject = 'Cultural Event Reminder - Inzalo Yelanga';
        title = 'Upcoming Cultural Event';
        break;
      case 'community_update':
        subject = 'Community Update - Inzalo Yelanga';
        title = 'Community News';
        break;
      default:
        subject = 'Notification from Inzalo Yelanga';
        title = 'Notification';
    }

    await sendEmail({
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B4513; text-align: center;">Inzalo Yelanga</h1>
          <h2 style="color: #2F4F4F;">${title}</h2>
          <p>Dear ${firstName},</p>
          <div style="background: #F5F5DC; padding: 20px; border-radius: 5px; margin: 20px 0;">
            ${content}
          </div>
          <p>Visit the app to explore more!</p>
          <p>Asante sana,<br>The Inzalo Yelanga Team</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
    // Don't throw error for notification email failure
  }
};