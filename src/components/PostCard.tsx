import * as React from 'react'
import { Link } from 'gatsby'

export type PostCardData = {
  slug: { current?: string | null } | null
  title?: string | null
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: {
    asset?: { url?: string | null } | null
  } | null
}

export function PostCard({ post }: { post: PostCardData }) {
  const slug = post.slug?.current
  if (!slug) return null

  const coverSrc = post.coverImage?.asset?.url

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
    : null

  return (
    <li className="card">
      <Link className="card__link" to={`/blog/${slug}/`}>
        <div className="card__media">
          {coverSrc ? (
            <img src={coverSrc} alt={post.title || 'Post da SilverSalt'} loading="lazy" />
          ) : (
            <div className="card__media-fallback" aria-hidden />
          )}
          <span className="card__media-overlay" aria-hidden />
        </div>
        <div className="card__body">
          {date ? <p className="card__meta">{date}</p> : null}
          <h3 className="card__title">{post.title}</h3>
          {post.excerpt ? <p className="card__excerpt">{post.excerpt}</p> : null}
          <span className="card__cta">Ler mais</span>
        </div>
      </Link>
    </li>
  )
}
