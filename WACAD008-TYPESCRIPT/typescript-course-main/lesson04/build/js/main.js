"use strict";
// Literal types
let myName;
// só é permitido esses 3 tipos
let userName;
userName = 'Amy';
// functions 
// definir o tipo de retorno
const add = (a, b) => {
    return a + b;
};
// Não retorna nada
const logMsg = (message) => {
    console.log(message);
};
logMsg('Hello!');
logMsg(add(2, 3));
// qual e a diferença dessa pra add
let subtract = function (c, d) {
    return c - d;
};
// interface mathFunction {
//     (a: number, b: number): number
// }
// Foi utilizado a função definida acima
let multiply = function (c, d) {
    return c * d;
};
logMsg(multiply(2, 2));
// optional parameters              //opicional
const addAll = (a, b, c) => {
    if (typeof c !== 'undefined') { // evita somar com undefined
        return a + b + c;
    }
    return a + b;
};
// default param value
const sumAll = (a = 10, b, c = 2) => {
    return a + b + c;
};
logMsg(addAll(2, 3, 2));
logMsg(addAll(2, 3));
logMsg(sumAll(2, 3));
logMsg(sumAll(undefined, 3)); // utilizou os valores padrão + o def
// Rest Parameters 
// Permite uma quantidade de argumentos extras
const total = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr);
};
logMsg(total(10, 2, 8));
// never: função infinita ou lança erro
const createError = (errMsg) => {
    throw new Error(errMsg);
};
console.log("\n infinit test \n");
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100) {
            createError("Deu pau");
        }
    }
};
// custom type guard 
const isNumber = (value) => {
    return typeof value === 'number'
        ? true : false;
};
// use of the never type 
const numberOrString = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (isNumber(value))
        return 'number';
    return createError('This should never happen!');
};
