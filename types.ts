
export type Mood = 
  | 'lonely' 
  | 'anxious' 
  | 'sad' 
  | 'overwhelmed' 
  | 'numb' 
  | 'tired' 
  | 'just-need-to-vent';

export interface MoodConfig {
  id: Mood;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
