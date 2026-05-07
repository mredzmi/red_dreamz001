'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PLAN_PRICES } from '@/lib/types'

const plans = [
  {
    name: 'Starter',
    tier: 'STARTER' as const,
    price: PLAN_PRICES.STARTER,
    desc: 'Perfect for getting started',
    features: [
      '😊 Emotion Learning module',
      '1 child profile',
      'Monthly progress report',
      'AI-powered feedback',
      'Email support',
    ],
    color: 'border-blue-200',
    recommended: false,
  },
  {
    name: 'Growth',
    tier: 'GROWTH' as const,
    price: PLAN_PRICES.GROWTH,
    desc: 'Most popular for families',
    features: [
      '😊 Emotion Learning module',
      '📅 Visual Schedule Builder',
      'AI day story generation',
      'Up to 3 child profiles',
      'Weekly progress report',
      'Priority support',
    ],
    color: 'border-blue-500',
    recommended: true,
  },
  {
    name: 'Pro',
    tier: 'PRO' as const,
    price: PLAN_PRICES.PRO,
    desc: 'For therapists & schools',
    features: [
      'All Starter + Growth features',
      '🗣️ AAC Communication Board',
      '🎮 Social Skills Game',
      'Unlimited child profiles',
      'Daily reports + PDF export',
      'Therapist & school access',
      'Dedicated support',
    ],
    color: 'border-purple-300',
    recommended: false,
  },
]

export default function PlansPage() {
  const [toasting, setToasting] = useState<string | null>(null)

  function handleSubscribe(planName: string) {
    setToasting(planName)
    setTimeout(() => setToasting(null), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold text-primary">MyLuths</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-3">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            All plans billed monthly in Malaysian Ringgit · FPX · Credit Card · GrabPay · TNG
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`relative flex flex-col border-2 ${plan.color} ${plan.recommended ? 'shadow-lg ring-2 ring-primary' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
                <div className="mt-3">
                  <span className="text-sm text-muted-foreground">RM</span>
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full h-12"
                  variant={plan.recommended ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  Get {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment methods */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Accepted payment methods in Malaysia</p>
          <p>💳 FPX Online Banking &nbsp;·&nbsp; Visa / Mastercard &nbsp;·&nbsp; 🟢 GrabPay &nbsp;·&nbsp; 🔵 Touch &apos;n Go eWallet</p>
          <p className="text-xs mt-2">Powered by Billplz · Secure Malaysian payment gateway</p>
        </div>

        {/* Toast */}
        {toasting && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-50">
            💳 Payment integration coming soon — {toasting} plan selected!
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/app/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
