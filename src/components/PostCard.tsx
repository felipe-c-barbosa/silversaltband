import * as React from 'react'
import { Link } from 'gatsby'
import { sanityImageUrl } from '../utils/sanityImageUrl'

export type PostCardData = {
  slug: { current?: string | null } | null
  title?: string | null
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: {
    alt?: string | null
    asset?: { _ref?: string | null; url?: string | null } | null
  } | null
}

export function PostCard({ post }: { post: PostCardData }) {
  const slug = post.slug?.current
  if (!slug) return null

  const coverSrc =
    post.coverImage?.asset?.url ||
    sanityImageUrl(post.coverImage as never, 800)

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
    : null

  return (
    <li className="card">
      <Link to={`/blog/${slug}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card__media">
          {coverSrc ? (
            <img src={coverSrc} alt={post.coverImage?.alt || post.title || ''} loading="lazy" />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1a1c26, #64d74233)',
              }}
              aria-hidden
            />
          )}
        </div>
        <div className="card__body">
          {date ? <p className="card__meta">{date}</p> : null}
          <h3 className="card__title">{post.title}</h3>
          {post.excerpt ? <p className="card__excerpt">{post.excerpt}</p> : null}
          <span className="btn btn--ghost" style={{ alignSelf: 'flex-start' }}>
            Ler mais
          </span>
        </div>
      </Link>
    </li>
  )
}
