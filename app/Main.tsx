'use client'

import LandingPage from '@/components/LandingPage'

export default function Home({ posts }) {
  return (
    <>
      <LandingPage posts={posts} />
    </>
  )
}
