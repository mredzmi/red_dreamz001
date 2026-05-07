import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AACPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🗣️ AAC Communication Board
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Symbol-to-speech communication for non-verbal children.
        </p>
      </div>
      <Card className="border-2 border-purple-200">
        <CardContent className="py-16 text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h2 className="text-xl font-bold text-foreground">Coming in Pro Plan</h2>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
            The AAC Communication Board lets non-verbal children express themselves using picture symbols that convert to speech. Available in the Pro plan.
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
