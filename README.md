# Sistema de Filmes com TMDB

Aplicação React + TypeScript para explorar filmes populares, buscar títulos e montar uma lista de favoritos, consumindo a API do [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Stack

- React 19 + TypeScript + Vite
- React Router para navegação (`/`, `/search`, `/movie/:id`, `/favorites`)
- Context API + `localStorage` para estado global (favoritos e tema)
- TanStack Query (`useInfiniteQuery` / `useQueries`) para fetch e cache
- Axios para requisições HTTP
- Tailwind CSS para estilização
- Jest + React Testing Library para testes unitários
- ESLint + Prettier para qualidade de código

## Pré-requisitos

- Node.js 18+
- [pnpm](https://pnpm.io/)
- Uma API key/token do TMDB (gratuito)

## Configuração

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/) e gere suas credenciais em [Configurações da API](https://www.themoviedb.org/settings/api).
3. Copie o arquivo de exemplo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Preencha o `.env` com suas credenciais:
   ```env
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_API_KEY=sua_api_key
   VITE_TMDB_API_TOKEN=seu_token_de_leitura_v4
   ```

## Scripts

| Comando              | Descrição                                       |
| -------------------- | ----------------------------------------------- |
| `pnpm dev`           | Inicia o servidor de desenvolvimento (Vite)     |
| `pnpm build`         | Type-check + build de produção                  |
| `pnpm preview`       | Serve o build de produção localmente            |
| `pnpm test`          | Executa os testes unitários (Jest + RTL)        |
| `pnpm test:coverage` | Executa os testes e gera relatório de cobertura |
| `pnpm lint`          | Executa o ESLint                                |
| `pnpm lint:fix`      | Executa o ESLint com correção automática        |
| `pnpm format`        | Formata o código com Prettier                   |

## Estrutura do projeto (arquitetura modular)

```
src/
  modules/              # um diretório por domínio/feature
    movies/
      components/       # MovieCard, MovieGrid
      hooks/            # useMovies, useDetailsMovie (React Query)
      pages/            # Home, Search, Details
      services/         # chamadas HTTP (tmdb.ts)
      types.ts
    favorites/
      components/       # EmptyState, SortControl
      hooks/            # useFavoriteMovies (+ sortMovies)
      pages/            # Favorites
  routes/               # definição de rotas e lazy loading das páginas
  shared/
    context/
      AppContext/       # estado global de favoritos (Provider + hook + context)
      ThemeContext/     # estado global de tema (Provider + hook + context)
    hooks/              # useLocalStorage
    lib/                # infraestrutura: axiosClient, queryClient
    utils/              # utilitários puros: formatters, highlight
    ui/                 # Header, Skeleton, LoadingPage, ScrollManager
```

### Convenções da arquitetura modular

| Pasta             | Responsabilidade                                    | Regra                                     |
| ----------------- | --------------------------------------------------- | ----------------------------------------- |
| `pages/`          | Orquestra a tela, une hook + components             | Sem lógica própria de fetch               |
| `hooks/`          | Lógica de negócio e estado do módulo                | Chama services, não chama API direta      |
| `services/`       | Chamadas HTTP puras                                 | Sem estado, retorna dados tipados         |
| `components/`     | Componentes visuais do domínio                      | Recebem dados via props                   |
| `shared/lib/`     | Configuração de infraestrutura (Axios, React Query) | Instâncias configuradas, sem lógica       |
| `shared/utils/`   | Funções puras de transformação                      | Sem efeitos colaterais, testáveis em Node |
| `shared/ui/`      | Componentes de UI sem domínio                       | Sobrevivem a troca de domínio             |
| `shared/context/` | Estado global real (entre módulos)                  | Só vai aqui se cruzar módulos             |

## Páginas

- **Home (`/`)** — filmes populares/tendências, grid responsivo com infinite scroll.
- **Busca (`/search?q=termo`)** — resultados de busca com o termo destacado nos títulos.
- **Detalhes (`/movie/:id`)** — pôster, gêneros, data de lançamento, nota e sinopse, com botão de favoritar.
- **Favoritos (`/favorites`)** — lista de favoritos com ordenação por título/nota e remoção via ícone de lixeira.

## Qualidade de código

### ESLint

Regras ativas além do recommended:

- `@typescript-eslint/no-explicit-any: error` — proíbe `any` explícito
- `simple-import-sort/imports: error` — enforce ordenação de imports
- `no-console: warn` — avisa sobre `console.log` esquecido
- `eslint-config-prettier` — desativa regras que conflitam com Prettier

### Prettier

Configurado via `.prettierrc`. Principais opções: `semi: true`, `singleQuote: false`, `trailingComma: "all"`, `printWidth: 100`.
