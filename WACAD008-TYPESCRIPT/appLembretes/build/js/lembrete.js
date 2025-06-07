"use strict";
const lembretes = [];
let editIndex = null;
// Seleção dos elementos do DOM
const inputTitleReminder = document.getElementById("titleReminder");
const inputDeadlineReminder = document.getElementById("deadlineReminder");
const inputDescriptionReminder = document.getElementById("descriptionReminder");
const addReminderBtn = document.getElementById("addReminderBtn");
const remindersList = document.getElementById("toDoList");
// Criar ou atualizar lembrete
function createOrUpdateReminder(titulo, prazo, descricao) {
    const criadoEm = new Date();
    if (editIndex !== null) { // id do lembrete
        // Edição/
        const original = lembretes[editIndex]; // Obtendo o elemento original
        lembretes[editIndex] = [titulo, criadoEm, prazo, descricao]; // Atualiza para os novos valores
        editIndex = null; // Reseta o índice de edição
        if (addReminderBtn)
            addReminderBtn.textContent = "Adicionar"; // Reseta o texto do botão
    }
    else {
        // Criação
        const novoLembrete = [titulo, criadoEm, prazo, descricao]; // Cria um lembrete
        lembretes.push(novoLembrete); // Insere o lembrete no array
    }
    renderReminders();
    clearInputs();
}
// Renderizar lembretes na tela
function renderReminders() {
    if (!remindersList)
        return;
    remindersList.innerHTML = "";
    lembretes.forEach(([titulo, criadoEm, prazo, descricao], index) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-3";
        const card = document.createElement("div");
        card.className = "card shadow-sm";
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const titleEl = document.createElement("h5");
        titleEl.className = "card-title";
        titleEl.textContent = titulo;
        const textEl = document.createElement("p");
        textEl.className = "card-text";
        textEl.innerHTML = `
      
      ${prazo ? `<strong>Prazo:</strong> ${prazo.toLocaleString()}<br>` : ""}
      ${descricao ? `<strong>Descrição:</strong> ${descricao}` : ""}
    `;
        const editBtn = document.createElement("button"); // Criando o botão para edição
        editBtn.className = "btn btn-sm btn-warning me-2"; // Estilizando o botão
        editBtn.textContent = "Editar"; // Definindo o texto do botão
        editBtn.addEventListener("click", () => {
            // Ao clicar em editar um lembrete, os campos de inputs são preenchidos com os valores do lembrete selecionado             
            if (inputTitleReminder)
                inputTitleReminder.value = titulo;
            if (inputDeadlineReminder)
                inputDeadlineReminder.value = prazo ? prazo.toISOString().slice(0, 16) : "";
            if (inputDescriptionReminder)
                inputDescriptionReminder.value = descricao ?? "";
            editIndex = index; // Guarda o índice do lembrete editado
            if (addReminderBtn)
                addReminderBtn.textContent = "Salvar Edição";
        });
        const deleteBtn = document.createElement("button"); // Criando o botão para exclusão                 
        deleteBtn.className = "btn btn-sm btn-danger"; // Estilizando o botão
        deleteBtn.textContent = "Excluir"; // Definindo o texto do botão
        deleteBtn.addEventListener("click", () => {
            // Ao clicar no botão o elemento com o índice igual ao index é removido do array
            lembretes.splice(index, 1);
            renderReminders();
        });
        const buttonGroup = document.createElement("div"); // Criando um container para os botões            
        buttonGroup.className = "mt-3"; // Adicionando margem superior  $
        buttonGroup.appendChild(editBtn); // Adicinando o botão de edição ao container
        buttonGroup.appendChild(deleteBtn); // Adicinando o botão de exclusão ao container
        // Adicionando os elementos criados ao card
        cardBody.appendChild(titleEl);
        cardBody.appendChild(textEl);
        cardBody.appendChild(buttonGroup);
        card.appendChild(cardBody);
        col.appendChild(card);
        remindersList.appendChild(col);
    });
}
// Limpar campos de input
function clearInputs() {
    if (inputTitleReminder)
        inputTitleReminder.value = "";
    if (inputDeadlineReminder)
        inputDeadlineReminder.value = "";
    if (inputDescriptionReminder)
        inputDescriptionReminder.value = "";
}
// Ação do botão "Adicionar"/"Salvar Edição"
addReminderBtn?.addEventListener("click", () => {
    const titulo = inputTitleReminder?.value.trim();
    if (!titulo)
        return alert("Título é obrigatório!");
    const prazoStr = inputDeadlineReminder?.value;
    const prazo = prazoStr ? new Date(prazoStr) : undefined;
    const descricao = inputDescriptionReminder?.value.trim();
    createOrUpdateReminder(titulo, prazo, descricao);
});
