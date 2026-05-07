'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createChildProfile(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string, 10)
  const notes = (formData.get('notes') as string) || null

  if (!name || !age) return { error: 'Name and age are required.' }

  // Check child limit based on plan
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .single()

  const limits: Record<string, number> = { STARTER: 1, GROWTH: 3, PRO: 999 }
  const plan = subscription?.plan ?? 'STARTER'
  const limit = limits[plan] ?? 1

  const { count } = await supabase
    .from('child_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if ((count ?? 0) >= limit) {
    return { error: `Your ${plan} plan allows up to ${limit} child profile(s). Upgrade to add more.` }
  }

  const { error } = await supabase.from('child_profiles').insert({ user_id: user.id, name, age, notes })
  if (error) return { error: error.message }

  revalidatePath('/app/dashboard')
  return { success: true }
}

export async function deleteChildProfile(childId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('child_profiles')
    .delete()
    .eq('id', childId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/app/dashboard')
  return { success: true }
}
