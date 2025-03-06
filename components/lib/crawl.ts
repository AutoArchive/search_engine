'use client'
// lib/crawl.ts
import { CrawlResult } from './types'
import fetch from 'node-fetch'

export async function crawlUrl(url: string): Promise<CrawlResult> {
  try {
    const apiUrl = `/api/fetchurl?url=${encodeURIComponent(url)}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const content = await response.text()

    return {
      content,
      date: new Date().toLocaleDateString(),
      source: url,
    }
  } catch (error) {
    throw new Error(`Failed to crawl URL: ${error.message}`)
  }
}
