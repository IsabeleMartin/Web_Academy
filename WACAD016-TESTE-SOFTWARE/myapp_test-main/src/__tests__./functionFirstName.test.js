const { primeiroNome } = require("../utils/validacoes");

describe("primeiroNome()", () => {
    it("deve retornar o primeiro nome quando o nome completo é fornecido", () => {
        const fullName = "João da Silva";
        const result = primeiroNome(fullName);
        expect(result).toBe("João");
    })

     it("deve retornar o mesmo quando não há espaço em branco", () => {
        const name = "João";
        const result = primeiroNome(name);
        expect(result).toBe(name);
    })

     it("deve retornar o primeiro nome corretamente quando há espaço em branco no inicio", () => {
        const fullName = " João da";
        const result = primeiroNome(fullName);
        expect(result).toBe("João");
    })

     it("deve retornar o primeiro nome corretamne quando há espaço em branco no final", () => {
        const fullName = "João da Silva ";
        const result = primeiroNome(fullName);
        expect(result).toBe("João");
    })



})
