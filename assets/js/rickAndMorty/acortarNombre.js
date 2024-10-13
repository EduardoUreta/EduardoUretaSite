export const acortarNombre = (nombre) => {
    if(nombre.length > 17){
        return nombre.slice(0, 17) + '...';
    };
    return nombre;
};