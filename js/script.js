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
        BRL: { nome: 'Real (BRL)', simbolo: 'R$' },
        USD: { nome: 'Dólar (USD)', simbolo: '$' },
        EUR: { nome: 'Euro (EUR)', simbolo: '€' },
        GBP: { nome: 'Libra Esterlina (GBP)', simbolo: '£' },
        JPY: { nome: 'Iene Japonês (JPY)', simbolo: '¥' },
        ARS: { nome: 'Peso Argentino (ARS)', simbolo: '$' }
    }
};

// Variável para armazenar taxas de câmbio
let taxasCambio = {};
let ultimaAtualizacao = null;

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
// FUNÇÕES DE API DE MOEDAS
// ============================================

// Buscar taxas de câmbio
async function buscarTaxasCambio() {
    try {
        // Mostrar loading
        mostrarLoadingMoeda(true);
        
        // Buscar da API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
        const data = await response.json();
        
        // Armazenar taxas
        taxasCambio = data.rates;
        ultimaAtualizacao = new Date();
        
        console.log('✅ Taxas de câmbio atualizadas:', taxasCambio);
        
        // Esconder loading
        mostrarLoadingMoeda(false);
        
        // Se estiver na aba de moeda, converter
        if (categoriaAtiva === 'moeda' && valorOrigem.value) {
            converter();
        }
        
    } catch (error) {
        console.error('❌ Erro ao buscar taxas:', error);
        mostrarLoadingMoeda(false);
        mostrarErroMoeda();
    }
}

// Converter moedas usando API
function converterMoeda(valor, de, para) {
    // Se não tiver taxas, retornar 0
    if (!taxasCambio || Object.keys(taxasCambio).length === 0) {
        return 0;
    }
    
    // Se as moedas forem iguais
    if (de === para) {
        return valor;
    }
    
    // Converter de BRL para a moeda destino
    if (de === 'BRL') {
        return valor * taxasCambio[para];
    }
    
    // Converter de qualquer moeda para BRL
    if (para === 'BRL') {
        return valor / taxasCambio[de];
    }
    
    // Converter entre duas moedas não-BRL
    // Primeiro converte para BRL, depois para a moeda destino
    const valorEmBRL = valor / taxasCambio[de];
    return valorEmBRL * taxasCambio[para];
}

// Mostrar/esconder loading
function mostrarLoadingMoeda(mostrar) {
    const resultValue = resultadoElement.querySelector('.result-value');
    if (mostrar) {
        resultValue.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
}

// Mostrar erro
function mostrarErroMoeda() {
    const resultValue = resultadoElement.querySelector('.result-value');
    resultValue.textContent = 'Erro ao carregar';
    
    // Criar botão de tentar novamente (se não existir)
    if (!document.getElementById('btn-recarregar-moeda')) {
        const btnRecarregar = document.createElement('button');
        btnRecarregar.id = 'btn-recarregar-moeda';
        btnRecarregar.className = 'btn-recarregar';
        btnRecarregar.innerHTML = '<i class="fas fa-redo"></i> Tentar Novamente';
        btnRecarregar.onclick = buscarTaxasCambio;
        resultadoElement.parentElement.appendChild(btnRecarregar);
    }
}

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

// Inicializar aplicação
function init() {
    preencherOpcoes(categoriaAtiva);
    addEventListeners();
    
    // Buscar taxas de câmbio ao carregar
    buscarTaxasCambio();
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
    
    // Se mudou para moeda E ainda não tem taxas, buscar
    if (categoriaAtiva === 'moeda' && Object.keys(taxasCambio).length === 0) {
        buscarTaxasCambio();
    }
    
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
            resultado = converterPorFator(valor, de, para);
            break;
        case 'temperatura':
            resultado = converterTemperatura(valor, de, para);
            break;
        case 'moeda':
            resultado = converterMoeda(valor, de, para);
            break;
        default:
            resultado = 0;
    }
    
    // Mostrar resultado
    mostrarResultado(resultado);
}

// Conversão por fator (comprimento, peso)
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
    // Formatar número
    let valorFormatado;
    
    // Para moedas, usar 2 casas decimais
    if (categoriaAtiva === 'moeda') {
        valorFormatado = Number(valor.toFixed(2)).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        valorFormatado = Number(valor.toFixed(6)).toString();
    }
    
    // Pegar nome da unidade destino
    const unidadeNome = unidades[categoriaAtiva][unidadeDestino.value].nome;
    
    // Extrair sigla
    let unidadeSigla;
    if (categoriaAtiva === 'moeda') {
        unidadeSigla = unidades.moeda[unidadeDestino.value].simbolo || unidadeDestino.value;
    } else {
        const sigla = unidadeNome.match(/\(([^)]+)\)/);
        unidadeSigla = sigla ? sigla[1] : unidadeNome.split(' ')[0];
    }
    
    // Atualizar DOM
    resultadoElement.querySelector('.result-value').textContent = valorFormatado;
    resultadoElement.querySelector('.result-unit').textContent = unidadeSigla;
    
    // Mostrar info de atualização (só em moeda)
    const infoMoeda = document.getElementById('info-moeda');
    if (infoMoeda) {
        if (categoriaAtiva === 'moeda' && ultimaAtualizacao) {
            infoMoeda.style.display = 'block';
            const horaAtual = ultimaAtualizacao.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
            document.getElementById('texto-atualizacao').textContent = 
                `Taxas atualizadas às ${horaAtual}`;
        } else {
            infoMoeda.style.display = 'none';
        }
    }
    
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
// ATUALIZAÇÃO AUTOMÁTICA DE TAXAS (A CADA 1 HORA)
// ============================================

setInterval(() => {
    if (Object.keys(taxasCambio).length > 0) {
        console.log('🔄 Atualizando taxas de câmbio automaticamente...');
        buscarTaxasCambio();
    }
}, 3600000); // 1 hora = 3600000 milissegundos

// ============================================
// INICIALIZAR
// ============================================

init();