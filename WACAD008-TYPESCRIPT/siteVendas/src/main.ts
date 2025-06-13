// Definindo a interface para o Produto (base)
interface Produto {
  id: number;
  modelo: string;
  fabricante: string;
  valor: number;
}

// Interfaces para Tv , Celular e Bicicleta
interface TV extends Produto {
  resolucao: [number, number];
  polegadas: number;
}

interface Celular extends Produto {
  memoria: number;
}

interface Bicicleta extends Produto {
  aro: number;
}

// Classe Carrinho com métodos genéricos
class Carrinho {
 
  private total: number = 0; // Total do carrinho

  constructor(private produtos: Produto[] = []) {}// Produtos armazenados no carrinho) {}

  // Método para adicionar um produto ao carrinho
  adicionarProduto(produto: Produto): void {
    this.produtos.push(produto); // Adiciona o produto ao array de produtos
    this.total += produto.valor; // Atualiza o valor total
    this.atualizarResumoCarrinho(); // Atualiza o carrinho na interface
  }

  // Método para limpar o carrinho
  limparCarrinho(): void {
    this.produtos = [];
    this.total = 0;
    this.atualizarResumoCarrinho(); // Atualiza a interface ao limpar o carrinho
  }

  // Atualizar o resumo do carrinho
  private atualizarResumoCarrinho(): void {
    const cartSummary = document.getElementById('cart-summary');
    const cartTotal = document.getElementById('cart-total');
    

    if (!cartSummary || !cartTotal) {
      console.error('Elementos necessários não encontrados no DOM!');
      return; // Evita que o código quebre se os elementos não existirem
    }

    cartSummary.innerHTML = ''; // Limpa o carrinho
    

    this.produtos.forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('product-summary');
      div.innerHTML = `${produto.modelo} - R$ ${produto.valor.toFixed(2)}`;
      cartSummary.appendChild(div);
    });

    cartTotal.innerHTML = `<strong>Total: R$ ${this.total.toFixed(2)}</strong>`;
  }
}

// Criando instância do Carrinho
const carrinho = new Carrinho();

// Produtos disponíveis (TV, Celular, Bicicleta) agora com tipos específicos
const produtosDisponiveis: (TV | Celular | Bicicleta)[] = [
  {
    id: 1,
    modelo: 'TV Ultra HD',
    fabricante: 'Samsung',
    valor: 2999.99,
    resolucao: [3840, 2160],
    polegadas: 55
  },
  {
    id: 2,
    modelo: 'Celular Pro',
    fabricante: 'Apple',
    valor: 5999.99,
    memoria: 256
  },
  {
    id: 3,
    modelo: 'Bicicleta',
    fabricante: 'Caloi',
    valor: 1999.99,
    aro: 29
  }
];

function descritionProduto(produto: (TV | Celular | Bicicleta)): string {
  if('resolucao' in produto) {
    return `${produto.polegadas} polegadas, ${produto.resolucao[0]}x${produto.resolucao[1]} pixels`;
  }
  else if('memoria' in produto) {
    return `${produto.memoria} GB de memória`;
  }else{
    return `Aro ${produto.aro}`;
  }
}

// Função para criar a lista de produtos e renderizá-los no HTML
function renderizarProdutos(): void {
  const productList = document.getElementById('product-list');
  if (!productList) {
    console.error('Elemento "product-list" não encontrado!');
    return;
  }

  produtosDisponiveis.forEach(produto => {
    const productCard = document.createElement('div');
    productCard.classList.add('col', 'product-card');
    productCard.innerHTML = `
      <h5 class="card-title">${produto.modelo}</h5>
      <p class="card-text">Fabricante: ${produto.fabricante}</p>
      <p class="card-text">Descrição: ${descritionProduto(produto)}</p>
      <p class="card-text">R$ ${produto.valor.toFixed(2)}</p>
      <button class="btn btn-primary add-to-cart" data-id="${produto.id}">Adicionar ao carrinho</button>
    `;
    productList.appendChild(productCard);
  });
}

// Adicionar evento de clique nos botões de "Adicionar ao Carrinho"
function adicionarEventos(): void {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id')!);
      const produto = produtosDisponiveis.find(p => p.id === id);
      if (produto) {
        carrinho.adicionarProduto(produto); // Chama a função para adicionar o produto ao carrinho
      }
    });
  });
}

// Evento de limpar o carrinho
document.getElementById('clear-cart')!.addEventListener('click', () => {
  carrinho.limparCarrinho(); // Limpa o carrinho e atualiza a visualização
});

// Inicializando o site
document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos(); // Renderiza os produtos assim que a página é carregada
  adicionarEventos(); // Adiciona os eventos de clique para os botões
});
