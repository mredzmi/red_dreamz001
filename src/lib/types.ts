export type UserRole = 'PARENT' | 'THERAPIST' | 'SCHOOL_ADMIN'
export type PlanTier = 'STARTER' | 'GROWTH' | 'PRO'
export type PlanStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED'

export interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: PlanTier
  status: PlanStatus
  renews_at: string
}

export interface ChildProfile {
  id: string
  user_id: string
  name: string
  age: number
  avatar_url: string | null
  notes: string | null
  created_at: string
}

export interface EmotionSession {
  id: string
  child_id: string
  emotion_tested: string
  user_answer: string
  is_correct: boolean
  score: number
  created_at: string
}

export interface ScheduleItem {
  id: string
  time: string
  activity: string
  icon: string
  category: string
}

export interface Schedule {
  id: string
  child_id: string
  date: string
  items: ScheduleItem[]
  ai_story: string | null
  created_at: string
}

export interface ProgressReport {
  id: string
  child_id: string
  period: string
  summary: string
  created_at: string
}

export type FeatureKey = 'emotion' | 'schedule' | 'aac' | 'social'

export interface FeatureAccess {
  allowed: boolean
  requiredPlan: PlanTier | null
}

export const PLAN_FEATURES: Record<PlanTier, FeatureKey[]> = {
  STARTER: ['emotion'],
  GROWTH: ['emotion', 'schedule'],
  PRO: ['emotion', 'schedule', 'aac', 'social'],
}

export const PLAN_CHILD_LIMIT: Record<PlanTier, number> = {
  STARTER: 1,
  GROWTH: 3,
  PRO: 999,
}

export const PLAN_PRICES: Record<PlanTier, number> = {
  STARTER: 19,
  GROWTH: 39,
  PRO: 79,
}
