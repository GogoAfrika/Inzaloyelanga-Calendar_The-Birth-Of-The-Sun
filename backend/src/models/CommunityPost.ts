import mongoose, { Document, Schema } from 'mongoose';

export interface ICommunityPost extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  images: string[];
  type: 'celebration' | 'event' | 'article' | 'discussion' | 'cultural_practice';
  eventReference?: mongoose.Types.ObjectId;
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  comments: {
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    isModerated: boolean;
  }[];
  isModerated: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  moderationNotes?: string;
  moderatedBy?: mongoose.Types.ObjectId;
  visibility: 'public' | 'members' | 'private';
  reportCount: number;
  isReported: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const communityPostSchema = new Schema<ICommunityPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post author is required']
  },
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  images: [{
    type: String,
    trim: true
  }],
  type: {
    type: String,
    enum: ['celebration', 'event', 'article', 'discussion', 'cultural_practice'],
    required: [true, 'Post type is required']
  },
  eventReference: {
    type: Schema.Types.ObjectId,
    ref: 'CalendarEvent'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Each tag cannot exceed 50 characters']
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isModerated: {
      type: Boolean,
      default: false
    }
  }],
  isModerated: {
    type: Boolean,
    default: false
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  moderationNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Moderation notes cannot exceed 500 characters']
  },
  moderatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  visibility: {
    type: String,
    enum: ['public', 'members', 'private'],
    default: 'public'
  },
  reportCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isReported: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
communityPostSchema.index({ author: 1, createdAt: -1 });
communityPostSchema.index({ type: 1, moderationStatus: 1 });
communityPostSchema.index({ tags: 1 });
communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ moderationStatus: 1, isReported: 1 });

// Virtual for like count
communityPostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
communityPostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

export default mongoose.model<ICommunityPost>('CommunityPost', communityPostSchema);