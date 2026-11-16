<template>
  <div class="acordeao">
    <div
      v-for="(item, indice) in itens"
      :key="indice"
      class="acordeao-item"
      :class="{ aberto: aberto === indice }"
    >
      <button class="acordeao-titulo" @click="alternar(indice)">
        {{ item.titulo }}<span class="seta">▾</span>
      </button>
      <div class="acordeao-corpo">
        <div><p>{{ item.conteudo }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Acordeao',
  props: {
    itens: { type: Array, required: true }
  },
  data() {
    return { aberto: -1 }
  },
  methods: {
    alternar(indice) {
      this.aberto = this.aberto === indice ? -1 : indice
    }
  }
}
</script>

<style scoped>
.acordeao-item { border: 1px solid var(--borda); border-radius: 8px; margin-bottom: .5rem; overflow: hidden; background: #fff; }
.acordeao-titulo { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: .5rem; padding: .9rem 1rem; border: 0; background: #fff; text-align: left; font-weight: 600; }
.acordeao-corpo { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.acordeao-corpo > div { overflow: hidden; }
.acordeao-corpo p { margin: 0; padding: 0 1rem 1rem; color: var(--suave); }
.acordeao-item.aberto .acordeao-corpo { grid-template-rows: 1fr; }
.seta { transition: transform .3s; }
.acordeao-item.aberto .seta { transform: rotate(180deg); }
</style>
