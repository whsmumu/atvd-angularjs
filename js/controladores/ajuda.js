// Controlador da página: busca, filtro por categoria, paginação, artigo selecionado e feedback.
angular.module('app').controller('AjudaController', function ($scope, $filter, ArtigosService, ToastService) {
  var POR_PAGINA = 4;

  $scope.categorias = ['Todas'].concat(ArtigosService.categorias);
  $scope.categoria = 'Todas';
  $scope.busca = '';          // ligado ao input com ng-model (two-way binding)
  $scope.form = { mensagem: '' };
  $scope.faq = ArtigosService.faq;
  $scope.lido = ArtigosService.lido;
  $scope.progresso = ArtigosService.progresso();

  // Aplica categoria + busca e recorta a página atual
  $scope.irPara = function (pagina) {
    var lista = $filter('filter')(ArtigosService.lista, function (a) {
      return $scope.categoria === 'Todas' || a.categoria === $scope.categoria;
    });
    lista = $filter('filter')(lista, $scope.busca);

    $scope.total = lista.length;
    $scope.totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
    $scope.pagina = Math.min(pagina, $scope.totalPaginas);
    $scope.visiveis = $filter('limitTo')(lista, POR_PAGINA, ($scope.pagina - 1) * POR_PAGINA);
  };

  // Callback do menu suspenso
  $scope.mudarCategoria = function (categoria) {
    $scope.categoria = categoria;
    $scope.irPara(1);
  };

  // Monta as abas do artigo escolhido
  $scope.selecionar = function (artigo) {
    $scope.artigo = artigo;
    $scope.abas = [
      { titulo: 'Resumo', conteudo: artigo.resumo },
      { titulo: 'Passo a passo', conteudo: artigo.passos.map(function (p, i) { return (i + 1) + '. ' + p; }).join('\n') },
      { titulo: 'Dicas', conteudo: artigo.dicas }
    ];
  };

  $scope.marcarLido = function (artigo) {
    if (ArtigosService.lido(artigo.id)) {
      ToastService.info('Você já marcou este artigo como lido.');
      return;
    }
    ArtigosService.marcarLido(artigo.id);
    $scope.progresso = ArtigosService.progresso();
    ToastService.sucesso('Artigo marcado como lido!');
  };

  $scope.enviarFeedback = function () {
    if (!$scope.form.mensagem.trim()) {
      ToastService.erro('Escreva uma mensagem antes de enviar.');
      return;
    }
    $scope.form.mensagem = '';
    ToastService.sucesso('Obrigado! Seu feedback foi enviado.');
  };

  $scope.irPara(1);
  $scope.selecionar(ArtigosService.lista[0]);
});
