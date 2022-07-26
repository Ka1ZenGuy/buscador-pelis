import { obtenerPelicula, buscarPeliculas, obtenerConfiguracion } from './tmdb.js'

async function manejarCambio(event) {
    const query = event.target.value;
    if (query === "")
        return null;
    const datos = await buscarPeliculas(query, 1, 'es-ES');
    const configuracion = await obtenerConfiguracion();

    const imageBaseURL = configuracion.images.secure_base_url;
    const posterSize = configuracion.images.poster_sizes[2];
    const fechalanzamiento = configuracion.release_date

    console.log(imageBaseURL);

    const cajaResultados = document.getElementById('caja-resultados');

    if (datos.results.length === 0) {

        cajaResultados.innerHTML = 'No hay resultados';
        return null;
    }
    cajaResultados.innerHTML = datos.results.sort(
        (a, b) =>{ 
        if(a.release_date > b.release_date)  return -1; 
        if(a.release_date < b.release_date) return 1;
        return 0; 
        }
        
    )
        .map(

            pelicula => `<div class = "pelicula">  
        <h4>${pelicula.title}</h4>
        <img src = "${imageBaseURL + posterSize + pelicula.poster_path}" alt = "Poster de ${pelicula.title}">
        <div>
        ${pelicula.release_date}
        </div>
        </div>`
        ).join("\n");
}



document.getElementById("caja-busqueda")
    .addEventListener('keyup', manejarCambio);


