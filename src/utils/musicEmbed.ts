export function toSpotifyEmbedUrl(shareUrl: string): string | null {
  try {
    const u = new URL(shareUrl)
    const host = u.hostname.replace(/^www\./, '')
    if (host !== 'open.spotify.com') return null
    const parts = u.pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null
    const [kind, id] = parts
    const allowed = ['track', 'album', 'playlist', 'artist', 'episode', 'show']
    if (!allowed.includes(kind) || !id) return null
    const cleanId = id.split('?')[0]
    return `https://open.spotify.com/embed/${kind}/${cleanId}?utm_source=generator`
  } catch {
    return null
  }
}

export function toSoundCloudEmbedUrl(shareUrl: string): string | null {
  try {
    const encoded = encodeURIComponent(shareUrl)
    return `https://w.soundcloud.com/player/?url=${encoded}&color=%2364d742&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
  } catch {
    return null
  }
}

export function getMusicIframeSrc(
  provider: 'spotify' | 'soundcloud' | 'none' | string,
  shareUrl: string | null | undefined
): string | null {
  if (!shareUrl || provider === 'none') return null
  if (provider === 'spotify') return toSpotifyEmbedUrl(shareUrl)
  if (provider === 'soundcloud') return toSoundCloudEmbedUrl(shareUrl)
  return null
}
