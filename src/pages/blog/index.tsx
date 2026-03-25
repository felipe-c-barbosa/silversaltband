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
        <p className="page-hero__eyebrow">Bastidores</p>
        <h1>Blog</h1>
        <p className="page-hero__lead">
          Novidades, ensaios, processo criativo e tudo o que acontece entre o estúdio e o palco.
        </p>
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
