import { apiKey } from "./secretos.js";

const urlBase = `https://api.themoviedb.org/3/`;

async function fetchJSON(url) {
    const tiempoInicial = performance.now();
    const respuesta = await fetch(url);
    const datos = await respuesta.json()
    const tiempoFinal = performance.now()
    console.log(`Petición a API completada en: ${tiempoFinal - tiempoInicial}ms `)
    return datos;

}
/**
 * Retorna el objeto que representa a una pelicula 
 * @param {number} id es la id de la pelicula  
 * @param {string} lang El idioma de la información, siempre en de por defecto
 * @returns object
 */
export async function obtenerPelicula(id, lang) {
    const url = `${urlBase}movie/${id}?api_key=${apiKey}&language=${lang}`
    return fetchJSON(url);
}

/**
 * 
 * @param {string} query Cadena de búsqueda
 * @param {number} page Página de los resultados,
 * @param {string} lang  El idioma de la información
 * @returns objeto pelicula
 */


export async function buscarPeliculas(query, page = 1, lang) {
    const url = `${urlBase}search/movie?api_key=${apiKey}&language=${lang}&query=${query}&page=${page}`;
    return await fetchJSON(url);
}

export async function obtenerConfiguracion() {

    const url = `${urlBase}configuration?api_key=${apiKey}`;
    return await fetchJSON(url);
}


