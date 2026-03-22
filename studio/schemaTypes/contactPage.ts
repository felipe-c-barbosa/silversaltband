import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Página Contato (textos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da página',
      type: 'string',
      initialValue: 'Contato',
    }),
    defineField({
      name: 'intro',
      title: 'Texto acima do formulário',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bookingEmail',
      title: 'E-mail para booking (exibido)',
      type: 'string',
      description: 'Aparece na página; o formulário Netlify é independente.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Página Contato' }),
  },
})
