import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NavSidebar from '@/components/nav-sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', user.id)
    .single()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .single()

  return (
    <div className="min-h-screen flex bg-background">
      <NavSidebar
        userName={profile?.name ?? user.email ?? 'User'}
        userRole={profile?.role ?? 'PARENT'}
        plan={subscription?.plan ?? 'STARTER'}
      />
      <main className="flex-1 min-w-0 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
