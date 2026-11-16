angular.module('app').controller('AjudaController', function ($scope, $filter, $interval, ArtigosService, ToastService, NavegacaoService) {
  var POR_PAGINA = 4;

  $scope.secoes = [
    { id: 'faq', rotulo: 'FAQ' },
    { id: 'artigos', rotulo: 'Artigos' },
    { id: 'progresso', rotulo: 'Progresso' },
    { id: 'detalhes', rotulo: 'Detalhes' },
    { id: 'atendimento', rotulo: 'Atendimento' },
    { id: 'contato', rotulo: 'Contato' }
  ];
  $scope.rolarPara = NavegacaoService.rolarPara;

  $scope.busca = '';
  $scope.form = { mensagem: '' };
  $scope.faq = ArtigosService.faq;
  $scope.lido = ArtigosService.lido;
  $scope.totalArtigos = ArtigosService.lista.length;

  $scope.irPara = function (pagina) {
    var lista = $filter('filter')(ArtigosService.lista, $scope.busca);

    $scope.total = lista.length;
    $scope.totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
    $scope.pagina = Math.min(pagina, $scope.totalPaginas);
    $scope.visiveis = $filter('limitTo')(lista, POR_PAGINA, ($scope.pagina - 1) * POR_PAGINA);
  };

  function atualizarProgresso() {
    $scope.lidos = ArtigosService.totalLidos();
    $scope.progresso = ArtigosService.progresso();
  }

  $scope.download = { ativo: false, pct: 0 };
  $scope.baixarGuia = function () {
    var d = $scope.download;
    d.ativo = true;
    d.pct = 0;
    var timer = $interval(function () {
      d.pct += 10;
      if (d.pct >= 100) {
        $interval.cancel(timer);
        d.ativo = false;
        ToastService.sucesso('Download do guia concluído!');
      }
    }, 250);
  };

  $scope.selecionar = function (artigo) {
    $scope.artigo = artigo;
    $scope.abas = [
      { titulo: 'Resumo', conteudo: artigo.resumo },
      { titulo: 'Passo a passo', conteudo: artigo.passos.map(function (p, i) { return (i + 1) + '. ' + p; }).join('\n') },
      { titulo: 'Dicas', conteudo: artigo.dicas }
    ];
  };

  $scope.abrirArtigo = function (artigo) {
    $scope.selecionar(artigo);
    NavegacaoService.rolarPara('detalhes');
  };

  $scope.marcarLido = function (artigo) {
    if (ArtigosService.lido(artigo.id)) {
      ToastService.info('Você já marcou este artigo como lido.');
      return;
    }
    ArtigosService.marcarLido(artigo.id);
    atualizarProgresso();
    ToastService.sucesso('Artigo marcado como lido!');
  };

  $scope.canais = ['Chat', 'E-mail', 'Telefone'];
  $scope.canal = 'Chat';
  $scope.infoCanais = {
    'Chat': 'Resposta imediata, de segunda a sexta, das 8h às 18h.',
    'E-mail': 'Respondemos em até 24 horas úteis em suporte@centraldeajuda.com.',
    'Telefone': 'Ligue para (71) 0000-0000, de segunda a sexta, das 9h às 17h.'
  };
  $scope.escolherCanal = function (canal) { $scope.canal = canal; };

  $scope.enviarMensagem = function () {
    if (!$scope.form.mensagem.trim()) {
      ToastService.erro('Escreva uma mensagem antes de enviar.');
      return;
    }
    $scope.form.mensagem = '';
    ToastService.sucesso('Mensagem enviada pelo canal ' + $scope.canal + '!');
  };

  var mensagensTeste = {
    sucesso: 'Operação realizada com sucesso!',
    erro: 'Não foi possível salvar. Tente novamente.',
    info: 'Seu atendimento começa em instantes.'
  };
  $scope.testarToast = function (tipo) { ToastService.mostrar(mensagensTeste[tipo], tipo); };

  atualizarProgresso();
  $scope.irPara(1);
  $scope.selecionar(ArtigosService.lista[0]);
});
