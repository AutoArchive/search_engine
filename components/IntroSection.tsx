import { FiInfo, FiSearch, FiUsers } from 'react-icons/fi'

const IntroSection = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
                <FiInfo className="h-6 w-6 text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">关于我们</h2>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    『多元寻迹』 是一个聚焦跨性别、非二元、变装（CDTS）、性转、伪娘等多元性别表达与文化的专业搜索与内容导航平台。
                </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid gap-6 md:grid-cols-2">
                <div className="flex">
                    <div className="mr-4 flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                            <FiSearch className="h-6 w-6" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">专业搜索与导航</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            我们致力于通过先进的数据检索技术与AI辅助导航，帮助用户快速准确地找到高质量且真实可信的相关资源。
                        </p>
                    </div>
                </div>
                
                <div className="flex">
                    <div className="mr-4 flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                            <FiUsers className="h-6 w-6" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">长期存档与索引</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            通过长期存档与索引，『多元寻迹』保护那些易被忽略的多元文化表达与故事，让每个独特的灵魂都被温柔地看见与记录。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default IntroSection 