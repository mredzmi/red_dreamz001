export interface Activity {
  id: string
  label: string
  icon: string
  category: 'morning' | 'school' | 'meals' | 'therapy' | 'play' | 'rest' | 'evening' | 'hygiene'
}

export const ACTIVITIES: Activity[] = [
  // Morning
  { id: 'wake-up', label: 'Wake Up', icon: '🌅', category: 'morning' },
  { id: 'get-dressed', label: 'Get Dressed', icon: '👕', category: 'morning' },
  { id: 'pack-bag', label: 'Pack Bag', icon: '🎒', category: 'morning' },
  { id: 'go-to-school', label: 'Go to School', icon: '🚌', category: 'morning' },
  { id: 'morning-exercise', label: 'Morning Exercise', icon: '🏃', category: 'morning' },

  // Hygiene
  { id: 'brush-teeth', label: 'Brush Teeth', icon: '🪥', category: 'hygiene' },
  { id: 'shower', label: 'Shower', icon: '🚿', category: 'hygiene' },
  { id: 'wash-hands', label: 'Wash Hands', icon: '🧼', category: 'hygiene' },
  { id: 'bath-time', label: 'Bath Time', icon: '🛁', category: 'hygiene' },
  { id: 'comb-hair', label: 'Comb Hair', icon: '💆', category: 'hygiene' },

  // Meals
  { id: 'breakfast', label: 'Breakfast', icon: '🥣', category: 'meals' },
  { id: 'lunch', label: 'Lunch', icon: '🍱', category: 'meals' },
  { id: 'dinner', label: 'Dinner', icon: '🍽️', category: 'meals' },
  { id: 'snack-time', label: 'Snack Time', icon: '🍎', category: 'meals' },
  { id: 'drink-water', label: 'Drink Water', icon: '💧', category: 'meals' },

  // School
  { id: 'circle-time', label: 'Circle Time', icon: '⭕', category: 'school' },
  { id: 'reading', label: 'Reading', icon: '📚', category: 'school' },
  { id: 'math', label: 'Math', icon: '🔢', category: 'school' },
  { id: 'art-class', label: 'Art Class', icon: '🎨', category: 'school' },
  { id: 'music', label: 'Music', icon: '🎵', category: 'school' },
  { id: 'recess', label: 'Recess', icon: '⛹️', category: 'school' },
  { id: 'story-time', label: 'Story Time', icon: '📖', category: 'school' },
  { id: 'home-time', label: 'Home Time', icon: '🏠', category: 'school' },
  { id: 'homework', label: 'Homework', icon: '✏️', category: 'school' },
  { id: 'science', label: 'Science', icon: '🔬', category: 'school' },

  // Therapy
  { id: 'therapy-session', label: 'Therapy Session', icon: '🧠', category: 'therapy' },
  { id: 'ot-session', label: 'OT Session', icon: '🤲', category: 'therapy' },
  { id: 'speech-therapy', label: 'Speech Therapy', icon: '💬', category: 'therapy' },
  { id: 'physio', label: 'Physiotherapy', icon: '🏋️', category: 'therapy' },
  { id: 'sensory-play', label: 'Sensory Play', icon: '🫧', category: 'therapy' },

  // Play
  { id: 'outdoor-play', label: 'Outdoor Play', icon: '🌳', category: 'play' },
  { id: 'indoor-play', label: 'Indoor Play', icon: '🧸', category: 'play' },
  { id: 'drawing', label: 'Drawing', icon: '✏️', category: 'play' },
  { id: 'tv-time', label: 'TV Time', icon: '📺', category: 'play' },
  { id: 'puzzle', label: 'Puzzle', icon: '🧩', category: 'play' },
  { id: 'lego', label: 'Lego / Building', icon: '🏗️', category: 'play' },
  { id: 'computer', label: 'Computer / Tablet', icon: '💻', category: 'play' },

  // Rest
  { id: 'nap-time', label: 'Nap Time', icon: '💤', category: 'rest' },
  { id: 'quiet-time', label: 'Quiet Time', icon: '🤫', category: 'rest' },
  { id: 'reading-time', label: 'Reading Time', icon: '📕', category: 'rest' },

  // Evening
  { id: 'prayer', label: 'Prayer / Doa', icon: '🙏', category: 'evening' },
  { id: 'bedtime', label: 'Bedtime', icon: '🌙', category: 'evening' },
  { id: 'family-time', label: 'Family Time', icon: '👨‍👩‍👧', category: 'evening' },
  { id: 'evening-walk', label: 'Evening Walk', icon: '🚶', category: 'evening' },
  { id: 'journal', label: 'Journaling', icon: '📓', category: 'evening' },
]

export const ACTIVITY_CATEGORY_LABELS: Record<Activity['category'], string> = {
  morning: 'Morning',
  hygiene: 'Hygiene',
  meals: 'Meals',
  school: 'School',
  therapy: 'Therapy',
  play: 'Play',
  rest: 'Rest',
  evening: 'Evening',
}

export const ACTIVITY_CATEGORIES: { id: Activity['category']; label: string; icon: string }[] = [
  { id: 'morning', label: 'Morning', icon: '🌅' },
  { id: 'hygiene', label: 'Hygiene', icon: '🚿' },
  { id: 'meals', label: 'Meals', icon: '🍽️' },
  { id: 'school', label: 'School', icon: '📚' },
  { id: 'therapy', label: 'Therapy', icon: '🧠' },
  { id: 'play', label: 'Play', icon: '🎮' },
  { id: 'rest', label: 'Rest', icon: '💤' },
  { id: 'evening', label: 'Evening', icon: '🌙' },
]
