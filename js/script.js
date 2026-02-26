// ============================================
// DADOS DAS UNIDADES
// ============================================

const unidades = {
    comprimento: {
        metro: { nome: 'Metro (m)', fator: 1 },
        kilometro: { nome: 'Quilômetro (km)', fator: 0.001 },
        centimetro: { nome: 'Centímetro (cm)', fator: 100 },
        milimetro: { nome: 'Milímetro (mm)', fator: 1000 },
        milha: { nome: 'Milha', fator: 0.000621371 },
        pe: { nome: 'Pé (ft)', fator: 3.28084 },
        polegada: { nome: 'Polegada (in)', fator: 39.3701 }
    },
    peso: {
        quilograma: { nome: 'Quilograma (kg)', fator: 1 },
        grama: { nome: 'Grama (g)', fator: 1000 },
        miligrama: { nome: 'Miligrama (mg)', fator: 1000000 },
        tonelada: { nome: 'Tonelada (t)', fator: 0.001 },
        libra: { nome: 'Libra (lb)', fator: 2.20462 },
        onca: { nome: 'Onça (oz)', fator: 35.274 }
    },
    temperatura: {
        celsius: { nome: 'Celsius (°C)' },
        fahrenheit: { nome: 'Fahrenheit (°F)' },
        kelvin: { nome: 'Kelvin (K)' }
    },
    moeda: {
        real: { nome: 'Real (BRL)', fator: 1 },
        dolar: { nome: 'Dólar (USD)', fator: 0.20 },
        euro: { nome: 'Euro (EUR)', fator: 0.18 }
    }
};

// ============================================
// ELEMENTOS DO DOM
// ============================================

const tabBtns = document.querySelectorAll('.tab-btn');
const valorOrigem = document.getElementById('valor-origem');
const unidadeOrigem = document.getElementById('unidade-origem');
const unidadeDestino = document.getElementById('unidade-destino');
const resultadoElement = document.getElementById('resultado');
const btnTrocar = document.getElementById('btn-trocar');
const btnLimpar = document.getElementById('btn-limpar');
const btnCopiar = document.getElementById('btn-copiar');

// Categoria ativa inicial
let categoriaAtiva = 'comprimento';

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

// Inicializar aplicação
function init() {
    preencherOpcoes(categoriaAtiva);
    addEventListeners();
}

// Preencher opções dos selects
function preencherOpcoes(categoria) {
    // Limpar selects
    unidadeOrigem.innerHTML = '';
    unidadeDestino.innerHTML = '';
    
    // Preencher com opções da categoria
    const opcoes = unidades[categoria];
    
    for (const [chave, dados] of Object.entries(opcoes)) {
        // Opção para origem
        const optOrigem = document.createElement('option');
        optOrigem.value = chave;
        optOrigem.textContent = dados.nome;
        unidadeOrigem.appendChild(optOrigem);
        
        // Opção para destino
        const optDestino = document.createElement('option');
        optDestino.value = chave;
        optDestino.textContent = dados.nome;
        unidadeDestino.appendChild(optDestino);
    }
    
    // Selecionar segunda opção no destino (se existir)
    if (unidadeDestino.options.length > 1) {
        unidadeDestino.selectedIndex = 1;
    }
}

// Event Listeners
function addEventListeners() {
    // Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => trocarCategoria(btn));
    });
    
    // Input e selects
    valorOrigem.addEventListener('input', converter);
    unidadeOrigem.addEventListener('change', converter);
    unidadeDestino.addEventListener('change', converter);
    
    // Botões
    btnTrocar.addEventListener('click', trocarUnidades);
    btnLimpar.addEventListener('click', limpar);
    btnCopiar.addEventListener('click', copiarResultado);
}

// Trocar categoria
function trocarCategoria(btn) {
    // Remover active de todos
    tabBtns.forEach(b => b.classList.remove('active'));
    
    // Adicionar active no clicado
    btn.classList.add('active');
    
    // Atualizar categoria ativa
    categoriaAtiva = btn.dataset.category;
    
    // Preencher novas opções
    preencherOpcoes(categoriaAtiva);
    
    // Limpar
    limpar();
}

// ============================================
// FUNÇÃO DE CONVERSÃO
// ============================================

