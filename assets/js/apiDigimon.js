const url = 'https://digimon-api.vercel.app/api/digimon';
const options = {
	method: 'GET',

};

let personajes = [];
let personajesOrdenados = [];

const getCharacterList = async () => {
	try {
		const response = await fetch(url, options);
		personajes = await response.json();    

        const ordenarDigimon = document.getElementById("ordenarDigimon");

        // Default
        const nivelesOrden = ["Fresh", "Training", "In Training", "Rookie", "Champion", "Armor", "Ultimate", "Mega"];
        personajesOrdenados = personajes.sort((a, b) => {
            return nivelesOrden.indexOf(a.level) - nivelesOrden.indexOf(b.level);
        });

        actualizarPersonajes(personajesOrdenados);

        // Al ordenar
        ordenarDigimon.addEventListener("change", (e) => {
            if(e.target.value == 'NivelMenorAMayor')  {
                const nivelesOrden = ["Fresh", "Training", "In Training", "Rookie", "Champion", "Armor", "Ultimate", "Mega"];
                personajesOrdenados = personajes.sort((a, b) => {
                    return nivelesOrden.indexOf(a.level) - nivelesOrden.indexOf(b.level);
                });
            } else if (e.target.value == 'NivelMayorAMenor'){
                const nivelesOrden = ["Mega","Ultimate","Armor","Champion","Rookie","In Training", "Training","Fresh"];
                personajesOrdenados = personajes.sort((a, b) => {
                    return nivelesOrden.indexOf(a.level) - nivelesOrden.indexOf(b.level);
                });
            } else if (e.target.value == 'NombreAsc'){
                personajesOrdenados = personajes.sort((a, b) => {
                    if(a.name > b.name){
                        return 1;
                    } else if(a.name < b.name){
                        return -1;
                    } else {
                        return 0;
                    }
                });
            } else if (e.target.value == 'NombreDesc'){
                personajesOrdenados = personajes.sort((a, b) => {
                    if(a.name < b.name){
                        return 1;
                    } else if(a.name > b.name){
                        return -1;
                    } else {
                        return 0;
                    }
                });                
            } 
            actualizarPersonajes(personajesOrdenados);
        })
	} catch (error) {
		console.error('Error al obtener los datos:', error);
	}
};

getCharacterList();

const actualizarPersonajes = (personajesOrdenados) => {
    const divPersonajes = document.getElementById("PersonajesDigimon");

    const personajesHTML = personajesOrdenados.map(personaje => {
        return `<div class="col-lg-3 col-md-3 col-sm-4 text-center mt-5 animate__animated">
                    <img class="img-fluid img-thumbnail" src="${personaje.img}"/>
                    <h4 class="text-warning ">${personaje.name}</h4>
                    <h6 class="text-light ">Nivel: ${
                        personaje.level == 'In Training' ? 'En Entrenamiento' :
                        personaje.level == 'Training' ? 'En Entrenamiento' :
                        personaje.level == 'Rookie' ? 'Novato' :
                        personaje.level == 'Champion' ? 'Campeón' :
                        personaje.level == 'Fresh' ? 'Bebé' :
                        personaje.level == 'Ultimate' ? 'Ultra' :
                        personaje.level == 'Mega' ? 'Mega' :
                        personaje.level
                    }</h6>
                </div>`;
    }).join('');

    divPersonajes.innerHTML = personajesHTML;
};

// Buscar Digimon
const nombreDigimon = document.getElementById("nombreDigimon");

nombreDigimon.addEventListener('input', (e) => {
    
    if(e.target.value == ''){
        document.getElementById("bloqueOrdenar").classList.add('d-block');
        document.getElementById("bloqueOrdenar").classList.remove('d-none');
    } else {
        document.getElementById("bloqueOrdenar").classList.add('d-none');
        document.getElementById("bloqueOrdenar").classList.remove('d-block');
    }

    let busqueda = e.target.value.toLowerCase();
    
    const digimonEncontrado = personajesOrdenados.filter(personaje => 
        personaje.name.toLowerCase().includes(busqueda)
    );
    
    const divPersonajes = document.getElementById("PersonajesDigimon");

    const personajesHTML = digimonEncontrado.map(personaje => {
        return `<div class="col-lg-3 col-md-3 col-sm-4 text-center mt-5 animate__animated">
                    <img class="img-fluid img-thumbnail" src="${personaje.img}"/>
                    <h4 class="text-warning">${personaje.name}</h4>
                    <h6 class="text-light">Nivel: ${
                        personaje.level == 'In Training' ? 'En Entrenamiento' :
                        personaje.level == 'Training' ? 'En Entrenamiento' :
                        personaje.level == 'Rookie' ? 'Novato' :
                        personaje.level == 'Champion' ? 'Campeón' :
                        personaje.level == 'Fresh' ? 'Bebé' :
                        personaje.level == 'Ultimate' ? 'Ultra' :
                        personaje.level == 'Mega' ? 'Mega' :
                        personaje.level
                    }</h6>
                </div>`;
    }).join('');

    divPersonajes.innerHTML = personajesHTML;
});
