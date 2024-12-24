let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const obrasContainer = document.getElementById("tienda-container");

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
            <a href="${obra.detalle}" class="btn-comprar">Ver detalle</a>
            ${obra.stock > 0 ? 
                `<button class="btn-comprar" onclick="agregarAlCarrito('${obra.id}')">Comprar</button>` : 
                `<p>Agotado</p>`}
        </div>
    `;
    obrasContainer.innerHTML += obraElement;
});

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    const obra = obras.find(o => o.id === id); 
    if (obra) {
        carrito.push(obra); 
        actualizarCarrito();
        alert(`Se ha agregado "${obra.titulo}" al carrito.`);
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id); 
    actualizarCarrito(); 
    mostrarCarrito(); 
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío</p>";
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

mostrarCarrito();



// function actualizarCarrito() {
//     localStorage.setItem('carrito', JSON.stringify(carrito));
// }

// /*carrito*/
// obras.forEach((obra) => {
//     const obraElement = `
//         <div class="obras">
//             <a href="${obra.detalle}">
//                 <img src="${obra.img}" alt="${obra.titulo}" class="obras-img">
//             </a>
//             <h3>${obra.titulo}</h3>
//             <p><strong>Artista:</strong> ${obra.artista}</p>
//             <p><strong>Técnica:</strong> ${obra.tecnica}</p>
//             <p><strong>Año:</strong> ${obra.ano}</p>
//             <p><strong>Precio:</strong> $${obra.precio}</p>
//             <a href="${obra.detalle}" class="btn-comprar">Ver detalle</a>
//             ${obra.stock > 0 ? 
//                 `<button class="btn-comprar">Comprar</button>` : 
//                 `<p>Agotado</p>`}
//         </div>
//     `;
//     obrasContainer.innerHTML += obraElement;
//   });

// function mostrarCarrito() {
//     const carritoContainer = document.getElementById("carrito-container");
//     carritoContainer.innerHTML = ""; // Limpiar contenido

//     carrito.forEach(item => {
//         const itemElement = `
//             <div class="carrito-item">
//                 <h3>${item.titulo}</h3>
//                 <p>Precio: $${item.precio}</p>
//             </div>
//         `;
//         carritoContainer.innerHTML += itemElement;
//     });
// }

// mostrarCarrito();  // Llamar a la función para mostrar el carrito


//   function agregarAlCarrito(id) {
//     const obra = obras.find(o => o.id === id); // Buscar la obra con ese id
//     if (obra) {
//         carrito.push(obra); // Agregar la obra al carrito
//         actualizarCarrito(); // Guardar el carrito actualizado en localStorage
//         alert(`Se ha agregado "${obra.titulo}" al carrito.`);
//     }
// }

// function mostrarCarrito() {
//     console.log(carrito);
// }

// mostrarCarrito();