# Desafio extra: Central de Ajuda em Vue.js

Mesma Central de Ajuda da atividade em AngularJS, agora com Vue 3 (Options API) e `App.vue` como
componente principal. Cada um dos 6 componentes obrigatórios é um componente Vue independente.

| # | Componente | Seção da página | Arquivo | Props | Eventos (`$emit`) |
|---|---|---|---|---|---|
| 1 | Acordeão | Perguntas frequentes | `src/components/Acordeao.vue` | `itens` | |
| 2 | Paginação | Artigos de ajuda | `src/components/Paginacao.vue` | `totalPaginas`, `paginaAtual` | `mudar` |
| 3 | Barra de Progresso | Seu progresso | `src/components/BarraProgresso.vue` | `valor`, `rotulo` | |
| 4 | Abas | Detalhes do artigo | `src/components/Abas.vue` | `itens` | |
| 5 | Menu Suspenso | Canais de atendimento | `src/components/MenuSuspenso.vue` | `rotulo`, `opcoes`, `selecionado` | `selecionar` |
| 6 | Toast | Fale conosco | `src/components/ToastNotificacao.vue` + `src/plugins/toast.js` | `mensagem`, `tipo`, `duracao` | `fechar` |

Outros conceitos: `data` e `computed` (`App.vue`), `watch`, hooks `created` e `mounted`, `v-model`, `@click`,
serviço de toast global (`this.$toast`) instalado como plugin em `src/main.js`.

## Como rodar

```bash
cd desafio-extra
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).
Para gerar a versão final: `npm run build`.
