import imageUrlBuilder from '@sanity/image-url'

const projectId =
  process.env.GATSBY_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || ''
const dataset =
  process.env.GATSBY_SANITY_DATASET || process.env.SANITY_DATASET || 'production'

const builder =
  projectId && projectId !== 'yourProjectId'
    ? imageUrlBuilder({ projectId, dataset })
    : null

/** Referência de imagem Sanity (ex.: bloco de imagem no Portable Text ou campo image). */
type SanityImageRef = {
  asset?: { _ref?: string | null; _id?: string | null } | null
} | null

export function sanityImageUrl(source: SanityImageRef | undefined, width?: number): string | undefined {
  if (!builder || !source?.asset) return undefined
  const ref = source.asset._ref || source.asset._id
  if (!ref) return undefined
  let img = builder.image({ _ref: ref })
  if (width) img = img.width(width)
  return img.auto('format').url()
}
