'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EMOTIONS } from '@/lib/emotions'

interface Child { id: string; name: string; age: number }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function getChoices(correctId: string) {
  const others = EMOTIONS.filter((e) => e.id !== correctId)
  const wrong = shuffle(others).slice(0, 3)
  return shuffle([EMOTIONS.find((e) => e.id === correctId)!, ...wrong])
}

export default function EmotionQuiz({ children }: { children: Child[] }) {
  const [selectedChild, setSelectedChild] = useState<Child>(children[0])
  const [emotions] = useState(() => shuffle(EMOTIONS))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [choices, setChoices] = useState(() => getChoices(emotions[0].id))
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<{ emotion: string; correct: boolean }[]>([])

  const current = emotions[currentIndex]

  const handleAnswer = useCallback(async (answerId: string) => {
    if (selected || loading) return
    setSelected(answerId)
    setLoading(true)

    const isCorrect = answerId === current.id

    try {
      const res = await fetch('/api/ai/emotion-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer: EMOTIONS.find((e) => e.id === answerId)?.label ?? answerId,
          correctEmotion: current.label,
          childAge: selectedChild.age,
          childId: selectedChild.id,
          emotionId: current.id,
          isCorrect,
        }),
      })
      const data = await res.json()
      setFeedback({ message: data.message, isCorrect })
    } catch {
      setFeedback({ message: isCorrect ? 'Great job! That is correct! 🌟' : `The correct answer is ${current.label}. Keep trying!`, isCorrect })
    }

    if (isCorrect) setScore((s) => s + 1)
    setHistory((h) => [...h, { emotion: current.label, correct: isCorrect }])
    setLoading(false)
  }, [selected, loading, current, selectedChild])

  function nextQuestion() {
    if (currentIndex + 1 >= emotions.length) {
      setSessionDone(true)
      return
    }
    const nextIdx = currentIndex + 1
    setCurrentIndex(nextIdx)
    setChoices(getChoices(emotions[nextIdx].id))
    setFeedback(null)
    setSelected(null)
  }

  function restart() {
    setCurrentIndex(0)
    setChoices(getChoices(emotions[0].id))
    setFeedback(null)
    setSelected(null)
    setScore(0)
    setHistory([])
    setSessionDone(false)
  }

  if (sessionDone) {
    const pct = Math.round((score / emotions.length) * 100)
    return (
      <Card className="text-center">
        <CardContent className="py-12 space-y-4">
          <div className="text-6xl">{pct >= 70 ? '🌟' : '💪'}</div>
          <h2 className="text-2xl font-bold">{pct >= 70 ? 'Amazing Work!' : 'Good Effort!'}</h2>
          <p className="text-muted-foreground">
            {selectedChild.name} got <span className="font-bold text-foreground">{score} out of {emotions.length}</span> correct ({pct}%)
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {history.map((h, i) => (
              <Badge key={i} variant={h.correct ? 'default' : 'secondary'} className={h.correct ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}>
                {h.correct ? '✓' : '✗'} {h.emotion}
              </Badge>
            ))}
          </div>
          <Button onClick={restart} size="lg" className="mt-6">Play Again</Button>
        </CardContent>
      </Card>
    )
  }

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

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Question {currentIndex + 1} of {emotions.length}</span>
        <span className="font-medium text-foreground">Score: {score} ⭐</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex) / emotions.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <Card className="text-center">
        <CardHeader>
          <div className="text-8xl mb-2 select-none">{current.emoji}</div>
          <CardTitle className="text-xl">How does this face feel?</CardTitle>
          <Badge variant="outline" className="mx-auto w-fit">{current.difficulty}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {choices.map((choice) => {
              let variant: 'default' | 'outline' | 'secondary' = 'outline'
              let extraClass = 'h-14 text-base'
              if (selected) {
                if (choice.id === current.id) extraClass += ' border-green-500 bg-green-50 text-green-800'
                else if (choice.id === selected && !feedback?.isCorrect) extraClass += ' border-red-400 bg-red-50 text-red-700'
                else extraClass += ' opacity-50'
              }
              return (
                <Button
                  key={choice.id}
                  variant={variant}
                  className={extraClass}
                  onClick={() => handleAnswer(choice.id)}
                  disabled={!!selected || loading}
                >
                  {choice.emoji} {choice.label}
                </Button>
              )
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${feedback.isCorrect ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
              {feedback.isCorrect ? '🌟 ' : '💙 '}{feedback.message}
            </div>
          )}

          {feedback && (
            <Button onClick={nextQuestion} size="lg" className="w-full mt-2">
              {currentIndex + 1 >= emotions.length ? 'See Results' : 'Next Question →'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
