import React, { useState } from 'react'
import { SearchResultItem } from './SearchResultItem'
import { SearchResult } from '@/components/search/SearchResult'

interface SearchResultsProps {
  results: SearchResult[]
  error: string | null
}

const RESULTS_PER_PAGE = 20

export default function SearchResults({ results, error }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
  const currentResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE)

  return (
    <div className="mx-auto w-full max-w-2xl">
      {error && <p className="text-center text-red-600 dark:text-red-400">{error}</p>}
      <p className="text-center text-gray-600 dark:text-gray-400">
        Total Results: {results.length}
      </p>
      {results.length > 0 && (
        <>
          <ul className="mt-6 space-y-6">
            {currentResults.map((result, index) => (
              <SearchResultItem key={index} result={result} index={index} />
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="rounded bg-gray-300 px-4 py-2 text-gray-700 
                transition-colors duration-200 
                hover:bg-gray-400 disabled:opacity-50
                dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            <p className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="rounded bg-gray-300 px-4 py-2 text-gray-700 
                transition-colors duration-200 
                hover:bg-gray-400 disabled:opacity-50
                dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
