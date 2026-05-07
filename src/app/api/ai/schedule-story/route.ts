import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { childAge, childName, activities } = await req.json()

    if (!childAge || !activities || activities.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const activityList = (activities as string[]).join(', ')

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `Create a simple, cheerful 3-sentence story for ${childName}, an autistic child aged ${childAge}, describing their day schedule: ${activityList}. Use very simple words suitable for a child aged ${childAge}. Start with "Today is going to be a great day!" Do not use complex vocabulary or metaphors.`,
        },
      ],
    })

    const story = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ story })
  } catch (error) {
    console.error('Schedule story error:', error)
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 })
  }
}
