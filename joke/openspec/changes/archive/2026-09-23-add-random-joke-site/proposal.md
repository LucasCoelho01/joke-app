# Proposal

## Why

O projeto ainda não tem nenhuma funcionalidade. Queremos um site estático mínimo que mostre piadas aleatórias vindas da JokeAPI (`https://v2.jokeapi.dev/joke/Any`), sem login, sem banco de dados e sem backend.

## What Changes

- Novo site estático (HTML, CSS e JavaScript puro) na raiz do repositório, que pode ser aberto direto no navegador ou servido por qualquer host estático.
- Um único botão com o texto **"Próxima Piada"**. Cada clique chama a JokeAPI e troca a piada exibida.
- A página exibe o conteúdo da piada (campo `delivery` do JSON) e a categoria (campo `category`).
- A requisição pede apenas piadas de duas partes (`type=twopart`), porque só elas têm o campo `delivery`. O campo `setup` (a pergunta ou preparação) aparece acima do `delivery`, já que o `delivery` sozinho é só o desfecho e perde o sentido.
- Mensagem de carregamento enquanto a requisição está em andamento e mensagem de erro amigável se a API falhar.

## Capabilities

### New Capabilities
- `random-joke`: página estática que busca e exibe uma piada aleatória da JokeAPI quando o usuário clica em "Próxima Piada", mostrando o conteúdo e a categoria.

### Modified Capabilities
<!-- Nenhuma: não há specs existentes. -->

## Impact

- Novos arquivos: `index.html`, `styles.css`, `script.js` na raiz do repositório.
- Dependência externa em tempo de execução: JokeAPI v2 (pública, sem chave, com CORS habilitado). Não há dependências de build nem pacotes npm.
- Sem backend, sem autenticação, sem persistência.
