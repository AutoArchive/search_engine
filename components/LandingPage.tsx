'use client'

import Link from 'next/link'
import { FiBook, FiSearch, FiUsers, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Card from '@/components/Card'
import projectsData from '@/data/projectsData'
import HeroSection from '@/components/HeroSection'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import PostList from '@/components/PostList'
import Community from './Community'
import IntroSection from '@/components/IntroSection'

interface Project {
  title: string
  href: string
  size?: number
  is_restricted: boolean
}

const MAX_DISPLAY = 5
const projects: Project[] = projectsData as Project[]

const features = [
  {
    icon: <FiBook className="h-6 w-6" />,
    title: '丰富的收藏',
    description: '访问数万份多元性别相关的文章、资料和艺术作品',
    href: '/projects',
  },
  {
    icon: <FiSearch className="h-6 w-6" />,
    title: '高效检索',
    description: '使用强大的搜索系统快速找到所需内容',
    href: '/search',
  },
  {
    icon: <FiUsers className="h-6 w-6" />,
    title: '自动收集归档',
    description: '通过 AI 自动收集、整理和归档，欢迎社区提交',
    href: '/add',
  },
  {
    icon: <FiCalendar className="h-6 w-6" />,
    title: '分析与精选内容',
    description: '提供精选内容列表与分析',
    href: '/discover',
  },
]

export default function LandingPage({ posts }) {
  const totalCollections = projectsData.length
  const totalSize = projectsData.reduce((sum, project) => sum + (project.size || 0), 0)

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-CN').format(num)
  }

  return (
    <div className="space-y-12">
      <HeroSection
        totalCollections={totalCollections}
        totalSize={totalSize}
        formatNumber={formatNumber}
      />

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="block rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <IntroSection />

      {/* General Archives Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <details className="group mb-8">
          <summary className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 list-none">
            <div>
              <h2 className="text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                一般存档库
              </h2>
              <p className="text-left mt-2 text-gray-600 dark:text-gray-300">
                包含学术论文、调研报告、手册指南、政策法规、新闻报道、个人故事、社区文档、漫画、性转小说与变身文学、影音视频等适合所有年龄段的多元性别相关内容。（展开查看更多）
              </p>
            </div>
            <FiChevronDown className="h-6 w-6 transition-transform group-open:rotate-180" />
          </summary>
          <div className="-m-4 mt-4 flex flex-wrap">
            {projectsData
              .filter((d) => !d.is_restricted)
              .map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={null}
                  href={d.href || ''}
                  contentSize={d.size}
                  isRestricted={false}
                />
              ))}
          </div>
        </details>
      </div>

      {/* Restricted Archives Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <details className="group mb-8">
          <summary className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 list-none">
            <div>
              <h2 className="text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                限制级存档库
              </h2>
              <p className="text-left mt-2 text-gray-600 dark:text-gray-300">
                包含成人内容的多元性别相关资料，归档整理在 <Link href="https://cdtsf.com/" className="text-blue-500 hover:underline">多元性别成人图书馆</Link> 社区中，由本站提供检索服务。包含成人小说， eunuch （太监或阉割）、扶她与双性、性转幻想等内容。（展开查看更多）
              </p>
            </div>
            <FiChevronDown className="h-6 w-6 transition-transform group-open:rotate-180" />
          </summary>
          <div className="-m-4 mt-4 flex flex-wrap">
            {projectsData
              .filter((d) => d.is_restricted)
              .map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={null}
                  href={d.href || ''}
                  contentSize={d.size}
                  isRestricted={true}
                />
              ))}
          </div>
        </details>
      </div>

      {/* Latest Blogs Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              最新博客
            </h2>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <PostList posts={posts} maxDisplay={MAX_DISPLAY} />
        </div>
        {/* {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )} */}
      </div>
      <Community />


    </div>
  )
}
