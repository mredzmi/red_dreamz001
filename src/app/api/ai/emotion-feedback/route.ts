import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { userAnswer, correctEmotion, childAge, childId, emotionId, isCorrect } = await req.json()

    if (!userAnswer || !correctEmotion || !childAge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: `A child with autism aged ${childAge} just answered that the emotion shown is "${userAnswer}". The correct emotion is "${correctEmotion}". Give a short (2 sentence maximum), warm, encouraging response suitable for a child aged ${childAge}. If wrong, gently correct them. Use simple words. Do not use complex vocabulary.`,
        },
      ],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Save session to DB if childId provided
    if (childId && emotionId) {
      try {
        const supabase = createClient()
        await supabase.from('emotion_sessions').insert({
          child_id: childId,
          emotion_tested: correctEmotion,
          user_answer: userAnswer,
          is_correct: isCorrect,
          score: isCorrect ? 1 : 0,
        })
      } catch {
        // Non-fatal — continue even if save fails
      }
    }

    return NextResponse.json({ message: responseText, isCorrect })
  } catch (error) {
    console.error('Emotion feedback error:', error)
    return NextResponse.json({ error: 'Failed to get AI feedback' }, { status: 500 })
  }
}
