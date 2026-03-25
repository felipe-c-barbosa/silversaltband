import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { getEventDateParts } from '../utils/eventDateParts'

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
      <section className="page-hero page-hero--tour">
        <p className="page-hero__eyebrow">Ao vivo</p>
        <h1>Agenda</h1>
        <p className="page-hero__lead">
          Shows, apresentações e próximas oportunidades para ver a SilverSalt no volume certo.
        </p>
      </section>

      <section className="section">
        <div className="section__head">
          <div className="section__title-group">
            <p className="section__eyebrow">Turnê</p>
            <h2>Próximos</h2>
          </div>
        </div>
        {upcoming.length === 0 ? (
          <p className="empty-state">Nenhum show futuro cadastrado ainda.</p>
        ) : (
          <ul className="event-list">
            {upcoming.map((e, i) => {
              const date = e.datetime ? getEventDateParts(e.datetime) : null

              return (
                <li
                  key={`${e.title}-${e.datetime}-${i}`}
                  className={`event-item${e.featured ? ' event-item--featured' : ''}`}
                >
                  {date ? (
                    <div className="event-item__date">
                      {date.weekday ? <span className="event-item__weekday">{date.weekday}</span> : null}
                      <span className="event-item__day">{date.day}</span>
                      <span className="event-item__month">{date.month}</span>
                      <span className="event-item__year">{date.year}</span>
                    </div>
                  ) : null}
                  <div className="event-item__content">
                    {e.featured ? <p className="event-item__tag">Show em destaque</p> : null}
                    <h3 className="event-item__title">{e.title}</h3>
                    <p className="event-item__meta">
                      {[e.venueName, e.city].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <div className="event-item__cta">
                    {e.ticketUrl ? (
                      <a className="btn btn--ghost" href={e.ticketUrl} rel="noopener noreferrer">
                        Ingressos
                      </a>
                    ) : (
                      <span className="event-item__status">Ingressos em breve</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {past.length > 0 ? (
        <section className="section">
          <div className="section__head">
            <div className="section__title-group">
              <p className="section__eyebrow">Arquivo</p>
              <h2>Anteriores</h2>
            </div>
          </div>
          <ul className="event-list">
            {past
              .slice()
              .reverse()
              .map((e, i) => {
                const date = e.datetime ? getEventDateParts(e.datetime, false) : null

                return (
                  <li key={`past-${e.title}-${e.datetime}-${i}`} className="event-item event-item--past">
                    {date ? (
                      <div className="event-item__date">
                        <span className="event-item__day">{date.day}</span>
                        <span className="event-item__month">{date.month}</span>
                        <span className="event-item__year">{date.year}</span>
                      </div>
                    ) : null}
                    <div className="event-item__content">
                      <p className="event-item__tag">Arquivo</p>
                      <h3 className="event-item__title">{e.title}</h3>
                      <p className="event-item__meta">
                        {[e.venueName, e.city].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  </li>
                )
              })}
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
