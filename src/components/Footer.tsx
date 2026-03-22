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
        <p style={{ margin: 0, opacity: 0.85 }}>
          © {new Date().getFullYear()} SilverSalt
        </p>
        {links.length > 0 ? (
          <div className="site-footer__social">
            {links.map((link, i) => (
              <a key={`${link.url}-${i}`} href={link.url!} rel="noopener noreferrer">
                {link.label || link.url}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  )
}
