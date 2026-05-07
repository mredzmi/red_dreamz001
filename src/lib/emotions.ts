export interface Emotion {
  id: string
  label: string
  emoji: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const EMOTIONS: Emotion[] = [
  { id: 'happy', label: 'Happy', emoji: '😊', description: 'Feeling good and joyful', difficulty: 'easy' },
  { id: 'sad', label: 'Sad', emoji: '😢', description: 'Feeling unhappy or upset', difficulty: 'easy' },
  { id: 'angry', label: 'Angry', emoji: '😠', description: 'Feeling very upset', difficulty: 'easy' },
  { id: 'scared', label: 'Scared', emoji: '😨', description: 'Feeling afraid', difficulty: 'easy' },
  { id: 'surprised', label: 'Surprised', emoji: '😲', description: 'Something unexpected happened', difficulty: 'medium' },
  { id: 'disgusted', label: 'Disgusted', emoji: '🤢', description: 'Something feels yucky', difficulty: 'medium' },
  { id: 'confused', label: 'Confused', emoji: '😕', description: 'Not sure what is happening', difficulty: 'medium' },
  { id: 'excited', label: 'Excited', emoji: '🤩', description: 'Feeling very happy about something', difficulty: 'medium' },
  { id: 'calm', label: 'Calm', emoji: '😌', description: 'Feeling peaceful and relaxed', difficulty: 'hard' },
  { id: 'tired', label: 'Tired', emoji: '😴', description: 'Feeling sleepy or worn out', difficulty: 'hard' },
  { id: 'proud', label: 'Proud', emoji: '😤', description: 'Feeling good about doing something well', difficulty: 'hard' },
  { id: 'worried', label: 'Worried', emoji: '😟', description: 'Thinking something bad might happen', difficulty: 'hard' },
]
