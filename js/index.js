document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("autos").addEventListener("click", function() {
      localStorage.setItem("catID", 101);
      window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function() {
      localStorage.setItem("catID", 102);
      window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function() {
      localStorage.setItem("catID", 103);
      window.location = "products.html";
  });
  
  // Actualizar el contador del carrito
  let usuarioAc = localStorage.getItem('username');
  let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`)) || [];
  document.getElementById('cartCount').innerText = carrito.reduce((total, prod) => total + prod.cantidad, 0);
});

if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")) {
  document.getElementById("user").innerHTML = "Cliente: " + ObjUsuario;
}

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById('searchInput');
  const articles = document.querySelectorAll('.card');

  searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
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

// Menú desplegable en usuario
document.addEventListener("DOMContentLoaded", function() {
  let username = localStorage.getItem("username");

  if (username) {
      let usuarioMenu = document.createElement("li");
      usuarioMenu.className = "nav-item dropdown";

      usuarioMenu.innerHTML = `
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${username}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
              <li><a class="dropdown-item" id="logout" href="#">Cerrar sesión</a></li>
          </ul>
      `;

      let navbar = document.querySelector(".navbar-nav");
      navbar.appendChild(usuarioMenu);

      document.getElementById("logout").addEventListener("click", function() {
          localStorage.removeItem("username");
          window.location.href = "login.html";
      });
  }
});