"use strict";
// convert to more or less specific 
let a = 'hello';
let b = a; // less specific 
let c = a; // more specific 
let d = 'world';
let e = 'world';
const addOrConcat = (a, b, c) => {
    if (c === 'add')
        return a + b;
    return '' + a + b;
};
// Força o tipo de retorno
let myVal = addOrConcat(2, 2, 'concat');
// Be careful! TS sees no problem - but a string is returned
let nextVal = addOrConcat(2, 2, 'concat');
//10 as string
10;
// The DOM 
const img = document.querySelector('img');
const myImg = document.getElementById('img');
const nextImg = document.getElementById('img');
console.log(img.alt);
img.src = "https://i.pinimg.com/236x/6a/bd/64/6abd646741ecfffa74af78499cb914c2.jpg";
// muda a localização de onde vem a imagem
myImg.src = "https://img.freepik.com/fotos-gratis/gotas-de-oleo-de-arco-iris-sobre-um-fundo-abstrato-de-superficie-de-agua_23-2148290071.jpg?semt=ais_hybrid&w=740";
