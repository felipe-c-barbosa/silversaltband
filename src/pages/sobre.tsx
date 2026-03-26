import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PortableTextContent } from '../components/PortableTextContent'

const ROLE_LABELS: Record<string, string> = {
  vocalista: 'Vocalista',
  guitarraBase: 'Guitarra base',
  guitarraSolo: 'Guitarra solo',
  baixo: 'Baixo',
  bateria: 'Bateria',
}

type SobreData = {
  about: {
    nodes: Array<{
      title?: string | null
      _rawIntro?: unknown
      bandPhoto?: {
        asset?: { url?: string | null } | null
      } | null
    }>
  }
  members: {
    nodes: Array<{
      name?: string | null
      role?: string | null
      bio?: string | null
      sortOrder?: number | null
      photo?: {
        asset?: { url?: string | null } | null
      } | null
    }>
  }
}

const SobrePage: React.FC<PageProps<SobreData>> = ({ data }) => {
  const page = data.about.nodes[0]
  const title = page?.title || 'Sobre a banda'
  const bandPhotoUrl = page?.bandPhoto?.asset?.url

  const members = [...data.members.nodes].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  )

  return (
    <Layout>
      <section className="page-hero page-hero--about">
        <div className="page-hero__copy">
          <h1>{title}</h1>
        </div>
        <div className="page-hero__art" aria-hidden>
          <span className="page-hero__bar page-hero__bar--small" />
          <span className="page-hero__bar page-hero__bar--mid" />
          <span className="page-hero__bar page-hero__bar--tall" />
          <span className="page-hero__line" />
        </div>
      </section>
      {bandPhotoUrl ? (
        <div className="about-band__photo-wrap">
          <img className="about-band__photo" src={bandPhotoUrl} alt="SilverSalt" loading="lazy" />
        </div>
      ) : null}
      <div className="about-band__story prose-block">
        <PortableTextContent value={page?._rawIntro as never} />
      </div>

      <section className="section section--members">
        <div className="section__head">
          <div className="section__title-group">
            <p className="section__eyebrow">Lineup</p>
            <h2>Integrantes</h2>
          </div>
        </div>
        {members.length === 0 ? (
          <p className="empty-state">
            Cadastre os cinco integrantes no Sanity (vocalista, guitarras, baixo e bateria).
          </p>
        ) : (
          <div className="member-grid">
            {members.map((m, i) => {
              const photo = m.photo?.asset?.url
              const roleKey = m.role || ''
              return (
                <article key={`${m.name}-${i}`} className="member-card">
                  <div className="member-card__photo-wrap">
                    {photo ? (
                      <img
                        className="member-card__photo"
                        src={photo}
                        alt={m.name || 'Integrante da SilverSalt'}
                        loading="lazy"
                      />
                    ) : (
                      <div className="member-card__photo member-card__photo--fallback" aria-hidden />
                    )}
                  </div>
                  <div className="member-card__body">
                    <p className="member-card__role">{ROLE_LABELS[roleKey] || roleKey}</p>
                    <h3 className="member-card__name">{m.name}</h3>
                    {m.bio ? <p className="member-card__bio">{m.bio}</p> : null}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default SobrePage

export const Head: HeadFC<SobreData> = () => (
  <Seo title="Sobre" pathname="/sobre/" description="Conheça a SilverSalt e os integrantes." />
)

export const query = graphql`
  query SobreQuery {
    about: allSanityAboutPage(limit: 1) {
      nodes {
        title
        _rawIntro(resolveReferences: { maxDepth: 5 })
        bandPhoto {
          asset {
            url
          }
        }
      }
    }
    members: allSanityMember(sort: { sortOrder: ASC }) {
      nodes {
        name
        role
        bio
        sortOrder
        photo {
          asset {
            url
          }
        }
      }
    }
  }
`
