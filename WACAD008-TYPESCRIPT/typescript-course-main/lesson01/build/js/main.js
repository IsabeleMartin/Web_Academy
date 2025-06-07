"use strict";
/* Tipos básicos em TypeScript */
let username = 'Dave';
console.log(username);
let a = 12;
let b = '8';
let c = false;
let d = 10; // desativa a verificação dos tipos
d = true;
d = 'david';
let e = 123; //Precisa ser validado antes de ser usado 
if (typeof d === 'number') {
    d.toFixed();
}
let f = null;
let g = undefined;
function mostrarMensagem() {
    console.log("Olá");
}
function erro() {
    throw new Error("Algo de errado não está certo");
}
let h = [1, 2, 3];
let i = ['Isabele', 'Martins'];
let j = [1.75, 96.0];
var k;
(function (k) {
    k[k["vermelho"] = 0] = "vermelho";
    k[k["azul"] = 1] = "azul";
    k[k["amarelo"] = 2] = "amarelo";
})(k || (k = {}));
let minhaCor = k.amarelo; // 2
let pessoa = ["Isabele", 22];
let elem_basic = [a, b, c, d, e, f, g, h, i, j, k.amarelo, k.azul, k.vermelho, minhaCor, pessoa];
document.body.textContent = elem_basic.toString();
