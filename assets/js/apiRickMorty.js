fetch('https://rickandmortyapi.com/api/character')
    .then((response) => response.json())
    .then((data) => {
        const personajeRickMorty = data.results;

        const divPersonajes = document.getElementById("Personajes");
        if (!divPersonajes) {
            console.error("El contenedor con ID 'Personajes' no existe.");
            return;
        }
        
        const personajesHTML = personajeRickMorty.map(personaje => {
            return `
            <div class="col-lg-6 col-md-6 col-sm-12 card m-auto m-0 justify-content-center text-center mt-5 animate__animated">
                <div class="license-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="card-header">
                        <h1>Portal License</h1>
                    </div>
                    <div class="card-body d-flex flex-column flex-md-row align-items-center">
                        <div class="photo-section d-flex flex-column align-items-center mb-3 mb-md-0">
                            <img id="${personaje.id}" class="photo img-fluid rounded-circle" src="${personaje.image}" alt="${personaje.name}">
                        </div>
                        <div class="info-section w-100 w-md-75 ms-md-4 text-start">
                            <h4 class="mt-2 text-center">${personaje.name}</h4>
                            <div class="info-group">
                                <label>Género:</label>
                                <span>${
                                    personaje.gender === 'Male' ? 'Hombre' :
                                    personaje.gender === 'Female' ? 'Mujer' :
                                    personaje.gender
                                }</span>
                            </div>
                            <div class="info-group">
                                <label>Capítulos:</label>
                                <span>${personaje.episode?.length || 'Desconocido'}</span>
                            </div>
                            <div class="info-group">
                                <label>Estado:</label>
                                <span>${
                                    personaje.status === 'Alive' ? 'Vivo' :
                                    personaje.status === 'Dead' ? 'Muerto' :
                                    personaje.status === 'unknown' ? 'Desconocido' :
                                    personaje.status
                                }</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="footer-info">
                            <p><strong>Dimensión:</strong> C-137</p>
                            <p><strong>Universo:</strong> Universo 1234</p>
                        </div>
                        <div class="barcode">
                            <svg width="100" height="40">
                                <rect width="2" height="40" fill="#000"></rect>
                                <rect x="5" width="2" height="40" fill="#000"></rect>
                                <rect x="10" width="2" height="40" fill="#000"></rect>
                                <rect x="15" width="2" height="40" fill="#000"></rect>
                                <rect x="20" width="2" height="40" fill="#000"></rect>
                                <rect x="25" width="2" height="40" fill="#000"></rect>
                                <rect x="30" width="2" height="40" fill="#000"></rect>
                                <rect x="35" width="2" height="40" fill="#000"></rect>
                                <rect x="40" width="2" height="40" fill="#000"></rect>
                                <rect x="45" width="2" height="40" fill="#000"></rect>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>`;
            }).join('');
        
        divPersonajes.innerHTML = personajesHTML;
    })
    .catch(error => console.error('Error al obtener los datos:', error));
