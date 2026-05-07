import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/auth/actions'
import type { PlanTier } from '@/lib/types'
import { PLAN_PRICES } from '@/lib/types'

const PLAN_COLORS: Record<PlanTier, string> = {
  STARTER: 'bg-blue-50 text-blue-700 border-blue-200',
  GROWTH: 'bg-green-50 text-green-700 border-green-200',
  PRO: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('name, role').eq('id', user.id).single()
  const { data: subscription } = await supabase.from('subscriptions').select('plan, status, renews_at').eq('user_id', user.id).single()

  const plan = (subscription?.plan ?? 'STARTER') as PlanTier

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and subscription.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {profile?.name?.charAt(0)?.toUpperCase() ?? '?'}
            </div>
            <div>
              <p className="font-semibold">{profile?.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge variant="outline" className="text-xs mt-1">{profile?.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader><CardTitle className="text-base">Subscription</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{plan} Plan</p>
              <p className="text-sm text-muted-foreground">
                RM{PLAN_PRICES[plan]}/month ·{' '}
                {subscription?.renews_at
                  ? `Renews ${new Date(subscription.renews_at).toLocaleDateString('en-MY')}`
                  : 'Active'}
              </p>
            </div>
            <Badge className={`${PLAN_COLORS[plan]} border`}>{subscription?.status ?? 'ACTIVE'}</Badge>
          </div>
          {plan !== 'PRO' && (
            <Link href="/billing/plans">
              <Button variant="outline" className="w-full">Upgrade Plan</Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader><CardTitle className="text-base text-destructive">Sign Out</CardTitle></CardHeader>
        <CardContent>
          <form action={logout}>
            <Button type="submit" variant="destructive" className="w-full">Sign Out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
