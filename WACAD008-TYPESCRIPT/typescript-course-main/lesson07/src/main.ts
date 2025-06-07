// ✅ INDEX SIGNATURES: permite que objetos tenham chaves dinâmicas, desde que o tipo da chave e do valor seja especificado.

interface TransactionObj {
    readonly [index: string]: number // qualquer chave string terá um valor number (somente leitura)
    Pizza: number,   // propriedades fixas conhecidas
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50,
}

console.log(todaysTransactions.Pizza)         // Acesso direto via ponto
console.log(todaysTransactions['Pizza'])      // Acesso via string dinâmica

let prop: string = 'Pizza'
console.log(todaysTransactions[prop])         // Acesso via variável (dinâmico)


// ✅ Função que percorre as chaves de um objeto usando for...in
const todaysNet = (transactions: TransactionObj): number => {
    let total = 0
    for (const transaction in transactions) {
        total += transactions[transaction]    // acessa dinamicamente cada valor
    }
    return total
}

console.log(todaysNet(todaysTransactions))

todaysTransactions.Pizza = 40                 // ❌ Erro: propriedade é readonly (proibido modificar)
console.log(todaysTransactions.Pizza)

console.log(todaysTransactions['Dave'])       // undefined (não existe a chave "Dave")


// ✅ OBJETOS COM ACESSO DINÂMICO E keyof

interface Student {
    // Index signature comentada: permitiria chaves arbitrárias com diferentes tipos
    //[key: string]: string | number | number[] | undefined
    name: string,
    GPA: number,
    classes?: number[] // opcional
}

const student: Student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
}

// ✅ Iteração com for...in e acesso seguro usando "keyof Student"
for (const key in student) {
    console.log(`${key}: ${student[key as keyof Student]}`) // type assertion necessária
}

// ✅ Alternativa com Object.keys e typeof para inferência direta
Object.keys(student).map(key => {
    console.log(student[key as keyof typeof student])
})

// ✅ Função genérica que acessa dinamicamente uma propriedade, mas de forma segura com keyof
const logStudentKey = (student: Student, key: keyof Student): void => {
    console.log(`Student ${key}: ${student[key]}`)
}

logStudentKey(student, 'name') // válido


// ✅ RECORD TYPE + keyof + tipos literais

// Em vez de usar index signature manual, usamos "Record"
// Record<'chave', tipo_do_valor> → cria um tipo de objeto com chaves restritas

type Streams = 'salary' | 'bonus' | 'sidehustle' // chaves possíveis

type Incomes = Record<Streams, number> // cada chave tem valor number

const monthlyIncomes: Incomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
}

// ✅ Iteração com for...in e acesso com keyof
for (const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue as keyof Incomes]) // acesso seguro
}
