import express from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth';
import CommunityPost from '../models/CommunityPost';
import CulturalEvent from '../models/CulturalEvent';
import CulturalArticle from '../models/CulturalArticle';

const router = express.Router();

// ===== COMMUNITY POSTS =====

// Get all community posts
router.get('/posts', async (req, res) => {
  try {
    const { page = 1, limit = 20, type, userId } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let query: any = { isPublic: true };
    
    if (type) {
      query.type = type;
    }
    
    if (userId) {
      query.userId = userId;
    }
    
    const posts = await CommunityPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .populate('userId', 'firstName lastName avatar');
    
    const total = await CommunityPost.countDocuments(query);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page as string),
        total: Math.ceil(total / parseInt(limit as string)),
        hasMore: skip + posts.length < total
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching community posts'
    });
  }
});

// Create a new community post
router.post('/posts', protect, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Content must be between 1 and 2000 characters'),
  body('type').isIn(['celebration', 'event', 'article', 'video']).withMessage('Invalid post type'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { title, content, type, tags = [], imageUrl, isPublic = true } = req.body;
    
    const post = new CommunityPost({
      userId: req.user.id,
      title,
      content,
      type,
      tags,
      imageUrl,
      isPublic,
      likes: 0,
      comments: 0
    });

    await post.save();
    
    const populatedPost = await CommunityPost.findById(post._id)
      .populate('userId', 'firstName lastName avatar');
    
    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating community post'
    });
  }
});

// Like/unlike a post
router.post('/posts/:postId/like', protect, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await CommunityPost.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Check if user already liked the post
    const userLiked = post.likedBy.includes(req.user.id);
    
    if (userLiked) {
      // Unlike
      post.likes -= 1;
      post.likedBy = post.likedBy.filter(id => id.toString() !== req.user.id);
    } else {
      // Like
      post.likes += 1;
      post.likedBy.push(req.user.id);
    }
    
    await post.save();
    
    res.json({
      success: true,
      data: {
        likes: post.likes,
        liked: !userLiked
      }
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating post like'
    });
  }
});

// Delete a post (only by author or admin)
router.delete('/posts/:postId', protect, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await CommunityPost.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Check if user is the author or admin
    if (post.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }
    
    await CommunityPost.findByIdAndDelete(postId);
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting post'
    });
  }
});

// ===== CULTURAL EVENTS =====

// Get all cultural events
router.get('/events', async (req, res) => {
  try {
    const { page = 1, limit = 20, type, organizer } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let query: any = { isPublic: true };
    
    if (type) {
      query.type = type;
    }
    
    if (organizer) {
      query.organizer = organizer;
    }
    
    const events = await CulturalEvent.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .populate('organizer', 'firstName lastName');
    
    const total = await CulturalEvent.countDocuments(query);
    
    res.json({
      success: true,
      data: events,
      pagination: {
        current: parseInt(page as string),
        total: Math.ceil(total / parseInt(limit as string)),
        hasMore: skip + events.length < total
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cultural events'
    });
  }
});

// Create a new cultural event
router.post('/events', protect, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('description').trim().isLength({ min: 1, max: 2000 }).withMessage('Description must be between 1 and 2000 characters'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('location').trim().isLength({ min: 1, max: 200 }).withMessage('Location must be between 1 and 200 characters'),
  body('type').isIn(['ceremony', 'workshop', 'gathering', 'ritual']).withMessage('Invalid event type'),
  body('maxParticipants').optional().isInt({ min: 1 }).withMessage('Max participants must be a positive integer'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { 
      title, 
      description, 
      date, 
      location, 
      type, 
      maxParticipants, 
      tags = [], 
      isPublic = true 
    } = req.body;
    
    const event = new CulturalEvent({
      title,
      description,
      date,
      location,
      organizer: req.user.id,
      type,
      maxParticipants,
      currentParticipants: 0,
      isPublic,
      tags
    });

    await event.save();
    
    const populatedEvent = await CulturalEvent.findById(event._id)
      .populate('organizer', 'firstName lastName');
    
    res.status(201).json({
      success: true,
      data: populatedEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating cultural event'
    });
  }
});

// Join an event
router.post('/events/:eventId/join', protect, async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await CulturalEvent.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if event is full
    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }
    
    // Check if user already joined
    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already joined this event'
      });
    }
    
    event.currentParticipants += 1;
    event.participants.push(req.user.id);
    await event.save();
    
    res.json({
      success: true,
      data: {
        currentParticipants: event.currentParticipants,
        joined: true
      }
    });
  } catch (error) {
    console.error('Join event error:', error);
    res.status(500).json({
      success: false,
      message: 'Error joining event'
    });
  }
});

// Leave an event
router.post('/events/:eventId/leave', protect, async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await CulturalEvent.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is a participant
    if (!event.participants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Not a participant of this event'
      });
    }
    
    event.currentParticipants -= 1;
    event.participants = event.participants.filter(id => id.toString() !== req.user.id);
    await event.save();
    
    res.json({
      success: true,
      data: {
        currentParticipants: event.currentParticipants,
        left: true
      }
    });
  } catch (error) {
    console.error('Leave event error:', error);
    res.status(500).json({
      success: false,
      message: 'Error leaving event'
    });
  }
});

// ===== CULTURAL ARTICLES =====

// Get all cultural articles
router.get('/articles', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, author } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (author) {
      query.author = author;
    }
    
    const articles = await CulturalArticle.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .populate('author', 'firstName lastName');
    
    const total = await CulturalArticle.countDocuments(query);
    
    res.json({
      success: true,
      data: articles,
      pagination: {
        current: parseInt(page as string),
        total: Math.ceil(total / parseInt(limit as string)),
        hasMore: skip + articles.length < total
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cultural articles'
    });
  }
});

// Create a new cultural article
router.post('/articles', protect, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').trim().isLength({ min: 1, max: 10000 }).withMessage('Content must be between 1 and 10000 characters'),
  body('category').trim().isLength({ min: 1, max: 50 }).withMessage('Category must be between 1 and 50 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { title, content, category, tags = [], imageUrl } = req.body;
    
    const article = new CulturalArticle({
      title,
      content,
      author: req.user.id,
      category,
      tags,
      imageUrl
    });

    await article.save();
    
    const populatedArticle = await CulturalArticle.findById(article._id)
      .populate('author', 'firstName lastName');
    
    res.status(201).json({
      success: true,
      data: populatedArticle
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating cultural article'
    });
  }
});

// Get a specific article
router.get('/articles/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await CulturalArticle.findById(articleId)
      .populate('author', 'firstName lastName');
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching article'
    });
  }
});

// Update an article (only by author or admin)
router.put('/articles/:articleId', protect, [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').optional().trim().isLength({ min: 1, max: 10000 }).withMessage('Content must be between 1 and 10000 characters'),
  body('category').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Category must be between 1 and 50 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { articleId } = req.params;
    const article = await CulturalArticle.findById(articleId);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    
    // Check if user is the author or admin
    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this article'
      });
    }
    
    const updatedArticle = await CulturalArticle.findByIdAndUpdate(
      articleId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate('author', 'firstName lastName');
    
    res.json({
      success: true,
      data: updatedArticle
    });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating article'
    });
  }
});

// Delete an article (only by author or admin)
router.delete('/articles/:articleId', protect, async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await CulturalArticle.findById(articleId);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    
    // Check if user is the author or admin
    if (article.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this article'
      });
    }
    
    await CulturalArticle.findByIdAndDelete(articleId);
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting article'
    });
  }
});

export default router;