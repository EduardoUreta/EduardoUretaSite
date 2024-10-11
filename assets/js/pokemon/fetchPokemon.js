
export const fetchPokemon = async(url) => {
  try {
    const response = await fetch(url)
    
    if(!response.ok) {
      throw new Error('No pudimos usar el API de Pokemon')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const fetchPokemonByUrl = async(url) =>  {
  try {
    const response = await fetch(url)

    if(!response.ok) {
      throw new Error('No pudimos conseguir este pokemon')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}