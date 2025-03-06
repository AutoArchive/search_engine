import { NextResponse } from 'next/server'
import combinedIndex from 'combined_search_index.json'
import { SearchResult, SearchParams } from '@/components/search/SearchResult'

interface Document {
  type: string
  format: string
  size: number
  md5: string
  link: string | null // Allow null values
  description: string
  'archived date': string
  author: string
  date: string
  region: string
  tags: string[]
}

interface SearchIndex {
  [domain: string]: {
    [key: string]: Document
  }
}

function stripFileExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '')
}

function searchDocuments(index: SearchIndex, params: SearchParams): SearchResult[] {
  const searchResults: SearchResult[] = []
  const MAX_RESULTS = 600

  for (const domain in index) {
    // Skip if domains specified and current domain not included
    if (params.domain && params.domain != '' && !params.domain.includes(domain)) {
      continue
    }

    const domainIndex = index[domain]
    for (const key in domainIndex) {
      if (searchResults.length >= MAX_RESULTS) {
        return searchResults
      }

      const document = domainIndex[key]

      // Check all filter conditions
      if (
        (params.query === '' || // Search term match
          key.toLowerCase().includes(params.query.toLowerCase()) ||
          document.description.toLowerCase().includes(params.query.toLowerCase())) &&
        (!params.tag || document.tags.includes(params.tag)) && // Tag match
        (!params.year || document.date.includes(params.year)) && // Year match
        (!params.region || document.region.toLowerCase() === params.region.toLowerCase()) // Region match
      ) {
        const link: string = document.link ? document.link : 'unknown'
        searchResults.push({
          url: `https://${domain}/${stripFileExtension(key)}`, // Handle null links
          description: document.description,
          tags: document.tags,
          type: document.type,
          author: document.author,
          date: document.date,
          region: document.region,
          format: document.format,
          size: document.size,
          link: link,
        })
      }
    }
  }

  return searchResults
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const searchConfig: SearchParams = {
    query: searchParams.get('term') || '',
    domain: searchParams.get('domain') || '',
    tag: searchParams.get('tag') || undefined,
    year: searchParams.get('year') || undefined,
    region: searchParams.get('region') || undefined,
  }

  const results = searchDocuments(combinedIndex as SearchIndex, searchConfig)
  return NextResponse.json(results)
}
