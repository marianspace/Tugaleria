document.addEventListener("DOMContentLoaded", () => {
    creargaleriaobras(obras);
});
  
/*Galeria de obras*/
const contenedorobras = document.getElementById("gallery-container");
/*index galeria*/
const container = document.getElementById("obras-container");
/*tienda*/

document.addEventListener("DOMContentLoaded", () => {
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
});

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