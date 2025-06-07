type One = string
type Two = string | number
type Three = 'hello'

// convert to more or less specific 
let a: One = 'hello'
let b = a as Two // less specific 
let c = a as Three // more specific 

let d = <One>'world'
let e = <string | number>'world'

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string => {
    if (c === 'add') return a + b
    return '' + a + b
}

// Força o tipo de retorno
let myVal: string = addOrConcat(2, 2, 'concat') as string 

// Be careful! TS sees no problem - but a string is returned
let nextVal: number = addOrConcat(2, 2, 'concat') as number

//10 as string
(10 as unknown) as string

// The DOM 
const img = document.querySelector('img')! 
const myImg = document.getElementById('img') as HTMLImageElement
const nextImg = <HTMLImageElement>document.getElementById('img')

console.log(img.alt);
img.src = "https://i.pinimg.com/236x/6a/bd/64/6abd646741ecfffa74af78499cb914c2.jpg"

// muda a localização de onde vem a imagem
myImg.src = "https://img.freepik.com/fotos-gratis/gotas-de-oleo-de-arco-iris-sobre-um-fundo-abstrato-de-superficie-de-agua_23-2148290071.jpg?semt=ais_hybrid&w=740"
