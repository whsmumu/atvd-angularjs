<template>
  <div class="progresso">
    <div class="progresso-info">
      <span>{{ rotulo }}</span>
      <span>{{ percentual }}%</span>
    </div>
    <div
      class="progresso-trilho"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="percentual"
    >
      <div class="progresso-barra" :style="{ width: percentual + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarraProgresso',
  props: {
    valor: { type: Number, default: 0 },
    rotulo: { type: String, default: '' }
  },
  computed: {
    percentual() {
      return Math.round(Math.min(100, Math.max(0, this.valor)))
    }
  }
}
</script>

<style scoped>
.progresso-info { display: flex; justify-content: space-between; font-size: .9rem; margin-bottom: .35rem; }
.progresso-trilho { height: 14px; background: var(--borda); border-radius: 999px; overflow: hidden; }
.progresso-barra { height: 100%; background: var(--cor); border-radius: 999px; transition: width .4s ease; }
</style>
