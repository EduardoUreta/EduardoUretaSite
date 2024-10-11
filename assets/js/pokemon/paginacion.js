let paginaActual = 1; 
const anteriorPagina = document.getElementById("PaginaAnterior");
const siguientePagina = document.getElementById("PaginaSiguiente");

export const paginacion = (count, next, previous, renderizarPokemon) => {
    const insertarPaginacion = document.getElementById("InsertarPaginacion");
    const totalPaginas = Math.ceil(count / 20);
    insertarPaginacion.innerHTML = "";

    const desmarcarBotones = () => {
        const botones = insertarPaginacion.querySelectorAll("button");
        botones.forEach(boton => {
            boton.classList.remove('btn-primary');
            boton.classList.add('btn-secondary');
        });
    };

    for (let i = 0; i < totalPaginas; i++) {
        const botonPagina = document.createElement("button");
        botonPagina.textContent = `${i + 1}`;
        botonPagina.classList.add('btn', 'btn-sm', 'btn-secondary');
        const offset = 20 * i;
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;

        if (i + 1 === paginaActual) {
            botonPagina.classList.remove('btn-secondary');
            botonPagina.classList.add('btn-primary');
        }

        botonPagina.addEventListener("click", (e) => {
            e.preventDefault();
            desmarcarBotones();
            botonPagina.classList.remove('btn-secondary');
            botonPagina.classList.add('btn-primary');
            
            paginaActual = i + 1; 
            renderizarPokemon(url);
        });

        insertarPaginacion.appendChild(botonPagina);
    }

    siguientePagina.onclick = (e) => {
        e.preventDefault();
        if (next) {
            paginaActual++;
            renderizarPokemon(next);
        }
    };

    anteriorPagina.onclick = (e) => {
        e.preventDefault();
        if (previous) {
            paginaActual--; 
            renderizarPokemon(previous);
        }
    };

    (next) ? siguientePagina.style.display = "block" : siguientePagina.style.display = "none";
    (previous) ? anteriorPagina.style.display = "block" : anteriorPagina.style.display = "none";

};
