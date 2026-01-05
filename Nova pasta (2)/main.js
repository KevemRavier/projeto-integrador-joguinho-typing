let tempoPadrao = 10;
let tempo = tempoPadrao + 1;
let pontos = 0;
let maiorPontuacao = 0;
let funcOuNao;
let jaPerdeu = false;
let jogoComecou = false;

let palavras = [];
let palavraOriginal = '';
let ultimaPalavra = '';

const inputPalavra = document.querySelector('#input-palavra');
const palavraAtual = document.querySelector('#palavra-atual');
const telaPontos = document.querySelector('#pontos');
const telaTempo = document.querySelector('#tempo');
const mensagem = document.querySelector('#mensagem');
const segundos = document.querySelector('#segundos');
const maiorPontos = document.querySelector('#maior-pontos');

const btnReiniciar = document.getElementById('btn-reiniciar');
const btnVoltarNivel = document.getElementById('btn-voltar-nivel');

const niveis = {
  facil: {
    tempo: 10,
    palavras: ['casa', 'pato', 'bola', 'gato', 'flor', 'sol', 'mão', 'água', 'rio', 'dia', 'lua', 'céu', 'mar', 'chuva', 'vento', 'fogo', 'terra', 'muro', 'copo', 'teto', 'mel', 'peixe', 'pó', 'ar', 'som', 'luz', 'paz', 'lar', 'pão', 'sal', 'chão', 'mesa', 'cadeira', 'porta', 'janela', 'carro', 'cama', 'sapo', 'galo', 'vaca', 'gás', 'tênis', 'lápis', 'túnel', 'irmão', 'mãe', 'avô', 'avó', 'jardim', 'rosa', 'livro', 'dado', 'nuvem', 'barco', 'pedra', 'fita', 'areia', 'farol', 'vela', 'ponte', 'garfo', 'ninho', 'roda', 'trigo', 'perna', 'foca', 'uva', 'cinto', 'vidro', 'sola', 'piso', 'flauta', 'toalha', 'fada', 'carne', 'tatu', 'bico', 'bolo', 'mala', 'noz', 'rato', 'urso', 'lobo', 'leão', 'lago', 'caneta', 'fósforo', 'sino', 'mola', 'nave', 'pano', 'saco', 'vivo', 'zelo']
  },
  medio: {
    tempo: 8,
    palavras: ['menos foco', 'pica-pau', 'corra smoke', 'bom dia', 'boa noite', 'pão com ovo', 'meia molhada', 'rayssa raiana', 'bom trabalho', 'bom mas ruim', 'café frio', 'chuva ácida', 'pão seco', 'cobra voadora', 'meia furada', 'rato gamer', 'nuvem cinza', 'dedo torto', 'briga boa', 'gato bravo', 'sol quente', 'vento forte', 'lua cheia', 'fogo amigo', 'sopa fria', 'carro velho', 'banho gelado', 'sono eterno', 'pizza doce', 'relógio quebrado', 'vídeo mudo', 'livro aberto', 'planta morta', 'vidro sujo', 'pé grande', 'mente vazia', 'cão sorridente', 'cobra cansada', 'leite quente', 'cadeira mole', 'parede torta', 'voz fina', 'dente mole', 'máscara caída', 'palhaço triste', 'sombra estranha', 'calça apertada', 'vento gelado', 'feijão tropeiro', 'rato borrachudo', 'festa junina', 'bolo seco', 'feira livre', 'saco cheio', 'bola quadrada', 'chave mestra', 'sala vazia', 'rio fundo', 'pano velho', 'mala aberta', 'porta velha']
  },
  dificil: {
    tempo: 6,
    palavras: ['arroz com feijão', 'pão de queijo', 'água com gás', 'cálice de vinho', 'café com leite', 'óculos de sol', 'lápis de cor', 'carro de corrida', 'bicicleta de criança', 'livro de história', 'chave de fenda', 'martelo de borracha', 'telefone com fio', 'computador portátil', 'teclado sem fio', 'mouse com luz', 'cadeira de escritório', 'mesa de jantar', 'armário de cozinha', 'cama de casal', 'música clássica', 'tênis de mesa', 'copo de água', 'garrafa de vinho', 'saco de lixo', 'porta de vidro', 'janela de alumínio', 'teto de gesso', 'chão de madeira', 'tapete de lã', 'parede de tijolo', 'telhado de barro', 'piscina de plástico', 'churrasco de carne', 'salada de frutas', 'suco de laranja', 'pudim de leite', 'doce de abóbora', 'compota de morango', 'geleia de uva', 'chá de camomila', 'café com açúcar', 'suco de limão', 'pão com manteiga', 'arroz doce', 'bolo de chocolate', 'torta de frango', 'pizza de queijo', 'lasanha à bolonhesa', 'feijoada completa']
  }
};

