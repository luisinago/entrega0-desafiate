document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + ObjUsuario;
}

document.addEventListener("DOMContentLoaded", function() {
    
    let username = localStorage.getItem("username");

   
    if (username) {
        
        let usuario = document.createElement("li");
        usuario.className = "nav-item";
        usuario.innerHTML = `<a class="nav-link" href="#">${username}</a>`;

      
        let navbar = document.querySelector(".navbar-nav");
        navbar.appendChild(usuario);
    }
});
