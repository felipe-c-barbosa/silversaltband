import { useStaticQuery, graphql } from 'gatsby'

export function useSiteMetadata() {
  const data = useStaticQuery<{
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
        defaultOgImage?: string
      }
    }
  }>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          defaultOgImage
        }
      }
    }
  `)
  return data.site.siteMetadata
}