const pontosTremor = [5, 14, 10, 49, 23, 62, 38, 57, 3, 52, 46, 40, 16, 68, 48, 69];
const pontosBlur = [43, 64, 21, 16, 40, 68, 51, 8, 33, 20, 25, 45, 11, 18, 58, 59, 28, 41, 35, 63, 7];
const pontosLetrasPulando = [66, 19, 44, 25, 39, 6, 18, 59, 29, 67, 17, 32, 60, 50];
const pontosDvdBounce = [4, 5, 6, 13, 14, 15, 45, 46, 47, 61, 62, 63];
const pontosTrocaCores = [9, 31, 36, 54, 42, 26, 65, 34, 70, 22, 53, 12];

let intervaloDvd = null;
let posicaoX = 0;
let posicaoY = 0;
let velocidadeX = 5;
let velocidadeY = 5;

function aplicarLetrasPulando(elemento) {
  const texto = palavraOriginal;
  elemento.innerHTML = '';
  for (let i = 0; i < texto.length; i++) {
    const span = document.createElement('span');
    if (texto[i] === ' ') {
      span.classList.add('espaco');
      span.textContent = '\u00A0';
    } else {
      span.textContent = texto[i];
    }
    span.style.setProperty('--delay', `${i * 0.05}s`);
    elemento.appendChild(span);
  }
}

function selecionarNivel(nivel) {
  const configuracao = niveis[nivel];
  palavras = configuracao.palavras;
  tempoPadrao = configuracao.tempo;
  tempo = tempoPadrao + 1;
  segundos.textContent = tempoPadrao;
  document.getElementById('tela-nivel').style.display = 'none';
  document.getElementById('tela-jogo').style.display = 'block';
  btnReiniciar.style.display = 'none';
  iniciar();
}

function iniciar() {
  mostrarPalavra();
  inputPalavra.value = '';
  mensagem.innerHTML = '';
  pontos = 0;
  telaPontos.innerHTML = pontos;
  tempo = tempoPadrao + 1;
  telaTempo.innerHTML = tempo;
  funcOuNao = true;
  jaPerdeu = false;
  jogoComecou = false;
  pararDvd();
  resetarPosicaoPalavra();
  inputPalavra.focus();
  btnReiniciar.style.display = 'none';
  palavraAtual.classList.remove('palavra-disfarce', 'blur-temp', 'tremendo');
  palavraAtual.innerHTML = palavraOriginal;
}

inputPalavra.addEventListener('input', () => {
  if (verificarPalavras()) {
    if (!jogoComecou) jogoComecou = true;
    funcOuNao = true;
    tempo = tempoPadrao + 1;
    inputPalavra.value = '';
    pontos++;
    jaPerdeu = false;

    palavraAtual.classList.remove('palavra-disfarce', 'blur-temp', 'tremendo');

    if (pontosDvdBounce.includes(pontos)) {
      iniciarDvd();
    } else {
      pararDvd();
      resetarPosicaoPalavra();
    }

    mostrarPalavra();

    if (pontosLetrasPulando.includes(pontos)) {
      aplicarLetrasPulando(palavraAtual);
    } else {
      palavraAtual.innerHTML = palavraOriginal;
    }

    if (pontosTrocaCores.includes(pontos)) {
      palavraAtual.classList.add('palavra-disfarce');
    }

    if (pontosBlur.includes(pontos)) {
      palavraAtual.classList.add('blur-temp');
      setTimeout(() => palavraAtual.classList.remove('blur-temp'), 3500);
    }

    if (pontosTremor.includes(pontos)) {
      palavraAtual.classList.add('tremendo');
    }
  }
  telaPontos.innerHTML = Math.max(0, pontos);
  if (pontos > maiorPontuacao) {
    maiorPontuacao = pontos;
    maiorPontos.innerHTML = maiorPontuacao;
  }
});

