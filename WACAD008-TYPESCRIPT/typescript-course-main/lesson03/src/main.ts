let stringArr = ['one', 'hey', 'Dave']

let guitars = ['Strat', 'Les Paul', 5150]

let mixedData = ['EVH', 1984, true]

console.log(stringArr,guitars,mixedData);

stringArr[0] = 'John'   // substitui o primeiro elem da lista

console.log("\n Subs stringArr");
console.log(stringArr);

stringArr.push('hey')  // insere no final

console.log("\n Inserindo em stringArr");
console.log(stringArr);


guitars[0] = 1984

console.log("\n Subs guitars");
console.log(guitars);


guitars.unshift('Jim') // insere no inicio 

console.log("\n Modify guitars");
console.log(guitars);

let test = []
let bands: string[] = []
bands.push('Van Halen')

// Tuple 
let myTuple: [string, number, boolean] = ['Dave', 42, true]

let mixed = ['John', 1, false]

myTuple[1] = 42

// Objects: representa qualquer coisa que não seja null ou indefined
let myObj: object
myObj = []
console.log(typeof myObj)
myObj = bands
myObj = {}

const exampleObj = { // objeto literal ( o TS já definio os atributos desse objeto)
    prop1: 'Dave', //string
    prop2: true,   // boolean
}

exampleObj.prop1 = 'John'


interface Guitarist {  // define o formato do objeto
    name?: string,     // com o ? o atibuto name é opcional
    active: boolean,
    albums: (string | number)[]
}

let evh: Guitarist = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}

let jp: Guitarist = {
    active: true,
    albums: ['I', 'II', 'IV']
}

const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}!`
    }
    return 'Hello!'
}

console.log(evh, jp)
console.log(typeof(jp))

// Enums 
// "Unlike most TypeScript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime."

// associa nomes a valores, basta definir apenas o primeiro
enum Grade { 
    U = 1,
    D,
    C,
    B,
    A,
}

console.log(Grade.A) // 5 