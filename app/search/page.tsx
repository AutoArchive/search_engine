'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchForm from '@/components/search/SearchForm'
import SearchResults from '@/components/search/SearchResults'
import { SearchResult } from '@/components/search/SearchResult'

// Loading component
const SearchLoading = () => (
  <div className="flex justify-center p-8">
    <div className="animate-pulse">Loading...</div>
  </div>
)

// Define proper types for search parameters
interface SearchParams {
  query: string
  domain?: string | null
  tag?: string | null
  year?: string | null
  region?: string | null
}

// Main search component
function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  // Check if any search parameters exist
  const hasSearchParams = () => {
    return Boolean(
      searchParams.get('term') ||
        searchParams.get('domain') ||
        searchParams.get('tag') ||
        searchParams.get('year') ||
        searchParams.get('region')
    )
  }

  // Perform initial search with params
  const performInitialSearch = () => {
    const query = searchParams.get('term')
    const domain = searchParams.get('domain')
    const tag = searchParams.get('tag')
    const year = searchParams.get('year')
    const region = searchParams.get('region')

    if (query || domain || tag || year || region) {
      handleSearch({
        query: query || '', // ensure query is never undefined
        domain: domain || undefined,
        tag: tag || undefined,
        year: year || undefined,
        region: region || undefined,
      })
    }
  }

  // Update useEffect to use new functions
  useEffect(() => {
    if (hasSearchParams()) {
      performInitialSearch()
    }
  }, [searchParams])

  const handleSearch = async ({ query, domain, tag, year, region }: SearchParams) => {
    setError(null)
    setIsSearching(true)
    setResults([])

    try {
      const params = new URLSearchParams({
        term: query,
        ...(domain && { domain }),
        ...(tag && { tag }),
        ...(year && { year }),
        ...(region && { region }),
      })

      // Redirect search queries to the homepage
      router.push(`/?${params.toString()}`)
      return
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 rounded-md bg-amber-50 p-4 text-center text-amber-800">
        🚧 Experimental 🚧
      </div>

      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">File Search</h1>
        <SearchForm
          onSearch={handleSearch}
          isSearching={isSearching}
          initialValues={{
            query: searchParams.get('term') || '',
            domain: searchParams.get('domain') || '',
            tag: searchParams.get('tag') || '',
            year: searchParams.get('year') || '',
            region: searchParams.get('region') || '',
          }}
        />
        <SearchResults results={results} error={error} />
      </div>
    </div>
  )
}

// Main exported component with Suspense boundary
export default function FileSearch() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  )
}
