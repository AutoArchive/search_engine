'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import meta from 'public/meta.json'
import { LabelWithCount } from '@/components/discover/LabelWithCount'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function FileSearch() {
  const router = useRouter()
  const { yearCount, tagCount, regionCount } = meta
  const [showAllTags, setShowAllTags] = useState(false)

  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1])
  const sortedYears = Object.entries(yearCount).sort((a, b) => a[0].localeCompare(b[0]))
  const sortedRegions = Object.entries(regionCount).sort((a, b) => b[1] - a[1])

  const visibleTags = sortedTags.filter(([tag, count]) => count >= 30)
  const hiddenTags = sortedTags.filter(([tag, count]) => count < 30)

  const currentYear = new Date().getFullYear()
  const yearData = sortedYears
    .filter(([year]) => year !== '未知' && parseInt(year) <= currentYear)
    .map(([year, count]) => ({ year, count }))

  const handleTagClick = (tag: string) => {
    const searchParams = new URLSearchParams({
      term: '',
      domain: '',
      tag: tag,
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  const handleRegionClick = (region: string) => {
    const searchParams = new URLSearchParams({
      term: '',
      domain: '',
      tag: '',
      region: region,
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="w-full">
        <h2 className="mb-4 text-2xl font-bold">Years</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full">
          <h2 className="mb-4 text-2xl font-bold">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {visibleTags.map(([tag, count]) => (
              <LabelWithCount
                key={tag}
                label={tag}
                count={count}
                onClick={() => handleTagClick(tag)}
              />
            ))}
            {showAllTags &&
              hiddenTags.map(([tag, count]) => (
                <LabelWithCount
                  key={tag}
                  label={tag}
                  count={count}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
          </div>
          {hiddenTags.length > 0 && (
            <button onClick={() => setShowAllTags(!showAllTags)} className="mt-4 text-blue-500">
              {showAllTags ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        <div className="w-full">
          <h2 className="mb-4 text-2xl font-bold">Regions</h2>
          <div className="flex flex-wrap gap-2">
            {sortedRegions.map(([region, count]) => (
              <LabelWithCount
                key={region}
                label={region}
                count={count}
                onClick={() => handleRegionClick(region)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
