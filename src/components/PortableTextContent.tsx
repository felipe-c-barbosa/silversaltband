import * as React from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { sanityImageUrl } from '../utils/sanityImageUrl'

type Block = Record<string, unknown> | Record<string, unknown>[]

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? '#'
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a href={href} {...(isExternal ? { rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as {
        alt?: string
        asset?: { _ref?: string; url?: string }
      }
      const src = v.asset?.url || sanityImageUrl(v, 900)
      if (!src) return null
      return (
        <figure className="prose-figure">
          <img src={src} alt={v.alt || ''} loading="lazy" />
          {v.alt ? <figcaption>{v.alt}</figcaption> : null}
        </figure>
      )
    },
  },
}

type PortableTextContentProps = {
  value: Block | null | undefined
  className?: string
}

export function PortableTextContent({ value, className }: PortableTextContentProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  return (
    <div className={className ?? 'prose-block'}>
      <PortableText value={value as never} components={components} />
    </div>
  )
}
