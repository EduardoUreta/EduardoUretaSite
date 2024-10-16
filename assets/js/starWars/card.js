export const card = (personaje) => {
    return `
        <div class="col-md-4 align-content-center mt-1 mb-1"> 
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-3 text-warning">${personaje.name}</h5>
                    <h6 class="card-subtitle text-secondary"><strong class="text-dark">Género:</strong> ${(personaje.gender == 'male') ? 'Hombre' : (personaje.gender == 'female') ? 'Mujer' : '(?)'}</h6>
                    <h6 class="card-subtitle text-secondary"><strong class="text-dark">Altura:</strong> ${personaje.height/100} M</h6>
                    <h6 class="card-subtitle text-secondary"><strong class="text-dark">Peso:</strong> ${(personaje.mass == 'unknown') ? 'N/A' : personaje.mass} KG</h6>
                    <h6 class="card-subtitle text-secondary small">Estuvo en ${(personaje.films).length} películas</h6>
                </div>
            </div>
        </div>
    `;
};