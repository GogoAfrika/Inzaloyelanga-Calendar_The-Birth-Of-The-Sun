import mongoose, { Document, Schema } from 'mongoose';

export interface ICulturalArticle extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category: string;
  imageUrl?: string;
  tags: string[];
  views: number;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CulturalArticleSchema = new Schema<ICulturalArticle>({
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
    maxlength: 10000
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    enum: [
      'traditions',
      'ceremonies',
      'history',
      'spirituality',
      'medicine',
      'art',
      'music',
      'dance',
      'food',
      'language',
      'philosophy',
      'leadership',
      'education',
      'environment',
      'community',
      'other'
    ]
  },
  imageUrl: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
CulturalArticleSchema.index({ author: 1, createdAt: -1 });
CulturalArticleSchema.index({ category: 1, createdAt: -1 });
CulturalArticleSchema.index({ tags: 1 });
CulturalArticleSchema.index({ isPublished: 1, createdAt: -1 });
CulturalArticleSchema.index({ views: -1 });
CulturalArticleSchema.index({ likes: -1 });

// Virtual for reading time (estimated)
CulturalArticleSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
});

// Virtual for excerpt (first 150 characters)
CulturalArticleSchema.virtual('excerpt').get(function() {
  return this.content.length > 150 
    ? this.content.substring(0, 150) + '...' 
    : this.content;
});

// Virtual for formatted date
CulturalArticleSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Ensure virtuals are serialized
CulturalArticleSchema.set('toJSON', { virtuals: true });
CulturalArticleSchema.set('toObject', { virtuals: true });

// Pre-save middleware to update views when article is accessed
CulturalArticleSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to get popular articles
CulturalArticleSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isPublished: true })
    .sort({ views: -1, likes: -1 })
    .limit(limit)
    .populate('author', 'firstName lastName');
};

// Static method to get articles by category
CulturalArticleSchema.statics.getByCategory = function(category: string, limit = 20) {
  return this.find({ category, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('author', 'firstName lastName');
};

export default mongoose.model<ICulturalArticle>('CulturalArticle', CulturalArticleSchema);