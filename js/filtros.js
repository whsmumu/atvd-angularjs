angular.module('app.filtros').filter('resumir', function () {
  return function (texto, max) {
    texto = texto || '';
    max = max || 80;
    return texto.length > max ? texto.slice(0, max).trim() + '…' : texto;
  };
});
