if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + username;
}


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

  
const JsonComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productoID}.json`;
let fetchOpiniones = async (productoID) => {
      let response =  await fetch(JsonComentarios);
      let comentarioData = await response.json();
      let containerComentarios = document.getElementById('seccionComentarios');
      comentarioData.forEach(comentarioData => {
        let comentarioContenido = `<br>
        <div class="comentario">
        <h5 class="usuario"><strong>${comentarioData.user}</strong></h5>
        <div class="comentario">${comentarioData.description}</div>
        <span> ${generarEstrellas(comentarioData.score)}</span>
        <div class="fechaComentario">${comentarioData.dateTime}</div>
        <br>`;
        containerComentarios.innerHTML += comentarioContenido;
      })
    };

    fetchOpiniones(productoID);

 

//Espacio para que el usuario puntúe e ingrese comentario
const stars = document.querySelectorAll('#star-rating span');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('checked');
            } else {
                s.classList.remove('checked');
            }
        });
    });
});

//Caja comentario

    


let fetchProductosRel = async () => {
      let response =  await fetch(productosImagesURLs[productoID]);
      let productoData = await response.json();
      let relatedProductContainer = document.getElementById('productosRelacionados');
          // Actualizamos el contenido en el HTML
          productoData.relatedProducts.forEach(relatedProduct => {
let contenidoRelP= `
<div class="card border-dark mb-3" style="width: 12rem;" onclick="irAlProducto(${relatedProduct.id})">
<img class="card-img-top" src="${relatedProduct.image}" alt="${relatedProduct.name}">
<div class="card-body">
    <h5 class="card-title">${relatedProduct.name}</h5>
</div>
</div>`;
relatedProductContainer.innerHTML += contenidoRelP; 
          
         } )};

fetchProductosRel();

function irAlProducto(idproducto){
 localStorage.setItem('productoID', idproducto);
 window.location.href= 'product-info.html';
}

// Función para generar estrellas
function generarEstrellas(calificacion) {
    let estrellasHTML = '';
    for (let i = 1; i <= 5; i++) {
        estrellasHTML += `<span class="fa fa-star ${i <= calificacion ? 'checked' : ''}"></span>`;
    }
    return estrellasHTML;
}

// Evento para el botón "Enviar"
document.getElementById('botonEnviarCom').addEventListener('click', function() {
    const estrellas = document.querySelectorAll('#star-rating .fa-star');
    let calificacion = 0;

    estrellas.forEach((estrella, index) => {
        if (estrella.classList.contains('checked')) {
            calificacion = index + 1;
        }
    });

    const comentario = document.getElementById('cajaComentario').value;
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11
    const día = ("0" + fecha.getDate()).slice(-2);
    const horas = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);
    const segundos = ("0" + fecha.getSeconds()).slice(-2);
    
    const fechaf = `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
    


    if (calificacion > 0 && comentario) {
        // Agregar comentario a la lista
        const listaComentarios = document.getElementById('seccionComentarios');
        const nuevoComentario = document.createElement('div');
        nuevoComentario.innerHTML = `<br>
        <div class="comentario">
        <h5 class="usuario"><strong>${localStorage.getItem("username")}</strong></h5>
        <div class="comentario">${comentario}</div>
        <span> ${generarEstrellas(calificacion)}</span>
        <div class="fechaComentario">${fechaf}</div>
        <br>`;
        listaComentarios.appendChild(nuevoComentario);

        // Limpiar campos
        document.getElementById('cajaComentario').value = '';
        estrellas.forEach(estrella => estrella.classList.remove('checked'));
    } else {
        alert("Por favor, selecciona una calificación y escribe un comentario.");
    }

});

// Evento para seleccionar estrellas
document.querySelectorAll('#star-rating .fa-star').forEach((estrella, index) => {
    estrella.addEventListener('click', function() {
        document.querySelectorAll('#star-rating .fa-star').forEach((s, i) => {
            s.classList.toggle('checked', i <= index);
        });
    });
});

let botonComprar = document.getElementById('botonComprar'); //evento de presionar el boton

botonComprar.addEventListener('click', ()=>{
    agregarAlCarrito(); //ejecuto agregar al carrito
})

let producto= localStorage.getItem('productoID')
let usuarioAc = localStorage.getItem('username');
let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`)) || [];

function agregarAlCarrito (){
    fetch(`https://japceibal.github.io/emercado-api/products/${producto}.json`) //trae la info del producto
    .then(response => response.json())
    .then(data => {
        let {name, cost, currency, images} = data; //desestructuro
        if(currency == "USD"){
            cost= cost * 40;
            currency= "UYU"
        }//si la moneda es en dolares, la convierto a pesos
        let prodCarrito = {
            nombre: name,
            costo: cost,
            cantidad: 1,
            moneda: currency,
            imagen: images[0]

        }; //creo el objeto del prod para el carrito
        let prodExiste = carrito.find(item => item.nombre === name); //me fijo si en el carrito ya esta ese mismo prod
        if(prodExiste){
            prodExiste.cantidad += 1; //si esta, no agrego el objeto de nuevo, solo le sumo uno a la cantidad
        }else{
            carrito.push(prodCarrito); // si no esta, agrego el objeto nuevo
         } 
            localStorage.setItem(`carritoCompras${usuarioAc}`, JSON.stringify(carrito)); //los convierte en un objeto json para guardar en local storage y le paso el user para que cada carrito sea individual
            
    })
    .catch(error => console.error('Error al cargar los productos:', error));


    window.location.href='cart.html'; //me manda al carrito al presionar comprar
}
