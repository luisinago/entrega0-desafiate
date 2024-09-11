

// Función para almacenar el ID del producto y redirigir a la página de detalles


function verDetallesProducto(productoID, categoriaID) {
    console.log("ID del producto:", productoID);
    console.log("ID de la categoría:", categoriaID);

    localStorage.setItem("productoID", productoID);
    localStorage.setItem("categoriaID", categoriaID);

    console.log("LocalStorage productoID:", localStorage.getItem("productoID"));
    console.log("LocalStorage categoriaID:", localStorage.getItem("categoriaID"));

    window.location.href = 'product-info.html';  
}
 
 document.addEventListener("DOMContentLoaded", () => {
    var categoriaId = localStorage.getItem("catID");
    var divAgrega = document.getElementById("categoria");
    var jsonProductos = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;


    //Función para recorrer el array y generar el html
    function mostrarData(array) {
        // Limpiamos el html cada vez que se llama a la función para que cuando se filtre no aparezcan todos

        divAgrega.innerHTML = "";
        for (let elemento of array) {
            divAgrega.innerHTML += `<div class="col-12 col-md-12 mb-4">
            <div class="d-flex flex-column flex-md-row align-items-center">
                <img src="${elemento.image}" class="img-fluid me-md-3 mb-3 mb-md-0 " alt="${elemento.name}" style="width: 150px; height: auto;">
                <div>
                    <p class="mb-1"><strong>Nombre:</strong> ${elemento.name}</p>
                    <p class="mb-1"><strong>Descripción:</strong> ${elemento.description}</p>
                    <p class="mb-1"><strong>Precio:</strong> ${elemento.cost}</p>
                    <p class="mb-1"><strong>Cantidad vendida:</strong> ${elemento.soldCount}</p>
                  <button class="btn btn-primary" onclick="verDetallesProducto(${elemento.id}, ${categoriaId})">Ver detalles</button> 
                </div>
            </div>
        </div>`;
        }
    }
    // Se agregó un botón a cada producto para ver los detalles. Nos manda a product-info.html

document.addEventListener("DOMContentLoaded", () => {
    var categoriaId = localStorage.getItem("catID");
    var divAgrega = document.getElementById("categoria");
    var jsonProductos = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;

    
    function mostrarData(array) {
        divAgrega.innerHTML = "";
        for (let elemento of array) {
            divAgrega.innerHTML += `
            <div class="producto">
                <h2 class="titulo-producto">${elemento.name}</h2>
                <p class="categoria-producto">Categoría: ${elemento.category}</p>
                <div class="imagenes-producto">
                    <img src="${elemento.image}" alt="Imagen de producto" class="imagen-principal">
                    <div class="imagenes-secundarias">
                       
                        <img src="${elemento.image}" alt="Detalle 1" class="imagen-detalle">
                        <img src="${elemento.image}" alt="Detalle 2" class="imagen-detalle">
                        <img src="${elemento.image}" alt="Detalle 3" class="imagen-detalle">
                    </div>
                </div>
                <p class="descripcion-producto">${elemento.description}</p>
                <p class="unidades-vendidas">Unidades vendidas: ${elemento.soldCount}</p>
                <button class="btn btn-primary" onclick="verDetallesProducto(${elemento.id}, ${categoriaId})">Ver detalles</button>
            </div>`;
        }
    }

    // Fetch para obtener los productos del JSON
    fetch(jsonProductos)
        .then(response => response.json())
        .then(data => {
            mostrarData(data.products); 
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    // Función para almacenar el ID del producto y redirigir a la página de detalles
    function verDetallesProducto(productoID, categoriaID) {
        localStorage.setItem("productoID", productoID);
        localStorage.setItem("categoriaID", categoriaID);
        window.location.href = 'product-info.html';
    }
});


  




    // Fetch
    fetch(jsonProductos)
        .then(response => response.json())
        .then(data => {
            var products = data.products;
            mostrarData(products); // Muestra todos los productos inicialmente

            // Agrega un evento click al botón filtrar
            document.querySelector("#rangeFilterCount").addEventListener("click", () => {
                // Variables para alojar los valores que ingrese el usuario y convertirlos a número
                //Si el usuario no escribe nada quiero que el mínimo sea 0 y el máximo 999999999
                let inputMin = Number(document.getElementById("rangeFilterCountMin").value) || 0;
                let inputMax = Number(document.getElementById("rangeFilterCountMax").value) || 99999999;

                // Variable que aloja la función de filtrar productos según el rango de precios que haya puesto el usuario
                let filteredProducts = products.filter(product => product.cost >= inputMin && product.cost <= inputMax);

                // Mostrar productos filtrados
                mostrarData(filteredProducts);
            });

            // Agregamos evento click al botón de limpiar
            document.querySelector("#clearRangeFilter").addEventListener("click", () => {
                document.getElementById("rangeFilterCountMin").value = "";
                document.getElementById("rangeFilterCountMax").value = "";
                mostrarData(products); // Resetea a nada "" los valores del input
            });

            //Sort

            // Ordenar por precio ascendente (No se puede "limpiar" este filtro)
            document.getElementById("sortAsc").addEventListener("click", () => {
                products.sort((a, b) => a.cost - b.cost); // Ordena por precio ascendente
                mostrarData(products); // Muestra los productos ordenados
            });

            // Ordenar por precio descendente (No se puede "limpiar" este filtro)
            document.getElementById("sortDesc").addEventListener("click", () => {
                products.sort((a, b) => b.cost - a.cost); // Ordena por precio descendente
                mostrarData(products); // Muestra los productos ordenados
            });

            // Ordenar por relevancia (No se puede "limpiar" este filtro)
            document.getElementById("sortByCount").addEventListener("click", () => {
                products.sort((a, b) => b.soldCount - a.soldCount); // Ordena por cantidad de vendidos
                mostrarData(products); // Muestra los productos ordenados
            });

        });
});

