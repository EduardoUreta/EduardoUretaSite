import { fetchPersonajes, fetchPersonajesByUrl } from "./fetchPersonajes.js";
import { rickMortyCard } from "./UI.js";
import { paginacion } from "./paginacion.js";
import { buscarPersonaje } from "./buscarPersonaje.js";

const divPersonajes = document.getElementById("Personajes");
const cargando = document.getElementById("cargando");

export const renderizarPersonajesRickMorty = async(url) => {
    try {
        const respuesta = await fetchPersonajes(url);
        const {results, info} = respuesta;
        const {count, next, prev } = info;

        const arregloPromesasRickMorty = results.map(personaje => {
            return fetchPersonajesByUrl(personaje.url);
        });

        const promesasCumplidasRickMorty = await Promise.allSettled(arregloPromesasRickMorty);

        divPersonajes.innerHTML = "";

        promesasCumplidasRickMorty.forEach(personaje => {
            const value = personaje.value;
            divPersonajes.innerHTML += rickMortyCard(value);
        });

        (prev == null) 
        ? document.getElementById("PaginaAnterior").style.display = "none"
        : document.getElementById("PaginaAnterior").style.display = "flex";

        (next == null) 
        ? document.getElementById("PaginaSiguiente").style.display = "none"
        : document.getElementById("PaginaSiguiente").style.display = "flex";
    
        paginacion(count, next, prev, renderizarPersonajesRickMorty);
        
    } catch (error) {
        console.error(error);
    } finally {
        cargando.style.display = "none";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarPersonajesRickMorty('https://rickandmortyapi.com/api/character'); 
    buscarPersonaje();
});
  