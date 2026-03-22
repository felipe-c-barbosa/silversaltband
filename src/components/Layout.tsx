import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Header } from './Header'
import { Footer, type SocialLink } from './Footer'

type LayoutProps = {
  children: React.ReactNode
  /** Sobrescreve links do rodapé vindos do Sanity */
  socialOverride?: SocialLink[] | null
}

export function Layout({ children, socialOverride }: LayoutProps) {
  const data = useStaticQuery<{
    allSanitySiteSettings: { nodes: Array<{ socialLinks?: SocialLink[] | null }> }
  }>(graphql`
    query LayoutSocial {
      allSanitySiteSettings(limit: 1) {
        nodes {
          socialLinks {
            label
            url
          }
        }
      }
    }
  `)

  const fromCms = data.allSanitySiteSettings.nodes[0]?.socialLinks
  const socialLinks = socialOverride ?? fromCms

  return (
    <div className="site-wrap">
      <Header />
      <main className="site-main">{children}</main>
      <Footer socialLinks={socialLinks} />
    </div>
  )
}
