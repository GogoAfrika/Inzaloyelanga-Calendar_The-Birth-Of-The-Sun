import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, ActivityIndicator, Chip, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { africanColors } from '../theme/africanTheme';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'celebration' | 'event' | 'article' | 'video';
  title: string;
  content: string;
  imageUrl?: string;
  eventDate?: string;
  eventLocation?: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isPublic: boolean;
}

interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  type: 'ceremony' | 'workshop' | 'gathering' | 'ritual';
  maxParticipants?: number;
  currentParticipants: number;
  isPublic: boolean;
  tags: string[];
}

interface CulturalArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
}

interface CommunityScreenProps {
  navigation: any;
}

const CommunityScreen: React.FC<CommunityScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'library'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [articles, setArticles] = useState<CulturalArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form states
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'celebration' as const,
    tags: '',
    isPublic: true,
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'gathering' as const,
    maxParticipants: '',
    isPublic: true,
    tags: '',
  });

  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: 'traditions',
    tags: '',
  });

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadPosts(),
        loadEvents(),
        loadArticles(),
      ]);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('community_posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('cultural_events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const loadArticles = async () => {
    try {
      const storedArticles = await AsyncStorage.getItem('cultural_articles');
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCommunityData();
    setRefreshing(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const post: CommunityPost = {
      id: Date.now().toString(),
      userId: user?.id || 'anonymous',
      userName: user?.firstName || 'Anonymous',
      userAvatar: user?.avatar,
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      imageUrl: selectedImage,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isPublic: newPost.isPublic,
    };

    const updatedPosts = [post, ...posts];
    await AsyncStorage.setItem('community_posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    
    setNewPost({ title: '', content: '', type: 'celebration', tags: '', isPublic: true });
    setSelectedImage(null);
    setShowCreateModal(false);
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const event: CulturalEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      location: newEvent.location,
      organizer: user?.firstName || 'Anonymous',
      type: newEvent.type,
      maxParticipants: newEvent.maxParticipants ? parseInt(newEvent.maxParticipants) : undefined,
      currentParticipants: 0,
      isPublic: newEvent.isPublic,
      tags: newEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    const updatedEvents = [event, ...events];
    await AsyncStorage.setItem('cultural_events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    
    setNewEvent({
      title: '',
      description: '',
      date: '',
      location: '',
      type: 'gathering',
      maxParticipants: '',
      isPublic: true,
      tags: '',
    });
    setShowEventModal(false);
  };

  const handleCreateArticle = async () => {
    if (!newArticle.title.trim() || !newArticle.content.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const article: CulturalArticle = {
      id: Date.now().toString(),
      title: newArticle.title,
      content: newArticle.content,
      author: user?.firstName || 'Anonymous',
      category: newArticle.category,
      imageUrl: selectedImage,
      tags: newArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString(),
    };

    const updatedArticles = [article, ...articles];
    await AsyncStorage.setItem('cultural_articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    
    setNewArticle({ title: '', content: '', category: 'traditions', tags: '' });
    setSelectedImage(null);
    setShowArticleModal(false);
  };

  const handleJoinEvent = (eventId: string) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          currentParticipants: event.currentParticipants + 1,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    AsyncStorage.setItem('cultural_events', JSON.stringify(updatedEvents));
  };

  const renderFeedTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.createPostButton}>
        <Button
          mode="contained"
          onPress={() => setShowCreateModal(true)}
          style={styles.createButton}
          icon="plus"
        >
          Share Your Celebration
        </Button>
      </View>

      {posts.map((post) => (
        <Card key={post.id} style={styles.postCard}>
          <Card.Content>
            <View style={styles.postHeader}>
              <Avatar.Text 
                size={40} 
                label={post.userName.substring(0, 2).toUpperCase()}
                style={{ backgroundColor: africanColors.primary }}
              />
              <View style={styles.postHeaderInfo}>
                <Text style={styles.postUserName}>{post.userName}</Text>
                <Text style={styles.postDate}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Chip 
                mode="outlined" 
                textStyle={{ color: africanColors.primary }}
                style={{ borderColor: africanColors.primary }}
              >
                {post.type}
              </Chip>
            </View>

            <Title style={styles.postTitle}>{post.title}</Title>
            <Paragraph style={styles.postContent}>{post.content}</Paragraph>

            {post.imageUrl && (
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}

            {post.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {post.tags.map((tag, index) => (
                  <Chip key={index} style={styles.tag} textStyle={{ fontSize: 12 }}>
                    {tag}
                  </Chip>
                ))}
              </View>
            )}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons name="heart-outline" size={20} color={africanColors.primary} />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons name="comment-outline" size={20} color={africanColors.primary} />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialCommunityIcons name="share-variant-outline" size={20} color={africanColors.primary} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderEventsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.createPostButton}>
        <Button
          mode="contained"
          onPress={() => setShowEventModal(true)}
          style={styles.createButton}
          icon="calendar-plus"
        >
          Create Event
        </Button>
      </View>

      {events.map((event) => (
        <Card key={event.id} style={styles.eventCard}>
          <Card.Content>
            <View style={styles.eventHeader}>
              <MaterialCommunityIcons 
                name={getEventIcon(event.type)} 
                size={24} 
                color={africanColors.primary} 
              />
              <Title style={styles.eventTitle}>{event.title}</Title>
            </View>

            <Paragraph style={styles.eventDescription}>{event.description}</Paragraph>

            <View style={styles.eventDetails}>
              <View style={styles.eventDetail}>
                <MaterialCommunityIcons name="calendar" size={16} color={africanColors.secondary} />
                <Text style={styles.eventDetailText}>{event.date}</Text>
              </View>
              <View style={styles.eventDetail}>
                <MaterialCommunityIcons name="map-marker" size={16} color={africanColors.secondary} />
                <Text style={styles.eventDetailText}>{event.location}</Text>
              </View>
              <View style={styles.eventDetail}>
                <MaterialCommunityIcons name="account-group" size={16} color={africanColors.secondary} />
                <Text style={styles.eventDetailText}>
                  {event.currentParticipants}/{event.maxParticipants || '∞'} participants
                </Text>
              </View>
            </View>

            {event.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {event.tags.map((tag, index) => (
                  <Chip key={index} style={styles.tag} textStyle={{ fontSize: 12 }}>
                    {tag}
                  </Chip>
                ))}
              </View>
            )}

            <View style={styles.eventActions}>
              <Button
                mode="outlined"
                onPress={() => handleJoinEvent(event.id)}
                disabled={event.maxParticipants ? event.currentParticipants >= event.maxParticipants : false}
                style={styles.joinButton}
              >
                {event.maxParticipants && event.currentParticipants >= event.maxParticipants 
                  ? 'Full' 
                  : 'Join Event'
                }
              </Button>
              <Button
                mode="text"
                onPress={() => {}}
                style={styles.shareButton}
              >
                Share
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderLibraryTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.createPostButton}>
        <Button
          mode="contained"
          onPress={() => setShowArticleModal(true)}
          style={styles.createButton}
          icon="file-document-plus"
        >
          Share Article
        </Button>
      </View>

      {articles.map((article) => (
        <Card key={article.id} style={styles.articleCard}>
          <Card.Content>
            <View style={styles.articleHeader}>
              <Title style={styles.articleTitle}>{article.title}</Title>
              <Chip mode="outlined" textStyle={{ color: africanColors.primary }}>
                {article.category}
              </Chip>
            </View>

            {article.imageUrl && (
              <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
            )}

            <Paragraph style={styles.articleContent} numberOfLines={3}>
              {article.content}
            </Paragraph>

            <View style={styles.articleFooter}>
              <Text style={styles.articleAuthor}>By {article.author}</Text>
              <Text style={styles.articleDate}>
                {new Date(article.createdAt).toLocaleDateString()}
              </Text>
            </View>

            {article.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {article.tags.map((tag, index) => (
                  <Chip key={index} style={styles.tag} textStyle={{ fontSize: 12 }}>
                    {tag}
                  </Chip>
                ))}
              </View>
            )}

            <Button
              mode="text"
              onPress={() => {}}
              style={styles.readMoreButton}
            >
              Read More
            </Button>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const getEventIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      ceremony: 'crown',
      workshop: 'school',
      gathering: 'account-group',
      ritual: 'candle',
    };
    return icons[type] || 'calendar';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={africanColors.primary} />
          <Text style={styles.loadingText}>Loading community...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[africanColors.primary, africanColors.secondary]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Community</Title>
          <Text style={styles.headerSubtitle}>Connect, Share, Learn</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'feed' && styles.activeTabButton]}
            onPress={() => setActiveTab('feed')}
          >
            <MaterialCommunityIcons 
              name="account-group" 
              size={24} 
              color={activeTab === 'feed' ? '#FFF' : africanColors.onPrimary} 
            />
            <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
              Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'events' && styles.activeTabButton]}
            onPress={() => setActiveTab('events')}
          >
            <MaterialCommunityIcons 
              name="calendar" 
              size={24} 
              color={activeTab === 'events' ? '#FFF' : africanColors.onPrimary} 
            />
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'library' && styles.activeTabButton]}
            onPress={() => setActiveTab('library')}
          >
            <MaterialCommunityIcons 
              name="library" 
              size={24} 
              color={activeTab === 'library' ? '#FFF' : africanColors.onPrimary} 
            />
            <Text style={[styles.tabText, activeTab === 'library' && styles.activeTabText]}>
              Library
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {activeTab === 'feed' && renderFeedTab()}
          {activeTab === 'events' && renderEventsTab()}
          {activeTab === 'library' && renderLibraryTab()}
        </ScrollView>

        {/* Create Post Modal */}
        <Modal
          visible={showCreateModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCreateModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>Share Your Celebration</Title>
              
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={newPost.title}
                onChangeText={(text) => setNewPost({ ...newPost, title: text })}
                placeholderTextColor="#666"
              />
              
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Share your story, celebration, or experience..."
                value={newPost.content}
                onChangeText={(text) => setNewPost({ ...newPost, content: text })}
                multiline
                numberOfLines={4}
                placeholderTextColor="#666"
              />

              <TextInput
                style={styles.input}
                placeholder="Tags (comma separated)"
                value={newPost.tags}
                onChangeText={(text) => setNewPost({ ...newPost, tags: text })}
                placeholderTextColor="#666"
              />

              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <MaterialCommunityIcons name="camera" size={24} color={africanColors.primary} />
                <Text style={styles.imagePickerText}>
                  {selectedImage ? 'Image Selected' : 'Add Photo'}
                </Text>
              </TouchableOpacity>

              <View style={styles.modalButtons}>
                <Button
                  mode="contained"
                  onPress={handleCreatePost}
                  style={styles.createButton}
                >
                  Share
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setShowCreateModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Create Event Modal */}
        <Modal
          visible={showEventModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowEventModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>Create Cultural Event</Title>
              
              <TextInput
                style={styles.input}
                placeholder="Event Title"
                value={newEvent.title}
                onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                placeholderTextColor="#666"
              />
              
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Event Description"
                value={newEvent.description}
                onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                multiline
                numberOfLines={4}
                placeholderTextColor="#666"
              />

              <TextInput
                style={styles.input}
                placeholder="Date (e.g., 2024-03-21)"
                value={newEvent.date}
                onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
                placeholderTextColor="#666"
              />

              <TextInput
                style={styles.input}
                placeholder="Location"
                value={newEvent.location}
                onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                placeholderTextColor="#666"
              />

              <TextInput
                style={styles.input}
                placeholder="Max Participants (optional)"
                value={newEvent.maxParticipants}
                onChangeText={(text) => setNewEvent({ ...newEvent, maxParticipants: text })}
                keyboardType="numeric"
                placeholderTextColor="#666"
              />

              <TextInput
                style={styles.input}
                placeholder="Tags (comma separated)"
                value={newEvent.tags}
                onChangeText={(text) => setNewEvent({ ...newEvent, tags: text })}
                placeholderTextColor="#666"
              />

              <View style={styles.modalButtons}>
                <Button
                  mode="contained"
                  onPress={handleCreateEvent}
                  style={styles.createButton}
                >
                  Create Event
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setShowEventModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Create Article Modal */}
        <Modal
          visible={showArticleModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowArticleModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>Share Cultural Article</Title>
              
              <TextInput
                style={styles.input}
                placeholder="Article Title"
                value={newArticle.title}
                onChangeText={(text) => setNewArticle({ ...newArticle, title: text })}
                placeholderTextColor="#666"
              />
              
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Article Content"
                value={newArticle.content}
                onChangeText={(text) => setNewArticle({ ...newArticle, content: text })}
                multiline
                numberOfLines={6}
                placeholderTextColor="#666"
              />

              <TextInput
                style={styles.input}
                placeholder="Tags (comma separated)"
                value={newArticle.tags}
                onChangeText={(text) => setNewArticle({ ...newArticle, tags: text })}
                placeholderTextColor="#666"
              />

              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <MaterialCommunityIcons name="camera" size={24} color={africanColors.primary} />
                <Text style={styles.imagePickerText}>
                  {selectedImage ? 'Image Selected' : 'Add Cover Image'}
                </Text>
              </TouchableOpacity>

              <View style={styles.modalButtons}>
                <Button
                  mode="contained"
                  onPress={handleCreateArticle}
                  style={styles.createButton}
                >
                  Publish
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setShowArticleModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: africanColors.onBackground,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 5,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    flex: 1,
  },
  createPostButton: {
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: africanColors.accent,
  },
  postCard: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: africanColors.onBackground,
  },
  postDate: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  postTitle: {
    fontSize: 18,
    color: africanColors.onBackground,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 20,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: africanColors.primary,
  },
  eventCard: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventTitle: {
    marginLeft: 10,
    fontSize: 18,
    color: africanColors.onBackground,
  },
  eventDescription: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 20,
    marginBottom: 15,
  },
  eventDetails: {
    marginBottom: 15,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: africanColors.onBackground,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  joinButton: {
    borderColor: africanColors.primary,
  },
  shareButton: {
    color: africanColors.primary,
  },
  articleCard: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  articleTitle: {
    flex: 1,
    fontSize: 18,
    color: africanColors.onBackground,
  },
  articleImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  articleContent: {
    fontSize: 14,
    color: africanColors.onBackground,
    lineHeight: 20,
    marginBottom: 10,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  articleAuthor: {
    fontSize: 12,
    color: africanColors.primary,
    fontWeight: 'bold',
  },
  articleDate: {
    fontSize: 12,
    color: africanColors.onSurfaceVariant,
  },
  readMoreButton: {
    color: africanColors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    maxWidth: 400,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: africanColors.onBackground,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: africanColors.onBackground,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: africanColors.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: africanColors.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    borderColor: africanColors.outline,
  },
});

export default CommunityScreen;