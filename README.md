# SilverSalt — site (Gatsby + Sanity + Netlify)

Site estático da banda **SilverSalt**: conteúdo no **Sanity**, build com **Gatsby** e deploy na **Netlify**.

## Pré-requisitos

- Node.js 18+
- Conta [Sanity](https://www.sanity.io/) (projeto + dataset, ex.: `production`)

## 1. Sanity Studio

Este repositório já inclui o Content Studio em **`studio/`** (schemas, desk e Sanity v5). Use **somente** essa pasta para `npm install` e `npm run dev`.

**Importante:** não execute `npm create sanity@latest` **dentro** de `studio/` se a pasta já existir com conteúdo — o comando cria uma **subpasta** nova (ex.: `studio/nome-do-projeto/`) e duplica o Studio. Para um projeto novo do zero, rode o create na pasta **pai** onde o Studio deve ficar, ou use `sanity init` e copie os schemas deste repo.

```bash
cd studio
cp .env.example .env
# Opcional: SANITY_STUDIO_PROJECT_ID e SANITY_STUDIO_DATASET (já há fallback seqw2iwb / production no código)

npm install
npm run dev
```

**GraphQL (necessário para o build Gatsby / Netlify):** após `sanity login`, na pasta `studio/`:

```bash
npm run deploy-graphql
```

No Studio, crie os documentos singleton pelo menu lateral:

- **Configurações do site** (`siteSettings`) — hero, logo, player (Spotify/SoundCloud), URLs do Instagram, redes.
- **Página Sobre** — texto introdutório e foto opcional.
- **Página Contato** — textos e e-mail de booking.

Adicione integrantes (`member`), eventos (`event`) e posts (`post`).

> Se ainda não tiver projeto no Sanity.io, crie um em [sanity.io/manage](https://www.sanity.io/manage) e aponte o ID no `.env` / fallbacks, ou use `sanity init` numa pasta vazia e migre os arquivos de `studio/schemaTypes` e `deskStructure.ts` deste repositório.

## 2. Gatsby (site)

Na raiz do repositório:

```bash
cp .env.example .env
```

Preencha:

- `GATSBY_SANITY_PROJECT_ID` — mesmo ID do projeto Sanity.
- `GATSBY_SANITY_DATASET` — ex.: `production`.
- `SANITY_READ_TOKEN` — opcional em dataset público; útil para rascunhos com `overlayDrafts`.

```bash
npm install
npm run develop
```

Build de produção:

```bash
npm run build
```

## 3. Netlify

1. Conecte o repositório e use as configurações de [netlify.toml](netlify.toml) (`npm run build`, pasta `public`).
2. Em **Site settings → Environment**, defina as mesmas variáveis do `.env` (principalmente `GATSBY_SANITY_PROJECT_ID` e `GATSBY_SANITY_DATASET`).
3. Em **Forms**, ative o processamento de formulários; o arquivo [static/forms/contact.html](static/forms/contact.html) espelha o formulário da página **Contato** para detecção no deploy.
4. No Sanity, configure um **webhook** para a URL de *Build hook* da Netlify ao publicar documentos, para rebuild automático.

## Formulário de contato

A página [src/pages/contato.tsx](src/pages/contato.tsx) usa **Netlify Forms** (`data-netlify="true"`). Após o primeiro deploy, confira em Netlify → Forms se o formulário `contact` foi detectado.

## Créditos de design

Paleta: `#13141b`, `#64d742`, `#f2f0ef`. Tipografia carregada em [gatsby-ssr.tsx](gatsby-ssr.tsx) (Barlow Condensed + Literata), com traço visual inspirado em **risografia** (grão, contraste, “misregistration” leve nos detalhes).
