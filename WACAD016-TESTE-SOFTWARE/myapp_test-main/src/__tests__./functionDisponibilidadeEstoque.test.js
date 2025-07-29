const { verificarDisponibilidadeEstoque } = require('../utils/validacoes');

describe("verificarDisponibilidadeEstoque()", () => {
    it("deve retornar true quando a quantidade desejada do tipo de produto especificado estiver disponível no estoque", () => {
        const tipoProduto = "laptop";
        const quantidade = 5;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(true);
    });

    it("deve retornar false quando a quantidade desejada do tipo de produto especificado for maior do que o disponível no estoque", () => {
        const tipoProduto = "laptop";
        const quantidade = 29;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result). toBe(false);
    });

    it("deve retornar false quando a quantidade desejada do produto não estiver disponível do estoque", () => {
        const tipoProduto = "livro";
        const quantidade = 3;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(false);
    })

    it("produto inexistente deve retornar false", () => {
        const tipoProduto = "geladeira";
        const quantidade = 4;
        const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
        expect(result).toBe(false);
    })
})