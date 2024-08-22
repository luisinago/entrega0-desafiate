document.addEventListener("DOMContentLoaded", ()=>{
    let divAutos = document.getElementById("autos");
    let jsonAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json"

    //Función para recorrer el array y generar el html
    function mostrarData(array){
        for (let elemento of array){
            divAutos.innerHTML += `<div class="articulo"> <img src="${elemento.image}"><div><p><strong>Nombre:</strong> ${elemento.name}</p>
        <p><strong>Descripción:</strong> ${elemento.description}</p>
        <p><strong>Precio:</strong> ${elemento.cost}</p>
        <p><strong>Cantidad vendida:</strong> ${elemento.soldCount}</p></div>`
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