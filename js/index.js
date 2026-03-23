// Seletores principais
const addCustomerBtn = document.querySelector(".btn-add-customer");
const tableBody = document.querySelector(".data-table tbody");
const searchInput = document.querySelector(".input-search");

// Função para criar uma nova linha na tabela
function addRow(data) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${data.id}</td>
        <td>${data.nome}</td>
        <td>${data.categoria}</td>
        <td>${data.preco}</td>
        <td>${data.estudio}</td>
        <td>${data.plataforma}</td>
        <td><span class="status">${data.status}</span></td>
        <td>
            <div class="action-buttons">
                <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete"><i class="fas fa-trash"></i></button>
            </div>
        </td>
    `;

    tableBody.appendChild(tr);
}

// Exemplo de dados para inserir
const exemploItem = {
    id: "#001",
    nome: "Jogo Exemplo",
    categoria: "Ação",
    preco: "R$ 199,90",
    estudio: "CTRLPLAY Studio",
    plataforma: "PC / PS5",
    status: "Disponível"
};

// Evento para adicionar novo item
addCustomerBtn.addEventListener("click", () => {
    // Aqui você pode substituir pelo formulário real
    addRow(exemploItem);
});

// Delegação de eventos para editar e excluir
tableBody.addEventListener("click", (e) => {
    if (e.target.closest(".edit")) {
        // Aqui você pode carregar os dados no formulário para edição
    }

    if (e.target.closest(".delete")) {
        e.target.closest("tr").remove();
    }
});

// Busca simples na tabela
searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

// Recarregar homepage ao clicar na logo (se existir no header.html)
document.addEventListener("click", (e) => {
    if (e.target.closest(".logo")) {
        location.reload();
    }
});
