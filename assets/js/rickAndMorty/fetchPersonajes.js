
export const fetchPersonajes = async(url) => {
    try {
        const response = await fetch(url)
        
        if(!response.ok) {
        throw new Error('No pudimos usar el API de Rick And Morty')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const fetchPersonajesByUrl = async(url) =>  {
    try {
        const response = await fetch(url)

        if(!response.ok) {
        throw new Error('No pudimos conseguir este personaje')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
};