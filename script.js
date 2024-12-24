document.addEventListener("DOMContentLoaded", () => {
    creargaleriaobras(obras);
});

/*obras*/
const obras = [
    {
      id: "1",
      titulo: "Colores",
      img: "../img/1.jpg",
      artista: "Mariana",
      tecnica: "Bordado",
      ano: 2020,
      precio: 5000,
      detalle: "obras/01.html",
      stock: 1,
    },
    {
      id: "2",
      titulo: "Esto no es una pipa",
      img: "../img/2.jpg",
      artista: "Pepita",
      tecnica: "Bordado sobre papel",
      ano: 2023,
      precio: 4400,
      stock: 1,
      detalle: "obras/02.html",
    },
    {
      id: "3",
      titulo: "Familia",
      img: "/img/3.jpg",
      artista: "Mariana",
      tecnica: "Bordado sobre fotografía",
      ano: 2023,
      precio: 5000,
      stock: 1,
      detalle: "obras/03.html",
    },
    {
      id: "4",
      titulo: "Una Mano",
      artista: "Constanza",
      img: "/img/4.jpg",
      tecnica: "Bordado sobre fotografía",
      ano: 2023,
      precio: 5000,
      stock: 1,
      detalle: "obras/04.html",
    }
  ];
  
/*Galeria de obras*/
const contenedorobras = document.getElementById("gallery-container");
/*index galeria*/
const container = document.getElementById("obras-container");
/*tienda*/


/*web index*/
obras.forEach((obra) => {
  const obraElement = document.createElement("div");
  obraElement.classList.add("obra");

  obraElement.innerHTML = `
      <a href="${obra.detalle}">
      <img src="${obra.img}" alt="${obra.titulo}" class="obra-img">
      </a>
      <h3>${obra.titulo}</h3>
  `;
  container.appendChild(obraElement);
});