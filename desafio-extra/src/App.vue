<template>
  <header class="navbar">
    <div class="container navbar-conteudo">
      <span class="marca"><span class="marca-icone">?</span> Central de Ajuda</span>
      <nav class="navbar-links">
        <button v-for="(secao, indice) in secoes" :key="secao.id" @click="rolarPara(secao.id)">
          <span class="num">{{ indice + 1 }}</span> {{ secao.rotulo }}
        </button>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Como podemos ajudar?</h1>
      <p>Encontre respostas, leia nossos artigos e fale com a equipe de suporte.</p>
      <div class="hero-acoes">
        <button class="btn btn-claro" @click="rolarPara('faq')">Ver perguntas frequentes</button>
        <button class="btn btn-contorno" @click="rolarPara('contato')">Falar com o suporte</button>
      </div>
    </div>
  </section>

  <main>
    <section id="faq" class="secao">
      <div class="container">
        <header class="secao-cabecalho">
          <span class="selo">Componente 1 · Acordeão</span>
          <h2>Perguntas frequentes</h2>
          <p>Clique em uma pergunta para ver a resposta. Só uma fica aberta por vez.</p>
        </header>
        <Acordeao :itens="faq" />
      </div>
    </section>

    <section id="artigos" class="secao alt">
      <div class="container">
        <header class="secao-cabecalho">
          <span class="selo">Componente 2 · Paginação</span>
          <h2>Artigos de ajuda <small>({{ artigosFiltrados.length }})</small></h2>
          <p>Busque pelo título e navegue entre as páginas. Clique em um artigo para ver os detalhes.</p>
        </header>

        <input v-model="busca" class="campo" type="search" placeholder="Buscar artigo...">

        <p v-if="!artigosDaPagina.length" class="vazio">Nenhum artigo encontrado.</p>
        <ul class="cartoes">
          <li v-for="artigo in artigosDaPagina" :key="artigo.id" :class="{ ativo: artigo.id === artigoSelecionado.id }">
            <button class="artigo" @click="abrirArtigo(artigo)">
              <span class="tag">{{ artigo.categoria.toUpperCase() }}</span>
              <strong>{{ artigo.titulo }}</strong>
              <span class="resumo">{{ resumir(artigo.resumo, 70) }}</span>
              <small>
                Atualizado em {{ formatarData(artigo.atualizadoEm) }}<span v-if="lido(artigo.id)"> · ✓ lido</span>
              </small>
            </button>
          </li>
        </ul>

        <Paginacao :total-paginas="totalPaginas" :pagina-atual="paginaAtual" @mudar="irPara" />
      </div>
    </section>

    <section id="progresso" class="secao">
      <div class="container">
        <header class="secao-cabecalho">
          <span class="selo">Componente 3 · Barra de Progresso</span>
          <h2>Seu progresso</h2>
          <p>Acompanhe sua leitura e o download do guia completo.</p>
        </header>

        <div class="grade-2">
          <div class="cartao">
            <h3>Leitura dos artigos</h3>
            <BarraProgresso :valor="progresso" :rotulo="`${totalLidos} de ${artigos.length} artigos lidos`" />
            <p class="dica">Marque artigos como lidos na seção 4 para a barra avançar.</p>
          </div>

          <div class="cartao">
            <h3>Guia completo (PDF)</h3>
            <BarraProgresso :valor="download.pct" rotulo="Download" />
            <button class="btn" :disabled="download.ativo" @click="baixarGuia">
              {{ download.ativo ? 'Baixando...' : 'Baixar guia' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="detalhes" class="secao alt">
      <div class="container">
        <header class="secao-cabecalho">
          <span class="selo">Componente 4 · Abas</span>
          <h2>{{ artigoSelecionado.titulo }}</h2>
          <p>Artigo selecionado na seção 2. Navegue pelas abas para ler cada parte.</p>
        </header>

        <div class="cartao">
          <Abas :itens="abas" />
          <button class="btn" @click="marcarLido">
            {{ lido(artigoSelecionado.id) ? '✓ Lido' : 'Marcar como lido' }}
          </button>
        </div>
      </div>
    </section>

    <section id="atendimento" class="secao">
      <div class="container">
        <header class="secao-cabecalho">
          <span class="selo">Componente 5 · Menu Suspenso</span>
          <h2>Canais de atendimento</h2>
          <p>Escolha como prefere falar com a gente e veja as informações do canal.</p>
        </header>

        <div class="cartao canal">
          <MenuSuspenso rotulo="Canal" :opcoes="canais" :selecionado="canal" @selecionar="escolherCanal" />
          <p><strong>{{ canal }}:</strong> {{ infoCanais[canal] }}</p>
        </div>
      </div>
    </section>

    <section id="contato" class="secao alt">
      <div class="container">
        <header class="secao-cabecalho">
          <span class="selo">Componente 6 · Notificação Toast</span>
          <h2>Fale conosco</h2>
          <p>Envie uma mensagem pelo canal escolhido ou teste os tipos de notificação.</p>
        </header>

        <div class="grade-2">
          <div class="cartao">
            <h3>Enviar mensagem via {{ canal }}</h3>
            <label for="mensagem">Sua mensagem</label>
            <textarea id="mensagem" v-model="mensagem" class="campo" rows="4" placeholder="Escreva aqui..."></textarea>
            <button class="btn" @click="enviarMensagem">Enviar</button>
          </div>

          <div class="cartao">
            <h3>Testar notificações</h3>
            <div class="botoes">
              <button class="btn btn-ok" @click="testarToast('sucesso')">Sucesso</button>
              <button class="btn btn-erro" @click="testarToast('erro')">Erro</button>
              <button class="btn btn-info" @click="testarToast('info')">Informação</button>
            </div>
            <p class="dica">Cada toast some sozinho em 3 segundos ou ao clicar no ×.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="rodape">
    <div class="container">Central de Ajuda · Desafio extra em Vue.js · Engenharia de Software</div>
  </footer>

  <div class="toasts" aria-live="polite">
    <ToastNotificacao
      v-for="toast in toasts"
      :key="toast.id"
      :mensagem="toast.mensagem"
      :tipo="toast.tipo"
      :duracao="toast.duracao"
      @fechar="$toast.remover(toast.id)"
    />
  </div>
</template>

<script>
import Acordeao from './components/Acordeao.vue'
import Paginacao from './components/Paginacao.vue'
import BarraProgresso from './components/BarraProgresso.vue'
import Abas from './components/Abas.vue'
import MenuSuspenso from './components/MenuSuspenso.vue'
import ToastNotificacao from './components/ToastNotificacao.vue'
import { artigos, faq, canais, infoCanais, secoes } from './data/central'
import { toasts } from './plugins/toast'

const POR_PAGINA = 4

const MENSAGENS_TESTE = {
  sucesso: 'Operação realizada com sucesso!',
  erro: 'Não foi possível salvar. Tente novamente.',
  info: 'Seu atendimento começa em instantes.'
}

export default {
  name: 'App',
  components: { Acordeao, Paginacao, BarraProgresso, Abas, MenuSuspenso, ToastNotificacao },
  data() {
    return {
      secoes,
      canais,
      infoCanais,
      toasts,
      artigos: [],
      faq: [],
      artigoSelecionado: null,
      lidos: [],
      busca: '',
      paginaAtual: 1,
      download: { ativo: false, pct: 0 },
      temporizadorDownload: null,
      canal: 'Chat',
      mensagem: ''
    }
  },
  computed: {
    artigosFiltrados() {
      const termo = this.busca.trim().toLowerCase()
      if (!termo) return this.artigos
      return this.artigos.filter(artigo =>
        [artigo.titulo, artigo.categoria, artigo.resumo, artigo.dicas, ...artigo.passos]
          .join(' ')
          .toLowerCase()
          .includes(termo)
      )
    },
    totalPaginas() {
      return Math.max(1, Math.ceil(this.artigosFiltrados.length / POR_PAGINA))
    },
    artigosDaPagina() {
      const inicio = (this.paginaAtual - 1) * POR_PAGINA
      return this.artigosFiltrados.slice(inicio, inicio + POR_PAGINA)
    },
    totalLidos() {
      return this.lidos.length
    },
    progresso() {
      return Math.round((this.totalLidos / this.artigos.length) * 100)
    },
    abas() {
      const artigo = this.artigoSelecionado
      return [
        { titulo: 'Resumo', conteudo: artigo.resumo },
        { titulo: 'Passo a passo', conteudo: artigo.passos.map((passo, i) => `${i + 1}. ${passo}`).join('\n') },
        { titulo: 'Dicas', conteudo: artigo.dicas }
      ]
    }
  },
  watch: {
    busca() {
      this.paginaAtual = 1
    }
  },
  created() {
    this.artigos = artigos
    this.faq = faq
    this.artigoSelecionado = artigos[0]
  },
  mounted() {
    document.title = 'Central de Ajuda (Vue.js)'
  },
  beforeUnmount() {
    clearInterval(this.temporizadorDownload)
  },
  methods: {
    rolarPara(id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    },
    irPara(pagina) {
      this.paginaAtual = pagina
    },
    abrirArtigo(artigo) {
      this.artigoSelecionado = artigo
      this.rolarPara('detalhes')
    },
    lido(id) {
      return this.lidos.includes(id)
    },
    marcarLido() {
      const { id } = this.artigoSelecionado
      if (this.lido(id)) {
        this.$toast.info('Você já marcou este artigo como lido.')
        return
      }
      this.lidos.push(id)
      this.$toast.sucesso('Artigo marcado como lido!')
    },
    baixarGuia() {
      this.download.ativo = true
      this.download.pct = 0
      this.temporizadorDownload = setInterval(() => {
        this.download.pct += 10
        if (this.download.pct >= 100) {
          clearInterval(this.temporizadorDownload)
          this.download.ativo = false
          this.$toast.sucesso('Download do guia concluído!')
        }
      }, 250)
    },
    escolherCanal(canal) {
      this.canal = canal
    },
    enviarMensagem() {
      if (!this.mensagem.trim()) {
        this.$toast.erro('Escreva uma mensagem antes de enviar.')
        return
      }
      this.mensagem = ''
      this.$toast.sucesso(`Mensagem enviada pelo canal ${this.canal}!`)
    },
    testarToast(tipo) {
      this.$toast.mostrar(MENSAGENS_TESTE[tipo], tipo)
    },
    resumir(texto, maximo) {
      return texto.length > maximo ? texto.slice(0, maximo).trim() + '…' : texto
    },
    formatarData(iso) {
      return new Date(`${iso}T00:00:00`).toLocaleDateString('pt-BR')
    }
  }
}
</script>
