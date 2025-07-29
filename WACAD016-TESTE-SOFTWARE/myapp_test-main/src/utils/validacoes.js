/**
 * Extrai o primeiro nome de uma string de nome completo.
 *
 * @param {string} nomeCompleto - O nome completo do usuário, separado por espaços.
 * @returns {string} - O primeiro nome extraído do nome completo ou o próprio nome caso não haja espaços.
 */
function primeiroNome(nomeCompleto) {
  const nomeCompletoTrimmed = nomeCompleto.trim(); // Removendo espaçoes em branco antes e depois do nome
  const espacoEmBranco = nomeCompletoTrimmed.indexOf(" ") ; // Encontrando o indice do priemiro espaço em branco

  if (espacoEmBranco === -1) return nomeCompletoTrimmed; 
  else return nomeCompletoTrimmed.slice(0, espacoEmBranco); 
  
}

/**
 * Verifica a disponibilidade de um produto em estoque com base no tipo e na quantidade desejada.
 *
 * @param {string} tipoProduto - O tipo do produto a ser verificado no estoque.
 * @param {number} quantidade - A quantidade desejada do produto a ser verificada.
 * @returns {boolean} - Retorna true se a quantidade desejada do tipo de produto especificado estiver disponível
 *                      no estoque, caso contrário retorna false.
 */
function verificarDisponibilidadeEstoque(tipoProduto, quantidade) {
  const estoque = {
    laptop: 10,
    smartphone: 20,
    headphone: 5,
    tablet: 15,
    livro: 0,
  };

  if(estoque.hasOwnProperty(tipoProduto)){
    const estoqueDisponivel = estoque[tipoProduto];
    if (estoqueDisponivel === 0 || estoqueDisponivel <= quantidade) return false;
    else return true;
  }else return false
}

/**
 * Calcula o preço total de um array de produtos em uma aplicação de e-commerce.
 *
 * @param {Array} produtos - Um array de objetos de produtos, cada um contendo as propriedades 'preco' e 'quantidade'.
 * @returns {number} - O preço total obtido multiplicando o preço de cada produto pela sua quantidade
 *                     e somando os preços individuais dos produtos.
 *
 * Exemplo de array de produtos:
 *   [
 *     { nome: 'Produto 1', preco: 10, quantidade: 2 },
 *     { nome: 'Produto 2', preco: 15, quantidade: 2 },
 *     { nome: 'Produto 3', preco: 20, quantidade: 1 }
 *   ]
 */
function calcularPrecoTotal(produtos) {
  let total = 0;
  for (let i = 0; i < produtos.length; i++) {
    total += (produtos[i].preco) * (produtos[i].quantidade);
  }
  return total;
}

module.exports = {
  primeiroNome,
  verificarDisponibilidadeEstoque,
  calcularPrecoTotal,
};
