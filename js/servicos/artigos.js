// Factory com os dados da Central de Ajuda e a lógica de "artigos lidos".
angular.module('app.servicos').factory('ArtigosService', function () {
  var lista = [
    { id: 1, categoria: 'Conta', titulo: 'Como criar sua conta',
      resumo: 'Cadastre-se em poucos minutos usando seu e-mail e uma senha segura para acessar todos os recursos.',
      passos: ['Clique em "Criar conta".', 'Informe nome, e-mail e senha.', 'Confirme o e-mail recebido.'],
      dicas: 'Use uma senha com pelo menos 8 caracteres, misturando letras e números.', atualizadoEm: new Date(2026, 9, 2) },
    { id: 2, categoria: 'Conta', titulo: 'Como alterar seu e-mail',
      resumo: 'Atualize o e-mail cadastrado para continuar recebendo avisos e notificações importantes.',
      passos: ['Abra "Meu perfil".', 'Clique em "Alterar e-mail".', 'Confirme pelo link enviado ao novo endereço.'],
      dicas: 'Você só precisa confirmar o novo e-mail; o antigo deixa de funcionar na hora.', atualizadoEm: new Date(2026, 9, 5) },
    { id: 3, categoria: 'Conta', titulo: 'Como excluir sua conta',
      resumo: 'Entenda o que acontece com seus dados antes de encerrar sua conta de forma definitiva.',
      passos: ['Acesse "Configurações".', 'Escolha "Encerrar conta".', 'Confirme com sua senha.'],
      dicas: 'Baixe seus dados antes de excluir: a ação não pode ser desfeita.', atualizadoEm: new Date(2026, 8, 20) },
    { id: 4, categoria: 'Pagamentos', titulo: 'Formas de pagamento aceitas',
      resumo: 'Veja quais cartões, boletos e carteiras digitais podem ser usados nas suas compras.',
      passos: ['Vá em "Pagamentos".', 'Clique em "Adicionar forma".', 'Escolha cartão, boleto ou Pix.'],
      dicas: 'O Pix tem confirmação imediata; o boleto leva até 2 dias úteis.', atualizadoEm: new Date(2026, 9, 10) },
    { id: 5, categoria: 'Pagamentos', titulo: 'Como solicitar reembolso',
      resumo: 'Peça a devolução do valor em até 7 dias após a compra, sem precisar justificar.',
      passos: ['Abra "Minhas compras".', 'Selecione o pedido.', 'Clique em "Solicitar reembolso".'],
      dicas: 'O valor volta pela mesma forma de pagamento usada na compra.', atualizadoEm: new Date(2026, 9, 12) },
    { id: 6, categoria: 'Pagamentos', titulo: 'Como baixar a nota fiscal',
      resumo: 'Emita e baixe a nota fiscal de qualquer compra realizada na sua conta.',
      passos: ['Abra "Minhas compras".', 'Selecione o pedido.', 'Clique em "Baixar nota fiscal".'],
      dicas: 'A nota fica disponível 24 horas após a confirmação do pagamento.', atualizadoEm: new Date(2026, 8, 28) },
    { id: 7, categoria: 'Segurança', titulo: 'Ativar verificação em duas etapas',
      resumo: 'Adicione uma camada extra de proteção exigindo um código além da senha no login.',
      passos: ['Acesse "Segurança".', 'Ative "Verificação em duas etapas".', 'Escaneie o QR Code no aplicativo autenticador.'],
      dicas: 'Guarde os códigos de recuperação em um lugar seguro.', atualizadoEm: new Date(2026, 9, 15) },
    { id: 8, categoria: 'Segurança', titulo: 'Recuperar senha esquecida',
      resumo: 'Redefina sua senha em instantes usando o e-mail cadastrado na conta.',
      passos: ['Na tela de login, clique em "Esqueci a senha".', 'Informe seu e-mail.', 'Siga o link recebido e crie uma nova senha.'],
      dicas: 'Se o e-mail não chegar, confira a caixa de spam.', atualizadoEm: new Date(2026, 9, 1) },
    { id: 9, categoria: 'Suporte', titulo: 'Como abrir um chamado',
      resumo: 'Fale com nossa equipe descrevendo o problema para receber ajuda personalizada.',
      passos: ['Clique em "Falar com o suporte".', 'Descreva o problema.', 'Anexe capturas de tela, se tiver.'],
      dicas: 'Quanto mais detalhes você informar, mais rápida será a resposta.', atualizadoEm: new Date(2026, 9, 18) },
    { id: 10, categoria: 'Suporte', titulo: 'Horários de atendimento',
      resumo: 'Confira os dias e horários em que nossa equipe responde por chat, e-mail e telefone.',
      passos: ['Acesse "Contato".', 'Escolha o canal de atendimento.', 'Veja o horário disponível.'],
      dicas: 'O chat funciona de segunda a sexta, das 8h às 18h.', atualizadoEm: new Date(2026, 9, 20) }
  ];

  var faq = [
    { titulo: 'Quanto tempo leva para eu receber uma resposta?', conteudo: 'Chamados são respondidos em até 24 horas úteis. No chat o retorno é imediato em horário comercial.' },
    { titulo: 'Posso usar a mesma conta em vários dispositivos?', conteudo: 'Sim. Basta entrar com seu e-mail e senha em qualquer celular, tablet ou computador.' },
    { titulo: 'Meus dados estão seguros?', conteudo: 'Seus dados são criptografados e você pode ativar a verificação em duas etapas para proteger ainda mais o acesso.' },
    { titulo: 'Como cancelo uma compra?', conteudo: 'Em "Minhas compras", selecione o pedido e solicite o reembolso em até 7 dias.' },
    { titulo: 'Esqueci meu e-mail de cadastro. E agora?', conteudo: 'Abra um chamado informando seu nome completo e os dados da compra para confirmarmos sua identidade.' }
  ];

  var lidos = {};

  return {
    lista: lista,
    faq: faq,
    categorias: ['Conta', 'Pagamentos', 'Segurança', 'Suporte'],
    lido: function (id) { return !!lidos[id]; },
    marcarLido: function (id) { lidos[id] = true; },
    totalLidos: function () { return Object.keys(lidos).length; },
    // Progresso de leitura em % (0-100)
    progresso: function () {
      return Math.round(this.totalLidos() / lista.length * 100);
    }
  };
});
