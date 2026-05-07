import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PLAN_FEATURES } from '@/lib/types'
import UpgradePrompt from '@/components/upgrade-prompt'
import ScheduleBuilder from './schedule-builder'

export default async function SchedulePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .single()

  const plan = (subscription?.plan ?? 'STARTER') as 'STARTER' | 'GROWTH' | 'PRO'
  const allowed = PLAN_FEATURES[plan].includes('schedule')

  if (!allowed) {
    return (
      <div className="max-w-2xl mx-auto">
        <UpgradePrompt feature="Visual Schedule Builder" requiredPlan="GROWTH" />
      </div>
    )
  }

  const { data: children } = await supabase
    .from('child_profiles')
    .select('id, name, age')
    .eq('user_id', user.id)
    .order('created_at')

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          📅 Visual Schedule Builder
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Build your child's daily routine with picture cards. Drag to reorder.
        </p>
      </div>

      {!children || children.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-3">👶</p>
          <p className="font-medium">No child profiles yet</p>
          <p className="text-sm mt-1">Add a child from your dashboard first.</p>
        </div>
      ) : (
        <ScheduleBuilder children={children} />
      )}
    </div>
  )
}
