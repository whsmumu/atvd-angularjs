angular.module('app.diretivas').directive('accordion', function () {
  return {
    restrict: 'E',
    scope: { itens: '=' },
    template:
      '<div class="acordeao">' +
        '<div class="acordeao-item" ng-repeat="item in itens" ng-class="{aberto: aberto === $index}">' +
          '<button class="acordeao-titulo" ng-click="alternar($index)">' +
            '{{ item.titulo }}<span class="seta">▾</span>' +
          '</button>' +
          '<div class="acordeao-corpo"><div><p>{{ item.conteudo }}</p></div></div>' +
        '</div>' +
      '</div>',
    controller: function ($scope) {
      $scope.aberto = -1;

      $scope.alternar = function (indice) {
        $scope.aberto = $scope.aberto === indice ? -1 : indice;
      };
    }
  };
});
