import { obtenerPelicula, buscarPeliculas, obtenerConfiguracion, obtenerImagen  } from './tmdb.js'

async function manejarCambio(event) {
    const query = event.target.value;
    if (query === "")
        return null;
    const datos = await buscarPeliculas(query, 1, 'es-ES');

    const cajaResultados = document.getElementById('caja-resultados');

    if (datos.results.length === 0) {

        cajaResultados.innerHTML = 'No hay resultados';
        return null;
    }
    cajaResultados.innerHTML = datos.results.map(

        pelicula => `<div> ${pelicula.title} </div>`
    ).join("\n");
}



document.getElementById("caja-busqueda")
    .addEventListener('keyup', manejarCambio);

console.log(await obtenerConfiguracion());
