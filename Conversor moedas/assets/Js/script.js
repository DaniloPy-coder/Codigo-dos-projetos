// Função para esconder a imagem em telas menores que 768px (tablets e smartphones)
function hideImageOnSmallScreens() {
  const imgSection = document.getElementById('img');

  // Verifica se a largura da janela é menor que 768px
  if (window.innerWidth < 768) {
    imgSection.style.display = 'none'; // Esconde a imagem
  } else {
    imgSection.style.display = 'flex'; // Mostra a imagem em telas maiores
  }
}

// Executa a função ao carregar a página
window.onload = hideImageOnSmallScreens;

// Executa a função sempre que a janela for redimensionada
window.onresize = hideImageOnSmallScreens;

// Função de conversão de moedas
document.getElementById('converter-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Previne o recarregamento da página ao submeter o formulário

  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  if (isNaN(amount) || amount <= 0) {
    alert('Por favor, insira um valor válido.');
    return;
  }

  // URL da API de taxas de câmbio (substitua por sua API real)
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency];
      if (rate) {
        const result = (amount * rate).toFixed(2);
        document.getElementById('result').textContent =
          `${amount} ${fromCurrency} equivale a ${result} ${toCurrency}`;
      } else {
        document.getElementById('result').textContent =
          'Conversão de moeda não disponível.';
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      document.getElementById('result').textContent = 'Erro ao buscar dados de conversão.';
    });
});
