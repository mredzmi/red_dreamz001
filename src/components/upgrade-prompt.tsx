import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PLAN_PRICES } from '@/lib/types'
import type { PlanTier } from '@/lib/types'

interface UpgradePromptProps {
  requiredPlan: PlanTier
  featureName?: string
  feature?: string
}

const planLabels: Record<PlanTier, string> = {
  STARTER: 'Starter',
  GROWTH: 'Growth',
  PRO: 'Pro',
}

export default function UpgradePrompt({ requiredPlan, featureName, feature }: UpgradePromptProps) {
  const displayName = featureName ?? feature ?? 'This Feature'
  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <Card className="max-w-md w-full border-amber-200 bg-amber-50/60">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-amber-600" />
          </div>

          <Badge variant="outline" className="mb-3 border-amber-300 text-amber-700 bg-amber-50">
            {planLabels[requiredPlan]} Plan Required
          </Badge>

          <h2 className="text-xl font-bold text-foreground mb-2">
            {displayName} is Locked
          </h2>

          <p className="text-muted-foreground text-sm mb-2">
            This feature is available on the{' '}
            <span className="font-semibold text-foreground">{planLabels[requiredPlan]}</span> plan
            and above.
          </p>

          <p className="text-muted-foreground text-sm mb-6">
            Starting at{' '}
            <span className="font-bold text-foreground text-base">
              RM{PLAN_PRICES[requiredPlan]}/month
            </span>
          </p>

          <Link href="/billing/plans">
            <Button className="w-full" size="lg">
              Upgrade to {planLabels[requiredPlan]}
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground mt-4">
            Cancel anytime. No long-term commitment.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
