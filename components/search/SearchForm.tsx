import React, { useState } from 'react'
import { SearchParams } from '@/components/search/SearchResult'
import projectsData from '@/data/projectsData'

type ContentType = 'article' | 'post' | 'page' | 'resource' | 'document' | 'news' | 'webpage' | 'comic' | 'novel'

const CONTENT_TYPES: { label: string; value: ContentType }[] = [
  { label: '全部', value: 'resource' },
  { label: '小说', value: 'novel' },
  { label: '文档', value: 'document' },
  { label: '新闻', value: 'news' },
  { label: '网页', value: 'webpage' },
  { label: '漫画', value: 'comic' },
]

const DOMAIN_OPTIONS = projectsData.map((project) => ({
  name: project.title,
  value: new URL(project.href || '').host,
  type: project.type,
  is_restricted: project.is_restricted,
}))

const ALL_DOMAINS = DOMAIN_OPTIONS.map((option) => option.value)

interface SearchFormProps {
  onSearch: (params: SearchParams) => void
  isSearching: boolean
  initialValues: SearchParams
}

export default function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [includeRestricted, setIncludeRestricted] = useState(true)
  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    DOMAIN_OPTIONS.filter(
      (option) => option.type === 'resource' && (includeRestricted || !option.is_restricted)
    ).map((option) => option.value)
  )
  const [activeType, setActiveType] = useState<ContentType>('resource')
  const [tag, setTag] = useState('')
  const [year, setYear] = useState('')
  const [region, setRegion] = useState('')

  const handleTypeChange = (type: ContentType) => {
    setActiveType(type)
    const suggestedDomains = DOMAIN_OPTIONS.filter(
      (option) => option.type === type && (includeRestricted || !option.is_restricted)
    ).map((option) => option.value)
    setSelectedDomains(suggestedDomains)
  }

  const handleRestrictedChange = (checked: boolean) => {
    setIncludeRestricted(checked)
    if (!checked) {
      setSelectedDomains((prev) =>
        prev.filter((domain) => {
          const option = DOMAIN_OPTIONS.find((opt) => opt.value === domain)
          return option && !option.is_restricted
        })
      )
    }
  }

  const handleDomainChange = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      query: searchQuery,
      domain: selectedDomains.length ? selectedDomains.join(',') : undefined,
      tag: tag || undefined,
      year: year || undefined,
      region: region || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-4">
      {/* Type Tabs and Restricted Checkbox */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700 overflow-x-auto">
          {CONTENT_TYPES.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleTypeChange(value)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeType === value
                ? 'bg-white text-blue-600 shadow dark:bg-gray-800 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeRestricted}
            onChange={(e) => handleRestrictedChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 
              focus:ring-blue-500 dark:border-gray-600"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            包含限制级内容
          </span>
        </label>
      </div>

      {/* Search Input and Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow rounded-md border border-gray-300 bg-white 
            p-3 text-base text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            disabled:cursor-not-allowed disabled:opacity-60
            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
            dark:placeholder-gray-400 dark:focus:ring-blue-400"
          placeholder="请输入搜索关键词"
          disabled={isSearching}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex-1 sm:flex-none rounded-md bg-gray-100 px-4 py-3 text-sm
              text-gray-700 hover:bg-gray-200 dark:bg-gray-700
              dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {showAdvanced ? '隐藏筛选' : '显示筛选'}
          </button>
          <button
            type="submit"
            disabled={isSearching}
            className="flex-1 sm:flex-none rounded-md bg-blue-600 px-6 py-3 
              text-base font-medium text-white transition-colors
              duration-200 hover:bg-blue-700 disabled:cursor-not-allowed
              disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSearching ? '搜索中...' : '搜索'}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="archives"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              归档：
            </label>
            <div className="flex flex-wrap gap-3">
              {DOMAIN_OPTIONS.filter(
                (option) => includeRestricted || !option.is_restricted
              ).map(({ name, value, type }) => (
                <label key={value} className="flex items-center gap-2" htmlFor={`domain-${value}`}>
                  <input
                    id={`domain-${value}`}
                    type="checkbox"
                    checked={selectedDomains.includes(value)}
                    onChange={() => handleDomainChange(value)}
                    className="rounded border-gray-300 text-blue-600 
                      focus:ring-blue-500 dark:border-gray-600"
                  />
                  <span className={`text-sm ${type === activeType ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                    }`}>
                    {name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="tag" className="text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[3rem]">
                标签：
              </label>
              <input
                id="tag"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 p-1.5 text-sm
                  dark:border-gray-600 dark:bg-gray-700"
                placeholder="标签"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="year" className="text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[3rem]">
                年份：
              </label>
              <input
                id="year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 p-1.5 text-sm
                  dark:border-gray-600 dark:bg-gray-700"
                placeholder="2024"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="region"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[3rem]"
              >
                地区：
              </label>
              <input
                id="region"
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 p-1.5 text-sm
                  dark:border-gray-600 dark:bg-gray-700"
                placeholder="地区"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
