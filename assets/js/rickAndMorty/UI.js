import { acortarNombre } from "./acortarNombre.js";

export const rickMortyCard = (value) => {
            return `
            <div class="col-lg-6 col-md-6 col-sm-12 card m-auto m-0 justify-content-center text-center mt-5 animate__animated">
                <div class="license-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="card-header">
                        <h1>Portal License</h1>
                    </div>
                    <div class="card-body d-flex flex-column flex-md-row align-items-center">
                        <div class="photo-section d-flex flex-column align-items-center mb-3 mb-md-0">
                            <img id="${value.id}" class="photo img-fluid rounded-circle" src="${value.image}" alt="${value.name}">
                        </div>
                        <div class="info-section w-100 w-md-75 ms-md-4 text-start">
                            <h4 class="mt-2 text-center">${acortarNombre(value.name)}</h4>
                            <div class="info-group justify-content-center">
                                <label>Género:
                                    <span>${
                                        value.gender === 'Male' ? 'Hombre' :
                                        value.gender === 'Female' ? 'Mujer' :
                                        value.gender}
                                    </span>
                                </label>

                            </div>
                            <div class="info-group justify-content-center">
                                <label>Capítulos:
                                    <span>
                                        ${value.episode?.length || 'Desconocido'}
                                    </span>
                                </label>
                            </div>
                            <div class="info-group justify-content-center">
                                <label>Estado:
                                    <span>${
                                    value.status === 'Alive' ? 'Vivo' :
                                    value.status === 'Dead' ? 'Muerto' :
                                    value.status === 'unknown' ? 'Desconocido' :
                                    value.status}
                                    </span>
                                </label>
                                
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
        };