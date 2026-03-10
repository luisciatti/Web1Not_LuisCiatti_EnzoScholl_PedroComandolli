const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const login = document.getElementById("login");
const lembre = document.getElementById("lembre");
 
const validarCampo = (e) => {
    e.preventDefault();
 
    if (usuario.value === "admin" && senha.value === "admin"){
        window.open("index.html", "_self");

    if (lembre.checked){
       localStorage.setItem("usuario", "admin");
       localStorage.setItem("senha", "admin");
    }
}
};
 //DOMContentLoaded = sempre que carregar a página executa;
 document.addEventListener("DOMContentLoaded", () =>{
    if(localStorage.getItem("usuario") && localStorage.getItem("senha")){
        usuario.value=localStorage.getItem("usuario");
        senha.value=localStorage.getItem("senha");
    }
 });

login.addEventListener("click", (e) =>{
    validarCampo(e)
}) ;
