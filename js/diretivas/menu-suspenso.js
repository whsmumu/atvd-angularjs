angular.module('app.diretivas').directive('menuSuspenso', function ($document) {
  return {
    restrict: 'E',
    scope: { rotulo: '@', opcoes: '=', selecionado: '<', aoSelecionar: '&' },
    template:
      '<div class="menu">' +
        '<button class="menu-botao" ng-click="alternar()">{{ rotulo }}: <strong>{{ selecionado }}</strong> ▾</button>' +
        '<ul class="menu-lista" ng-show="aberto">' +
          '<li ng-repeat="opcao in opcoes">' +
            '<button ng-class="{ativa: opcao === selecionado}" ng-click="escolher(opcao)">{{ opcao }}</button>' +
          '</li>' +
        '</ul>' +
      '</div>',
    link: function (scope, elemento) {
      scope.aberto = false;

      scope.alternar = function () { scope.aberto = !scope.aberto; };

      scope.escolher = function (opcao) {
        scope.aberto = false;
        scope.aoSelecionar({ opcao: opcao });
      };

      function cliqueFora(evento) {
        if (scope.aberto && !elemento[0].contains(evento.target)) {
          scope.$apply(function () { scope.aberto = false; });
        }
      }
      $document.on('click', cliqueFora);
      scope.$on('$destroy', function () { $document.off('click', cliqueFora); });
    }
  };
});
