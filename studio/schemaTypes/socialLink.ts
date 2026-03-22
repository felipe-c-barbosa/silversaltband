import {defineField, defineType} from 'sanity'

/** Tipo nomeado exigido pelo deploy GraphQL do Sanity (sem objetos anônimos). */
export const socialLink = defineType({
  name: 'socialLink',
  title: 'Link social',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', title: 'Rótulo'}),
    defineField({name: 'url', type: 'url', title: 'URL'}),
  ],
})
