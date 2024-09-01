document.addEventListener("DOMContentLoaded", ()=>{
    let divAutos = document.getElementById("autos");
    let jsonAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json"

    //Función para recorrer el array y generar el html
    function mostrarData(array){
        for (let elemento of array){
            divAutos.innerHTML += `<div class="col-12 col-md-12 mb-4">
            <div class="d-flex flex-column flex-md-row align-items-center">
                <img src="${elemento.image}" class="img-fluid me-md-3 mb-3 mb-md-0 " alt="${elemento.name}" style="width: 150px; height: auto;">
                <div>
                    <p class="mb-1"><strong>Nombre:</strong> ${elemento.name}</p>
                    <p class="mb-1"><strong>Descripción:</strong> ${elemento.description}</p>
                    <p class="mb-1"><strong>Precio:</strong> ${elemento.cost}</p>
                    <p class="mb-1"><strong>Cantidad vendida:</strong> ${elemento.soldCount}</p>
                </div>
            </div>
        </div>`
        }
    }


    //Fetch para categoría autos
    fetch(jsonAutos)
    .then(response => response.json())
    .then(data => {

        //Creamos variable para guardar la data de la sección que nos interesa: products
        let products = data.products
        
        //Usamos función para recorrer la lista de products
        mostrarData(products)

    })
})
window.onload = loadAndDisplayData;

if (localStorage.getItem("usuario") && localStorage.getItem("contraseña")){ document.getElementById("user").innerHTML = "Cliente: " + username;
}
