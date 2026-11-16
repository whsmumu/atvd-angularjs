angular.module('app.diretivas').directive('barraProgresso', function () {
  return {
    restrict: 'E',
    scope: { valor: '=', rotulo: '@' },
    template:
      '<div class="progresso">' +
        '<div class="progresso-info"><span>{{ rotulo }}</span><span>{{ pct() }}%</span></div>' +
        '<div class="progresso-trilho" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{ pct() }}">' +
          '<div class="progresso-barra" ng-style="{width: pct() + \'%\'}"></div>' +
        '</div>' +
      '</div>',
    controller: function ($scope) {
      $scope.pct = function () {
        return Math.round(Math.min(100, Math.max(0, $scope.valor || 0)));
      };
    }
  };
});
