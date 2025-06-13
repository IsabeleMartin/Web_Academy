"use strict";
class Aluno {
    constructor(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}
class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    removerAluno(id) {
        this.alunos = this.alunos.filter(a => a.id !== id);
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        return this.media(this.alunos.map(a => a.idade));
    }
    getMediaAlturas() {
        return this.media(this.alunos.map(a => a.altura));
    }
    getMediaPesos() {
        return this.media(this.alunos.map(a => a.peso));
    }
    media(valores) {
        if (valores.length === 0)
            return 0;
        const soma = valores.reduce((a, b) => a + b, 0);
        return +(soma / valores.length).toFixed(2);
    }
    getAlunos() {
        return [...this.alunos];
    }
}
// ==== Código principal ====
const turma = new Turma(1, 'Turma de Ed. Física');
let idContador = 1; // Inicializando um contador para Id dos alunos
let alunoEditando = null; // Variável para armazenar o aluno que está sendo editado
const getInput = (id) => document.getElementById(id).value;
function atualizarEstatisticas() {
    document.getElementById("numAlunos").textContent =
        turma.getNumAlunos().toString();
    document.getElementById("mediaIdade").textContent =
        turma.getMediaIdades().toString();
    document.getElementById("mediaAltura").textContent =
        turma.getMediaAlturas().toString();
    document.getElementById("mediaPeso").textContent =
        turma.getMediaPesos().toString();
}
function limparInputs() {
    ["nome", "idade", "altura", "peso"].forEach(id => {
        document.getElementById(id).value = '';
    });
}
function renderizarListaAlunos() {
    const container = document.getElementById("lista-alunos");
    container.innerHTML = ''; // Limpa o conteúdo da lista antes de renderizar
    // Criação da tabela
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped");
    // Cabeçalho da tabela
    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Idade</th>
      <th>Altura</th>
      <th>Peso</th>
      <th>Ações</th>
    </tr>
  `;
    table.appendChild(thead);
    // Corpo da tabela
    const tbody = document.createElement("tbody");
    turma.getAlunos().forEach(aluno => {
        const row = document.createElement("tr");
        // Coluna para o nome
        const nomeCell = document.createElement("td");
        nomeCell.textContent = aluno.nomeCompleto;
        row.appendChild(nomeCell);
        // Coluna para a idade
        const idadeCell = document.createElement("td");
        idadeCell.textContent = `${aluno.idade} anos`;
        row.appendChild(idadeCell);
        // Coluna para a altura
        const alturaCell = document.createElement("td");
        alturaCell.textContent = `${aluno.altura}cm`;
        row.appendChild(alturaCell);
        // Coluna para o peso
        const pesoCell = document.createElement("td");
        pesoCell.textContent = `${aluno.peso}kg`;
        row.appendChild(pesoCell);
        // Coluna para as ações (editar e remover)
        const acoesCell = document.createElement("td");
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn", "btn-warning", "btn-sm", "me-2");
        btnEditar.addEventListener("click", () => {
            alunoEditando = aluno;
            // Preenche os campos de entrada com os dados do aluno
            document.getElementById("nome").value = aluno.nomeCompleto;
            document.getElementById("idade").value = aluno.idade.toString();
            document.getElementById("peso").value = aluno.peso.toString();
            document.getElementById("altura").value = aluno.altura.toString();
            // Muda o texto do botão para "Salvar" e ajusta a lógica para salvar as edições
            document.getElementById("adicionar").textContent = "Salvar";
            turma.removerAluno(aluno.id);
            renderizarListaAlunos();
        });
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btn", "btn-danger", "btn-sm");
        btnRemover.addEventListener("click", () => {
            turma.removerAluno(aluno.id);
            renderizarListaAlunos();
            atualizarEstatisticas();
        });
        acoesCell.appendChild(btnEditar);
        acoesCell.appendChild(btnRemover);
        row.appendChild(acoesCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}
// Função para adicionar aluno
function adicionarAluno() {
    const nome = getInput("nome");
    const idade = parseInt(getInput("idade"));
    const altura = parseFloat(getInput("altura"));
    const peso = parseFloat(getInput("peso"));
    if (nome && !isNaN(idade) && !isNaN(altura) && !isNaN(peso)) {
        const aluno = new Aluno(idContador++, nome, idade, altura, peso);
        turma.adicionarAluno(aluno);
        renderizarListaAlunos();
        atualizarEstatisticas();
        limparInputs();
    }
    else {
        alert("Preencha todos os campos corretamente.");
    }
}
// Evento de clique para adicionar aluno
document.getElementById("adicionar").addEventListener("click", adicionarAluno);
