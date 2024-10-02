export const acortarDescripcion = (descripcion) => {
    if(descripcion.length > 80){
        return descripcion.slice(0, 80) + '...';
    };
    return descripcion;
};

export const acortarTitulo = (title) => {
    if(title.length > 30){
        return title.slice(0, 35) + '...';
    };
    return title;
};


export const acortarTituloCarrito = (title) => {
    if(title.length > 20){
        return title.slice(0, 20) + '...';
    };
    return title;
};