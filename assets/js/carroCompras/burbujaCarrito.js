import { acortarTituloCarrito } from "./acortarInformacion.js";

const tituloCanvas = document.getElementById("offcanvasRightLabel");
const detalleCanvas = document.getElementById("detalleCanvas");
const precioCanvas = document.getElementById("precioCanvas");
const burbujaCarritoCatalogo = document.getElementById("burbujaCarrito");

// Mostrar Carrito
export const burbujaCarrito = (carrito) => {
    (carrito.mostrarProductos.length != 0) ? burbujaCarritoCatalogo.style.display = "flex" : burbujaCarritoCatalogo.style.display = "none";

    // Actualizar Titulo Canvas
    const actualizarTituloCanvas = () => {
        const totalProductos = carrito.contarTotalProductos(); 
        tituloCanvas.innerHTML = totalProductos === 1 ? `Tienes 1 producto` : `Tienes ${totalProductos} productos`;
        tituloCanvas.style.fontWeight = "bolder";
    };

    actualizarTituloCanvas();

    const totalPrecio = carrito.contarTotalPrecio();

    // Vaciar detalle actual del carrito
    detalleCanvas.innerHTML = ``;

    // Renderizar productos del carrito
    carrito.mostrarProductos.forEach((producto) => {
        detalleCanvas.style.removeProperty("align-content");
        detalleCanvas.innerHTML += `
            <div class="container">
                <div class="row">
                    <div class="col-4 align-content-center img-thumbnail">
                        <img class="img-fluid" style="width: 100px; height: 100px;" src="${producto.imagen}" alt="${producto.nombre}"/>
                    </div>
                    <div class="col-4">
                        <h6>${acortarTituloCarrito(producto.nombre)}</h6>
                        <div>
                            <button id="botonMenos-${producto.id}" class="btn btn-sm btn-outline-danger">${producto.cantidad > 1 ? '-' : '<i class="fa fa-trash" aria-hidden="true"></i>'}</button>
                            <span id="productoCantidad-${producto.id}">${producto.cantidad}</span>
                            <button id="botonMas-${producto.id}" class="btn btn-sm btn-outline-primary">+</button>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <h6 id="subtotalProducto-${producto.id}">$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</h6>
                    </div>
                </div>
                <hr/>
            </div>
        `;
    });

    // Agregar los event listeners después de renderizar los productos
    agregarEventListenersProductos(carrito);

    // Mostrar el total del precio
    precioCanvas.innerHTML = `
        <hr/>
        <div class="container" style="height: 100px;">
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span id="totalPrecioProductos">$${totalPrecio.toLocaleString('es-CL')}</span>
            </div>
            <div class="text-end mt-2 justify-content-between">
                <span>
                    <button id="vaciarCarrito" type="button" class="btn btn-sm btn-danger">Vaciar Carrito</button>
                </span>
                <button class="btn btn-success btn-sm">
                    Finalizar Compra
                </button>
            </div>
        </div>
    `;

    // Vaciar Carrito
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoSinProductos(carrito);
    });
};

// Renderizar detalle sin productos
const carritoSinProductos = (carrito) => {
    carrito.limpiarCarrito();
    tituloCanvas.innerHTML = "";
    detalleCanvas.innerHTML = "Tu carro está vacío";
    detalleCanvas.style = "margin: auto; align-content: center;";
    precioCanvas.innerHTML = "";
    burbujaCarritoCatalogo.style.display = "none";
};

// Función para agregar los event listeners a los botones de productos
const agregarEventListenersProductos = (carrito) => {

    const totalPrecio = carrito.contarTotalPrecio();

    // Actualizar Titulo Canvas
    const actualizarTituloCanvas = () => {
        const totalProductos = carrito.contarTotalProductos(); 
        tituloCanvas.innerHTML = totalProductos === 1 ? `Tienes 1 producto` : `Tienes ${totalProductos} productos`;
        tituloCanvas.style.fontWeight = "bolder";
    };

    // Actualizar el precio
    const actualizarTotalPrecio = () => {
        const totalPrecio = carrito.contarTotalPrecio();
        const totalPrecioProductos = document.getElementById("totalPrecioProductos");
        totalPrecioProductos.innerHTML = `$${totalPrecio.toLocaleString('es-CL')}`;
    };

    carrito.mostrarProductos.forEach((producto) => {
        const disminuirCantidadProducto = document.getElementById(`botonMenos-${producto.id}`);
        const aumentarCantidadProducto = document.getElementById(`botonMas-${producto.id}`);
        const productoCantidad = document.getElementById(`productoCantidad-${producto.id}`);
        const subtotalProducto = document.getElementById(`subtotalProducto-${producto.id}`);

        // Disminuir la cantidad del producto y/o eliminar un producto
        disminuirCantidadProducto.addEventListener("click", () => {
            if (producto.cantidad > 1) {
                carrito.disminuirCantidadProducto(producto);
                productoCantidad.innerHTML = `${producto.cantidad}`;
                subtotalProducto.innerHTML = `$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}`;
                disminuirCantidadProducto.innerHTML = producto.cantidad > 1 ? '-' : '<i class="fa fa-trash"></i>';
                actualizarTituloCanvas();
                actualizarTotalPrecio();
                mostrarToast(`Eliminaste un producto`);
            } else {
                carrito.eliminarProducto(producto);
                detalleCanvas.innerHTML = ''; 

                carrito.mostrarProductos.forEach(producto => {
                    detalleCanvas.innerHTML += `
                        <div class="container">
                            <div class="row">
                                <div class="col-4 align-content-center img-thumbnail">
                                    <img class="img-fluid" style="width: 100px; height: 100px;" src="${producto.imagen}" alt="${producto.nombre}"/>
                                </div>
                                <div class="col-4">
                                    <h6>${acortarTituloCarrito(producto.nombre)}</h6>
                                    <div>
                                        <button id="botonMenos-${producto.id}" class="btn btn-sm btn-outline-danger">${producto.cantidad > 1 ? '-' : '<i class="fa fa-trash" aria-hidden="true"></i>'}</button>
                                        <span id="productoCantidad-${producto.id}">${producto.cantidad}</span>
                                        <button id="botonMas-${producto.id}" class="btn btn-sm btn-outline-primary">+</button>
                                    </div>
                                </div>
                                <div class="col-4 text-end">
                                    <h6 id="subtotalProducto-${producto.id}">$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</h6>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    `;
                });

                // Vuelve a agregar los event listeners después de eliminar un producto
                agregarEventListenersProductos(carrito);

                actualizarTituloCanvas();
                actualizarTotalPrecio();
                mostrarToast('Eliminaste un producto');

                if(carrito.mostrarProductos.length == 0){
                    carritoSinProductos(carrito);
                };
            }
        });

        // Aumentar la cantidad del producto
        aumentarCantidadProducto.addEventListener('click', () => {
            carrito.aumentarCantidadProducto(producto);
            productoCantidad.innerHTML = `${producto.cantidad}`;
            subtotalProducto.innerHTML = `$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}`;
            disminuirCantidadProducto.innerHTML = '-';
            actualizarTituloCanvas();
            actualizarTotalPrecio();
            mostrarToast(`¡Agregaste un producto!`);
        });
    });
};

// Función para mostrar notificaciones con Toastify
const mostrarToast = (mensaje) => {
    Toastify({
        text: mensaje,
        duration: 1000,
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
