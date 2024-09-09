let episodiosRickMorty;

fetch('https://rickandmortyapi.com/api/character')
    .then((response) => response.json())
    .then((data) => {
        const personaje = data;
        const personajeRickMorty = personaje.results;

        const divPersonajes = document.getElementById("Personajes");
        
        const personajesHTML = personajeRickMorty.map(personaje => {
            return `<div class="col-lg-3 col-md-3 col-sm-4 card text-center mt-5 animate__animated">
                        <img id="${personaje.id}" class="img-fluid m-auto imagen-pequena" src="${personaje.image}" alt="${personaje.image}"></img>
                        <h4>${personaje.name}</h4>
                        <h6>Aparece en: ${personaje.episode.length > 1 ? `${personaje.episode.length} capitulos` : `${personaje.episode.length} capitulo`} </h6>
                        <h6>Género: ${
                            personaje.gender == 'Male' ? 'Hombre' :
                            personaje.gender == 'Female' ? 'Mujer' :
                            personaje.gender
                        }</h6>
                        <h6 class="text-end">Estado: 
                            ${ 
                                personaje.status == 'Alive' ? '<button class="btn btn-success p-1">Vivo</button>' : 
                                personaje.status == 'Dead' ? '<button class="btn btn-danger p-1">Muerto</button>' : 
                                personaje.status == 'unknown' ? '<button class="btn btn-secondary p-1">Desconocido</button>' :
                                personaje.status 
                            }
                        </h6>
                    </div>`;
            }).join('');
        
        divPersonajes.innerHTML = personajesHTML;
});
