import { obtenerProductos } from './obtenerProductos.js';
import { generarEstrellas } from './generarEstrellas.js';
import { acortarDescripcion } from './acortarInformacion.js';
import { acortarTitulo } from './acortarInformacion.js';
import { Carritos } from './Carritos.js';
import { burbujaCarrito } from './burbujaCarrito.js';

// Catálogo
const mostarProductos = document.getElementById("mostarProductos");

let carrito = [];
let todosLosProductos = [];

export const catalogoProductos = (filtrado = []) => {
    mostarProductos.innerHTML = ''; // Limpia el catálogo

    const productosAFiltrar = filtrado.length > 0 ? filtrado : todosLosProductos; 

    productosAFiltrar.forEach(producto => {
        const descripcionCorta = acortarDescripcion(producto.descripcion);
        const descripcionCompleta = producto.descripcion;
            mostarProductos.innerHTML += `
                <div class="col-md-6 col-lg-4 d-flex justify-content-center mt-3">
                    <div class="card text-dark mb-3" style="max-width: 18rem;">
                        <div class="card-header text-center">${producto.categoria}</div>
                        <div class="card-body">
                            <h4 class="tituloProducto card-title text-center">${acortarTitulo(producto.nombre)}</h4>
                            <h5 class="card-text text-center">$${(producto.precio).toLocaleString('es-CL')}</h5>
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="width: 100%; height: 250px; margin-bottom: 10px;" />

                            <h6 class="descripcionProducto" style="font-size: 13px; display: none;">${descripcionCompleta}</h6>
                            <h6 class="descripcionCorta" style="font-size: 13px;">
                                ${descripcionCorta}
                            </h6>

                            <div class="text-end">
                                <button class="toggle-button btn btn-sm btn-outline-dark text-end mb-4">Mostrar más</button>
                            </div>
                            <h6 id="rating" class="text-center">
                                ${generarEstrellas(producto.valoracion)}
                                ${producto.valoracion}
                            </h6>
                        </div>
                        <div class="card-footer text-center">
                            <button id="${producto.id}" class="agregar-carrito btn btn-primary">
                                AGREGAR <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Agregar productos al carrito
            const agregarAlCarrito = document.querySelectorAll(".agregar-carrito");

            agregarAlCarrito.forEach(button => {
                button.addEventListener("click", () => {
                    const productoId = button.id;
                    const productoSeleccionado = productosAFiltrar.find(producto => producto.id == productoId);

                    if(carrito.length == 0){
                        carrito = new Carritos(productoSeleccionado)
                        Swal.fire({
                            title: `¡${producto.nombre} ha sido agregado a tu carrito!`,
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#337c3f'
                        });
                        Toastify({
                            text: `¡Agregaste un producto!`,
                            duration: 3000,
                            close: true,
                            gravity: "bottom",
                            position: "left",
                            stopOnFocus: true,
                            style: {
                                background: "#8BC6EC",
                                background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
                            },
                            onClick: function(){}
                          }).showToast();
                    } else {
                        carrito.agregarProductos = productoSeleccionado;
                        Swal.fire({
                            title: `¡${producto.nombre} ha sido agregado a tu carrito!`,
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#337c3f'
                        });
                        Toastify({
                            text: `¡Agregaste un producto!`,
                            duration: 3000,
                            close: true,
                            gravity: "bottom",
                            position: "left",
                            stopOnFocus: true,
                            style: {
                                background: "#8BC6EC",
                                background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
                            },
                            onClick: function(){}
                          }).showToast();
                    };
                    burbujaCarrito(carrito);
                });
            });

        });

        // Descripcion Ver Mas - Ver Menos
        const buttons = document.querySelectorAll('.toggle-button');
        buttons.forEach(button => {
            const descripcionCompleta = button.closest('.card-body').querySelector('.descripcionProducto');

            if (descripcionCompleta.innerText.length <= 80) {
                button.style.display = "none"; 
            } 

            button.addEventListener('click', () => {
                const descripcionCorta = button.closest('.card-body').querySelector('.descripcionCorta');
                const esVisible = descripcionCompleta.style.display === 'block';

                if (esVisible) {
                    descripcionCompleta.style.display = 'none';
                    descripcionCorta.style.display = 'block';
                    button.textContent = 'Mostrar más';
                } else {
                    descripcionCompleta.style.display = 'block'; 
                    descripcionCorta.style.display = 'none'; 
                    button.textContent = 'Mostrar menos'; 
                }
            });
        });      

    
};

// Cuando se carga la página al principio, viene con todo
obtenerProductos()
    .then(data => {
        todosLosProductos = data;
        catalogoProductos(todosLosProductos);
    })
    .catch(error => console.error("Error al obtener productos:", error));



