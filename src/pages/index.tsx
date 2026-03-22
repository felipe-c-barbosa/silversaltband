import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { AudioEmbed } from '../components/AudioEmbed'
import { InstagramSection } from '../components/InstagramSection'

type HomeData = {
  settings: {
    nodes: Array<{
      heroTitle?: string | null
      heroSupportText?: string | null
      logo?: {
        alt?: string | null
        asset?: { url?: string | null } | null
      } | null
      musicProvider?: string | null
      musicShareUrl?: string | null
      instagramIntro?: string | null
      instagramPostUrls?: (string | null)[] | null
    }>
  }
  upcoming: {
    nodes: Array<{
      title?: string | null
      datetime?: string | null
      city?: string | null
      venueName?: string | null
      ticketUrl?: string | null
    }>
  }
}

const IndexPage: React.FC<PageProps<HomeData>> = ({ data }) => {
  const s = data.settings.nodes[0]
  const heroTitle = s?.heroTitle || 'SilverSalt'
  const heroText = s?.heroSupportText
  const logoUrl = s?.logo?.asset?.url
  const logoAlt = s?.logo?.alt || 'SilverSalt'

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const nextShows = data.upcoming.nodes.filter(
    (e) => e.datetime && new Date(e.datetime) >= startOfToday
  )
  const nextShow = nextShows[0]

  return (
    <Layout>
      <section className="hero-home">
        <div className="hero-home__logo">
          {logoUrl ? (
            <img src={logoUrl} alt={logoAlt} width={400} height={400} />
          ) : (
            <div
              aria-hidden
              style={{
                aspectRatio: '1',
                background: 'linear-gradient(145deg, #64d74244, #13141b)',
                border: '3px solid #64d742',
              }}
            />
          )}
        </div>
        <div className="hero-home__text">
          <h1>{heroTitle}</h1>
          {heroText ? (
            <p className="lead">{heroText}</p>
          ) : (
            <p className="lead">
              Rock com cara de cartaz — som cru, alto contraste e muito groove.
            </p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Link className="btn" to="/agenda/">
              Ver agenda
            </Link>
            <Link className="btn btn--ghost" to="/contato/">
              Contato / booking
            </Link>
            <Link className="btn btn--ghost" to="/blog/">
              Blog
            </Link>
          </div>
        </div>
      </section>

      {nextShow ? (
        <section className="section" aria-label="Próximo show">
          <div className="section__head">
            <h2>Próximo show</h2>
            <Link className="btn btn--ghost" to="/agenda/">
              Agenda completa
            </Link>
          </div>
          <article className="event-item event-item--featured">
            <div className="event-item__date">
              {nextShow.datetime
                ? new Date(nextShow.datetime).toLocaleDateString('pt-BR', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                  })
                : null}
            </div>
            <div>
              <h3 className="event-item__title">{nextShow.title}</h3>
              <p className="event-item__meta">
                {[nextShow.venueName, nextShow.city].filter(Boolean).join(' · ')}
              </p>
            </div>
            {nextShow.ticketUrl ? (
              <a className="btn" href={nextShow.ticketUrl} rel="noopener noreferrer">
                Ingressos
              </a>
            ) : null}
          </article>
        </section>
      ) : null}

      <AudioEmbed provider={s?.musicProvider} shareUrl={s?.musicShareUrl} />

      <InstagramSection intro={s?.instagramIntro} urls={s?.instagramPostUrls} />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC<HomeData> = ({ data }) => {
  const text = data.settings.nodes[0]?.heroSupportText || undefined
  return <Seo pathname="/" description={text} />
}

export const query = graphql`
  query HomeQuery {
    settings: allSanitySiteSettings(limit: 1) {
      nodes {
        heroTitle
        heroSupportText
        logo {
          alt
          asset {
            url
          }
        }
        musicProvider
        musicShareUrl
        instagramIntro
        instagramPostUrls
      }
    }
    upcoming: allSanityEvent(sort: { datetime: ASC }, limit: 24) {
      nodes {
        title
        datetime
        city
        venueName
        ticketUrl
      }
    }
  }
`
