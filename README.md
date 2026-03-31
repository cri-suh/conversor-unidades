# 🧮 Conversor de Unidades Multifuncional

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📖 Sobre o Projeto

Aplicação web responsiva para conversão rápida entre diferentes unidades de medida, com destaque para a **conversão de moedas em tempo real** através de integração com API.

**🔗 [Ver Projeto Online](https://github.com/cri-suh/conversor-unidades.git)** _(substitua pelo seu link)_

---

## ✨ Funcionalidades

- ✅ **Conversão em Tempo Real** - Resultados instantâneos conforme você digita
- 💱 **API de Moedas** - Cotação atualizada automaticamente via ExchangeRate API
- 🔄 **Troca Rápida** - Inverta origem e destino com um clique
- 📋 **Copiar Resultado** - Copie o valor convertido facilmente
- 📱 **Design Responsivo** - Funciona perfeitamente em mobile e desktop
- 🎨 **Interface Moderna** - Design limpo e intuitivo com animações suaves
- ⏰ **Atualização Automática** - Taxas de câmbio atualizadas a cada hora

---

## 🛠️ Categorias Disponíveis

### 📏 Comprimento
- Metro, Quilômetro, Centímetro, Milímetro
- Milha, Pé, Polegada

### ⚖️ Peso
- Quilograma, Grama, Miligrama, Tonelada
- Libra, Onça

### 🌡️ Temperatura
- Celsius, Fahrenheit, Kelvin

### 💰 Moeda (COM COTAÇÃO EM TEMPO REAL 🔥)
- Real (BRL), Dólar (USD), Euro (EUR)
- Libra Esterlina (GBP), Iene (JPY), Peso Argentino (ARS)
- **Taxas atualizadas via API ExchangeRate**

---

## 🚀 Como Usar

1. Acesse o [projeto online](https://conversor-unidades-neon.vercel.app/)
2. Selecione a categoria de conversão (abas no topo)
3. Digite o valor a ser convertido
4. Escolha as unidades de origem e destino
5. Veja o resultado em tempo real!
6. Para moedas: taxas são buscadas automaticamente da API

---

## 💻 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e responsividade
  - Flexbox e Grid Layout
  - Variáveis CSS
  - Animações e transições
- **JavaScript Vanilla** - Lógica e interatividade
  - Manipulação do DOM
  - Event Listeners
  - Async/Await para API
  - LocalStorage _(futuro)_
- **API ExchangeRate** - Cotação de moedas em tempo real
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Poppins)

---

## 📂 Estrutura do Projeto
```
conversor-unidades/
│
├── index.html          # Estrutura HTML
├── css/
│   └── style.css       # Estilos e responsividade
├── js/
│   └── script.js       # Lógica JavaScript + API
├── assets/             # Imagens e recursos
└── README.md           # Documentação
```

---

## 🎯 Aprendizados

Este projeto foi desenvolvido como parte da minha transição de carreira da logística para desenvolvimento front-end. Principais aprendizados:

- **Integração com APIs externas** - Consumo de API REST com fetch e async/await
- **Organização de código JavaScript** - Funções reutilizáveis e código limpo
- **Manipulação avançada do DOM** - Criação dinâmica de elementos
- **Design responsivo mobile-first** - Layout adaptável para todos os dispositivos
- **Tratamento de eventos e validações** - Input em tempo real
- **Implementação de UX/UI intuitiva** - Feedback visual e loading states
- **Tratamento de erros** - Try/catch e mensagens amigáveis ao usuário

---

## 🔮 Melhorias Futuras

- [ ] Adicionar mais categorias (armazenamento, tempo, velocidade, área)
- [ ] Histórico de conversões com LocalStorage
- [ ] Favoritar conversões mais usadas
- [ ] Modo escuro (Dark Mode)
- [ ] PWA (Progressive Web App) para uso offline
- [ ] Gráficos de variação cambial
- [ ] Suporte a múltiplos idiomas
- [ ] Notificações de variação de moedas

---

## 📸 Preview

![Conversor de Unidades](assets/preview.png) _(adicione screenshot depois)_

---

## 🚀 Como Rodar Localmente
```bash
# Clone o repositório
git clone https://github.com/cri-suh/conversor-unidades.git

# Entre na pasta
cd conversor-unidades

# Abra o index.html no navegador
# ou use um servidor local como Live Server (VS Code)
```

Não há dependências! Basta abrir o `index.html` no navegador.

---

## 🌐 Deploy

O projeto está hospedado no **Vercel**:
- 🔗 [https://cri-suh.github.io/conversor-unidades/](https://conversor-unidades-neon.vercel.app/)

Para fazer deploy do seu fork:
1. Faça fork do repositório
2. Vá em Settings → Pages
3. Selecione branch `main` e pasta `/ (root)`
4. Aguarde alguns minutos
5. Acesse `https://seu-usuario.github.io/conversor-unidades/`

---

## 👨‍💻 Autor

**Cristiano**

Profissional em transição de carreira da logística para desenvolvimento de software, atualmente focado em front-end e aprendendo tecnologias como HTML, CSS, JavaScript e explorando Inteligência Artificial.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/cristiano-sg)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cri-suh)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

---

## 🤝 Contribuições

Feedbacks e sugestões são sempre bem-vindos! 

- 🐛 Encontrou um bug? Abra uma [issue](https://github.com/cri-suh/conversor-unidades/issues)
- 💡 Tem uma sugestão? Abra uma [issue](https://github.com/cri-suh/conversor-unidades/issues) ou faça um pull request
- ⭐ Gostou do projeto? Dê uma estrela!

---

## 🙏 Agradecimentos

- [ExchangeRate-API](https://www.exchangerate-api.com/) - API de cotação de moedas
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Google Fonts](https://fonts.google.com/) - Tipografia

---

⭐ **Se este projeto te ajudou de alguma forma, considere dar uma estrela!**

---

**Desenvolvido com 💜 por [Cristiano](https://github.com/cri-suh)**