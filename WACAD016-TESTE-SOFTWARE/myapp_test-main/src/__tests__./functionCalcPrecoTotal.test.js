const { calcularPrecoTotal } = require("../utils/validacoes");

describe("calcularPrecoTotal()", () => {
    it("Lista vazia deve retornar 0", () => {
        const produtos = {};
        const result = calcularPrecoTotal(produtos);
        expect(result).toBe(0);
    });

    it("Se dois ou mais do mesmo produto, deve haver multiplicação precoxquantidade", () =>{
        const produtos = {nome: 'Produto 1', preco: 10, quantidade: 2 };
        const result = calcularPrecoTotal(produtos);
        let esperado =  0
        for(let i = 0; i < produtos.lengh; i++){
           esperado += produtos[i].preco * produtos[i].quantidade;
        }
        expect(result).toBe(esperado);
    });

    it("Se existe vários produtos, retorna a soma precoXquantidade de cada produto", () =>{
        const produtos = [{nome: 'Produto 1', preco: 10, quantidade: 2 }, {nome: 'Produto 2', preco: 20, quantidade: 4 }];
        let esperado = 0; 
        for (let i = 0; i < produtos.length; i++) { 
            esperado += produtos[i].preco * produtos[i].quantidade;  
        }
        const result = calcularPrecoTotal(produtos);  
        console.log(esperado);  
        expect(result).toBe(esperado);  
    });
})