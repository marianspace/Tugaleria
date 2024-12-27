document.addEventListener("DOMContentLoaded", () => {
    renderObras(obras);

    localStorage.setItem('carrito', JSON.stringify(carrito)); 

    mostrarCarrito();
    actualizarCarrito();
});

const obrasContainer = document.getElementById("tienda-container");

function renderObras(obras) {
    obrasContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar las obras
    obras.forEach((obra) => {
        const obraElement = `
            <div class="obras" id="obra-${obra.id}">
                <a href="${obra.detalle}">
                    <img src="${obra.img}" alt="${obra.titulo}" class="obras-img">
                </a>
                <h3>${obra.titulo}</h3>
                <p><strong>Artista:</strong> ${obra.artista}</p>
                <p><strong>Técnica:</strong> ${obra.tecnica}</p>
                <p><strong>Año:</strong> ${obra.ano}</p>
                <p><strong>Precio:</strong> $${obra.precio}</p>
                <p class="stock" id="stock-${obra.id}"><strong>Stock:</strong> ${obra.stock}</p>
                ${obra.stock > 0 ? 
                    `<button id="btn-${obra.id}" onclick="agregarAlCarrito('${obra.id}')">Comprar</button>` : 
                    `<p>Agotado</p>`}
            </div>
        `;
        obrasContainer.innerHTML += obraElement;
    });
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
    console.log("Tipo de carrito:", typeof carrito, carrito);

    const obra = obras.find(o => o.id === id); 
    if (obra && obra.stock > 0) {
        carrito.push(obra); 
        obra.stock -= 1; 
        
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        

        mostrarCarrito(); 
        actualizarCarrito(); 
        actualizarTotalCarrito();
        
        alert(`la"${obra.titulo}" esta en el carrito.`);
        
        const stockElement = document.getElementById(`stock-${obra.id}`);
        if (stockElement) {
            stockElement.textContent = `Stock: ${obra.stock}`;
        }

        const buttonElement = document.getElementById(`btn-${id}`);
        if (obra.stock === 0 && buttonElement) {
            buttonElement.disabled = true;
            buttonElement.textContent = "Agotado";
        }
    } else {
        alert("No hay stock.");
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    const obraEliminada = obras.find(o => o.id === id);
    if (obraEliminada) {
        obraEliminada.stock += 1; 
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    
    actualizarCarrito();
    actualizarTotalCarrito();
    mostrarCarrito(); 
    renderObras(obras); 
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); // 
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
                <div class="carrito-item">
                    <h3>${item.titulo}</h3>
                    <p>Precio: $${item.precio}</p>
                    <button onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
                </div>
            `;
            carritoContainer.innerHTML += itemElement;
        });
    }
}

function actualizarTotalCarrito() {
    const total = carrito.reduce((total, item) => total + item.precio, 0);
    document.getElementById("total-carrito").innerText = `$${total.toFixed(2)}`;
}


