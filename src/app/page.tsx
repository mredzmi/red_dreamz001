import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PLAN_PRICES } from '@/lib/types'
import { Check, Brain, Calendar, MessageSquare, Users } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Emotion Learning',
    description: 'Interactive quizzes that help children recognise and understand emotions through friendly visuals and AI-powered feedback.',
    color: 'bg-blue-50 text-blue-600',
    plan: 'Starter',
  },
  {
    icon: Calendar,
    title: 'Visual Schedule Builder',
    description: 'Drag-and-drop daily schedule builder with picture cards. AI generates a personalised story about the day to keep children engaged.',
    color: 'bg-green-50 text-green-600',
    plan: 'Growth',
  },
  {
    icon: MessageSquare,
    title: 'AAC Communication Board',
    description: 'Augmentative and Alternative Communication board to help non-verbal or minimally verbal children express their needs.',
    color: 'bg-purple-50 text-purple-600',
    plan: 'Pro',
  },
  {
    icon: Users,
    title: 'Social Skills Games',
    description: 'Guided social scenarios and games that help children practise greetings, turn-taking, and emotional regulation in safe environments.',
    color: 'bg-orange-50 text-orange-600',
    plan: 'Pro',
  },
]

const plans = [
  {
    tier: 'STARTER' as const,
    name: 'Starter',
    price: PLAN_PRICES.STARTER,
    description: 'Perfect for families just getting started',
    features: [
      'Emotion Learning module',
      '1 child profile',
      'Basic progress tracking',
      'Email support',
    ],
    recommended: false,
    cta: 'Get Started Free',
  },
  {
    tier: 'GROWTH' as const,
    name: 'Growth',
    price: PLAN_PRICES.GROWTH,
    description: 'Most popular for growing families',
    features: [
      'Everything in Starter',
      'Visual Schedule Builder',
      'AI daily story generation',
      'Up to 3 child profiles',
      'Progress reports',
      'Priority support',
    ],
    recommended: true,
    cta: 'Start Growth Plan',
  },
  {
    tier: 'PRO' as const,
    name: 'Pro',
    price: PLAN_PRICES.PRO,
    description: 'For therapists and school administrators',
    features: [
      'Everything in Growth',
      'AAC Communication Board',
      'Social Skills Games',
      'Unlimited child profiles',
      'Advanced analytics',
      'Therapist collaboration tools',
      'Dedicated support',
    ],
    recommended: false,
    cta: 'Start Pro Plan',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">MyLuths</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
            Designed for Malaysian families
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Supporting Every{' '}
            <span className="text-primary">Child's Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            MyLuths helps parents, therapists, and schools support children with autism
            through interactive learning tools — emotion recognition, visual schedules,
            AAC boards, and social skills games.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto text-base px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                See How It Works
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. Free Starter plan always available.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything Your Child Needs to Thrive
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four powerful modules designed with input from autism specialists,
              built for Malaysian children and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${feature.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {feature.plan}+
                          </Badge>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple and Caring by Design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with autism-accessible principles — calm colours, large text, no
            flashing animations, and clear simple language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Create Your Profile', desc: 'Sign up as a Parent, Therapist, or School Admin and add your child\'s profile in minutes.' },
            { step: '2', title: 'Choose Your Modules', desc: 'Start with Emotion Learning for free, then unlock Visual Schedules and more as you grow.' },
            { step: '3', title: 'Track Progress', desc: 'See your child\'s growth over time with clear reports you can share with their therapist or school.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              All plans billed monthly in Malaysian Ringgit. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.tier}
                className={`relative flex flex-col ${plan.recommended ? 'border-primary shadow-lg ring-2 ring-primary' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-3">
                    <span className="text-4xl font-bold text-foreground">RM{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/register" className="w-full">
                    <Button
                      className="w-full"
                      variant={plan.recommended ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold text-primary">MyLuths</span>
          </div>
          <p className="text-muted-foreground mb-2">
            Every child deserves to be understood, supported, and celebrated.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with care in Malaysia &bull; Supporting children with autism and their families
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="mailto:hello@myluths.my" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            &copy; {new Date().getFullYear()} MyLuths. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
