import { acortarTituloCarrito } from "./acortarInformacion.js";

// Mostrar Carrito
export const burbujaCarrito = (carrito) => {
    const burbujaCarrito = document.getElementById("burbujaCarrito");
    (carrito.mostrarProductos.length != 0) ? burbujaCarrito.style.display = "flex" : burbujaCarrito.style.display = "none";

    const tituloCanvas = document.getElementById("offcanvasRightLabel");
    const detalleCanvas = document.getElementById("detalleCanvas");
    const precioCanvas = document.getElementById("precioCanvas");

    const totalPrecio = carrito.contarTotalPrecio();

    const actualizarTituloCanvas = () => {
        const totalProductos = carrito.contarTotalProductos(); 
        tituloCanvas.innerHTML = totalProductos === 1 ? `Tienes 1 producto` : `Tienes ${totalProductos} productos`;
        tituloCanvas.style.fontWeight = "bolder";
    };

    detalleCanvas.innerHTML = ``;
    carrito.mostrarProductos.forEach((producto) => {
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
                        <h6 id="subtotalProducto-${producto.id}">$${producto.precio * producto.cantidad}</h6>
                    </div>
                </div>
                <hr/>
            </div>
        `;

        // Aumentar o Disminuir cantidad de Producto
        const disminuirCantidadProducto = document.getElementById(`botonMenos-${producto.id}`);
        const aumentarCantidadProducto = document.getElementById(`botonMas-${producto.id}`);
        const productoCantidad = document.getElementById(`productoCantidad-${producto.id}`);
        const subtotalProducto = document.getElementById(`subtotalProducto-${producto.id}`);

        // Actualizar el precio
        const actualizarTotalPrecio = () => {
            const totalPrecio = carrito.contarTotalPrecio();
            const totalPrecioProductos = document.getElementById("totalPrecioProductos");
            totalPrecioProductos.innerHTML = `$${totalPrecio.toFixed(2)}`;
        };

        // Disminuir la cantidad del producto y/o eliminar un producto
        disminuirCantidadProducto.addEventListener("click", () => {
            if (producto.cantidad > 1) {
                carrito.disminuirCantidadProducto(producto);
                productoCantidad.innerHTML = `${producto.cantidad}`;
                subtotalProducto.innerHTML = `$${producto.precio * producto.cantidad}`;
                disminuirCantidadProducto.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
                actualizarTituloCanvas();
                actualizarTotalPrecio();
                Toastify({
                    text: `Eliminaste un producto`,
                    duration: 1000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#8BC6EC",
                        background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
                    },
                    onClick: function(){}
                  }).showToast();
            } else {
                // Eliminar producto
                carrito.eliminarProducto(producto);
                detalleCanvas.innerHTML = '';

                // Armar nuevo detalle de carrito
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
                                <h6 id="subtotalProducto-${producto.id}">$${producto.precio * producto.cantidad}</h6>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    `;
                });
                Toastify({
                    text: `Eliminaste un producto`,
                    duration: 1000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#8BC6EC",
                        background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
                    },
                    onClick: function(){}
                  }).showToast();
                    
                actualizarTituloCanvas();
                actualizarTotalPrecio();
                carritoVacioDespuesDeEliminar();
            };
        });

        // Aumentar la cantidad del producto
        aumentarCantidadProducto.addEventListener('click', () => {
            carrito.aumentarCantidadProducto(producto);
            productoCantidad.innerHTML = `${producto.cantidad}`;
            subtotalProducto.innerHTML = `$${producto.precio * producto.cantidad}`;
            disminuirCantidadProducto.innerHTML = '-';
            actualizarTituloCanvas();
            actualizarTotalPrecio();
            Toastify({
                text: `¡Agregaste un producto!`,
                duration: 1000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#8BC6EC",
                    background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
                },
                onClick: function(){}
              }).showToast();
        });
    });

    precioCanvas.innerHTML = `
        <hr/>
        <div class="container" style="height: 100px;">
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span id="totalPrecioProductos">$${totalPrecio.toFixed(2)}</span>
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
        carrito.limpiarCarrito();
        tituloCanvas.innerHTML = "";
        detalleCanvas.innerHTML = "Tu carro está vacío";
        detalleCanvas.style = "margin: auto; align-content: center;";
        precioCanvas.innerHTML = "";
        burbujaCarrito.style.display = "none";
    });

    // Si el carrito queda vacio después de eliminar
    const carritoVacioDespuesDeEliminar = () => {
        if(carrito.mostrarProductos.length == 0){
            carrito.limpiarCarrito();
            tituloCanvas.innerHTML = "";
            detalleCanvas.innerHTML = "Tu carro está vacío";
            detalleCanvas.style = "margin: auto; align-content: center;";
            precioCanvas.innerHTML = "";
            burbujaCarrito.style.display = "none";
        };
    };
};
