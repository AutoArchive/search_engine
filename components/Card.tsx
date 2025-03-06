'use client'
import Image from './Image'
import Link from './Link'
import { useState } from 'react'
import RestrictedContentAlert from './RestrictedContentAlert'

interface CardProps {
  title: string
  description: string | null
  imgSrc: string | null
  href: string
  contentSize?: number
  isRestricted?: boolean
}

const Card = ({ title, description, imgSrc, href, contentSize, isRestricted = false }: CardProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleClick = (e) => {
    if (isRestricted && href) {
      e.preventDefault()
      setIsAlertOpen(true)
    }
  }

  const handleConfirm = () => {
    if (href) {
      window.location.href = href
    }
    setIsAlertOpen(false)
  }

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <RestrictedContentAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirm}
      />
      <div
        className={`${imgSrc && 'h-full'
          } relative overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick(e)
          }
        }}
        role="button"
        tabIndex={0}
      >
        {contentSize && (
          <div className="absolute right-3 top-3 z-10">
            <span className="rounded-full bg-primary-500 px-3 py-1 text-sm font-medium text-white shadow-md">
              {contentSize} 篇内容
            </span>
          </div>
        )}
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`} onClick={handleClick}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
              onClick={handleClick}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
