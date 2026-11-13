# Central de Ajuda (AngularJS)

Atividade de AngularJS: página responsiva com 6 componentes feitos como diretivas.

| Componente | Diretiva | Arquivo |
|---|---|---|
| Acordeão (FAQ) | `<accordion>` | `js/diretivas/accordion.js` |
| Paginação (artigos) | `<paginacao>` | `js/diretivas/paginacao.js` |
| Barra de Progresso (artigos lidos) | `<barra-progresso>` | `js/diretivas/barra-progresso.js` |
| Abas (detalhes do artigo) | `<abas>` | `js/diretivas/abas.js` |
| Menu Suspenso (categoria) | `<menu-suspenso>` | `js/diretivas/menu-suspenso.js` |
| Toast (feedback) | `<toast-container>` + `ToastService` | `js/diretivas/toast.js`, `js/servicos/toast.js` |

Outros conceitos: módulo principal `js/app.js`, controlador `js/controladores/ajuda.js`,
factories em `js/servicos/`, filtro customizado em `js/filtros.js`, `ng-model`, `ng-click`, `ng-change`.

## Como rodar

Abra o `index.html` no navegador (AngularJS 1.8.3 carregado por CDN, sem build e sem outras dependências).
