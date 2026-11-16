angular.module('app.diretivas').directive('paginacao', function () {
  return {
    restrict: 'E',
    scope: { total: '=', atual: '=', aoMudar: '&' },
    template:
      '<nav class="paginacao">' +
        '<button ng-click="ir(atual - 1)" ng-disabled="atual <= 1">Anterior</button>' +
        '<button ng-repeat="n in paginas() track by n" ng-class="{ativa: n === atual}" ng-click="ir(n)">{{ n }}</button>' +
        '<button ng-click="ir(atual + 1)" ng-disabled="atual >= total">Próxima</button>' +
      '</nav>',
    controller: function ($scope) {
      $scope.paginas = function () {
        var lista = [];
        for (var i = 1; i <= $scope.total; i++) { lista.push(i); }
        return lista;
      };

      $scope.ir = function (pagina) {
        if (pagina < 1 || pagina > $scope.total || pagina === $scope.atual) { return; }
        $scope.aoMudar({ pagina: pagina });
      };
    }
  };
});
