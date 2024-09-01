//document.addEventListener("DOMContentLoaded", () =>{
    // function volverALogin(){

        //let usuario = document.getElementsByClassName("Usuario").value;
        //let contrasenia = document.getElementsByClassName("contraseña").value;
        
        //if (usuario!="" && contrasenia!=""){
        
        //localStorage.setItem("user",usuario);
        //location.href = "index.html";
            
        //}else{
        
        //alert("Falta usuario o clave");
        //location.href = "login.html";
        //}
        //}
        
       // let usuario = document.getElementsByClassName("Usuario").value;
        //let contrasenia = document.getElementsByClassName("contraseña").value;

        //function volverALogin(){

          //  localStorage.setItem("user",usuario);
            //localStorage.setItem("contrasenia",contrasenia);

           // if

        //}
        
//})

// login.js
// document.addEventListener('DOMContentLoaded', function() {
//     const isLoginPage = window.location.pathname.includes('login.html');

//     // Redirigir a index.html si ya se ha iniciado sesión y estamos en la página de login
//     if (isLoginPage && localStorage.getItem('sesionIniciada')) {
//         window.location.href = 'index.html';
//         return;
//     }

//     if (isLoginPage) {
//         const form = document.querySelector('form');

//         form.addEventListener('submit', function(event) {
//             event.preventDefault();

//             const usuario = document.querySelector('.Usuario input').value;
//             const contraseña = document.querySelector('.contraseña input').value;

//             if (usuario === "usuarioValido" && contraseña === "contraseñaValida") {
//                 localStorage.setItem('sesionIniciada', 'true');
//                 window.location.href = 'index.html';
//             } else {
//                 alert("Usuario o contraseña incorrectos");
//             }
//         });
//     }
// });

document.querySelector("form").addEventListener("submit", function(event) {
    
    event.preventDefault();

    
    const username = document.querySelector(".Usuario input").value;

   
    localStorage.setItem("username", username);

    
    window.location.href = "index.html";
});

if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + username;
}
