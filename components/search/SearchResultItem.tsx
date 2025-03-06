// SearchResultItem.tsx
import React from 'react'
import { SearchResult } from '@/components/search/SearchResult'

interface SearchResultItemProps {
  result: SearchResult
  index: number
}

export function SearchResultItem({ result, index }: SearchResultItemProps) {
  const urlParts = result.url.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const filePath = urlParts.slice(3, urlParts.length - 1).join('/')

  const getDomainName = (url: string) => {
    try {
      return new URL(url).hostname
    } catch (e) {
      return 'Invalid URL'
    }
  }

  const domainName = getDomainName(result.url)

  return (
    <li key={index} className="border-b border-gray-300 pb-4 dark:border-gray-700">
      <a
        href={result.url}
        className="text-lg font-bold text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
      >
        {fileName}
      </a>
      <p className="text-sm text-gray-600 dark:text-gray-400">{result.url}</p>
      <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">{result.description}</p>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          <strong className="dark:text-gray-300">Author:</strong> {result.author}
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Date:</strong> {result.date}
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Region:</strong> {result.region}
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Format:</strong> {result.format}
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Size:</strong> {result.size} bytes
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Tags:</strong> {result.tags.join(', ')}
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Path:</strong> {filePath}
        </span>{' '}
        |
        <span>
          <strong className="dark:text-gray-300"> Domain:</strong> {domainName}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <strong className="dark:text-gray-300">Original:</strong>
        {result.link.startsWith('http') ? (
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            {result.link}
          </a>
        ) : (
          'Unknown'
        )}
      </p>
    </li>
  )
}
