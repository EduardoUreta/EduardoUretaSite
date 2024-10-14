export const fetchData = async(url) => {
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};