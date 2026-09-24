# Design

## Context

Projeto greenfield: o repositório só tem `CLAUDE.md` (vazio) e a pasta `openspec/`. Não há código, toolchain nem convenções. A JokeAPI v2 é pública, não exige chave e envia cabeçalhos CORS, então o navegador pode chamá-la direto. Os requisitos estão em `specs/random-joke/spec.md`.

## Goals / Non-Goals

**Goals:**
- Três arquivos estáticos que funcionam abrindo o `index.html` no navegador ou em qualquer host estático (GitHub Pages, Netlify etc.).
- Zero dependências e zero etapa de build.

**Non-Goals:**
- Filtros de categoria, idioma ou "safe mode" configuráveis pelo usuário.
- Histórico de piadas, favoritos ou cache.
- Tradução das piadas (a API devolve em inglês por padrão).
- Testes automatizados com framework. A verificação é manual no navegador.

## Decisions

**1. HTML + CSS + JavaScript puro, sem framework.**
A página tem um botão e três textos. Um framework (React, Vue) ou bundler traria dependências e build sem nenhum ganho. Alternativa descartada: Vite + framework.

**2. URL `https://v2.jokeapi.dev/joke/Any?type=twopart`.**
Piadas do tipo `single` têm só o campo `joke` e não têm `delivery`, que é o campo que o pedido manda mostrar. Filtrar por `twopart` garante que `delivery` sempre exista. Alternativa descartada: aceitar os dois tipos e cair para `joke` quando for `single`. Isso contraria o pedido de mostrar o campo `delivery`.

**3. Mostrar `setup` junto com `delivery`.**
`delivery` é só o desfecho ("Because light attracts bugs."). Sem o `setup`, o texto não faz sentido. Os dois aparecem em parágrafos separados, com o `setup` primeiro. Se o usuário quiser literalmente só o `delivery`, basta remover o elemento do setup.

**4. `fetch` + `async/await`, textos via `textContent`.**
`textContent` evita que conteúdo da API seja interpretado como HTML (spec: "Conteúdo com marcação HTML"). O botão fica `disabled` durante a requisição (spec: "Estado de carregamento").

**5. Carregar uma piada automaticamente ao abrir a página?**
Não. O pedido diz que a piada vem quando o usuário clica. A área de piada começa com uma instrução curta ("Clique em Próxima Piada para começar"). Isso não afeta nenhum requisito e pode mudar depois.

**6. Estrutura de arquivos.**
```
index.html   # marcação: botão, área da piada, categoria, <script defer>
styles.css   # layout centralizado e responsivo
script.js    # clique → fetch → atualiza DOM / erro
```
`lang="pt-BR"` e `<meta charset="utf-8">` no HTML, para que "Próxima" apareça correto. A área da piada usa `aria-live="polite"` para leitores de tela anunciarem a nova piada.

## Risks / Trade-offs

- [JokeAPI fora do ar ou com rate limit (120 req/min)] → mensagem de erro amigável e botão continua habilitado para nova tentativa.
- [A categoria `Any` pode trazer piadas ofensivas (categorias Dark, flags nsfw/racist etc.)] → mantido como pedido. Se preciso, dá para adicionar `safe-mode` ou `blacklistFlags` na URL depois, sem mudar a estrutura.
- [Piadas em inglês numa interface em português] → aceito, a API não é traduzida. Dá para adicionar o parâmetro `lang` depois.
- [Abrir via `file://` em algum navegador restritivo] → a chamada a um HTTPS com CORS funciona normalmente em `file://` nos navegadores atuais. Como alternativa, servir com `npx serve` ou `python -m http.server`.
