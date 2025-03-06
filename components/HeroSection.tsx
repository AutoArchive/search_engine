'use client'

import Link from 'next/link'

interface HeroSectionProps {
  totalCollections: number
  totalSize: number
  formatNumber: (num: number) => string
}

const HeroSection: React.FC<HeroSectionProps> = ({ totalCollections, totalSize, formatNumber }) => {
  return (
    <div className="relative px-6 py-16 sm:py-24 lg:px-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/static/images/background.jpg")', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-600/70 to-indigo-700/70" /> */}

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          多元性别中文数字图书馆
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-100">
          用技术保存历史，用文化点亮未来：一个致力于传承、传播跨性别与多元性别的知识与故事的中文平台。
        </p>

        {/* New Stats Section */}
        <div className="mt-8 flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-white">{totalCollections}</div>
            <div className="mt-2 text-gray-200">资料库</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white">{formatNumber(totalSize)}</div>
            <div className="mt-2 text-gray-200">资料总量</div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/search"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100"
          >
            检索资源
          </Link>
          <Link href="/about" className="text-sm font-semibold leading-6 text-white">
            了解更多 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
