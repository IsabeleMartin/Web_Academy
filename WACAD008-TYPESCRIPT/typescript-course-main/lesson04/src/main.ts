// Type Aliases 
type stringOrNumber = string | number      // Apelidos para tipos 

type stringOrNumberArray = (string | number)[]

type Guitarist = {
    name?: string,
    active: boolean,
    albums: stringOrNumberArray
}

type UserId = stringOrNumber

// Literal types
let myName: 'Dave'
// só é permitido esses 3 tipos
let userName: 'Dave' | 'John' | 'Amy' 
userName = 'Amy'

// functions 

// definir o tipo de retorno
const add = (a: number, b: number): number => { 
    return a + b
}

// Não retorna nada
const logMsg = (message: any): void => { 
    console.log(message)
}

logMsg('Hello!')
logMsg(add(2, 3))


// qual e a diferença dessa pra add
let subtract = function (c: number, d: number): number {
    return c - d
}

type mathFunction = (a: number, b: number) => number
// interface mathFunction {
//     (a: number, b: number): number
// }

// Foi utilizado a função definida acima
let multiply: mathFunction = function (c, d) { 
    return c * d
}

logMsg(multiply(2, 2))

// optional parameters              //opicional
const addAll = (a: number, b: number, c?: number): number => {
    if (typeof c !== 'undefined') { // evita somar com undefined
        return a + b + c
    }
    return a + b
}

// default param value
const sumAll = (a: number = 10, b: number, c: number = 2): number => {
    return a + b + c
}

logMsg(addAll(2, 3, 2))
logMsg(addAll(2, 3))
logMsg(sumAll(2, 3))
logMsg(sumAll(undefined, 3)) // utilizou os valores padrão + o def

// Rest Parameters 
// Permite uma quantidade de argumentos extras
const total = (a: number, ...nums: number[]): number => {
    return a + nums.reduce((prev, curr) => prev + curr)
}

logMsg(total(10, 2, 8))

// never: função infinita ou lança erro
const createError = (errMsg: string): never => {
    throw new Error(errMsg)
}

console.log("\n infinit test \n")
const infinite = () => {
    let i: number = 1
    while (true) {
        
        i++
        if (i > 100) {
            createError("Deu pau");
        
        }
    }
}

// custom type guard 
const isNumber = (value: any): boolean => {
    return typeof value === 'number'
        ? true : false
}

// use of the never type 
const numberOrString = (value: number | string): string => {
    if (typeof value === 'string') return 'string'
    if (isNumber(value)) return 'number'
    return createError('This should never happen!')
}
