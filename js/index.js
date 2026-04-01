const tableBody = document.querySelector(".data-table tbody");
const addCustomerBtn = document.querySelector(".btn-add-customer");
const searchInput = document.querySelector(".input-search");

let editingRow = null;

// =========================
// ABRIR FORM
// =========================
function openForm(prefillData = null) {
  if (document.getElementById("form-container")) return;

  fetch("elements/form.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);

      attachFormEvents(prefillData);

      const overlay = document.getElementById("overlay");
      const form = document.getElementById("form-container");

      // clicar fora fecha
      if (overlay) {
        overlay.addEventListener("click", fecharForm);
      }

      // impedir fechar clicando dentro
      if (form) {
        form.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      }
    });
}

// =========================
// FECHAR FORM (remove tudo)
// =========================
function fecharForm() {
  document.getElementById("form-container")?.remove();
  document.getElementById("overlay")?.remove();
  editingRow = null;
}

// =========================
// ADICIONAR LINHA
// =========================
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

// =========================
// EVENTOS DO FORM
// =========================
function attachFormEvents(prefillData) {
  const form = document.getElementById("item-form");
  const closeBtn = document.querySelector(".btn-close");

  // Preencher dados (edição)
  if (prefillData) {
    document.getElementById("id").value = prefillData.id;
    document.getElementById("nome").value = prefillData.nome;
    document.getElementById("categoria").value = prefillData.categoria;
    document.getElementById("preco").value = prefillData.preco;
    document.getElementById("estudio").value = prefillData.estudio;
    document.getElementById("plataforma").value = prefillData.plataforma;
    document.getElementById("status").value = prefillData.status;
  }

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      id: document.getElementById("id").value.trim(),
      nome: document.getElementById("nome").value.trim(),
      categoria: document.getElementById("categoria").value.trim(),
      preco: document.getElementById("preco").value.trim(),
      estudio: document.getElementById("estudio").value.trim(),
      plataforma: document.getElementById("plataforma").value.trim(),
      status: document.getElementById("status").value
    };

    if (Object.values(data).some(v => v === "")) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editingRow) {
      const cells = editingRow.querySelectorAll("td");
      cells[0].innerText = data.id;
      cells[1].innerText = data.nome;
      cells[2].innerText = data.categoria;
      cells[3].innerText = data.preco;
      cells[4].innerText = data.estudio;
      cells[5].innerText = data.plataforma;
      cells[6].innerText = data.status;
      editingRow = null;
    } else {
      addRow(data);
    }

    fecharForm(); // fecha tudo corretamente
  });

  // Botão cancelar
  closeBtn.addEventListener("click", () => {
    fecharForm(); // fecha tudo corretamente
  });
}

// =========================
// BOTÃO ADICIONAR
// =========================
addCustomerBtn.addEventListener("click", () => openForm());

// =========================
// EDITAR / EXCLUIR
// =========================
tableBody.addEventListener("click", (e) => {
  if (e.target.closest(".edit")) {
    editingRow = e.target.closest("tr");
    const cells = editingRow.querySelectorAll("td");

    const prefillData = {
      id: cells[0].innerText,
      nome: cells[1].innerText,
      categoria: cells[2].innerText,
      preco: cells[3].innerText,
      estudio: cells[4].innerText,
      plataforma: cells[5].innerText,
      status: cells[6].innerText
    };

    openForm(prefillData);
  }

  if (e.target.closest(".delete")) {
    e.target.closest("tr").remove();
  }
});

// =========================
// BUSCA
// =========================
searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.toLowerCase();
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});

// =========================
// HEADER / FOOTER
// =========================
function insertUsername() {
  const username = document.getElementById("username");
  if (username) username.textContent = sessionStorage.getItem("usuario");
}




function replaceUsername(e) {
  if (e.key === "F5") {
    const username = document.getElementById("username");

    sessionStorage.setItem("usuario", "Visitante");

    if (username) username.textContent = sessionStorage.getItem("usuario");
  }
}

document.addEventListener('keydown', (e) => {
  replaceUsername(e);
});

fetch('elements/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('cabecalho').innerHTML = data;
    insertUsername();
  });

fetch('elements/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('rodape').innerHTML = data;
  });