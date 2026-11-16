<template>
  <Transition name="toast" appear @after-leave="$emit('fechar')">
    <div v-if="visivel" class="toast" :class="tipo">
      <span>{{ mensagem }}</span>
      <button aria-label="Fechar" @click="esconder">×</button>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ToastNotificacao',
  props: {
    mensagem: { type: String, required: true },
    tipo: { type: String, default: 'info', validator: valor => ['sucesso', 'erro', 'info'].includes(valor) },
    duracao: { type: Number, default: 3000 }
  },
  emits: ['fechar'],
  data() {
    return { visivel: true, temporizador: null }
  },
  mounted() {
    this.temporizador = setTimeout(this.esconder, this.duracao)
  },
  beforeUnmount() {
    clearTimeout(this.temporizador)
  },
  methods: {
    esconder() {
      this.visivel = false
    }
  }
}
</script>

<style scoped>
.toast { pointer-events: auto; display: flex; align-items: center; gap: .75rem; max-width: 100%; padding: .7rem 1rem; border-radius: 8px; color: #fff; box-shadow: 0 6px 18px rgba(0, 0, 0, .2); }
.toast.sucesso { background: var(--ok); }
.toast.erro { background: var(--erro); }
.toast.info { background: var(--info); }
.toast button { border: 0; background: none; color: #fff; font-size: 1.2rem; line-height: 1; }
.toast-enter-active, .toast-leave-active { transition: opacity .25s ease, transform .25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
</style>
