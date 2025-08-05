import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyWisdom extends Document {
  date: Date;
  title: string;
  content: string;
  author: string;
  authorBio?: string;
  quote?: string;
  type: 'wisdom' | 'quote' | 'historical_fact' | 'cultural_insight' | 'decolonial_thought';
  tags: string[];
  image?: string;
  relatedLinks: {
    title: string;
    url: string;
  }[];
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const dailyWisdomSchema = new Schema<IDailyWisdom>({
  date: {
    type: Date,
    required: [true, 'Date is required'],
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [2000, 'Content cannot exceed 2000 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  authorBio: {
    type: String,
    trim: true,
    maxlength: [500, 'Author bio cannot exceed 500 characters']
  },
  quote: {
    type: String,
    trim: true,
    maxlength: [1000, 'Quote cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['wisdom', 'quote', 'historical_fact', 'cultural_insight', 'decolonial_thought'],
    required: [true, 'Type is required']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Each tag cannot exceed 50 characters']
  }],
  image: {
    type: String,
    trim: true
  },
  relatedLinks: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Link title cannot exceed 100 characters']
    },
    url: {
      type: String,
      required: true,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient date queries
dailyWisdomSchema.index({ date: 1, isActive: 1 });
dailyWisdomSchema.index({ type: 1, isActive: 1 });
dailyWisdomSchema.index({ tags: 1 });

export default mongoose.model<IDailyWisdom>('DailyWisdom', dailyWisdomSchema);