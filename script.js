// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Carrito
//Agregar
function agregarAlCarrito(titulo, artista, precio) {
    const productoExistente = carrito.find(producto => producto.titulo === titulo);
    if (productoExistente) {
        alert(`La obra "${titulo}" ya está en el carrito.`);
        return;
    }

// Agregar nueva obra al carrito
    carrito.push({ titulo, artista, precio, cantidad: 1 });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');

    // Limpiar contenido actual
    listaCarrito.innerHTML = '';

    // Mostrar cada producto del carrito
    let total = 0;
    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `${producto.titulo} - $${producto.precio} (${producto.cantidad})`;

        // Botón para eliminar el producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => {
            eliminarDelCarrito(producto.titulo);
        };
        item.appendChild(botonEliminar);

        listaCarrito.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    // Actualizar total
    totalElemento.textContent = total;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(titulo) {
    carrito = carrito.filter(producto => producto.titulo !== titulo);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para comprar los productos
function comprarProductos() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return;
    }

// Simular compra
    alert('Gracias por tu compra. El carrito será vaciado.');
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();

    // Asociar evento al botón de "Comprar"
    document.getElementById('boton-comprar').addEventListener('click', comprarProductos);
});


/*Galeria*/
fetch('obras.json')
  .then(response => response.json())
  .then(obras => {
    const contenedorGaleria = document.querySelector('.gallery-container');

    obras.forEach(obra => {
      const divObra = document.createElement('div');
      divObra.classList.add('card');
      divObra.innerHTML = `
        <a href="obras/${obra.titulo}.html">
          <img src="img/${obra.titulo}.jpg" alt="${obra.titulo}">
        </a>
        <h3>${obra.titulo}</h3>
        <p>Artista: ${obra.artista}</p>
        <p>Técnica: ${obra.tecnica}</p>
        <p>Año: ${obra.ano}</p>
        <p>Precio: $${obra.precio}</p>
      `;
      contenedorGaleria.appendChild(divObra);
    });
  })
  .catch(error => console.error('Error al cargar las obras:', error));
