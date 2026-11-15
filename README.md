# Central de Ajuda (AngularJS)

Atividade de AngularJS: site de ajuda responsivo com 6 componentes feitos como diretivas.
A página segue a ordem dos componentes do enunciado (menu do topo numerado de 1 a 6).

| # | Componente | Seção da página | Diretiva | Arquivo |
|---|---|---|---|---|
| 1 | Acordeão | Perguntas frequentes | `<accordion>` | `js/diretivas/accordion.js` |
| 2 | Paginação | Artigos de ajuda | `<paginacao>` | `js/diretivas/paginacao.js` |
| 3 | Barra de Progresso | Seu progresso (leitura e download) | `<barra-progresso>` | `js/diretivas/barra-progresso.js` |
| 4 | Abas | Detalhes do artigo | `<abas>` | `js/diretivas/abas.js` |
| 5 | Menu Suspenso | Canais de atendimento | `<menu-suspenso>` | `js/diretivas/menu-suspenso.js` |
| 6 | Toast | Fale conosco | `<toast-container>` + `ToastService` | `js/diretivas/toast.js`, `js/servicos/toast.js` |

Outros conceitos: módulo principal `js/app.js`, controlador `js/controladores/ajuda.js`,
factories em `js/servicos/`, filtro customizado em `js/filtros.js`, `ng-model`, `ng-click`, `ng-change`.

## Como rodar

Abra o `index.html` no navegador (AngularJS 1.8.3 carregado por CDN, sem build e sem outras dependências).
