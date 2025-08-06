import mongoose, { Document, Schema } from 'mongoose';

export interface ICulturalEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: mongoose.Types.ObjectId;
  type: 'ceremony' | 'workshop' | 'gathering' | 'ritual';
  maxParticipants?: number;
  currentParticipants: number;
  participants: mongoose.Types.ObjectId[];
  isPublic: boolean;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CulturalEventSchema = new Schema<ICulturalEvent>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['ceremony', 'workshop', 'gathering', 'ritual'],
    required: true
  },
  maxParticipants: {
    type: Number,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: 0
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
CulturalEventSchema.index({ organizer: 1, date: 1 });
CulturalEventSchema.index({ type: 1, date: 1 });
CulturalEventSchema.index({ date: 1 });
CulturalEventSchema.index({ isPublic: 1, date: 1 });
CulturalEventSchema.index({ tags: 1 });

// Virtual for checking if event is full
CulturalEventSchema.virtual('isFull').get(function() {
  return this.maxParticipants ? this.currentParticipants >= this.maxParticipants : false;
});

// Virtual for available spots
CulturalEventSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants ? this.maxParticipants - this.currentParticipants : null;
});

// Virtual for formatted date
CulturalEventSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtuals are serialized
CulturalEventSchema.set('toJSON', { virtuals: true });
CulturalEventSchema.set('toObject', { virtuals: true });

// Pre-save middleware to ensure currentParticipants doesn't exceed maxParticipants
CulturalEventSchema.pre('save', function(next) {
  if (this.maxParticipants && this.currentParticipants > this.maxParticipants) {
    this.currentParticipants = this.maxParticipants;
  }
  next();
});

export default mongoose.model<ICulturalEvent>('CulturalEvent', CulturalEventSchema);