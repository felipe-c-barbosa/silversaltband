import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Show / evento',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'datetime',
      title: 'Data e hora',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venueName',
      title: 'Local / venue',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Cidade',
      type: 'string',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Link de ingressos',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', datetime: 'datetime', city: 'city' },
    prepare({ title, datetime, city }) {
      const d = datetime ? new Date(datetime).toLocaleDateString('pt-BR') : ''
      return { title, subtitle: [d, city].filter(Boolean).join(' · ') }
    },
  },
})
