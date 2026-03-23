import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'seqw2iwb',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * @see https://www.sanity.io/docs/studio/latest-version-of-sanity
     */
    appId: 'dz4cnlin2zooakbzp7l8zf2b',
    autoUpdates: true,
  },
})
