import * as React from 'react'
import type { HeadFC } from 'gatsby'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

const NotFoundPage: React.FC = () => (
  <Layout>
    <h1>Página não encontrada</h1>
    <p>O link pode estar quebrado ou a página foi removida.</p>
    <Link className="btn" to="/">
      Voltar ao início
    </Link>
  </Layout>
)

export default NotFoundPage

export const Head: HeadFC = () => <Seo title="404" pathname="/404/" noIndex />
