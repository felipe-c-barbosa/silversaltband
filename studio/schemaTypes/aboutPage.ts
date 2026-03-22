import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Página Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da página',
      type: 'string',
      initialValue: 'Sobre a banda',
    }),
    defineField({
      name: 'intro',
      title: 'Introdução',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bandPhoto',
      title: 'Foto da banda (opcional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Página Sobre' }),
  },
})
