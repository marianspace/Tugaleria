document.getElementById('formulario-obra').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    // Obtener datos del formulario
    const obra = {
        titulo: formData.get('titulo'),
        artista: formData.get('artista'),
        tecnica: formData.get('tecnica'),
        anio: formData.get('anio'),
        precio: formData.get('precio'),
        imagen: formData.get('imagen').name // Solo nombre del archivo
    };

    // Subir obra
    try {
        const response = await fetch('/api/obras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obra),
        });

        if (response.ok) {
            alert('Obra subida correctamente');
        } else {
            alert('Hubo un error al subir la obra');
        }
    } catch (error) {
        console.error('Error al subir la obra:', error);
    }
});

// Función para mostrar obras aleatoriamente en la página de inicio
async function mostrarObrasAleatorias() {
    const response = await fetch('/api/obras');
    const obras = await response.json();

    // Seleccionamos 3 obras aleatorias
    const obrasAleatorias = [];
    while (obrasAleatorias.length < 3) {
        const randomIndex = Math.floor(Math.random() * obras.length);
        if (!obrasAleatorias.includes(obras[randomIndex])) {
            obrasAleatorias.push(obras[randomIndex]);
        }
    }

    // Mostrar en el carrusel
    const carrusel = document.getElementById('inicio');
    carrusel.innerHTML = ''; // Limpiar carrusel

    obrasAleatorias.forEach(obra => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = `
            <a href="obras/${obra.titulo}.html"><img src="img/${obra.imagen}" alt="${obra.titulo}"></a>
        `;
        carrusel.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', mostrarObrasAleatorias);
