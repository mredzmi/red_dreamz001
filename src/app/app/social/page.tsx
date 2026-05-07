import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SocialPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🎮 Social Skills Game
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          AI role-play scenarios to practice social situations safely.
        </p>
      </div>
      <Card className="border-2 border-orange-200">
        <CardContent className="py-16 text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h2 className="text-xl font-bold text-foreground">Coming in Pro Plan</h2>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
            The Social Skills Game uses AI to create safe, guided scenarios where children can practice greetings, turn-taking, and emotional regulation. Available in the Pro plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/billing/plans">
              <Button size="lg" className="w-full sm:w-auto">Upgrade to Pro — RM79/mo</Button>
            </Link>
            <Link href="/app/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Back to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