function converter() {
    // Pegar valor digitado
    const valor = parseFloat(valorOrigem.value);
    
    // Se não for número válido, mostrar 0
    if (isNaN(valor) || valor === '') {
        mostrarResultado(0);
        return;
    }
    
    // Pegar unidades selecionadas
    const de = unidadeOrigem.value;
    const para = unidadeDestino.value;
    
    let resultado;
    
    // Converter baseado na categoria
    switch(categoriaAtiva) {
        case 'comprimento':
        case 'peso':
        case 'moeda':
            resultado = converterPorFator(valor, de, para);
            break;
        case 'temperatura':
            resultado = converterTemperatura(valor, de, para);
            break;
        default:
            resultado = 0;
    }
    
    // Mostrar resultado
    mostrarResultado(resultado);
}

// Conversão por fator (comprimento, peso, moeda)
function converterPorFator(valor, de, para) {
    const opcoes = unidades[categoriaAtiva];
    
    // Converter para unidade base
    const valorBase = valor / opcoes[de].fator;
    
    // Converter para unidade destino
    const resultado = valorBase * opcoes[para].fator;
    
    return resultado;
}

// Conversão de temperatura
function converterTemperatura(valor, de, para) {
    let celsius;
    
    // Primeiro converte tudo para Celsius
    switch(de) {
        case 'celsius':
            celsius = valor;
            break;
        case 'fahrenheit':
            celsius = (valor - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = valor - 273.15;
            break;
    }
    
    // Depois converte de Celsius para o destino
    switch(para) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
        default:
            return celsius;
    }
}

// ============================================
// MOSTRAR RESULTADO
// ============================================

function mostrarResultado(valor) {
    // Formatar número (máximo 6 casas decimais, remover zeros desnecessários)
    const valorFormatado = Number(valor.toFixed(6)).toString();
    
    // Pegar nome da unidade destino
    const unidadeNome = unidades[categoriaAtiva][unidadeDestino.value].nome;
    
    // Extrair apenas a sigla (ex: "Metro (m)" -> "m")
    const sigla = unidadeNome.match(/\(([^)]+)\)/);
    const unidadeSigla = sigla ? sigla[1] : unidadeNome.split(' ')[0];
    
    // Atualizar DOM
    resultadoElement.querySelector('.result-value').textContent = valorFormatado;
    resultadoElement.querySelector('.result-unit').textContent = unidadeSigla;
    
    // Animação
    resultadoElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultadoElement.style.transform = 'scale(1)';
    }, 200);
}

// ============================================
// TROCAR UNIDADES
// ============================================

function trocarUnidades() {
    // Salvar valores atuais
    const valorAtual = valorOrigem.value;
    const origemAtual = unidadeOrigem.value;
    const destinoAtual = unidadeDestino.value;
    
    // Trocar
    unidadeOrigem.value = destinoAtual;
    unidadeDestino.value = origemAtual;
    
    // Pegar resultado atual e colocar no input
    const resultadoAtual = resultadoElement.querySelector('.result-value').textContent;
    valorOrigem.value = resultadoAtual;
    
    // Converter novamente
    converter();
    
    // Animação no botão
    btnTrocar.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        btnTrocar.style.transform = 'rotate(0deg)';
    }, 300);
}

// ============================================
// LIMPAR
// ============================================

function limpar() {
    valorOrigem.value = '';
    mostrarResultado(0);
    valorOrigem.focus();
}

// ============================================
// COPIAR RESULTADO
// ============================================

function copiarResultado() {
    const valorResultado = resultadoElement.querySelector('.result-value').textContent;
    const unidadeResultado = resultadoElement.querySelector('.result-unit').textContent;
    const textoCompleto = `${valorResultado} ${unidadeResultado}`;
    
    // Copiar para clipboard
    navigator.clipboard.writeText(textoCompleto).then(() => {
        // Feedback visual
        const iconOriginal = btnCopiar.innerHTML;
        btnCopiar.innerHTML = '<i class="fas fa-check"></i>';
        btnCopiar.style.background = 'rgba(34, 197, 94, 0.3)';
        
        setTimeout(() => {
            btnCopiar.innerHTML = iconOriginal;
            btnCopiar.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 1500);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Não foi possível copiar o resultado');
    });
}

// ============================================
// ADICIONAR TRANSIÇÕES NO CSS
// ============================================

resultadoElement.style.transition = 'transform 0.2s ease';
btnTrocar.style.transition = 'transform 0.3s ease';

// ============================================
// INICIALIZAR
// ============================================

init();