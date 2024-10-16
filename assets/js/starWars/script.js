import { fetchData } from "./fetchData.js";
import { card } from "./card.js";

const cardsUnoCinco = document.getElementById("CardsUnoCinco");
const cardsSeisOnce = document.getElementById("CardsSeisOnce");
const cardsDoceDiecisiete = document.getElementById("CardsDoceDiecisiete");

let generadorUnoCinco;
let generadorSeisOnce;
let generadorDoceDiecisiete;

function* mostrarCardUnoCinco(results) {
    let i = 0;
    while (i < 5) {
        yield card(results[i]);  
        i++;        
    }
}

function* mostrarCardSeisOnce(results) {
    let i = 5;
    while (i < 10) {
        yield card(results[i]);  
        i++;        
    }
}

function* mostrarCardDoceDiecisiete(results) {
    let i = 0;
    while (i < 5) {
        yield card(results[i]);  
        i++;        
    }
}

const manejarClick = async(card, mostrarCard, generador, url) => {
    try {
        if (!generador.value) {
            const datos = await fetchData(url);
            const { results } = datos;
            generador.value = mostrarCard(results);
        }

        const { value, done } = generador.value.next();

        if (!done) {
            card.innerHTML += value;  
        }

    } catch (error) {
        console.log("Error:", error);
    }
}

const generadores = {
    unoCinco: { value: null },
    seisOnce: { value: null },
    doceDiecisiete: { value: null },
};

cardsUnoCinco.addEventListener("click", () => {
    manejarClick(cardsUnoCinco, mostrarCardUnoCinco, generadores.unoCinco, 'https://swapi.dev/api/people/');
});
cardsSeisOnce.addEventListener("click", () => {
    manejarClick(cardsSeisOnce, mostrarCardSeisOnce, generadores.seisOnce, 'https://swapi.dev/api/people/');
});
cardsDoceDiecisiete.addEventListener("click", () => {
    manejarClick(cardsDoceDiecisiete, mostrarCardDoceDiecisiete, generadores.doceDiecisiete, 'https://swapi.dev/api/people/?page=2');
});
