import { fetchPersonajes } from "./fetchPersonajes.js";
import { rickMortyCard } from "./UI.js";
import { renderizarPersonajesRickMorty } from "./script.js";

const nombrePersonaje = document.getElementById("nombrePersonaje");
const personajes = document.getElementById("Personajes");
const paginacion = document.getElementById("Paginacion");

export const buscarPersonaje = () => {
    nombrePersonaje.addEventListener("input", async (e) => {
        let busqueda = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
        let urls = [];
    
        if(busqueda.length > 3){
            try {
                let respuesta = await fetchPersonajes('https://rickandmortyapi.com/api/character');
                const { info } = respuesta;
                const totalPages = info.pages;
        
                for (let i = 0; i < totalPages; i++) {
                    urls.push(`https://rickandmortyapi.com/api/character?page=${i + 1}`);
                }
        
                const arregloPromesasRickMorty = await Promise.all(
                    urls.map(url => fetchPersonajes(url)
                ));

                const personajesFiltrados = [];

                for (const promesa of arregloPromesasRickMorty) {
                    const personajes = promesa.results.filter(personaje => personaje.name.includes(busqueda));
                    personajesFiltrados.push(...personajes);
                }

                personajes.innerHTML = "";
                paginacion.style.display = "none";
                if (personajesFiltrados.length > 0) {
                    personajesFiltrados.forEach(personaje => {
                        personajes.innerHTML += rickMortyCard(personaje);
                    });
                } else {
                    personajes.innerHTML = "<p class='text-center text-light'>No se encontraron personajes con ese nombre.</p>";
                }
        
            } catch (error) {
                console.log(error);
            }
        } else if (busqueda.length == 0){
            renderizarPersonajesRickMorty('https://rickandmortyapi.com/api/character');
            paginacion.style.display = 'flex'; 
        }
    });
}    