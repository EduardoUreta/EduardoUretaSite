import { fetchPokemon, fetchPokemonByUrl } from "./fetchPokemon.js";
import { pokemonCard } from "./UI.js";
import { paginacion } from "./paginacion.js";
import { generaciones, officialArtwork, sprite } from "./spritesPokemon.js";

const app = document.getElementById("app");
const cargando = document.getElementById("cargando");

export const renderizarPokemon = async(url) => {
  try {
    const respuesta = await fetchPokemon(url);
    const {results, next, previous, count} = respuesta;

    const arregloPromesasPokemon = results.map(pokemon => {
      return fetchPokemonByUrl(pokemon.url);
    });

    const promesasCumplidasPokemon = await Promise.allSettled(arregloPromesasPokemon);

    app.innerHTML = '';

    (previous == null) 
      ? document.getElementById("PaginaAnterior").style.display = "none"
      : document.getElementById("PaginaAnterior").style.display = "flex";

    (next == null) 
      ? document.getElementById("PaginaSiguiente").style.display = "none"
      : document.getElementById("PaginaSiguiente").style.display = "flex";
    
    promesasCumplidasPokemon.forEach(pokemon => {
      const value = pokemon.value;
      app.innerHTML += pokemonCard(value);
    });

    paginacion(count, next, previous, renderizarPokemon);

  } catch (error) {
    console.error(error);
  } finally {
    cargando.style.display = "none";
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderizarPokemon('https://pokeapi.co/api/v2/pokemon/'); 
});

sprite();
officialArtwork();
generaciones();