function verificarPalavras() {
  if (inputPalavra.value === palavraOriginal) {
    mensagem.innerHTML = 'Correto!!';
    mensagem.style.color = 'green';
    return true;
  } else {
    mensagem.innerHTML = '';
    return false;
  }
}

function mostrarPalavra() {
  let novaPalavra;
  do {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    novaPalavra = palavras[indiceAleatorio];
  } while (novaPalavra === ultimaPalavra && palavras.length > 1);

  ultimaPalavra = novaPalavra;
  palavraOriginal = novaPalavra;
  palavraAtual.textContent = palavraOriginal;
}

setInterval(() => {
  if (!jogoComecou) return;
  if (tempo > 0) tempo--;
  else if (tempo === 0) funcOuNao = false;
  telaTempo.innerHTML = tempo;
}, 1000);

setInterval(() => {
  if (!funcOuNao && tempo === 0 && !jaPerdeu && jogoComecou) {
    jaPerdeu = true;
    mensagem.innerHTML = 'Perdeu o Foco!!!';
    mensagem.style.color = 'red';
    pontos = 0;
    telaPontos.innerHTML = pontos;
    tempo = tempoPadrao + 1;
    jogoComecou = false;
    mostrarPalavra();
    pararDvd();
    resetarPosicaoPalavra();
    btnReiniciar.style.display = 'inline-block';
  }
}, 50);

function iniciarDvd() {
  if (intervaloDvd) return;
  posicaoX = 0;
  posicaoY = 0;
  palavraAtual.style.position = 'fixed';
  intervaloDvd = setInterval(() => {
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;
    const larguraPalavra = palavraAtual.offsetWidth;
    const alturaPalavra = palavraAtual.offsetHeight;
    posicaoX += velocidadeX;
    posicaoY += velocidadeY;
    if (posicaoX + larguraPalavra >= larguraJanela) {
      posicaoX = larguraJanela - larguraPalavra;
      velocidadeX = -velocidadeX;
    }
    if (posicaoX <= 0) {
      posicaoX = 0;
      velocidadeX = -velocidadeX;
    }
    if (posicaoY + alturaPalavra >= alturaJanela) {
      posicaoY = alturaJanela - alturaPalavra;
      velocidadeY = -velocidadeY;
    }
    if (posicaoY <= 0) {
      posicaoY = 0;
      velocidadeY = -velocidadeY;
    }
    palavraAtual.style.left = posicaoX + 'px';
    palavraAtual.style.top = posicaoY + 'px';
  }, 30);
}

function pararDvd() {
  if (intervaloDvd) {
    clearInterval(intervaloDvd);
    intervaloDvd = null;
    palavraAtual.style.position = 'static';
    palavraAtual.style.left = '';
    palavraAtual.style.top = '';
  }
}

function resetarPosicaoPalavra() {
  palavraAtual.style.position = 'static';
  palavraAtual.style.left = '';
  palavraAtual.style.top = '';
}

btnReiniciar.addEventListener('click', () => {
  iniciar();
  btnReiniciar.style.display = 'none';
  inputPalavra.focus();
});

btnVoltarNivel.addEventListener('click', () => {
  document.getElementById('tela-jogo').style.display = 'none';
  document.getElementById('tela-nivel').style.display = 'block';
  btnReiniciar.style.display = 'none';
  resetarPosicaoPalavra();
  pontos = 0;
  telaPontos.innerHTML = pontos;
  tempo = tempoPadrao + 1;
  telaTempo.innerHTML = tempo;
  mensagem.innerHTML = '';
  inputPalavra.value = '';
  pararDvd();
});
