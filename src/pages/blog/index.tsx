import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Layout } from '../../components/Layout'
import { Seo } from '../../components/Seo'
import { PostCard, type PostCardData } from '../../components/PostCard'

type BlogIndexData = {
  posts: {
    nodes: PostCardData[]
  }
}

const BlogIndexPage: React.FC<PageProps<BlogIndexData>> = ({ data }) => {
  const posts = data.posts.nodes

  return (
    <Layout>
      <section className="page-hero page-hero--blog">
        <div className="page-hero__copy">
          <h1>Blog</h1>
        </div>
        <div className="page-hero__art" aria-hidden>
          <span className="page-hero__bar page-hero__bar--mid" />
          <span className="page-hero__bar page-hero__bar--tall" />
          <span className="page-hero__bar page-hero__bar--small" />
          <span className="page-hero__line" />
        </div>
      </section>
      {posts.length === 0 ? (
        <p className="empty-state">Nenhum post publicado ainda. Crie conteúdo no Sanity.</p>
      ) : (
        <ul className="card-grid card-grid--posts">
          {posts.map((post) => (
            <PostCard key={post.slug?.current || post.title} post={post} />
          ))}
        </ul>
      )}
    </Layout>
  )
}

export default BlogIndexPage

export const Head: HeadFC = () => (
  <Seo title="Blog" pathname="/blog/" description="Posts e novidades da SilverSalt." />
)

export const query = graphql`
  query BlogIndexQuery {
    posts: allSanityPost(sort: { publishedAt: DESC }) {
      nodes {
        title
        slug {
          current
        }
        excerpt
        publishedAt
        coverImage {
          asset {
            url
          }
        }
      }
    }
  }
`
