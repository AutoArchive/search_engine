// components/MarkdownFetcher.tsx
'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownFetcherProps {
  url: string
  className?: string
}

const components = {
  p: ({ node, ...props }) => <p className="text-gray-900 dark:text-gray-100" {...props} />,
  a: ({ node, ...props }) => (
    <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" {...props}>
      {props.children}
    </a>
  ),
  h1: ({ node, ...props }) => (
    <h1 className="text-gray-900 dark:text-gray-100" {...props}>
      {props.children}
    </h1>
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-gray-900 dark:text-gray-100" {...props}>
      {props.children}
    </h2>
  ),
  li: ({ node, ordered, ...props }) => (
    <li className="text-gray-900 dark:text-gray-100" {...props}>
      {props.children}
    </li>
  ),
  ul: ({ node, ordered, ...props }) => (
    <ul className="text-gray-900 dark:text-gray-100" {...props}>
      {props.children}
    </ul>
  ),
}

export default function MarkdownFetcher({ url, className = '' }: MarkdownFetcherProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(url)
        const text = await response.text()
        setContent(text)
      } catch (error) {
        console.error('Error fetching markdown:', error)
      }
    }
    fetchContent()
  }, [url])

  return (
    <div className={className}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
