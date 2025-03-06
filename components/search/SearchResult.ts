export interface SearchResult {
  url: string
  description: string
  tags: string[]
  type: string
  author: string
  date: string
  region: string
  format: string
  size: number
  link: string
}

export interface SearchParams {
  query: string
  domain?: string
  tag?: string
  year?: string
  region?: string
}
