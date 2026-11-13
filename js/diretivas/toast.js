// Container das notificações toast. A fila e o temporizador ficam no ToastService.
angular.module('app.diretivas').directive('toastContainer', function (ToastService) {
  return {
    restrict: 'E',
    scope: {},
    template:
      '<div class="toasts" aria-live="polite">' +
        '<div class="toast" ng-repeat="t in toasts" ng-class="t.tipo">' +
          '<span>{{ t.mensagem }}</span>' +
          '<button ng-click="fechar(t.id)" aria-label="Fechar">×</button>' +
        '</div>' +
      '</div>',
    link: function (scope) {
      scope.toasts = ToastService.lista;
      scope.fechar = ToastService.fechar;
    }
  };
});
