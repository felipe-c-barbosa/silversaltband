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
      <h1>{title}</h1>
      <PortableTextContent value={page?._rawIntro as never} />

      {page?.bookingEmail ? (
        <p>
          <strong>Booking:</strong>{' '}
          <a href={`mailto:${page.bookingEmail}`}>{page.bookingEmail}</a>
        </p>
      ) : null}

      {submitted ? (
        <p role="status" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
          Mensagem enviada — obrigado! Entraremos em contato em breve.
        </p>
      ) : null}

      <section className="section" style={{ marginTop: '2rem' }}>
        <div className="section__head">
          <h2>Envie uma mensagem</h2>
        </div>
        <form
          className="form-grid"
          style={{ position: 'relative' }}
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/contato/?submitted=1"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p style={{ position: 'absolute', left: '-9999px' }} aria-hidden>
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
          <button type="submit" className="btn">
            Enviar
          </button>
        </form>
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
