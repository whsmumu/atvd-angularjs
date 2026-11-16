import { reactive } from 'vue'

export const toasts = reactive([])

let proximoId = 0

function mostrar(mensagem, tipo = 'info', duracao = 3000) {
  toasts.push({ id: proximoId++, mensagem, tipo, duracao })
}

function remover(id) {
  const indice = toasts.findIndex(toast => toast.id === id)
  if (indice !== -1) toasts.splice(indice, 1)
}

export const toastService = {
  mostrar,
  remover,
  sucesso: mensagem => mostrar(mensagem, 'sucesso'),
  erro: mensagem => mostrar(mensagem, 'erro'),
  info: mensagem => mostrar(mensagem, 'info')
}

export default {
  install(app) {
    app.config.globalProperties.$toast = toastService
  }
}
