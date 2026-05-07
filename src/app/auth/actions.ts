'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/app/dashboard')
}

export async function register(formData: FormData) {
  const supabase = createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  if (!name || !email || !password || !role) {
    return { error: 'All fields are required.' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Insert profile record
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      role,
    })

    if (profileError) {
      console.error('Profile insert error:', profileError)
    }

    // Create default STARTER subscription
    const { error: subError } = await supabase.from('subscriptions').insert({
      user_id: data.user.id,
      plan: 'STARTER',
      status: 'ACTIVE',
      renews_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })

    if (subError) {
      console.error('Subscription insert error:', subError)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/app/dashboard')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
