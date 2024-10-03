export class Carritos {
    #productos
    constructor(producto, cantidad) {
        this.#productos = [{ ...producto, cantidad: cantidad || 1 }];
    };

    // Mostrar Productos
    get mostrarProductos() {
        return this.#productos;
    };

    // Agregar productos
    set agregarProductos(producto) {
        const productoExistente = this.#productos.find(product => product.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            this.#productos.push({ ...producto, cantidad: 1 });
        };
    };

    // Obtener total de productos
    contarTotalProductos() {
        return this.#productos.reduce((total, producto) => total + producto.cantidad, 0);
    };

    // Obtener cálculo de precio total
    contarTotalPrecio(){
        return this.#productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    };

    // Limpiar carrito
    limpiarCarrito(){
        return this.#productos = [];
    };

    // Aumentar cantidad producto
    aumentarCantidadProducto(producto){
        const productoCarrito = this.#productos.find(product => product.id === producto.id);

        if (productoCarrito) {
            productoCarrito.cantidad += 1;
        }
    };

    // Eliminar un producto del carrito
    eliminarProducto(producto){
        const nuevoCarritoSinProductoEliminado = this.#productos.filter(product => product.id != producto.id);
        return this.#productos = nuevoCarritoSinProductoEliminado;
    }

    // Disminuir cantidad producto
    disminuirCantidadProducto(producto){
        const productoCarrito = this.#productos.find(product => product.id === producto.id);

        if (productoCarrito && productoCarrito.cantidad > 1) {
            productoCarrito.cantidad -= 1;
        } 
    };

};