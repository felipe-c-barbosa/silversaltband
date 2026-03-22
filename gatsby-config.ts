import type { GatsbyConfig } from 'gatsby'

const projectId =
  process.env.GATSBY_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  'seqw2iwb'
const dataset =
  process.env.GATSBY_SANITY_DATASET || process.env.SANITY_DATASET || 'production'

const config: GatsbyConfig = {
  trailingSlash: 'always',
  siteMetadata: {
    title: 'SilverSalt',
    description: 'SilverSalt — banda de rock',
    siteUrl: 'https://silversaltband.netlify.app',
    defaultOgImage: '/icons/icon-512x512.png',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'SilverSalt',
        short_name: 'SilverSalt',
        start_url: '/',
        background_color: '#13141b',
        theme_color: '#13141b',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId,
        dataset,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: process.env.NODE_ENV === 'development',
        overlayDrafts: !!process.env.SANITY_READ_TOKEN,
      },
    },
  ],
}

export default config
