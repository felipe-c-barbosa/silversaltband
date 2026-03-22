import * as React from 'react'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

type SeoProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  noIndex?: boolean
  children?: React.ReactNode
}

export function Seo({
  title,
  description,
  pathname = '',
  image,
  noIndex,
  children,
}: SeoProps) {
  const site = useSiteMetadata()
  const pageTitle = title ? `${title} · ${site.title}` : site.title
  const metaDescription = description || site.description
  const canonical = `${site.siteUrl.replace(/\/$/, '')}${pathname}`
  const ogImage =
    image ||
    (site.defaultOgImage?.startsWith('http')
      ? site.defaultOgImage
      : `${site.siteUrl.replace(/\/$/, '')}${site.defaultOgImage || '/icons/icon-512x512.png'}`)

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </>
  )
}
