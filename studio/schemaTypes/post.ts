import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post do blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo (card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          lists: [
            { title: 'Marcadores', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Texto alternativo' }],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO — título',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO — descrição',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', publishedAt: 'publishedAt' },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        media,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString('pt-BR')
          : '',
      }
    },
  },
})
