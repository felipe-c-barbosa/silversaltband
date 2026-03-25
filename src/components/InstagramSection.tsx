import * as React from 'react'

type InstagramSectionProps = {
  intro?: string | null
  urls?: (string | null | undefined)[] | null
}

function normalizeInstagramUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('instagram.com')) return null
    if (!u.pathname || u.pathname === '/') return null
    u.search = ''
    u.hash = ''
    return `${u.toString().replace(/\/$/, '')}/`
  } catch {
    return null
  }
}

export function InstagramSection({ intro, urls }: InstagramSectionProps) {
  const list = (urls ?? []).map((u) => (u ? normalizeInstagramUrl(u) : null)).filter(Boolean) as string[]

  React.useEffect(() => {
    if (list.length === 0) return
    const existing = document.querySelector('script[data-instagram-embed]')
    if (existing) {
      const w = window as unknown as { instgrm?: { Embeds: { process: () => void } } }
      w.instgrm?.Embeds?.process()
      return
    }
    const s = document.createElement('script')
    s.src = 'https://www.instagram.com/embed.js'
    s.async = true
    s.dataset.instagramEmbed = 'true'
    document.body.appendChild(s)
  }, [list])

  if (list.length === 0) return null

  return (
    <section className="section" aria-label="Instagram">
      <div className="section__head">
        <div className="section__title-group">
          <p className="section__eyebrow">Social</p>
          <h2>Instagram</h2>
        </div>
      </div>
      {intro ? <p className="lead">{intro}</p> : null}
      <div className="section__frame">
        <div className="instagram-grid">
          {list.map((href) => (
            <blockquote
              key={href}
              className="instagram-media instagram-card"
              data-instgrm-permalink={href}
              data-instgrm-version="14"
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                Ver no Instagram
              </a>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
