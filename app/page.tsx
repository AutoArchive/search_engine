import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { Suspense } from 'react'

// Loading component
const SearchLoading = () => (
  <div className="flex justify-center p-8">
    <div className="animate-pulse">Loading...</div>
  </div>
)

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  
  return (
    <Suspense fallback={<SearchLoading />}>
      <Main posts={posts} />
    </Suspense>
  )
}
