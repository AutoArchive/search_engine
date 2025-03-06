// aiUtils.ts
import { CrawlResult } from './types'

export async function cleanContent(markdown: string): Promise<string> {
  try {
    const prompt = `Please analyze and clean this content:
    
${markdown}

Instructions:
- Fix any formatting issues
- Improve readability
- Maintain the original meaning
- Remove redundant information
- Ensure proper markdown syntax`

    const response = await fetch('/api/genstruct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markdown,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to clean content: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error cleaning content:', error)
    throw new Error(`Failed to clean content: ${error.message}`)
  }
}

export const tagContent = (crawlResults: CrawlResult, cleanedContent: string): string => {
  return cleanedContent + '\n\n' + `来源：${crawlResults.source} 日期：${crawlResults.date}`
}
