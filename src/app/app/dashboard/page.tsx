import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AddChildDialog from './add-child-dialog'
import type { PlanTier } from '@/lib/types'
import { PLAN_FEATURES } from '@/lib/types'

const MODULE_CONFIG = [
  { key: 'emotion' as const, icon: '😊', title: 'Emotion Learning', desc: 'Practice identifying feelings', href: '/app/emotion', plan: 'STARTER' as PlanTier },
  { key: 'schedule' as const, icon: '📅', title: 'Visual Schedule', desc: 'Build daily routines', href: '/app/schedule', plan: 'GROWTH' as PlanTier },
  { key: 'aac' as const, icon: '🗣️', title: 'AAC Board', desc: 'Communication symbols', href: '/app/aac', plan: 'PRO' as PlanTier },
  { key: 'social' as const, icon: '🎮', title: 'Social Skills', desc: 'Practice social scenarios', href: '/app/social', plan: 'PRO' as PlanTier },
]

const PLAN_COLORS: Record<PlanTier, string> = {
  STARTER: 'bg-blue-50 text-blue-700 border-blue-200',
  GROWTH: 'bg-green-50 text-green-700 border-green-200',
  PRO: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('name, role').eq('id', user.id).single()
  const { data: subscription } = await supabase.from('subscriptions').select('plan, renews_at').eq('user_id', user.id).eq('status', 'ACTIVE').single()
  const { data: children } = await supabase.from('child_profiles').select('*').eq('user_id', user.id).order('created_at')

  const plan = (subscription?.plan ?? 'STARTER') as PlanTier
  const allowedFeatures = PLAN_FEATURES[plan]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {profile?.name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's what's happening with your children today.
          </p>
        </div>
        <Badge className={`${PLAN_COLORS[plan]} border text-sm px-3 py-1`}>
          {plan} Plan
        </Badge>
      </div>

      {/* Plan upgrade banner */}
      {plan === 'STARTER' && (
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-blue-800 text-sm">Unlock Visual Schedules & More</p>
            <p className="text-blue-600 text-xs mt-0.5">Upgrade to Growth (RM39/mo) to build daily routines with your child.</p>
          </div>
          <Link href="/billing/plans">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">Upgrade</Button>
          </Link>
        </div>
      )}

      {/* Children */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Child Profiles</h2>
          <AddChildDialog />
        </div>
        {children && children.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child) => (
              <Card key={child.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{child.name}</p>
                      <p className="text-sm text-muted-foreground">{child.age} years old</p>
                    </div>
                  </div>
                  {child.notes && (
                    <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{child.notes}</p>
                  )}
                  <Link href={`/app/progress/${child.id}`} className="block mt-3">
                    <Button variant="outline" size="sm" className="w-full">View Progress</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-4xl mb-3">👶</p>
              <p className="font-medium text-foreground">No children added yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add your first child profile to get started</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Modules */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Learning Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULE_CONFIG.map((mod) => {
            const isAllowed = allowedFeatures.includes(mod.key)
            return (
              <Link key={mod.key} href={isAllowed ? mod.href : '/billing/plans'}>
                <Card className={`h-full transition-all ${isAllowed ? 'hover:shadow-md cursor-pointer' : 'opacity-60 cursor-pointer'}`}>
                  <CardHeader className="pb-2">
                    <div className="text-3xl mb-2">{mod.icon}</div>
                    <CardTitle className="text-base flex items-center justify-between gap-2">
                      {mod.title}
                      {!isAllowed && <span className="text-muted-foreground">🔒</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{mod.desc}</p>
                    {!isAllowed && (
                      <p className="text-xs text-primary mt-2 font-medium">{mod.plan} Plan required</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
