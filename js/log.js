const formulario = document.querySelector("form");
const usuario = document.getElementsByName("usuario").text;
const senha = document.getElementsByName("senha").text;
const botaoLogin = document.getElementById("login");

function validarCampo(){
  if(usuario=="admin"&&senha=="admin"){
    window.open("index.html", "_self");
  };
}

botaoLogin.addEventListener("click", () => {
    validarCampo();
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

