let paginaActual = 1; 
const anteriorPagina = document.getElementById("PaginaAnterior");
const siguientePagina = document.getElementById("PaginaSiguiente");

export const paginacion = (count, next, prev, renderizarPersonajesRickMorty) => {
    const insertarPaginacion = document.getElementById("InsertarPaginacion");
    const totalPaginas = Math.ceil(count / 20);
    insertarPaginacion.innerHTML = "";

    const desmarcarBotones = () => {
        const botones = insertarPaginacion.querySelectorAll("button");
        botones.forEach(boton => {
            boton.classList.remove('btn-primary');
            boton.classList.add('btn-success');
        });
    };

    for (let i = 0; i < totalPaginas; i++) {
        const botonPagina = document.createElement("button");
        botonPagina.textContent = `${i + 1}`;
        botonPagina.classList.add('btn', 'btn-sm', 'btn-success');
        const pagina = 1 * i;
        const url = `https://rickandmortyapi.com/api/character?page=${pagina}`;

        if (i + 1 === paginaActual) {
            botonPagina.classList.remove('btn-success');
            botonPagina.classList.add('btn-primary');
        }

        botonPagina.addEventListener("click", (e) => {
            e.preventDefault();
            desmarcarBotones();
            botonPagina.classList.remove('btn-success');
            botonPagina.classList.add('btn-primary');
            
            paginaActual = i + 1; 
            renderizarPersonajesRickMorty(url);
        });

        insertarPaginacion.appendChild(botonPagina);
    }

    siguientePagina.onclick = (e) => {
        e.preventDefault();
        if (next) {
            paginaActual++;
            renderizarPersonajesRickMorty(next);
        }
    };

    anteriorPagina.onclick = (e) => {
        e.preventDefault();
        if (prev) {
            paginaActual--; 
            renderizarPersonajesRickMorty(prev);
        }
    };

    (next) ? siguientePagina.style.display = "block" : siguientePagina.style.display = "none";
    (prev) ? anteriorPagina.style.display = "block" : anteriorPagina.style.display = "none";

};
