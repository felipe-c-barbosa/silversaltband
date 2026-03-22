import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PortableTextContent } from '../components/PortableTextContent'
import { sanityImageUrl } from '../utils/sanityImageUrl'

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
        alt?: string | null
        asset?: { url?: string | null; _ref?: string | null } | null
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
        alt?: string | null
        asset?: { url?: string | null; _ref?: string | null } | null
      } | null
    }>
  }
}

const SobrePage: React.FC<PageProps<SobreData>> = ({ data }) => {
  const page = data.about.nodes[0]
  const title = page?.title || 'Sobre a banda'
  const bandPhotoUrl =
    page?.bandPhoto?.asset?.url || sanityImageUrl(page?.bandPhoto as never, 1200)

  const members = [...data.members.nodes].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  )

  return (
    <Layout>
      <h1>{title}</h1>
      {bandPhotoUrl ? (
        <p style={{ marginBottom: '1.5rem' }}>
          <img
            className="article__cover"
            src={bandPhotoUrl}
            alt={page?.bandPhoto?.alt || 'SilverSalt'}
            loading="lazy"
            style={{ border: '3px solid rgba(100,215,66,0.4)' }}
          />
        </p>
      ) : null}
      <PortableTextContent value={page?._rawIntro as never} />

      <section className="section" style={{ marginTop: '3rem' }}>
        <div className="section__head">
          <h2>Integrantes</h2>
        </div>
        {members.length === 0 ? (
          <p className="empty-state">
            Cadastre os cinco integrantes no Sanity (vocalista, guitarras, baixo e bateria).
          </p>
        ) : (
          <div className="member-grid">
            {members.map((m, i) => {
              const photo =
                m.photo?.asset?.url || sanityImageUrl(m.photo as never, 600)
              const roleKey = m.role || ''
              return (
                <article key={`${m.name}-${i}`} className="member-card">
                  {photo ? (
                    <img
                      className="member-card__photo"
                      src={photo}
                      alt={m.photo?.alt || m.name || ''}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="member-card__photo"
                      style={{
                        background: 'linear-gradient(160deg, #1f2230, #64d74233)',
                      }}
                      aria-hidden
                    />
                  )}
                  <p className="member-card__role">{ROLE_LABELS[roleKey] || roleKey}</p>
                  <h3 className="member-card__name">{m.name}</h3>
                  {m.bio ? <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>{m.bio}</p> : null}
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
          alt
          asset {
            url
            _ref
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
          alt
          asset {
            url
            _ref
          }
        }
      }
    }
  }
`
