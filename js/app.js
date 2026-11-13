// Módulo principal: orquestra os demais módulos (serviços, filtros, diretivas) e o controlador.
angular.module('app.servicos', []);
angular.module('app.filtros', []);
angular.module('app.diretivas', ['app.servicos']);

angular.module('app', ['app.servicos', 'app.filtros', 'app.diretivas']);
