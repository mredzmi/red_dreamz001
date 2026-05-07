'use client'
import { PLAN_FEATURES } from '@/lib/types'
import type { FeatureKey, FeatureAccess, PlanTier } from '@/lib/types'

export function useFeatureAccess(plan: PlanTier | null | undefined, feature: FeatureKey): FeatureAccess {
  if (!plan) return { allowed: false, requiredPlan: 'STARTER' }
  const features = PLAN_FEATURES[plan] ?? []
  if (features.includes(feature)) return { allowed: true, requiredPlan: null }
  // Find minimum plan that unlocks this feature
  const tiers: PlanTier[] = ['STARTER', 'GROWTH', 'PRO']
  const requiredPlan = tiers.find(t => PLAN_FEATURES[t].includes(feature)) ?? 'PRO'
  return { allowed: false, requiredPlan }
}
