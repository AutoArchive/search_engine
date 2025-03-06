// types.ts
export interface CrawlResult {
  content: string
  date: string
  source: string
}

export interface FoldStates {
  crawlResults: boolean
  cleanedContent: boolean
  taggedContent: boolean
}
