export const obtenerProductos = async () => {
    try {
        const response = await fetch('assets/js/carroCompras/dbProducts.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error obteniendo data:', error);
    }
}
