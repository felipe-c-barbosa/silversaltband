import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PortableTextContent } from '../components/PortableTextContent'

type ContatoData = {
  contact: {
    nodes: Array<{
      title?: string | null
      _rawIntro?: unknown
      bookingEmail?: string | null
    }>
  }
}

const ContatoPage: React.FC<PageProps<ContatoData>> = ({ data }) => {
  const page = data.contact.nodes[0]
  const title = page?.title || 'Contato'
  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (q.get('submitted') === '1') setSubmitted(true)
  }, [])

  return (
    <Layout>
      <section className="page-hero page-hero--contact">
        <div className="page-hero__copy">
          <h1>{title}</h1>
        </div>
        <div className="page-hero__art" aria-hidden>
          <span className="page-hero__bar page-hero__bar--tall" />
          <span className="page-hero__bar page-hero__bar--small" />
          <span className="page-hero__bar page-hero__bar--mid" />
          <span className="page-hero__line" />
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-copy">
          <div className="contact-panel prose-block">
            <PortableTextContent value={page?._rawIntro as never} />
          </div>

          {page?.bookingEmail ? (
            <div className="contact-booking">
              <p className="contact-booking__label">Booking</p>
              <a className="contact-booking__link" href={`mailto:${page.bookingEmail}`}>
                {page.bookingEmail}
              </a>
            </div>
          ) : null}

          {submitted ? (
            <p role="status" className="contact-status">
              Mensagem enviada. Obrigado! Entraremos em contato em breve.
            </p>
          ) : null}
        </div>

        <section className="contact-form-panel">
          <div className="section__head">
            <div className="section__title-group">
              <p className="section__eyebrow">Mensagem direta</p>
              <h2>Envie uma mensagem</h2>
            </div>
          </div>
          <form
            className="form-grid contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/contato/?submitted=1"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="form-honeypot" aria-hidden>
              <label>
                Não preencha:
                <input name="bot-field" />
              </label>
            </p>
            <label>
              Nome
              <input name="name" type="text" required autoComplete="name" />
            </label>
            <label>
              E-mail
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Mensagem
              <textarea name="message" required />
            </label>
            <div className="form-actions">
              <button type="submit" className="btn">
                Enviar
              </button>
            </div>
          </form>
        </section>
      </section>
    </Layout>
  )
}

export default ContatoPage

export const Head: HeadFC = () => (
  <Seo title="Contato" pathname="/contato/" description="Fale com a SilverSalt — booking e imprensa." />
)

export const query = graphql`
  query ContatoQuery {
    contact: allSanityContactPage(limit: 1) {
      nodes {
        title
        _rawIntro(resolveReferences: { maxDepth: 5 })
        bookingEmail
      }
    }
  }
`
