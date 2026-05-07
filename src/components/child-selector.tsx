'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { ChildProfile } from '@/lib/types'

interface ChildSelectorProps {
  children: ChildProfile[]
  selectedId: string | null
  onSelect: (id: string) => void
  label?: string
}

export function ChildSelector({
  children,
  selectedId,
  onSelect,
  label = 'Select Child',
}: ChildSelectorProps) {
  if (children.length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-3 rounded-lg bg-secondary">
        No child profiles yet. Add one from the Dashboard.
      </div>
    )
  }

  if (children.length === 1) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          {children[0].name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-sm">{children[0].name}</p>
          <p className="text-xs text-muted-foreground">Age {children[0].age}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <Select value={selectedId ?? undefined} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a child profile..." />
        </SelectTrigger>
        <SelectContent>
          {children.map((child) => (
            <SelectItem key={child.id} value={child.id}>
              <div className="flex items-center gap-2">
                <span className="text-base">
                  {child.name.charAt(0).toUpperCase()}
                </span>
                <span>{child.name}</span>
                <span className="text-muted-foreground text-xs">· Age {child.age}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
