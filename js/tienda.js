document.addEventListener("DOMContentLoaded", () => {
    renderObras(obras);
    const obrasGuardadas = JSON.parse(localStorage.getItem('obras'));
    if (Array.isArray(obrasGuardadas) && obrasGuardadas.length > 0) {
        obras = obrasGuardadas;
    }
    mostrarCarrito();
    actualizarCarrito();
    vaciarcarrito();
});

const obrasContainer = document.getElementById("tienda-container");

function renderObras(obras) {
    obrasContainer.innerHTML = '';
    obras.forEach((obra) => {
        const obraElement = `
            <div class="obras">
                <a href="${obra.detalle}">
                    <img src="${obra.img}" alt="${obra.titulo}" class="obras-img">
                </a>
                <h3>${obra.titulo}</h3>
                <p><strong>Artista:</strong> ${obra.artista}</p>
                <p><strong>Técnica:</strong> ${obra.tecnica}</p>
                <p><strong>Año:</strong> ${obra.ano}</p>
                <p><strong>Precio:</strong> $${obra.precio}</p>
                ${obra.stock > 0 ? 
                    `<button onclick="agregarAlCarrito('${obra.id}')">Comprar</button>` : 
                    `<p>Agotado</p>`}
            </div>
        `;
        obrasContainer.innerHTML += obraElement;
    });
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
    console.log("Tipo de carrito:", typeof carrito, carrito);

    localStorage.setItem('obras', JSON.stringify(obras)); 

    const obra = obras.find(o => o.id === id); 
    if (obra && obra.stock > 0) {
        carrito.push(obra); 
        obra.stock -= 1; 
        mostrarCarrito(); 
        actualizarCarrito();
        actualizarTotalCarrito();
        alert(`Se ha agregado "${obra.titulo}" al carrito.`);
        renderObras(obras);
        localStorage.setItem('obras', JSON.stringify(obras)); 
        const stockElement = document.getElementById(`stock-${id}`);
        const buttonElement = document.getElementById(`btn-${id}`);
        if (stockElement) {
            stockElement.textContent = `Stock: ${obra.stock}`;
        }
        if (obra.stock === 0 && buttonElement) {
            buttonElement.disabled = true;
            buttonElement.textContent = "Agotado";
        }
    } else {
        alert("No hay stock disponible.");
    }
}

function actualizarStock(id) {
    const producto = productos[id];
    const stockElement = document.getElementById(`stock-${id}`);
    const buttonElement = document.getElementById(`btn-${id}`);
    
    stockElement.textContent = `Stock: ${producto.stock}`;
    if (producto.stock === 0) {
        buttonElement.disabled = true; // Desactiva el botón
        buttonElement.textContent = "Agotado";
    }
}

function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id); // Filtrar el item a eliminar
        const obraEliminada = obras.find(o => o.id === id);
        if (obraEliminada) {
            obraEliminada.stock += 1; 
        }
        actualizarCarrito();
        mostrarCarrito(); 
        renderObras(obras); 
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precio, 0);
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "";
    } else {
        carrito.forEach(item => {
            const itemElement = `
                <div class="arrito-container">
                <div class="carrito-item">
                    <h3>${item.titulo}</h3>
                    <p>Precio: $${item.precio}</p>
                    <button onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
                </div></div>
            `;
            carritoContainer.innerHTML += itemElement;
        });
    }
}

mostrarCarrito();

function actualizarTotalCarrito() {
    const total = carrito.reduce((total, item) => total + item.precio, 0);
    
    document.getElementById("total-carrito").innerText = `$${total.toFixed(2)}`;
}  

document.getElementById("vaciarcarrito").addEventListener("click", vaciarcarrito);

function vaciarcarrito() {
    carrito.forEach(item => {
        const obraEliminada = obras.find(o => o.id === item.id);
        if (obraEliminada) {
            obraEliminada.stock += 1; // 
        }
    });
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();  
    renderObras(obras); 
}