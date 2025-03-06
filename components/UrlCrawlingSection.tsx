// UrlCrawlingSection.tsx
import { useState } from 'react'
import { cleanContent, tagContent } from './lib/aiUtils'
import { CollapsibleMarkdownSection } from './CollapsibleMarkdownSection'
import { CrawlResult, FoldStates } from './lib/types'
import { crawlUrl } from './lib/crawl'

export default function UrlCrawlingSection() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [crawlResults, setCrawlResults] = useState<CrawlResult | null>(null)
  const [cleanedContent, setCleanedContent] = useState('')
  const [taggedContent, setTaggedContent] = useState('')
  const [foldStates, setFoldStates] = useState<FoldStates>({
    crawlResults: false,
    cleanedContent: false,
    taggedContent: false,
  })

  const handleCrawl = async () => {
    setLoading(true)
    try {
      const result = await crawlUrl(url)
      setCrawlResults(result)
    } catch (error) {
      console.error('Crawl failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFold = (section: keyof FoldStates) => {
    setFoldStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleAIClean = async () => {
    if (!crawlResults) return

    setLoading(true)
    try {
      const cleaned = await cleanContent(crawlResults.content)
      setCleanedContent(cleaned)
    } catch (error) {
      console.error('Content cleaning failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAITag = () => {
    if (!crawlResults) return
    const tagged = tagContent(crawlResults, cleanedContent)
    setTaggedContent(tagged)
  }

  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">网站存档</h2>
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            className="flex-1 rounded border px-4 py-2"
          />
          <button
            onClick={handleCrawl}
            disabled={loading}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Crawling...' : 'Start Crawl'}
          </button>
        </div>
      </div>

      {crawlResults && (
        <CollapsibleMarkdownSection
          title="爬取结果编辑"
          content={crawlResults.content}
          isFolded={foldStates.crawlResults}
          onFoldToggle={() => toggleFold('crawlResults')}
          onContentChange={(value) => setCrawlResults({ ...crawlResults, content: value || '' })}
          info={<span>来源: {crawlResults.source}</span>}
          actions={
            <button
              onClick={handleAIClean}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              AI Clean
            </button>
          }
        />
      )}

      {cleanedContent && (
        <CollapsibleMarkdownSection
          title="AI 清理后的内容"
          content={cleanedContent}
          isFolded={foldStates.cleanedContent}
          onFoldToggle={() => toggleFold('cleanedContent')}
          onContentChange={(value) => setCleanedContent(value || '')}
          actions={
            <button
              onClick={handleAITag}
              disabled={!cleanedContent}
              className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              AI Tag
            </button>
          }
        />
      )}

      {taggedContent && (
        <CollapsibleMarkdownSection
          title="AI 标签与摘要"
          content={taggedContent}
          isFolded={foldStates.taggedContent}
          onFoldToggle={() => toggleFold('taggedContent')}
          onContentChange={(value) => setTaggedContent(value || '')}
          height={400}
        />
      )}
    </>
  )
}
