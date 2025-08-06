import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DecolonizationContent } from '../types';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '../constants/theme';

interface DecolonizationDailyProps {
  content?: DecolonizationContent;
  onRefresh?: () => void;
  isLoading?: boolean;
}

// Sample decolonization content - in production, this would come from the backend
const SAMPLE_CONTENT: DecolonizationContent[] = [
  {
    id: '1',
    title: 'Ubuntu Philosophy',
    content: '"Ubuntu" means "I am because we are." This African philosophy emphasizes our interconnectedness and shared humanity. In a world that often promotes individualism, Ubuntu reminds us that our well-being is tied to the well-being of our community.',
    author: 'Traditional African Wisdom',
    type: 'wisdom',
    date: new Date(),
    tags: ['ubuntu', 'philosophy', 'community', 'interconnectedness'],
  },
  {
    id: '2',
    title: 'Reclaiming Time',
    content: 'Colonial systems imposed linear time concepts that disconnected us from natural rhythms. The African Royal Calendar reconnects us with cyclical time, honoring seasons, moon phases, and the eternal dance between light and darkness.',
    author: 'Gekmovement.org',
    type: 'historical',
    date: new Date(),
    tags: ['time', 'calendar', 'decolonial', 'natural-rhythms'],
  },
  {
    id: '3',
    title: 'Ancestral Wisdom',
    content: '"When we know better, we do better." Our ancestors carried wisdom through centuries of challenges. By honoring their knowledge and integrating it with modern understanding, we create pathways for healing and growth.',
    author: 'Dr. Maya Angelou',
    type: 'quote',
    date: new Date(),
    tags: ['ancestors', 'wisdom', 'healing', 'growth'],
  },
  {
    id: '4',
    title: 'Cultural Resistance',
    content: 'Every act of cultural preservation is an act of resistance. When we speak our languages, practice our traditions, and teach our children about their heritage, we resist cultural erasure and affirm our identity.',
    author: 'Pan-African Thought',
    type: 'cultural',
    date: new Date(),
    tags: ['resistance', 'culture', 'preservation', 'identity'],
  },
  {
    id: '5',
    title: 'Sankofa Principle',
    content: 'Sankofa teaches us to look back to move forward. We cannot progress without understanding our past. This Akan symbol reminds us that wisdom comes from learning from history while building toward the future.',
    author: 'Akan Traditional Wisdom',
    type: 'wisdom',
    date: new Date(),
    tags: ['sankofa', 'akan', 'history', 'progress'],
  },
];

export const DecolonizationDaily: React.FC<DecolonizationDailyProps> = ({
  content,
  onRefresh,
  isLoading = false,
}) => {
  const [currentContent, setCurrentContent] = useState<DecolonizationContent | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // If no content provided, use sample content
    if (!content) {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const contentIndex = dayOfYear % SAMPLE_CONTENT.length;
      setCurrentContent(SAMPLE_CONTENT[contentIndex]);
    } else {
      setCurrentContent(content);
    }
  }, [content]);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    } else {
      // Simulate refresh with sample content
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * SAMPLE_CONTENT.length);
        setCurrentContent(SAMPLE_CONTENT[randomIndex]);
        setRefreshing(false);
      }, 1000);
    }
    setRefreshing(false);
  };

  const handleShare = async () => {
    if (!currentContent) return;

    try {
      await Share.share({
        message: `${currentContent.title}\n\n"${currentContent.content}"\n\n- ${currentContent.author}\n\nShared from Inzalo Yelanga`,
        title: 'Daily Wisdom from Inzalo Yelanga',
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'quote':
        return '💬';
      case 'wisdom':
        return '🧠';
      case 'historical':
        return '📚';
      case 'cultural':
        return '🎭';
      default:
        return '✨';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'quote':
        return COLORS.primary;
      case 'wisdom':
        return COLORS.secondary;
      case 'historical':
        return COLORS.ochre;
      case 'cultural':
        return COLORS.ndebeleBlue;
      default:
        return COLORS.primary;
    }
  };

  if (!currentContent) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading daily wisdom...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[getTypeColor(currentContent.type) + '20', getTypeColor(currentContent.type) + '10']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Decolonization of the Day</Text>
          <Text style={styles.headerSubtitle}>Daily Wisdom for Cultural Awakening</Text>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          <View style={styles.contentHeader}>
            <View style={styles.typeIndicator}>
              <Text style={styles.typeIcon}>{getTypeIcon(currentContent.type)}</Text>
              <Text style={[styles.typeText, { color: getTypeColor(currentContent.type) }]}>
                {currentContent.type.charAt(0).toUpperCase() + currentContent.type.slice(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.contentTitle}>{currentContent.title}</Text>

          <View style={styles.contentBody}>
            <Text style={styles.contentText}>{currentContent.content}</Text>
          </View>

          <View style={styles.contentFooter}>
            <Text style={styles.authorText}>— {currentContent.author}</Text>
          </View>

          {/* Tags */}
          {currentContent.tags && currentContent.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {currentContent.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>Share Wisdom</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <Text style={styles.refreshButtonText}>New Wisdom</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cultural Message */}
        <View style={styles.culturalMessage}>
          <Text style={styles.culturalMessageText}>
            "Knowledge is like a garden: if it is not cultivated, it cannot be harvested."
            — Traditional African Proverb
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.lg,
  },
  contentHeader: {
    marginBottom: SPACING.lg,
  },
  typeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    alignSelf: 'flex-start',
  },
  typeIcon: {
    fontSize: TYPOGRAPHY.lg,
    marginRight: SPACING.sm,
  },
  typeText: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    textTransform: 'capitalize',
  },
  contentTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  contentBody: {
    marginBottom: SPACING.lg,
  },
  contentText: {
    fontSize: TYPOGRAPHY.base,
    lineHeight: TYPOGRAPHY.relaxed * TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    textAlign: 'justify',
  },
  contentFooter: {
    alignItems: 'flex-end',
    marginBottom: SPACING.lg,
  },
  authorText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.primary,
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    fontWeight: TYPOGRAPHY.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  shareButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  shareButtonText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.kubaBlack,
  },
  refreshButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  refreshButtonText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.kubaBlack,
  },
  culturalMessage: {
    backgroundColor: COLORS.ochre + '20',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ochre,
  },
  culturalMessageText: {
    fontSize: TYPOGRAPHY.sm,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.relaxed * TYPOGRAPHY.sm,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});

export default DecolonizationDaily;