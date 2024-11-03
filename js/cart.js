document.addEventListener('DOMContentLoaded', () => {
    let usuarioAc = localStorage.getItem('username');
    let carrito = JSON.parse(localStorage.getItem(`carritoCompras${usuarioAc}`)) || [];

    // Actualiza el contador en el badge del carrito
    document.getElementById('cartCount').innerText = carrito.reduce((total, prod) => total + (prod.cantidad || 1), 0);

    let containerCarro = document.getElementById('containerCarro');

    if (carrito.length === 0) {
        containerCarro.innerHTML = '<div class="alert alert-dark" role="alert">No hay productos en el carrito!</div>';
    } else {
        carrito.forEach((prod, index) => {
            let productoHTML = `
                <div class="container card col-lg-6 md-8 sm-12">
                    <div class="row g-0">
                        <div class="card-img">
                            <img src="${prod.imagen}" class="img-fluid" alt="${prod.nombre}">
                        </div>
                        <div class="card-body">
                            <h5>${prod.nombre}</h5>
                            <p>Precio: <strong>${prod.costo}</strong></p>
                            <p>Moneda: ${prod.moneda}</p>
                            <div class="d-flex align-items-center">
                                <label for="cantidad-${index}" style="margin-right: 5px;">Cantidad:</label>
                                <input id="cantidad-${index}" type="number" value="${prod.cantidad || 1}" min="1" style="background-color: lightgray; width: 50px;">
                            </div>
                            <p><strong id="subtotal-${index}">Subtotal: $${(prod.costo * (prod.cantidad || 1)).toFixed(2)}</strong></p>
                        </div>
                    </div>
                </div>
            `;
            containerCarro.innerHTML += productoHTML;

            // Actualizar subtotal en tiempo real
            document.getElementById(`cantidad-${index}`).addEventListener('input', (e) => {
                let cantidad = parseInt(e.target.value) || 1;
                let subtotal = prod.costo * cantidad;
                document.getElementById(`subtotal-${index}`).innerText = `Subtotal: $${subtotal.toFixed(2)}`;
                // Actualiza la cantidad en el carrito
                prod.cantidad = cantidad;
                localStorage.setItem(`carritoCompras${usuarioAc}`, JSON.stringify(carrito));
                // Actualiza el contador del carrito
                document.getElementById('cartCount').innerText = carrito.reduce((total, p) => total + (p.cantidad || 1), 0);
            });
        });
    }
});
