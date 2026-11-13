// Serviço que gerencia a fila de notificações toast (várias ao mesmo tempo).
angular.module('app.servicos').factory('ToastService', function ($timeout) {
  var lista = [];
  var proximoId = 0;

  function fechar(id) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) { lista.splice(i, 1); return; }
    }
  }

  // tipo: 'sucesso' | 'erro' | 'info'. Some sozinho após `ms` milissegundos.
  function mostrar(mensagem, tipo, ms) {
    var toast = { id: proximoId++, mensagem: mensagem, tipo: tipo || 'info' };
    lista.push(toast);
    $timeout(function () { fechar(toast.id); }, ms || 3000);
  }

  return {
    lista: lista,
    fechar: fechar,
    mostrar: mostrar,
    sucesso: function (m) { mostrar(m, 'sucesso'); },
    erro: function (m) { mostrar(m, 'erro'); },
    info: function (m) { mostrar(m, 'info'); }
  };
});
