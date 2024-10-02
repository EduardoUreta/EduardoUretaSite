export const generarEstrellas = (rating) => {
    let estrellas = '';
    for (let i = 0; i < 5; i++) {
        if( i < Math.floor(rating)){
            estrellas += "<i class='fa-solid fa-star' style='color: gold;'></i>";
        } else {
            estrellas += "<i class='fa-regular fa-star' style='color: gray;'></i>";
        } 
    }
    return estrellas;
};