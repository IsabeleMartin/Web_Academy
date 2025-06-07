/* Tipos básicos em TypeScript */

let username = 'Dave' 
console.log(username)

let a: number = 12
let b: string = '8'
let c: boolean = false
let d: any = 10     // desativa a verificação dos tipos
    d = true
    d = 'david'
let e: unknown = 123    //Precisa ser validado antes de ser usado 
if(typeof d === 'number'){
    d.toFixed();
}

let f: null = null;
let g: undefined = undefined;

function mostrarMensagem():void { // funções que não retornam nada
    console.log("Olá");
}

function erro(): never {  // funções que nunca terminam ou sempre lançam erro
    throw new Error("Algo de errado não está certo");
}

let h: number[] = [1, 2, 3];
let i: string[] = ['Isabele', 'Martins']
let j: Array<number> = [1.75, 96.0]

enum k {
    vermelho,
    azul,
    amarelo
}

let minhaCor: k = k.amarelo; // 2
let pessoa: [string, number] = ["Isabele",22];

let elem_basic = [a,b,c,d,e,f,g,h,i,j,k.amarelo,k.azul,k.vermelho, minhaCor, pessoa];

document.body.textContent = elem_basic.toString(); // insere os elem_basic no body do arquivo html.
