import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PortableTextContent } from '../components/PortableTextContent'

type BlogPostContext = {
  slug: string
}

type BlogPostData = {
  sanityPost: {
    title?: string | null
    publishedAt?: string | null
    excerpt?: string | null
    seoTitle?: string | null
    seoDescription?: string | null
    coverImage?: {
      asset?: { url?: string | null } | null
    } | null
    _rawBody?: unknown
    slug?: { current?: string | null } | null
  } | null
}

const BlogPostTemplate: React.FC<PageProps<BlogPostData, BlogPostContext>> = ({
  data,
}) => {
  const post = data.sanityPost
  if (!post) {
    return (
      <Layout>
        <h1>Post não encontrado</h1>
        <p>
          <Link to="/blog/">Voltar ao blog</Link>
        </p>
      </Layout>
    )
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null

  const cover = post.coverImage?.asset?.url

  return (
    <Layout>
      <article className="article">
        <p style={{ marginBottom: '0.5rem' }}>
          <Link to="/blog/">← Blog</Link>
        </p>
        {date ? <p className="card__meta">{date}</p> : null}
        <h1>{post.title}</h1>
        {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
        {cover ? (
          <div className="article__cover">
            <img src={cover} alt={post.title || 'Post da SilverSalt'} loading="lazy" />
          </div>
        ) : null}
        <PortableTextContent value={post._rawBody as never} />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head: HeadFC<BlogPostData> = ({ data }) => {
  const post = data.sanityPost
  const title = post?.seoTitle || post?.title || 'Blog'
  const description = post?.seoDescription || post?.excerpt || undefined
  const slug = post?.slug?.current
  const pathname = slug ? `/blog/${slug}/` : '/blog/'
  const image = post?.coverImage?.asset?.url || undefined
  return <Seo title={title} description={description} pathname={pathname} image={image} />
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      title
      publishedAt
      excerpt
      seoTitle
      seoDescription
      slug {
        current
      }
      coverImage {
        asset {
          url
        }
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`
