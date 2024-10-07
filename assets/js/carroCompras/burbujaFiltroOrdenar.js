import { catalogoProductos } from "./catalogoProductos.js";
import { obtenerProductos } from "./obtenerProductos.js";

const burbujaFiltrar = document.getElementById("burbujaFiltrar");
const burbujaOrdenar = document.getElementById("burbujaOrdenar");

const botonCategorias = document.getElementById("BotonCategorias");
let insertarCategoria = document.getElementById("InsertarCategoria");

const botonPrecio = document.getElementById("BotonPrecio");
let insertarPrecio = document.getElementById("InsertarPrecio");

const botonValoracion = document.getElementById("BotonValoracion");
let insertarValoracion = document.getElementById("InsertarValoracion");

const botonFiltrar = document.getElementById("BotonFiltrar");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        burbujaFiltrar.style.display = "flex";
        burbujaFiltrar.classList.add("animate__backInRight");
        burbujaFiltrar.classList.add("animate__animated");
        burbujaOrdenar.style.display = "flex";
        burbujaOrdenar.classList.add("animate__backInRight");
        burbujaOrdenar.classList.add("animate__animated");
    }, 1000);
});

botonCategorias.addEventListener("click", () => {
    obtenerProductos()
        .then((data) => {
            insertarCategoria.innerHTML = '';

            let categorias = data.map((item) => {
                return item.categoria;
            });

            let categoriasUnicas = [...new Set(categorias)];

            // Crear un array para almacenar los ids de los botones
            const buttonIds = [];

            // Renderizar los botones de categoría
            categoriasUnicas.forEach((categoria, index) => {
                const buttonId = `Click-${categoria}`;
                buttonIds.push(buttonId); // Agregar el id al array
                insertarCategoria.innerHTML += `
                    <div id="${buttonId}" class="btn btn-primary d-block">
                        ${categoria}
                    </div>
                `;

                if (index < categoriasUnicas.length - 1) {
                    insertarCategoria.innerHTML += `<hr style="margin: 10px;"/>`;
                }
            });

            // Agregar event listeners después de haber renderizado los botones
            let categoriaSeleccionada;

            buttonIds.forEach((buttonId) => {
                const clickCategoria = document.getElementById(buttonId);
                clickCategoria.addEventListener('click', () => {
                    categoriaSeleccionada = buttonId.replace('Click-', '');
                });
            });

            // Filtrar por la categoría
            botonFiltrar.addEventListener('click', () => {
                let filtrado = data.filter(p => p.categoria == categoriaSeleccionada);
                catalogoProductos(filtrado)
            });

            
        })
        .catch((error) => console.error("Error al obtener productos:", error));
});

botonPrecio.addEventListener('click', () => {
    obtenerProductos()
        .then((data) => {
            let precios = [20000, 40000, 60000, 80000, 100000, 1000000];
            insertarPrecio.innerHTML = ``;

            precios.forEach((precio, index) => {
                insertarPrecio.innerHTML += `
                    <div id="${precio}" class="btn btn-primary d-block">
                        Hasta $${(precio).toLocaleString('es-CL')}
                    </div>
                `;

                if (index < precios.length - 1) {
                    insertarPrecio.innerHTML += `<hr style="margin: 10px;"/>`;
                };
            });

            // Agregar event listeners después de haber renderizado los botones
            let precioSeleccionado;

            precios.forEach((precio) => {
                const clickPrecio = document.getElementById(precio);
                clickPrecio.addEventListener('click', () => {
                    precioSeleccionado = precio;
                });
            });

            // Filtrar por Precio
            botonFiltrar.addEventListener('click', () => {
                let filtrado = data.filter(p => p.precio <= precioSeleccionado);
                catalogoProductos(filtrado)
            });
        })
        .catch((error) => console.error("Error al obtener productos:", error));
});

botonValoracion.addEventListener("click", () => {
    obtenerProductos()
        .then((data) => {
            insertarValoracion.innerHTML = '';

            insertarValoracion.innerHTML += `
                <label for="customRange2" class="form-label fw-bolder">Valoración Máxima: 
                    <span id="valorRango"></span>
                </label>
                <input type="range" class="form-range" min="0" max="5" step="0.2" id="customRange2">
            `;

            // Mostrar valor
            const rangeInput = document.getElementById("customRange2");
            const valorRango = document.getElementById("valorRango");

            // Actualizar el valor visualmente cuando el usuario cambia el rango
            rangeInput.addEventListener("input", () => {
                valorRango.textContent = rangeInput.value; // Actualiza el texto con el valor del rango
            });
            
            // Filtrar por la valoracion
            botonFiltrar.addEventListener('click', () => {
                const valoracion = document.getElementById("customRange2").value;
                let filtrado = data.filter(p => p.valoracion <= valoracion);
                catalogoProductos(filtrado)
            });

        })


        .catch((error) => console.error("Error al obtener la valoracion:", error));
});



