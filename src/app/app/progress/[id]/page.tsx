import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function ProgressPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: child } = await supabase
    .from('child_profiles')
    .select('id, name, age, notes')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!child) notFound()

  const { data: emotionSessions } = await supabase
    .from('emotion_sessions')
    .select('*')
    .eq('child_id', params.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const totalSessions = emotionSessions?.length ?? 0
  const correctSessions = emotionSessions?.filter((s) => s.is_correct).length ?? 0
  const accuracy = totalSessions > 0 ? Math.round((correctSessions / totalSessions) * 100) : 0

  const emotionFreq: Record<string, { correct: number; total: number }> = {}
  emotionSessions?.forEach((s) => {
    if (!emotionFreq[s.emotion_tested]) emotionFreq[s.emotion_tested] = { correct: 0, total: 0 }
    emotionFreq[s.emotion_tested].total++
    if (s.is_correct) emotionFreq[s.emotion_tested].correct++
  })

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/dashboard">
          <Button variant="ghost" size="sm">← Back</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{child.name}&apos;s Progress</h1>
          <p className="text-muted-foreground text-sm">{child.age} years old{child.notes ? ` · ${child.notes}` : ''}</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 text-center">
            <p className="text-3xl font-bold text-foreground">{totalSessions}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 text-center">
            <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
            <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 text-center">
            <p className="text-3xl font-bold text-primary">{correctSessions}</p>
            <p className="text-xs text-muted-foreground mt-1">Correct Answers</p>
          </CardContent>
        </Card>
      </div>

      {/* Emotion breakdown */}
      {Object.keys(emotionFreq).length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Emotions Practiced</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-2">
            {Object.entries(emotionFreq)
              .sort((a, b) => b[1].total - a[1].total)
              .map(([emotion, stats]) => {
                const pct = Math.round((stats.correct / stats.total) * 100)
                return (
                  <div key={emotion} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24 capitalize">{emotion}</span>
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-16 text-right">
                      {stats.correct}/{stats.total} ({pct}%)
                    </span>
                  </div>
                )
              })}
          </CardContent>
        </Card>
      )}

      {/* Recent sessions */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {totalSessions === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No sessions yet. Start the Emotion Learning module!
            </p>
          ) : (
            <div className="space-y-2">
              {emotionSessions!.slice(0, 10).map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <span className="text-sm font-medium capitalize">{s.emotion_tested}</span>
                    <span className="text-xs text-muted-foreground ml-2">answered: {s.user_answer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={s.is_correct ? 'default' : 'secondary'} className={s.is_correct ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-50 text-red-600'}>
                      {s.is_correct ? '✓ Correct' : '✗ Wrong'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString('en-MY')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
