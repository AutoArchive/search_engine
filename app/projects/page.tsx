import projectsData from '@/data/projectsData'
import navigationLinks from '@/data/navigationLinks'
import Card from '@/components/Card'
import Navigation from '@/components/Navigation'
import { genPageMetadata } from 'app/seo'
import { FiChevronDown } from 'react-icons/fi'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            中文跨性别、多元性别相关网站导航索引
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            各类网站集合，包括档案、资料、新闻网页等，覆盖跨性别、多元性别、伪娘、性转等话题，包含中国大陆、港澳台地区及海外中文社区。
          </p>
        </div>
        
        {/* Navigation Links Section */}
        <div className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl mb-6">
            跨性别与多元性别资源导航
          </h2>
          <Navigation data={navigationLinks} />
        </div> 

        {/* Archives Section Header */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl py-6">
          跨性别与多元性别相关档案馆
        </h2>
        
        {/* General Archives Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <details className="group mb-8" open>
            <summary className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 list-none">
              <div>
                <h3 className="text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  多元性别中文数字图书馆存档库
                </h3>
                <p className="text-left mt-2 text-gray-600 dark:text-gray-300">
                  包含学术论文、调研报告、手册指南、政策法规、新闻报道、个人故事、社区文档、漫画、性转小说与变身文学、影音视频等适合所有年龄段的多元性别相关内容。由 <a href="https://transchineseorg/" className="text-blue-500 hover:underline">多元性别中文数字图书馆</a> 运营。（展开查看更多）
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
          <details className="group mb-8" open>
            <summary className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 list-none">
              <div>
                <h3 className="text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  多元性别成人图书馆存档库
                </h3>
                <p className="text-left mt-2 text-gray-600 dark:text-gray-300">
                  包含成人内容的多元性别相关资料，归档整理在 <a href="https://cdtsf.com/" className="text-blue-500 hover:underline">多元性别成人图书馆</a> 社区中，由本站提供检索服务。包含成人小说， eunuch （太监或阉割）、扶她与双性、性转幻想等内容。（展开查看更多）
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
      </div>
    </>
  )
}
