import * as React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'

const nav = [
  { to: '/', label: 'Início' },
  { to: '/sobre/', label: 'Sobre' },
  { to: '/agenda/', label: 'Agenda' },
  { to: '/blog/', label: 'Blog' },
  { to: '/contato/', label: 'Contato' },
] as const

export function Header() {
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/">
          <span className="site-logo__mark">SilverSalt</span>
          <span className="site-logo__tag">Rock alternativo para palco e estrada</span>
        </Link>
        <nav aria-label="Principal">
          <ul className="site-nav">
            {nav.map(({ to, label }) => {
              const normalized = to.replace(/\/$/, '') || '/'
              const isActive =
                normalized === '/'
                  ? pathname === '/'
                  : pathname === normalized || pathname.startsWith(`${normalized}/`)
              return (
                <li key={to}>
                  <Link to={to} aria-current={isActive ? 'page' : undefined}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
