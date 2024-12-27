document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("obras-container");

  if (container) {
    obras.forEach((obra) => {
      const obraElement = document.createElement("div");
      obraElement.classList.add("obra");

      if (obra.img && obra.titulo && obra.detalle) {
        obraElement.innerHTML = `
            <a href="${obra.detalle}">
              <img src="${obra.img}" alt="${obra.titulo}" class="obra-img">
            </a>
            <h3>${obra.titulo}</h3>
        `;

        container.appendChild(obraElement);
      } else {
        console.error("Faltan datos de la obra", obra);
      }
    });
  } else {
    console.error("No se pudo encontrar.");
  }
});