<template>
  <div class="abas">
    <div class="abas-lista" role="tablist">
      <button
        v-for="(aba, indice) in itens"
        :key="indice"
        role="tab"
        :class="{ ativa: ativa === indice }"
        @click="selecionar(indice)"
      >
        {{ aba.titulo }}
      </button>
    </div>
    <div class="abas-painel" role="tabpanel">{{ abaAtiva.conteudo }}</div>
  </div>
</template>

<script>
export default {
  name: 'Abas',
  props: {
    itens: { type: Array, required: true }
  },
  data() {
    return { ativa: 0 }
  },
  computed: {
    abaAtiva() {
      return this.itens[this.ativa] || { conteudo: '' }
    }
  },
  watch: {
    itens() {
      this.ativa = 0
    }
  },
  methods: {
    selecionar(indice) {
      this.ativa = indice
    }
  }
}
</script>

<style scoped>
.abas-lista { display: flex; gap: .25rem; border-bottom: 2px solid var(--borda); overflow-x: auto; overflow-y: hidden; }
.abas-lista button { padding: .55rem 1rem; border: 0; background: none; color: var(--suave); border-bottom: 2px solid transparent; margin-bottom: -2px; white-space: nowrap; }
.abas-lista button.ativa { color: var(--cor); border-bottom-color: var(--cor); font-weight: 600; }
.abas-painel { padding: 1rem 0; white-space: pre-line; min-height: 6rem; }
</style>
