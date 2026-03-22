import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título do hero (H1)',
      type: 'string',
      initialValue: 'SilverSalt',
    }),
    defineField({
      name: 'heroSupportText',
      title: 'Texto de apoio ao H1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'logo',
      title: 'Logo da banda',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }),
      ],
    }),
    defineField({
      name: 'musicProvider',
      title: 'Player de música',
      type: 'string',
      options: {
        list: [
          { title: 'Nenhum', value: 'none' },
          { title: 'Spotify', value: 'spotify' },
          { title: 'SoundCloud', value: 'soundcloud' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'musicShareUrl',
      title: 'URL do álbum / playlist / faixa (Spotify ou SoundCloud)',
      type: 'url',
      description:
        'Cole o link normal do Spotify ou SoundCloud; o site monta o embed.',
    }),
    defineField({
      name: 'instagramIntro',
      title: 'Texto intro da área Instagram',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'instagramPostUrls',
      title: 'URLs de posts do Instagram',
      type: 'array',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Rótulo' }),
            defineField({ name: 'url', type: 'url', title: 'URL' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Configurações do site' }),
  },
})
