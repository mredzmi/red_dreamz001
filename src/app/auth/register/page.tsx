'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { register } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const roles: { value: UserRole; label: string; description: string; emoji: string }[] = [
  { value: 'PARENT', label: 'Parent / Guardian', description: 'Managing my child\'s learning at home', emoji: '👨‍👩‍👧' },
  { value: 'THERAPIST', label: 'Therapist', description: 'Supporting multiple clients professionally', emoji: '🧠' },
  { value: 'SCHOOL_ADMIN', label: 'School Admin', description: 'Managing a school or learning centre', emoji: '🏫' },
]

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole>('PARENT')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set('role', selectedRole)
    startTransition(async () => {
      const result = await register(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-primary">MyLuths</span>
          </Link>
          <p className="text-muted-foreground mt-2 text-sm">Autism Support Platform</p>
        </div>

        <Card className="shadow-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Start supporting your child&apos;s journey today — free</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selector */}
              <div className="space-y-2">
                <Label>I am a...</Label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                        selectedRole === role.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40 hover:bg-secondary/40'
                      )}
                    >
                      <span className="text-2xl">{role.emoji}</span>
                      <div>
                        <div className="font-semibold text-sm">{role.label}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </div>
                      {selectedRole === role.value && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  disabled={isPending}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? 'Creating Account...' : 'Create Free Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account you agree to our{' '}
          <Link href="#" className="underline hover:text-foreground">Terms</Link>{' '}
          and{' '}
          <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
