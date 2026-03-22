import type { GatsbyNode } from 'gatsby'
import path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const result = await graphql<{
    allSanityPost: {
      nodes: Array<{ slug: { current: string | null } | null }>
    }
  }>(`
    query BlogPostsForPages {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `Erro ao carregar posts do Sanity para createPages`,
      result.errors
    )
    return
  }

  const posts = result.data?.allSanityPost?.nodes ?? []
  const template = path.resolve(`src/templates/blog-post.tsx`)

  posts.forEach((post) => {
    const slug = post.slug?.current
    if (!slug) return
    createPage({
      path: `/blog/${slug}/`,
      component: template,
      context: { slug },
    })
  })
}
