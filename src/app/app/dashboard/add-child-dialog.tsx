'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createChildProfile } from './actions'
import { useRouter } from 'next/navigation'

export default function AddChildDialog() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await createChildProfile(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setOpen(false)
        router.refresh()
      }
    })
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} size="sm">
        + Add Child
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-1">Add Child Profile</h2>
        <p className="text-sm text-muted-foreground mb-5">Enter your child's details to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Child's Name</Label>
            <Input id="name" name="name" placeholder="e.g. Ahmad" required className="h-12" disabled={isPending} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" type="number" min={1} max={18} placeholder="e.g. 7" required className="h-12" disabled={isPending} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input id="notes" name="notes" placeholder="e.g. Loves trains, uses PECS" className="h-12" disabled={isPending} />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-12" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add Child'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
