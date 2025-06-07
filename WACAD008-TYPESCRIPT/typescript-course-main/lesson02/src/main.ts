let myName: string = 'Dave'
let meaningOfLife: number;
let isLoading: boolean;
let album: any;

myName = 'John'
meaningOfLife = 42
isLoading = true
album = 5150

const sum = (a: number, b: string) => {
    return a + b                    // O TypeScript entende que será uma concatenação
}

let postId: string | number   // pode armazenar string ou numero
let isActive: number | boolean

let re: RegExp = /\w+/g    // formas de buscar padrões em textos