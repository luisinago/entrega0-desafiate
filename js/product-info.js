if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + username;
}




/* let productoID = localStorage.getItem("productoID");
let categoriaID = localStorage.getItem("categoriaID");

// Categorías con las URL de los JSON
let categoriasURL = {
  101: "https://japceibal.github.io/emercado-api/cats_products/101.json",  // Autos
  102: "https://japceibal.github.io/emercado-api/cats_products/102.json",  // Juguetes
  103: "https://japceibal.github.io/emercado-api/cats_products/103.json",  // Muebles
  105: "https://japceibal.github.io/emercado-api/cats_products/105.json"   // Computadoras
};

// fetch según categoría seleccionada
let fetchProductosInfo = async () => {
  if (categoriaID && categoriasURL[categoriaID]) {
    let response = await fetch(categoriasURL[categoriaID]);
    let datos = await response.json();

    // Buscamos el producto por su ID dentro del JSON
    let producto = datos.products.find(p => p.id == productoID);

    if (producto) {
      // Actualizamos el contenido en el HTML
      document.querySelector('h1').innerText = producto.name;
      document.querySelector('.imagen-producto img').src = producto.image;
      document.querySelector('.descripcion-producto p').innerText = producto.description;

      // Actualizamos la categoría y las unidades vendidas
      document.querySelector('.categoria-producto').innerText = datos.catName;  // Nombre de la categoría
      document.querySelector('.unidades-vendidas').innerText = `Unidades vendidas: ${producto.soldCount}`;  
    } else {
      console.log('Producto no encontrado');
    }
  } else {
    console.log('Categoría no encontrada');
  }
};

fetchProductosInfo();  */

let productoID = localStorage.getItem("productoID");
let categoriaID = localStorage.getItem("categoriaID");

// Categorías con las URL de los JSON
let categoriasURL = {
    101: "https://japceibal.github.io/emercado-api/cats_products/101.json",  // Autos
    102: "https://japceibal.github.io/emercado-api/cats_products/102.json",  // Juguetes
    103: "https://japceibal.github.io/emercado-api/cats_products/103.json",  // Muebles
    105: "https://japceibal.github.io/emercado-api/cats_products/105.json"   // Computadoras
};

// URL que contienen las imágenes secundarias
let productosImagesURLs = {
    40281: "https://japceibal.github.io/emercado-api/products/40281.json",
    60804: "https://japceibal.github.io/emercado-api/products/60804.json",
    60803: "https://japceibal.github.io/emercado-api/products/60803.json",
    60802: "https://japceibal.github.io/emercado-api/products/60802.json",
    60801: "https://japceibal.github.io/emercado-api/products/60801.json",
    50925: "https://japceibal.github.io/emercado-api/products/50925.json",
    50924: "https://japceibal.github.io/emercado-api/products/50924.json",
    50923: "https://japceibal.github.io/emercado-api/products/50923.json",
    50922: "https://japceibal.github.io/emercado-api/products/50922.json",
    50921: "https://japceibal.github.io/emercado-api/products/50921.json",
    50744: "https://japceibal.github.io/emercado-api/products/50744.json",
    50743: "https://japceibal.github.io/emercado-api/products/50743.json",
    50742: "https://japceibal.github.io/emercado-api/products/50742.json",
    50741: "https://japceibal.github.io/emercado-api/products/50741.json"
};

// Función para cargar la información del producto
let fetchProductosInfo = async () => {
    if (categoriaID && categoriasURL[categoriaID]) {
        let response = await fetch(categoriasURL[categoriaID]);
        let datos = await response.json();

        // Buscamos el producto por su ID dentro del JSON
        let producto = datos.products.find(p => p.id == productoID);

        if (producto) {
            // Actualizamos el contenido en el HTML
            document.querySelector('h1').innerText = producto.name;
            document.querySelector('.imagen-producto img').src = producto.image;
            document.querySelector('.descripcion-producto p').innerText = producto.description;

            // Actualizamos la categoría y las unidades vendidas
            document.querySelector('.categoria-producto').innerText = datos.catName;  // Nombre de la categoría
            document.querySelector('.unidades-vendidas').innerText = `Unidades vendidas: ${producto.soldCount}`;  
            
            // Cargamos las imágenes secundarias si es que se encuentran
            if (productosImagesURLs[productoID]) {
                fetchImagenesSecundarias(productoID);
            }
        } else {
            console.log('Producto no encontrado');
        }
    } else {
        console.log('Categoría no encontrada');
    }
};

// Función para cargar y mostrar las imágenes secundarias
let fetchImagenesSecundarias = async (productoID) => {
    let response = await fetch(productosImagesURLs[productoID]);
    let productoData = await response.json();
    
    let imagenesSecundariasContainer = document.querySelector('.imagenes-secundarias');
    imagenesSecundariasContainer.innerHTML = '';  

    // Recorremos las imágenes y las añadimos al contenedor
    productoData.images.forEach(imagen => {
        let imgElement = document.createElement('img');
        imgElement.src = imagen;
        imgElement.alt = `Imagen adicional de ${productoData.name}`;
        imagenesSecundariasContainer.appendChild(imgElement);
    });
};

// Llamamos 
fetchProductosInfo();


