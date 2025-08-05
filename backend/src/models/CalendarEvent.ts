import mongoose, { Document, Schema } from 'mongoose';

export interface ICalendarEvent extends Document {
  title: string;
  description: string;
  date: Date;
  type: 'cultural' | 'seasonal' | 'lunar' | 'royal' | 'community';
  significance: string;
  traditions: string[];
  historicalContext: string;
  decolonialMessage?: string;
  images: string[];
  relatedArticles: string[];
  isRecurring: boolean;
  recurrencePattern?: {
    frequency: 'yearly' | 'monthly' | 'lunar';
    interval: number;
  };
  visibility: 'public' | 'members' | 'admin';
  tags: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const calendarEventSchema = new Schema<ICalendarEvent>({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  type: {
    type: String,
    enum: ['cultural', 'seasonal', 'lunar', 'royal', 'community'],
    required: [true, 'Event type is required']
  },
  significance: {
    type: String,
    required: [true, 'Event significance is required'],
    trim: true,
    maxlength: [1000, 'Significance cannot exceed 1000 characters']
  },
  traditions: [{
    type: String,
    trim: true,
    maxlength: [500, 'Each tradition cannot exceed 500 characters']
  }],
  historicalContext: {
    type: String,
    required: [true, 'Historical context is required'],
    trim: true,
    maxlength: [3000, 'Historical context cannot exceed 3000 characters']
  },
  decolonialMessage: {
    type: String,
    trim: true,
    maxlength: [1000, 'Decolonial message cannot exceed 1000 characters']
  },
  images: [{
    type: String,
    trim: true
  }],
  relatedArticles: [{
    type: String,
    trim: true
  }],
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    frequency: {
      type: String,
      enum: ['yearly', 'monthly', 'lunar'],
      required: function(this: ICalendarEvent) { return this.isRecurring; }
    },
    interval: {
      type: Number,
      min: 1,
      required: function(this: ICalendarEvent) { return this.isRecurring; }
    }
  },
  visibility: {
    type: String,
    enum: ['public', 'members', 'admin'],
    default: 'public'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient date queries
calendarEventSchema.index({ date: 1, type: 1 });
calendarEventSchema.index({ tags: 1 });
calendarEventSchema.index({ visibility: 1 });

export default mongoose.model<ICalendarEvent>('CalendarEvent', calendarEventSchema);