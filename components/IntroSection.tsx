const IntroSection = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8 shadow-lg">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">关于多元性别</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        多元性别（Gender Diversity）是一个包容性的概念，它承认并尊重性别认同的多样性。这包括但不限于顺性别、跨性别、非二元性别、性别酷儿等多种性别表达方式。每个人对自己性别的理解和表达都是独特且值得尊重的。
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">关于跨性别</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        跨性别（Transgender）指的是性别认同与出生时指定性别不一致的人群。这可能包括跨性别女性、跨性别男性、非二元性别者等。每位跨性别者的经历都是独特的。
                    </p>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    本数字图书馆致力于收集、保存和展示与多元性别相关的中文资料，为理解和研究性别多样性提供全面的知识基础。我们希望通过知识的力量，促进社会对多元性别群体的理解与包容。
                </p>
            </div>
        </div>
    </div>
)

export default IntroSection 