import type { GatsbySSR } from 'gatsby'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: 'pt-BR' })
  setHeadComponents([
    <link key="gfonts" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gfonts-static"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="gfonts-css"
      href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap"
      rel="stylesheet"
    />,
  ])
}
