"use strict";
let stringArr = ['one', 'hey', 'Dave'];
let guitars = ['Strat', 'Les Paul', 5150];
let mixedData = ['EVH', 1984, true];
console.log(stringArr, guitars, mixedData);
stringArr[0] = 'John'; // substitui o primeiro elem da lista
console.log("\n Subs stringArr");
console.log(stringArr);
stringArr.push('hey'); // insere no final
console.log("\n Inserindo em stringArr");
console.log(stringArr);
guitars[0] = 1984;
console.log("\n Subs guitars");
console.log(guitars);
guitars.unshift('Jim'); // insere no inicio 
console.log("\n Modify guitars");
console.log(guitars);
let test = [];
let bands = [];
bands.push('Van Halen');
// Tuple 
let myTuple = ['Dave', 42, true];
let mixed = ['John', 1, false];
myTuple[1] = 42;
// Objects: representa qualquer coisa que não seja null ou indefined
let myObj;
myObj = [];
console.log(typeof myObj);
myObj = bands;
myObj = {};
const exampleObj = {
    prop1: 'Dave', //string
    prop2: true, // boolean
};
exampleObj.prop1 = 'John';
let evh = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
};
let jp = {
    active: true,
    albums: ['I', 'II', 'IV']
};
const greetGuitarist = (guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}!`;
    }
    return 'Hello!';
};
console.log(evh, jp);
console.log(typeof (jp));
// Enums 
// "Unlike most TypeScript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime."
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 1] = "U";
    Grade[Grade["D"] = 2] = "D";
    Grade[Grade["C"] = 3] = "C";
    Grade[Grade["B"] = 4] = "B";
    Grade[Grade["A"] = 5] = "A";
})(Grade || (Grade = {}));
console.log(Grade.A);
