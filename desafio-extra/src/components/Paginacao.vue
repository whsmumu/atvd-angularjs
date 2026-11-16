<template>
  <nav class="paginacao">
    <button :disabled="paginaAtual <= 1" @click="ir(paginaAtual - 1)">Anterior</button>
    <button
      v-for="pagina in paginas"
      :key="pagina"
      :class="{ ativa: pagina === paginaAtual }"
      @click="ir(pagina)"
    >
      {{ pagina }}
    </button>
    <button :disabled="paginaAtual >= totalPaginas" @click="ir(paginaAtual + 1)">Próxima</button>
  </nav>
</template>

<script>
export default {
  name: 'Paginacao',
  props: {
    totalPaginas: { type: Number, required: true },
    paginaAtual: { type: Number, required: true }
  },
  emits: ['mudar'],
  computed: {
    paginas() {
      return Array.from({ length: this.totalPaginas }, (_, indice) => indice + 1)
    }
  },
  methods: {
    ir(pagina) {
      if (pagina < 1 || pagina > this.totalPaginas || pagina === this.paginaAtual) return
      this.$emit('mudar', pagina)
    }
  }
}
</script>

<style scoped>
.paginacao { display: flex; flex-wrap: wrap; gap: .35rem; justify-content: center; }
.paginacao button { min-width: 2.2rem; padding: .4rem .7rem; border: 1px solid var(--borda); border-radius: 6px; background: #fff; }
.paginacao button.ativa { background: var(--cor); border-color: var(--cor); color: #fff; font-weight: 700; }
</style>
