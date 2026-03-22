import * as React from 'react'
import { getMusicIframeSrc } from '../utils/musicEmbed'

type AudioEmbedProps = {
  provider: string | null | undefined
  shareUrl: string | null | undefined
}

export function AudioEmbed({ provider, shareUrl }: AudioEmbedProps) {
  const src = getMusicIframeSrc(provider || 'none', shareUrl)
  if (!src) return null

  const height = provider === 'soundcloud' ? 166 : 352

  return (
    <section className="section" aria-label="Player de música">
      <div className="section__head">
        <h2>Ouça</h2>
      </div>
      <div className="embed-wrap">
        <iframe
          title="Player SilverSalt"
          src={src}
          height={height}
          allow="encrypted-media; clipboard-write"
          loading="lazy"
        />
      </div>
    </section>
  )
}
