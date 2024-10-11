import { colorTypePokemon } from "./colorTypePokemon.js";

export const pokemonCard = (value) => {
  // Función para generar el botón si no es null
  const createButton = (label, className, onclick) => {
    return `
      <button 
        class="btn btn-sm ${className} pokemonSolidFont" 
        style="padding-bottom: 10px; margin: 5px; font-size: 12px"
        onclick="${onclick}"
      >
        ${label}
      </button>`;
  };

  let buttons = "";

  buttons += createButton('ArtWork', 'btn-primary', `officialArtwork('${value.id}', '${value.sprites.other['official-artwork'].front_default}')`);
  buttons += createButton('Sprite', 'btn-light', `sprite('${value.id}', '${value.sprites.front_default}')`);

  const redBlueImg = value.sprites.versions['generation-i']['red-blue'].front_default;
  if (redBlueImg) {
    buttons += createButton('Red & Blue', 'btn-danger', `generaciones('${value.id}', '${redBlueImg}')`);
  };

  const yellowImg = value.sprites.versions['generation-i']['yellow'].front_default;
  if (yellowImg) {
    buttons += createButton('Yellow', 'btn-warning', `generaciones('${value.id}', '${yellowImg}')`);
  };

  const crystalImg = value.sprites.versions['generation-ii']['crystal'].front_default;
  if (crystalImg) {
    buttons += createButton('Crystal', 'btn-info', `generaciones('${value.id}', '${crystalImg}')`);
  };

  const esmeralImg = value.sprites.versions['generation-iii']['emerald'].front_default;
  if (esmeralImg) {
    buttons += createButton('Esmerald', 'btn-success', `generaciones('${value.id}', '${esmeralImg}')`)
  };

  const platinumImg = value.sprites.versions["generation-iv"]["platinum"].front_default;
  if(platinumImg){
    buttons += createButton('Platinum', 'btn-secondary', `generaciones('${value.id}','${platinumImg}')`)
  };

  const blackWhiteImg = value.sprites.versions["generation-v"]["black-white"].animated.front_default;
  if(blackWhiteImg){
    buttons += createButton('B & W', 'btn-dark', `generaciones('${value.id}','${blackWhiteImg}')`)
  };

  const XYImg = value.sprites.versions["generation-vi"]["x-y"].front_default;
  if(XYImg){
    buttons += createButton('X & Y', 'btn-danger', `generaciones('${value.id}','${XYImg}')`)
  };


  return `
    <div class="col-md-4 col-lg-3 col-sm-6 d-flex justify-content-center mt-3">
      <div class="card" style="width: 18rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);">
        <div class="d-flex flex-wrap justify-content-center p-2">
          ${buttons}
        </div>
        
        <img 
          id="pokemon-img-${value.id}" 
          src="${value.sprites.front_default}" 
          class="card-img-top"
          style="margin: auto; max-width: 230px; height: 220px;" 
          alt="${value.name}"
        />

        <div class="card-body text-center pokemonHollowFont">
          ${(value.types.length > 1) 
            ? `<div class="badge" style="padding-bottom: 10px; background-color: ${colorTypePokemon(value.types[0].type.name)}">
                ${(value.types[0].type.name).charAt(0).toUpperCase() + (value.types[0].type.name).slice(1).toLowerCase()}
              </div>
              <div class="badge" style="padding-bottom: 10px; background-color: ${colorTypePokemon(value.types[1].type.name)}">
                ${(value.types[1].type.name).charAt(0).toUpperCase() + (value.types[1].type.name).slice(1).toLowerCase()}
              </div>`
            : `<div class="badge" style="padding-bottom: 10px; background-color: ${colorTypePokemon(value.types[0].type.name)}">
                ${(value.types[0].type.name).charAt(0).toUpperCase() + (value.types[0].type.name).slice(1).toLowerCase()}
              </div>`}
          <h5 class="card-title text-center text-primary pokemonSolidFont" style="text-shadow: 2px 2px 4px rgba(255, 215, 0, 1);">#${value.id} - ${(value.name).charAt(0).toUpperCase() + (value.name).slice(1).toLowerCase()}</h5>
        </div>
        <audio controls class="w-75 mx-auto mb-1">
          <source src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${value.id}.ogg" type="audio/ogg"/>
        </audio>
        <div class="mx-auto mb-2 pokemonSolidFont">
            Peso: ${(value.weight / 10)} KG <br/>
            Altura: ${(value.weight >= 100) ? `${(value.height / 10).toFixed(1) } M` : `${(value.height / 10)} CM`}
        </div>
      </div>
    </div>
  `;
};
