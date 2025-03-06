// app/api/markdown/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get URL from search params
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    // Validate URL parameter
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    // Fetch markdown content
    const response = await fetch(`https://md.dhr.wtf/?url=${encodeURIComponent(url)}`)

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch markdown content' },
        { status: response.status }
      )
    }

    const markdown = await response.text()

    // Return markdown content
    return NextResponse.json({ markdown })
  } catch (error) {
    console.error('Error fetching markdown:', error)
    return NextResponse.json(
      { error: 'Failed to fetch markdown content' + error.message },
      { status: 404 }
    )
  }
}
