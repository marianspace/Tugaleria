document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarCarrito(carrito);
    actualizarTotalCarrito(carrito);

    document.getElementById('vaciarcarrito').addEventListener('click', () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        mostrarCarrito(carrito);
        actualizarTotalCarrito(carrito);
    });
});

function mostrarCarrito(carrito) {
    const carritoContainer = document.getElementById("productos-carrito");
    carritoContainer.innerHTML = ""; 

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        carrito.forEach(item => {
            const itemElement = `
                <div class="carritoitem">
                    <h3>${item.titulo}</h3>
                    <p>Precio: $${item.precio}</p>
                    <button onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
                </div>
            `;
            carritoContainer.innerHTML += itemElement;
        });
    }
}

function actualizarTotalCarrito(carrito) {
    console.log("Carrito:", carrito);

    const total = carrito.reduce((total, item) => {
        console.log("Sumando el precio de:", item.titulo, item.precio);
        return total + item.precio; 
    }, 0);
    console.log("Total calculado:", total);
    
    const totalElement = document.getElementById("total-carrito");
    if (totalElement) {
        totalElement.innerText = `$${total.toFixed(2)}`;
    } else {
        console.log("No se encuentra el elemento total-carrito");
    }
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);  
    localStorage.setItem('carrito', JSON.stringify(carrito)); 

    mostrarCarrito(carrito); 
    actualizarTotalCarrito(carrito);  
}