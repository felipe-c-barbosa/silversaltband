import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

type AgendaData = {
  events: {
    nodes: Array<{
      title?: string | null
      datetime?: string | null
      venueName?: string | null
      city?: string | null
      ticketUrl?: string | null
      featured?: boolean | null
    }>
  }
}

const AgendaPage: React.FC<PageProps<AgendaData>> = ({ data }) => {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const upcoming = data.events.nodes.filter(
    (e) => e.datetime && new Date(e.datetime) >= startOfToday
  )
  const past = data.events.nodes.filter(
    (e) => e.datetime && new Date(e.datetime) < startOfToday
  )

  return (
    <Layout>
      <h1>Agenda</h1>
      <p className="lead" style={{ maxWidth: '40rem' }}>
        Shows e apresentações. Links de ingressos quando disponíveis.
      </p>

      <section className="section">
        <div className="section__head">
          <h2>Próximos</h2>
        </div>
        {upcoming.length === 0 ? (
          <p className="empty-state">Nenhum show futuro cadastrado ainda.</p>
        ) : (
          <ul className="event-list">
            {upcoming.map((e, i) => (
              <li
                key={`${e.title}-${e.datetime}-${i}`}
                className={`event-item${e.featured ? ' event-item--featured' : ''}`}
              >
                <div className="event-item__date">
                  {e.datetime
                    ? new Date(e.datetime).toLocaleDateString('pt-BR', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : null}
                </div>
                <div>
                  <h3 className="event-item__title">{e.title}</h3>
                  <p className="event-item__meta">
                    {[e.venueName, e.city].filter(Boolean).join(' · ')}
                  </p>
                </div>
                {e.ticketUrl ? (
                  <a className="btn btn--ghost" href={e.ticketUrl} rel="noopener noreferrer">
                    Ingressos
                  </a>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {past.length > 0 ? (
        <section className="section">
          <div className="section__head">
            <h2>Anteriores</h2>
          </div>
          <ul className="event-list">
            {past
              .slice()
              .reverse()
              .map((e, i) => (
                <li key={`past-${e.title}-${e.datetime}-${i}`} className="event-item">
                  <div className="event-item__date">
                    {e.datetime
                      ? new Date(e.datetime).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : null}
                  </div>
                  <div>
                    <h3 className="event-item__title">{e.title}</h3>
                    <p className="event-item__meta">
                      {[e.venueName, e.city].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ) : null}
    </Layout>
  )
}

export default AgendaPage

export const Head: HeadFC = () => (
  <Seo title="Agenda" pathname="/agenda/" description="Shows e datas da SilverSalt." />
)

export const query = graphql`
  query AgendaQuery {
    events: allSanityEvent(sort: { datetime: ASC }) {
      nodes {
        title
        datetime
        venueName
        city
        ticketUrl
        featured
      }
    }
  }
`
