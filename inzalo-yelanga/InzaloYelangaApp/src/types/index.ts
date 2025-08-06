export interface AfricanMonth {
  id: number;
  monthNumber: number;
  name: string;
  meaning: string;
  season: string;
  activities: string;
  color: string;
  imageUrl: string;
  seasonGradient: string;
  sacredDays: SacredDay[];
}

export interface SacredDay {
  day: number;
  name: string;
  description: string;
}

export interface UserEvent {
  id: string;
  title: string;
  description?: string;
  day: number;
  monthId: number;
  userId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  enableNotifications: boolean;
  enableAds: boolean;
  language: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface CommunityPost {
  id: string;
  userId: string;
  userDisplayName: string;
  content: string;
  images?: string[];
  eventId?: string;
  likes: number;
  comments: Comment[];
  isModerated: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userDisplayName: string;
  content: string;
  createdAt: Date;
}

export interface DecolonizationContent {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'quote' | 'wisdom' | 'historical' | 'cultural';
  date: Date;
  tags: string[];
}

export interface CulturalLibraryItem {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'article' | 'video' | 'audio' | 'ceremony';
  author: string;
  category: string;
  tags: string[];
  mediaUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  likes: number;
  views: number;
}

export interface AfricanCalendarDate {
  monthIndex: number;
  dayOfMonth: number;
  dayOfYear: number;
  gregorianDate: Date;
}

export interface AppState {
  currentUser: User | null;
  currentAfricanDate: AfricanCalendarDate;
  selectedMonth: AfricanMonth;
  userEvents: { [monthId: number]: UserEvent[] };
  communityPosts: CommunityPost[];
  decolonizationContent: DecolonizationContent[];
  culturalLibrary: CulturalLibraryItem[];
  isLoading: boolean;
  error: string | null;
}