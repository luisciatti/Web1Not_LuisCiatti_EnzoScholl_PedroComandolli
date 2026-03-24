const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const login = document.getElementById("login");
const lembre = document.getElementById("lembre");

const validarCampo = (e) => {
    e.preventDefault();

    if (usuario.value === "admin" && senha.value === "admin") {
        window.open("index.html", "_self");

        if (lembre.checked) {
            localStorage.setItem("usuario", "admin");
            localStorage.setItem("senha", "admin");
        }
    } else {
        usuario.style.borderColor = "#ff0000"
        senha.style.borderColor = "#ff0000"

        senha.insertAdjacentHTML("afterend", `
            <div id="warning" class="mb-md" style="font-size: 11px; color: #ff0000">
                Usuário e/ou senha incorretos
            </div>
            `);

        setTimeout(() => {
            usuario.style.borderColor = "white"
            senha.style.borderColor = "white"

            document.getElementById("warning").remove();
        }, 3e3);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("usuario") && localStorage.getItem("senha")) {
        usuario.value = localStorage.getItem("usuario");
        senha.value = localStorage.getItem("senha");
    }
})

login.addEventListener("click", (e) => {
    validarCampo(e);
});
