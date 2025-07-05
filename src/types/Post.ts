export interface Author {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  mood?: string;
  aiInsight?: string;
  hasVoiceNote?: boolean;
  voiceNoteDuration?: number;
}

export interface AIInsight {
  id: string;
  type: 'mood' | 'trend' | 'suggestion' | 'memory' | 'habit' | 'engagement';
  title: string;
  description: string;
  action?: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'ai' | 'friend';
  type: 'text' | 'voice' | 'reaction';
  aiSummary?: string;
}