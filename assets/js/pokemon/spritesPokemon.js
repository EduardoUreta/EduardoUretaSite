// Boton ArtWork
export const officialArtwork = () => {
    window.officialArtwork = (pokemonId, imagen) => {
        const imgElement = document.getElementById(`pokemon-img-${pokemonId}`);
        if (imgElement) {
            imgElement.src = imagen;
        };
    };
};

export const generaciones = () => {
    window.generaciones = (pokemonId, imagen) => {
        const imgElement = document.getElementById(`pokemon-img-${pokemonId}`);
        if (imgElement) {
            imgElement.src = imagen;
        };
    };
};

export const sprite = () => {
    window.sprite = (pokemonId, imagen) => {
        const imgElement = document.getElementById(`pokemon-img-${pokemonId}`);
        if (imgElement) {
            imgElement.src = imagen; 
        }
    };
};
  