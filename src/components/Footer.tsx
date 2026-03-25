import * as React from 'react'

export type SocialLink = { label?: string | null; url?: string | null }

type FooterProps = {
  socialLinks?: SocialLink[] | null
}

export function Footer({ socialLinks }: FooterProps) {
  const links = (socialLinks ?? []).filter((l) => l?.url)

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__eyebrow">SilverSalt</p>
          <div className="site-footer__marks" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="site-footer__meta">
          {links.length > 0 ? (
            <div className="site-footer__social">
              {links.map((link, i) => (
                <a key={`${link.url}-${i}`} href={link.url!} rel="noopener noreferrer">
                  {link.label || link.url}
                </a>
              ))}
            </div>
          ) : null}
          <p className="site-footer__legal">© {new Date().getFullYear()} SilverSalt</p>
        </div>
      </div>
    </footer>
  )
}
