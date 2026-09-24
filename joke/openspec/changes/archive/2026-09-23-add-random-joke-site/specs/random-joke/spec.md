# Spec Delta

## Purpose

Página web estática que mostra piadas aleatórias da JokeAPI, uma de cada vez, sob demanda do usuário, sem login e sem armazenamento de dados.

## ADDED Requirements

### Requirement: Botão "Próxima Piada"
A página SHALL exibir um único botão de ação com o texto exato "Próxima Piada". A página MUST NOT exigir login nem pedir qualquer dado ao usuário.

#### Scenario: Página aberta
- **WHEN** o usuário abre a página
- **THEN** a página mostra um botão com o texto "Próxima Piada"
- **AND** não há tela de login nem campos de formulário

### Requirement: Buscar piada ao clicar
Ao clicar em "Próxima Piada", a página SHALL fazer uma requisição GET à JokeAPI em `https://v2.jokeapi.dev/joke/Any`, restrita a piadas de duas partes (`type=twopart`), e substituir a piada exibida pela nova piada retornada.

#### Scenario: Clique traz nova piada
- **WHEN** o usuário clica em "Próxima Piada"
- **THEN** a página faz uma requisição à JokeAPI
- **AND** a piada que estava na tela é substituída pela piada retornada

#### Scenario: Cliques repetidos
- **WHEN** o usuário clica em "Próxima Piada" várias vezes
- **THEN** cada clique faz uma nova requisição e mostra a piada retornada por ela

### Requirement: Exibir conteúdo e categoria
Para cada piada retornada com sucesso, a página SHALL exibir o texto do campo `delivery` e o valor do campo `category` da resposta JSON. A página SHALL também exibir o campo `setup` acima do `delivery`, para que a piada faça sentido. Os textos MUST ser inseridos como texto puro, não como HTML.

#### Scenario: Resposta com sucesso
- **WHEN** a API responde com `{"error": false, "category": "Programming", "type": "twopart", "setup": "Why do programmers prefer dark mode?", "delivery": "Because light attracts bugs."}`
- **THEN** a página mostra "Why do programmers prefer dark mode?" seguido de "Because light attracts bugs."
- **AND** a página mostra a categoria "Programming"

#### Scenario: Conteúdo com marcação HTML
- **WHEN** o campo `delivery` contém texto como `<b>oi</b>`
- **THEN** a página mostra os caracteres `<b>oi</b>` literalmente, sem interpretá-los como HTML

### Requirement: Estado de carregamento
Enquanto a requisição estiver em andamento, a página SHALL indicar que está carregando e SHALL desabilitar o botão "Próxima Piada" para evitar requisições simultâneas.

#### Scenario: Requisição em andamento
- **WHEN** o usuário clica em "Próxima Piada" e a resposta ainda não chegou
- **THEN** a página mostra uma indicação de carregamento
- **AND** o botão fica desabilitado até a requisição terminar, com sucesso ou erro

### Requirement: Tratamento de erro
Se a requisição falhar (erro de rede, status HTTP diferente de 2xx, ou JSON com `"error": true`), a página SHALL exibir uma mensagem de erro amigável em português e SHALL manter o botão "Próxima Piada" habilitado para nova tentativa.

#### Scenario: Falha de rede
- **WHEN** o usuário clica em "Próxima Piada" e a requisição falha por erro de rede
- **THEN** a página mostra uma mensagem de erro amigável
- **AND** o botão "Próxima Piada" continua clicável

#### Scenario: API retorna erro
- **WHEN** a API responde com `"error": true`
- **THEN** a página mostra uma mensagem de erro amigável em vez de uma piada
