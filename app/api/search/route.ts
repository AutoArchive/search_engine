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

// Add this interface to include ranking score
interface RankedSearchResult extends SearchResult {
  score: number
}

function stripFileExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '')
}

// Add scoring function to calculate relevance
function calculateScore(key: string, document: Document, query: string): number {
  if (!query) return 1; // Base score for matching other filters
  
  const normalizedQuery = query.toLowerCase();
  const normalizedKey = key.toLowerCase();
  const normalizedDescription = document.description.toLowerCase();
  
  let score = 0;
  
  // Exact match in key (highest priority)
  if (normalizedKey === normalizedQuery) {
    score += 10;
  }
  // Key starts with query
  else if (normalizedKey.startsWith(normalizedQuery)) {
    score += 7;
  }
  // Query is within key
  else if (normalizedKey.includes(normalizedQuery)) {
    score += 5;
  }
  
  // Description matches
  if (normalizedDescription.includes(normalizedQuery)) {
    score += 3;
    
    // Bonus for description starting with query
    if (normalizedDescription.startsWith(normalizedQuery)) {
      score += 2;
    }
  }
  
  // Bonus for tag matches
  if (document.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
    score += 2;
  }
  
  return score;
}

function searchDocuments(index: SearchIndex, params: SearchParams): SearchResult[] {
  const rankedResults: RankedSearchResult[] = [];
  const MAX_RESULTS = 600;

  for (const domain in index) {
    // Skip if domains specified and current domain not included
    if (params.domain && params.domain != '' && !params.domain.includes(domain)) {
      continue;
    }

    const domainIndex = index[domain];
    for (const key in domainIndex) {
      const document = domainIndex[key];

      // Check all filter conditions
      if (
        (params.query === '' || // Search term match
          key.toLowerCase().includes(params.query.toLowerCase()) ||
          document.description.toLowerCase().includes(params.query.toLowerCase())) &&
        (!params.tag || document.tags.includes(params.tag)) && // Tag match
        (!params.year || document.date.includes(params.year)) && // Year match
        (!params.region || document.region.toLowerCase() === params.region.toLowerCase()) // Region match
      ) {
        const link: string = document.link ? document.link : 'unknown';
        
        // Calculate score for this result
        const score = calculateScore(key, document, params.query);
        
        rankedResults.push({
          url: `https://${domain}/${stripFileExtension(key)}`,
          description: document.description,
          tags: document.tags,
          type: document.type,
          author: document.author,
          date: document.date,
          region: document.region,
          format: document.format,
          size: document.size,
          link: link,
          score: score
        });
      }
    }
  }

  // Sort results by score in descending order
  rankedResults.sort((a, b) => b.score - a.score);
  
  // Return top results (up to MAX_RESULTS)
  return rankedResults.slice(0, MAX_RESULTS);
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
