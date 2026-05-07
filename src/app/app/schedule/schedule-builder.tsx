'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ACTIVITIES, ACTIVITY_CATEGORIES } from '@/lib/schedule-activities'
import type { Activity } from '@/lib/schedule-activities'

interface Child { id: string; name: string; age: number }
interface ScheduledItem extends Activity { slotTime: string; instanceId: string }

const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6
  const ampm = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour <= 12 ? hour : hour - 12
  return `${displayHour}:00 ${ampm}`
})

export default function ScheduleBuilder({ children }: { children: Child[] }) {
  const [selectedChild, setSelectedChild] = useState<Child>(children[0])
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('morning')
  const [story, setStory] = useState<string | null>(null)
  const [loadingStory, setLoadingStory] = useState(false)
  const [dragItem, setDragItem] = useState<Activity | null>(null)

  const filteredActivities = ACTIVITIES.filter((a) => a.category === activeCategory)

  function addToSlot(activity: Activity, slotTime: string) {
    setScheduledItems((prev) => [
      ...prev,
      { ...activity, slotTime, instanceId: `${activity.id}-${Date.now()}` },
    ])
  }

  function removeFromSchedule(instanceId: string) {
    setScheduledItems((prev) => prev.filter((i) => i.instanceId !== instanceId))
    setStory(null)
  }

  async function generateStory() {
    if (scheduledItems.length === 0) return
    setLoadingStory(true)
    setStory(null)
    try {
      const activities = scheduledItems.map((i) => `${i.slotTime}: ${i.label}`)
      const res = await fetch('/api/ai/schedule-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childAge: selectedChild.age, childName: selectedChild.name, activities }),
      })
      const data = await res.json()
      setStory(data.story)
    } catch {
      setStory("Today is going to be a great day! You have lots of fun activities planned. Let's go!")
    }
    setLoadingStory(false)
  }

  function handleDrop(e: React.DragEvent, slotTime: string) {
    e.preventDefault()
    if (dragItem) {
      addToSlot(dragItem, slotTime)
      setDragItem(null)
    }
  }

  const itemsInSlot = (slotTime: string) => scheduledItems.filter((i) => i.slotTime === slotTime)

  return (
    <div className="space-y-6">
      {/* Child selector */}
      {children.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedChild(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${selectedChild.id === c.id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity library */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Activity Cards</CardTitle>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ACTIVITY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${activeCategory === cat.id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    draggable
                    onDragStart={() => setDragItem(activity)}
                    className="flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 border-border bg-secondary/30 cursor-grab hover:border-primary/40 hover:bg-primary/5 transition-all text-center select-none"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <span className="text-xs font-medium text-foreground leading-tight">{activity.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">Drag cards onto time slots →</p>
            </CardContent>
          </Card>
        </div>

        {/* Schedule board */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{selectedChild.name}&apos;s Day Schedule</CardTitle>
                {scheduledItems.length > 0 && (
                  <Button size="sm" variant="outline" onClick={() => { setScheduledItems([]); setStory(null) }}>
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0 max-h-96 overflow-y-auto space-y-1">
              {TIME_SLOTS.map((slot) => {
                const items = itemsInSlot(slot)
                return (
                  <div
                    key={slot}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, slot)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border-2 border-dashed min-h-[52px] transition-colors ${items.length > 0 ? 'border-primary/30 bg-primary/5' : 'border-border/50 hover:border-primary/30 hover:bg-secondary/50'}`}
                  >
                    <span className="text-xs text-muted-foreground w-16 shrink-0 mt-1 font-mono">{slot}</span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {items.map((item) => (
                        <Badge
                          key={item.instanceId}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors text-xs gap-1"
                          onClick={() => removeFromSchedule(item.instanceId)}
                        >
                          {item.icon} {item.label} ×
                        </Badge>
                      ))}
                      {items.length === 0 && (
                        <span className="text-xs text-muted-foreground/50 italic">Drop activity here</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* AI Story */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">🤖 Day Story</CardTitle>
                <Button
                  size="sm"
                  onClick={generateStory}
                  disabled={scheduledItems.length === 0 || loadingStory}
                >
                  {loadingStory ? 'Generating...' : 'Generate Story'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {story ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900 leading-relaxed">
                  {story}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Add activities to your schedule, then generate a friendly story about {selectedChild.name}&apos;s day!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
