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
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el campo de búsqueda y los artículos
    const searchInput = document.getElementById('searchInput');
    const articles = document.querySelectorAll('.card');
  
    // Event listener para el campo de búsqueda
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      
      // Filtrar los artículos
      articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const description = article.querySelector('.card-text').textContent.toLowerCase();
  
        if (title.includes(query) || description.includes(query)) {
          article.parentElement.style.display = ''; // Muestra el artículo
        } else {
          article.parentElement.style.display = 'none'; // Oculta el artículo
        }
      });
    });
  });
  