// app/api/markdown/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Get config from env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const MODEL_NAME = process.env.OPENAI_MODEL || 'gpt-4o-mini'

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required in environment variables')
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const { prompt, jsonSchema } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Markdown content is required' }, { status: 400 })
    }

    // Process with OpenAI using configured model
    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: jsonSchema
        ? {
            type: 'json_schema',
            json_schema: jsonSchema,
          }
        : undefined,
    })

    // Return AI analysis
    return NextResponse.json({
      response: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error('Error processing content:', error)
    return NextResponse.json(
      { error: 'Failed to process content: ' + error.message },
      { status: 500 }
    )
  }
}
