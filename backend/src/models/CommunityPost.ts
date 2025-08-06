import mongoose, { Document, Schema } from 'mongoose';

export interface ICommunityPost extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'celebration' | 'event' | 'article' | 'video';
  title: string;
  content: string;
  imageUrl?: string;
  eventDate?: Date;
  eventLocation?: string;
  tags: string[];
  likes: number;
  comments: number;
  likedBy: mongoose.Types.ObjectId[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommunityPostSchema = new Schema<ICommunityPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['celebration', 'event', 'article', 'video'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  imageUrl: {
    type: String,
    trim: true
  },
  eventDate: {
    type: Date
  },
  eventLocation: {
    type: String,
    trim: true,
    maxlength: 200
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  comments: {
    type: Number,
    default: 0,
    min: 0
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
CommunityPostSchema.index({ userId: 1, createdAt: -1 });
CommunityPostSchema.index({ type: 1, createdAt: -1 });
CommunityPostSchema.index({ tags: 1 });
CommunityPostSchema.index({ isPublic: 1, createdAt: -1 });

// Virtual for formatted date
CommunityPostSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtuals are serialized
CommunityPostSchema.set('toJSON', { virtuals: true });
CommunityPostSchema.set('toObject', { virtuals: true });

export default mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema);