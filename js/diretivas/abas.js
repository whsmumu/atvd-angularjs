angular.module('app.diretivas').directive('abas', function () {
  return {
    restrict: 'E',
    scope: { itens: '=' },
    template:
      '<div class="abas">' +
        '<div class="abas-lista" role="tablist">' +
          '<button ng-repeat="aba in itens" role="tab" ng-class="{ativa: ativa === $index}" ng-click="selecionar($index)">{{ aba.titulo }}</button>' +
        '</div>' +
        '<div class="abas-painel" role="tabpanel">{{ itens[ativa].conteudo }}</div>' +
      '</div>',
    controller: function ($scope) {
      $scope.ativa = 0;

      $scope.selecionar = function (indice) { $scope.ativa = indice; };

      $scope.$watch('itens', function () { $scope.ativa = 0; });
    }
  };
});
