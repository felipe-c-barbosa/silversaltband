import { defineField, defineType } from 'sanity'

const roles = [
  { title: 'Vocalista', value: 'vocalista' },
  { title: 'Guitarra base', value: 'guitarraBase' },
  { title: 'Guitarra solo', value: 'guitarraSolo' },
  { title: 'Baixo', value: 'baixo' },
  { title: 'Bateria', value: 'bateria' },
] as const

export const member = defineType({
  name: 'member',
  title: 'Integrante',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Função',
      type: 'string',
      options: { list: [...roles] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio curta',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ordem',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
    prepare({ title, subtitle, media }) {
      const roleLabel = roles.find((r) => r.value === subtitle)?.title
      return { title, subtitle: roleLabel, media }
    },
  },
})
