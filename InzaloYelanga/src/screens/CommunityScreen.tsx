import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, FAB, Portal, Dialog, Chip, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { africanColors } from '../theme/africanTheme';

interface CelebrationPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  imageUrl?: string;
  eventType: 'celebration' | 'ceremony' | 'gathering' | 'ritual';
  date: Date;
  location?: string;
  likes: number;
  comments: Comment[];
  tags: string[];
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  organizerAvatar?: string;
  isPublic: boolean;
  maxAttendees?: number;
  currentAttendees: string[];
  eventType: 'cultural' | 'educational' | 'celebration' | 'workshop';
  tags: string[];
}

interface CulturalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  publishDate: Date;
  category: 'history' | 'traditions' | 'wisdom' | 'practices';
  tags: string[];
  readTime: number;
  imageUrl?: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: Date;
}

const CommunityScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'library'>('feed');
  const [celebrations, setCelebrations] = useState<CelebrationPost[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [articles, setArticles] = useState<CulturalArticle[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostEventType, setNewPostEventType] = useState<CelebrationPost['eventType']>('celebration');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventDate, setNewEventDate] = useState(new Date());
  const [newEventType, setNewEventType] = useState<CommunityEvent['eventType']>('cultural');
  const [newEventIsPublic, setNewEventIsPublic] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock celebrations
    setCelebrations([
      {
        id: '1',
        userId: 'user1',
        userName: 'Nokuthula Dlamini',
        userAvatar: 'https://via.placeholder.com/50',
        title: 'African New Year Celebration',
        description: 'Celebrated the African New Year with my family and community. We performed traditional cleansing rituals and set intentions for the new cycle. The energy was incredible!',
        imageUrl: 'https://via.placeholder.com/300x200',
        eventType: 'celebration',
        date: new Date('2024-09-23'),
        location: 'Johannesburg, South Africa',
        likes: 24,
        comments: [
          {
            id: 'c1',
            userId: 'user2',
            userName: 'Thabo Maseko',
            content: 'Beautiful celebration! The traditional rituals are so powerful.',
            date: new Date('2024-09-23T10:30:00')
          }
        ],
        tags: ['African New Year', 'Traditional Rituals', 'Community']
      },
      {
        id: '2',
        userId: 'user3',
        userName: 'Aisha Osei',
        userAvatar: 'https://via.placeholder.com/50',
        title: 'Royalty Day Ceremony',
        description: 'Honored our ancestors and celebrated African royalty today. The traditional attire and dances were magnificent. We must never forget our heritage.',
        imageUrl: 'https://via.placeholder.com/300x200',
        eventType: 'ceremony',
        date: new Date('2024-12-23'),
        location: 'Accra, Ghana',
        likes: 18,
        comments: [],
        tags: ['Royalty Day', 'Ancestors', 'Heritage']
      }
    ]);

    // Mock events
    setEvents([
      {
        id: '1',
        title: 'Traditional Wisdom Workshop',
        description: 'Join us for a workshop on traditional African wisdom and its application in modern life. Learn from elders and share your experiences.',
        date: new Date('2024-10-15'),
        location: 'Community Center, Cape Town',
        organizer: 'Elder Mkhize',
        organizerAvatar: 'https://via.placeholder.com/50',
        isPublic: true,
        maxAttendees: 30,
        currentAttendees: ['user1', 'user2'],
        eventType: 'workshop',
        tags: ['Wisdom', 'Elders', 'Learning']
      },
      {
        id: '2',
        title: 'Harvest Festival Gathering',
        description: 'Annual harvest festival celebrating the abundance of the season. Traditional music, dance, and communal feast.',
        date: new Date('2024-11-15'),
        location: 'Village Square, Durban',
        organizer: 'Community Leaders',
        isPublic: true,
        currentAttendees: ['user1', 'user3'],
        eventType: 'celebration',
        tags: ['Harvest', 'Festival', 'Community']
      }
    ]);

    // Mock articles
    setArticles([
      {
        id: '1',
        title: 'The Significance of African New Year',
        excerpt: 'Understanding the deep spiritual and cultural meaning behind the African New Year celebration and its connection to natural cycles.',
        content: 'The African New Year, celebrated on September 23rd, marks the autumnal equinox and the beginning of a new cycle in the African Royal Calendar...',
        author: 'Dr. Kwame Asante',
        authorAvatar: 'https://via.placeholder.com/50',
        publishDate: new Date('2024-09-20'),
        category: 'history',
        tags: ['African New Year', 'Calendar', 'Spirituality'],
        readTime: 8,
        imageUrl: 'https://via.placeholder.com/300x200'
      },
      {
        id: '2',
        title: 'Traditional Healing Practices',
        excerpt: 'Exploring ancient African healing traditions and their relevance in contemporary wellness.',
        content: 'Traditional African healing practices are deeply rooted in the understanding of the interconnectedness of mind, body, and spirit...',
        author: 'Mama Ndlovu',
        authorAvatar: 'https://via.placeholder.com/50',
        publishDate: new Date('2024-09-18'),
        category: 'practices',
        tags: ['Healing', 'Traditional Medicine', 'Wellness'],
        readTime: 12,
        imageUrl: 'https://via.placeholder.com/300x200'
      }
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMockData();
    setRefreshing(false);
  };

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostDescription) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newPost: CelebrationPost = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'Current User',
      title: newPostTitle,
      description: newPostDescription,
      eventType: newPostEventType,
      date: new Date(),
      likes: 0,
      comments: [],
      tags: []
    };

    setCelebrations(prev => [newPost, ...prev]);
    setNewPostTitle('');
    setNewPostDescription('');
    setNewPostEventType('celebration');
    setShowCreatePost(false);
  };

  const handleCreateEvent = () => {
    if (!newEventTitle || !newEventDescription || !newEventLocation) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newEvent: CommunityEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate,
      location: newEventLocation,
      organizer: 'Current User',
      isPublic: newEventIsPublic,
      currentAttendees: [],
      eventType: newEventType,
      tags: []
    };

    setEvents(prev => [newEvent, ...prev]);
    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventLocation('');
    setNewEventDate(new Date());
    setNewEventType('cultural');
    setNewEventIsPublic(true);
    setShowCreateEvent(false);
  };

  const handleLikePost = (postId: string) => {
    setCelebrations(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const getEventTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      celebration: 'party-popper',
      ceremony: 'crown',
      gathering: 'account-group',
      ritual: 'candle',
      cultural: 'earth',
      educational: 'school',
      workshop: 'hammer-wrench'
    };
    return icons[type] || 'calendar';
  };

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      celebration: '#FF9500',
      ceremony: '#FFD700',
      gathering: '#007AFF',
      ritual: '#8B4513',
      cultural: '#A3E4D7',
      educational: '#FF6B6B',
      workshop: '#4ECDC4'
    };
    return colors[type] || '#6C757D';
  };

  const renderCelebrationPost = (post: CelebrationPost) => (
    <Card key={post.id} style={styles.postCard}>
      <Card.Content>
        <View style={styles.postHeader}>
          <Avatar.Image size={40} source={{ uri: post.userAvatar || 'https://via.placeholder.com/40' }} />
          <View style={styles.postHeaderInfo}>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.postDate}>{post.date.toLocaleDateString()}</Text>
          </View>
          <Chip
            icon={getEventTypeIcon(post.eventType)}
            style={[styles.eventTypeChip, { backgroundColor: getEventTypeColor(post.eventType) }]}
            textStyle={{ color: '#FFFFFF' }}
          >
            {post.eventType}
          </Chip>
        </View>

        <Title style={styles.postTitle}>{post.title}</Title>
        <Paragraph style={styles.postDescription}>{post.description}</Paragraph>

        {post.imageUrl && (
          <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        )}

        {post.location && (
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color={africanColors.primary} />
            <Text style={styles.locationText}>{post.location}</Text>
          </View>
        )}

        <View style={styles.postTags}>
          {post.tags.map(tag => (
            <Chip key={tag} style={styles.tagChip} textStyle={{ fontSize: 12 }}>
              {tag}
            </Chip>
          ))}
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLikePost(post.id)}
          >
            <MaterialCommunityIcons name="heart" size={20} color={africanColors.primary} />
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="comment" size={20} color={africanColors.primary} />
            <Text style={styles.actionText}>{post.comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="share" size={20} color={africanColors.primary} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEvent = (event: CommunityEvent) => (
    <Card key={event.id} style={styles.eventCard}>
      <Card.Content>
        <View style={styles.eventHeader}>
          <Chip
            icon={getEventTypeIcon(event.eventType)}
            style={[styles.eventTypeChip, { backgroundColor: getEventTypeColor(event.eventType) }]}
            textStyle={{ color: '#FFFFFF' }}
          >
            {event.eventType}
          </Chip>
          <Chip
            icon={event.isPublic ? 'earth' : 'lock'}
            style={styles.publicChip}
          >
            {event.isPublic ? 'Public' : 'Private'}
          </Chip>
        </View>

        <Title style={styles.eventTitle}>{event.title}</Title>
        <Paragraph style={styles.eventDescription}>{event.description}</Paragraph>

        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <MaterialCommunityIcons name="calendar" size={16} color={africanColors.primary} />
            <Text style={styles.eventDetailText}>{event.date.toLocaleDateString()}</Text>
          </View>
          <View style={styles.eventDetail}>
            <MaterialCommunityIcons name="map-marker" size={16} color={africanColors.primary} />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
          <View style={styles.eventDetail}>
            <MaterialCommunityIcons name="account" size={16} color={africanColors.primary} />
            <Text style={styles.eventDetailText}>{event.organizer}</Text>
          </View>
        </View>

        <View style={styles.eventTags}>
          {event.tags.map(tag => (
            <Chip key={tag} style={styles.tagChip} textStyle={{ fontSize: 12 }}>
              {tag}
            </Chip>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={() => Alert.alert('Success', 'You have joined this event!')}
          style={styles.joinButton}
        >
          Join Event
        </Button>
      </Card.Content>
    </Card>
  );

  const renderArticle = (article: CulturalArticle) => (
    <Card key={article.id} style={styles.articleCard}>
      <Card.Content>
        <View style={styles.articleHeader}>
          <Chip style={styles.categoryChip}>
            {article.category}
          </Chip>
          <Text style={styles.readTime}>{article.readTime} min read</Text>
        </View>

        <Title style={styles.articleTitle}>{article.title}</Title>
        <Paragraph style={styles.articleExcerpt}>{article.excerpt}</Paragraph>

        {article.imageUrl && (
          <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
        )}

        <View style={styles.articleFooter}>
          <View style={styles.authorInfo}>
            <Avatar.Image size={30} source={{ uri: article.authorAvatar || 'https://via.placeholder.com/30' }} />
            <Text style={styles.authorName}>{article.author}</Text>
          </View>
          <Text style={styles.publishDate}>{article.publishDate.toLocaleDateString()}</Text>
        </View>

        <View style={styles.articleTags}>
          {article.tags.map(tag => (
            <Chip key={tag} style={styles.tagChip} textStyle={{ fontSize: 12 }}>
              {tag}
            </Chip>
          ))}
        </View>

        <Button
          mode="outlined"
          onPress={() => Alert.alert('Article', 'Full article view would open here')}
          style={styles.readButton}
        >
          Read Full Article
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[africanColors.primary, africanColors.secondary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Umphakathi</Text>
          <Text style={styles.headerSubtitle}>Community & Culture</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
            onPress={() => setActiveTab('feed')}
          >
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={activeTab === 'feed' ? '#FFFFFF' : africanColors.onSurfaceVariant}
            />
            <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
              Celebrations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'events' && styles.activeTab]}
            onPress={() => setActiveTab('events')}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={24}
              color={activeTab === 'events' ? '#FFFFFF' : africanColors.onSurfaceVariant}
            />
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'library' && styles.activeTab]}
            onPress={() => setActiveTab('library')}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={24}
              color={activeTab === 'library' ? '#FFFFFF' : africanColors.onSurfaceVariant}
            />
            <Text style={[styles.tabText, activeTab === 'library' && styles.activeTabText]}>
              Library
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {activeTab === 'feed' && (
            <View>
              {celebrations.map(renderCelebrationPost)}
            </View>
          )}

          {activeTab === 'events' && (
            <View>
              {events.map(renderEvent)}
            </View>
          )}

          {activeTab === 'library' && (
            <View>
              {articles.map(renderArticle)}
            </View>
          )}
        </ScrollView>

        {/* FAB for creating content */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            if (activeTab === 'feed') setShowCreatePost(true);
            if (activeTab === 'events') setShowCreateEvent(true);
          }}
        />

        {/* Create Post Modal */}
        <Portal>
          <Dialog
            visible={showCreatePost}
            onDismiss={() => setShowCreatePost(false)}
            style={styles.modal}
          >
            <Dialog.Title>Share Your Celebration</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder="Title"
                value={newPostTitle}
                onChangeText={setNewPostTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={newPostDescription}
                onChangeText={setNewPostDescription}
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
              <View style={styles.eventTypeSelector}>
                <Text style={styles.selectorLabel}>Event Type:</Text>
                <View style={styles.chipContainer}>
                  {(['celebration', 'ceremony', 'gathering', 'ritual'] as const).map(type => (
                    <Chip
                      key={type}
                      selected={newPostEventType === type}
                      onPress={() => setNewPostEventType(type)}
                      style={styles.selectorChip}
                    >
                      {type}
                    </Chip>
                  ))}
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowCreatePost(false)}>Cancel</Button>
              <Button onPress={handleCreatePost}>Share</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Create Event Modal */}
        <Portal>
          <Dialog
            visible={showCreateEvent}
            onDismiss={() => setShowCreateEvent(false)}
            style={styles.modal}
          >
            <Dialog.Title>Create Community Event</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder="Event Title"
                value={newEventTitle}
                onChangeText={setNewEventTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={newEventDescription}
                onChangeText={setNewEventDescription}
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
              <TextInput
                placeholder="Location"
                value={newEventLocation}
                onChangeText={setNewEventLocation}
                style={styles.input}
              />
              <View style={styles.eventTypeSelector}>
                <Text style={styles.selectorLabel}>Event Type:</Text>
                <View style={styles.chipContainer}>
                  {(['cultural', 'educational', 'celebration', 'workshop'] as const).map(type => (
                    <Chip
                      key={type}
                      selected={newEventType === type}
                      onPress={() => setNewEventType(type)}
                      style={styles.selectorChip}
                    >
                      {type}
                    </Chip>
                  ))}
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowCreateEvent(false)}>Cancel</Button>
              <Button onPress={handleCreateEvent}>Create Event</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#F5F5DC',
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: africanColors.onSurfaceVariant,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  postCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: africanColors.onSurface,
  },
  postDate: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  eventTypeChip: {
    marginLeft: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: africanColors.onSurface,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: africanColors.onSurfaceVariant,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: africanColors.surfaceVariant,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: africanColors.outline,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: africanColors.onSurface,
  },
  eventCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  publicChip: {
    backgroundColor: africanColors.surfaceVariant,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: africanColors.onSurface,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: africanColors.onSurface,
  },
  eventTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: africanColors.primary,
  },
  articleCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: africanColors.surfaceVariant,
  },
  readTime: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: 14,
    color: africanColors.onSurface,
    lineHeight: 20,
    marginBottom: 12,
  },
  articleImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    marginLeft: 8,
    fontSize: 14,
    color: africanColors.onSurface,
  },
  publishDate: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  articleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  readButton: {
    borderColor: africanColors.primary,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: africanColors.primary,
  },
  modal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  eventTypeSelector: {
    marginBottom: 15,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: africanColors.onSurface,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectorChip: {
    marginRight: 8,
    marginBottom: 4,
  },
});

export default CommunityScreen;