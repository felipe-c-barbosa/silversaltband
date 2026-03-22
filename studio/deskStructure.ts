import type { StructureResolver } from 'sanity/structure'

const singletonIds = ['siteSettings', 'aboutPage', 'contactPage'] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Configurações do site')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configurações do site')
        ),
      S.listItem()
        .title('Página Sobre')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('Página Sobre')
        ),
      S.listItem()
        .title('Página Contato')
        .id('contactPage')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Página Contato')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        if (!id) return true
        return !(singletonIds as readonly string[]).includes(id)
      }),
    ])
