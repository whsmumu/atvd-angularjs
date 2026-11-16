<template>
  <div class="menu">
    <button class="menu-botao" @click="alternar">
      {{ rotulo }}: <strong>{{ selecionado }}</strong> ▾
    </button>
    <ul v-show="aberto" class="menu-lista">
      <li v-for="opcao in opcoes" :key="opcao">
        <button :class="{ ativa: opcao === selecionado }" @click="escolher(opcao)">{{ opcao }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuSuspenso',
  props: {
    rotulo: { type: String, default: '' },
    opcoes: { type: Array, required: true },
    selecionado: { type: String, default: '' }
  },
  emits: ['selecionar'],
  data() {
    return { aberto: false }
  },
  mounted() {
    document.addEventListener('click', this.cliqueFora)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.cliqueFora)
  },
  methods: {
    alternar() {
      this.aberto = !this.aberto
    },
    escolher(opcao) {
      this.aberto = false
      this.$emit('selecionar', opcao)
    },
    cliqueFora(evento) {
      if (!this.$el.contains(evento.target)) this.aberto = false
    }
  }
}
</script>

<style scoped>
.menu { position: relative; display: inline-block; }
.menu-botao { width: 100%; padding: .6rem .9rem; border: 1px solid var(--borda); border-radius: 8px; background: #fff; text-align: left; }
.menu-lista { position: absolute; z-index: 10; top: calc(100% + 4px); left: 0; min-width: 100%; margin: 0; padding: .25rem; list-style: none; background: #fff; border: 1px solid var(--borda); border-radius: 8px; box-shadow: 0 6px 18px rgba(0, 0, 0, .12); }
.menu-lista button { width: 100%; padding: .45rem .7rem; border: 0; border-radius: 6px; background: none; text-align: left; white-space: nowrap; }
.menu-lista button:hover, .menu-lista button.ativa { background: var(--claro); color: var(--cor); }
</style>
