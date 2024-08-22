document.addEventListener("DOMContentLoaded", function(){
    let container = document.getElementById("container")
    let jsonAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json"

    //Fetch para categoría autos
    fetch(jsonAutos)
    .then(response => response.json())
    .then(autos =>{
        //recorremos la lista
        for (let auto of autos.products){
            container += `<div> <img src="${auto.image}"><p><strong>Nombre:</strong> ${auto.name}</p>
        <p><strong>Descripción:</strong> ${auto.description}</p>
        <p><strong>Precio:</strong> ${auto.cost}</p>
        <p><strong>Cantidad vendida:</strong> ${auto.soldCount}</p></div>`
        }
    })
})
