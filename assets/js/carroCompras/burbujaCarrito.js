import { acortarTituloCarrito } from "./acortarInformacion.js";
// Mostrar Carrito
export const burbujaCarrito = (carrito) => {
    const burbujaCarrito = document.getElementById("burbujaCarrito");
    (carrito.mostrarProductos.length != 0) ? 
        burbujaCarrito.style.display = "flex" : 
        burbujaCarrito.style.display = "none";
        console.log(carrito);

    const tituloCanvas = document.getElementById("offcanvasRightLabel");
    const detalleCanvas = document.getElementById("detalleCanvas");
    const precioCanvas = document.getElementById("precioCanvas");
    const vaciarCarrito = document.getElementById("vaciarCarrito");

    const totalProductos = carrito.contarTotalProductos();
    const totalPrecio = carrito.contarTotalPrecio();

    tituloCanvas.innerHTML = totalProductos === 1 ? `Tienes 1 producto` : `Tienes ${totalProductos} productos`;
    tituloCanvas.style.fontWeight = "bolder";
    
    detalleCanvas.innerHTML = ``;
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
                            <button class="btn btn-sm btn-outline-danger">-</button>
                            ${producto.cantidad}
                            <button class="btn btn-sm btn-outline-primary">+</button>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <h6>$${producto.precio * producto.cantidad}</h6>
                    </div>
                </div>
                <hr/>
            </div>
        `;
    });

    precioCanvas.innerHTML = `
        <hr/>
        <div class="container" style="height: 100px;">
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>$${totalPrecio}</span>
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

    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.limpiarCarrito();
        tituloCanvas.innerHTML = "";
        detalleCanvas.innerHTML = "Tu carro está vacio";
        detalleCanvas.style = "margin: auto; align-content: center;"
        precioCanvas.innerHTML = "";
    });
};

