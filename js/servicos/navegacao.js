// Serviço de navegação: rola suavemente até uma seção da página pelo id.
angular.module('app.servicos').factory('NavegacaoService', function ($document) {
  return {
    rolarPara: function (id) {
      var secao = $document[0].getElementById(id);
      if (secao) { secao.scrollIntoView({ behavior: 'smooth' }); }
    }
  };
});
