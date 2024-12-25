
// function mostrarCarrito() {
//     const carritoContainer = document.getElementById("carrito-container");
//     carritoContainer.innerHTML = "";  

//     if (carrito.length === 0) {
//         carritoContainer.innerHTML = "<p>El carrito está vacío</p>";
//     } else {
//         carrito.forEach(item => {
//             const itemElement = `                 
//                 <div class="carrito-item">
//                     <img src="${item.imagen}" alt="${item.titulo}" class="imagen-carrito">
//                     <h3>${item.titulo}</h3>
//                     <p>Precio: $${item.precio}</p>
//                     <p>Descripción: ${item.descripcion}</p>
//                     <button class="btn-comprar"onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
//                 </div>
//             `;
//             carritoContainer.innerHTML += itemElement;
//         });

//         document.getElementById("total").innerText = calcularTotal();
//     }
// }


// function eliminarDelCarrito(id) {
//     carrito = carrito.filter(item => item.id !== id); 
//     localStorage.setItem('carrito', JSON.stringify(carrito));  
//     mostrarCarrito();  
// }



// function calcularTotal() {
//     return carrito.reduce((total, item) => total + item.precio, 0);
// }
// mostrarCarrito();

// /*Simular compra*/
// document.getElementById("comprar-carrito").addEventListener("click", function() {
//     if (carrito.length === 0) {
//         alert("Tu carrito está vacío. No puedes realizar la compra.");
//     } else {
//         // Aquí podrías redirigir a una página de pago o mostrar una alerta
//         alert("Gracias por tu compra. El proceso de pago será realizado próximamente.");
//         carrito = []; // Vaciar el carrito después de "comprar"
//         localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar carrito vacío
//         mostrarCarrito(); // Actualizar la vista del carrito
//     }
// });
