# Tasks

## 1. Estrutura da página

- [x] 1.1 Criar `index.html` com `lang="pt-BR"`, `meta charset="utf-8"` e `viewport`, um botão com o texto exato "Próxima Piada", área da piada (`setup`, `delivery`) com `aria-live="polite"`, elemento para a categoria, texto inicial "Clique em Próxima Piada para começar", link para `styles.css` e `<script src="script.js" defer>`. Verificar abrindo no navegador: o botão aparece com o acento correto e não há login nem formulário.
- [x] 1.2 Criar `styles.css` com layout centralizado e responsivo, destaque visual para a categoria e estilo do botão desabilitado. Verificar no navegador em largura de desktop e de celular (~375px) que não há rolagem horizontal.

## 2. Comportamento

- [x] 2.1 Criar `script.js`: no clique, desabilitar o botão, mostrar "Carregando...", fazer `fetch("https://v2.jokeapi.dev/joke/Any?type=twopart")`, e preencher `setup`, `delivery` e `category` via `textContent`. Verificar clicando várias vezes: cada clique mostra uma piada nova com a categoria, e a aba Network mostra uma requisição por clique.
- [x] 2.2 Tratar erros (falha de rede, `!response.ok`, `data.error === true`) mostrando uma mensagem amigável em português, e reabilitar o botão em `finally`. Verificar no DevTools com o modo "Offline" do Network: aparece a mensagem de erro e o botão continua clicável. Voltar para online e confirmar que o próximo clique traz uma piada.

## 3. Verificação final

- [x] 3.1 Percorrer todos os cenários de `specs/random-joke/spec.md` no navegador, incluindo o de conteúdo HTML: no console, chamar a função de renderização com `delivery: "<b>oi</b>"` e confirmar que o texto aparece literalmente. Confirmar também que o console não mostra erros no fluxo normal.
