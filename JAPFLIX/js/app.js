document.addEventListener("DOMContentLoaded", () => {
    let movies = []; /*aca se guardan las pelis del api*/

    const srchBtn = document.getElementById("btnBuscar"); /*boton de busqueda*/
    const srchInput = document.getElementById("inputBuscar"); /*input de busqueda*/
    const resultsList = document.getElementById("lista"); /*lista de resultados*/

    function createStars(vote) {
        const full = Math.round(vote / 2);
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<i class="fa ${i <= full ? 'fa-star' : 'fa-star-o'} star-yellow" aria-hidden="true" style="margin-left:2px;"></i>`;
        }
        return html;
        
}



    console.log("Document loaded");

    fetch("https://japceibal.github.io/japflix_api/movies-data.json") /*aca se obtienen los datos, el fetch los pide al servidor*/
        .then((response) => response.json()) /*.json lo transforma en un objeto js*/
        .then((data) => {
             movies = data; /*guardo la lista de pelis en movies*/

            srchBtn.addEventListener("click", doSearch);
            srchInput.addEventListener("keyup", (event) => {
                if (event.key === "Enter")
                    doSearch();
        }); 

    });

    function doSearch() {
        const query = srchInput.value.toLowerCase().trim();
        resultsList.innerHTML = "";

        if (!query) return;

        if (movies.length === 0) {
            resultsList.innerHTML = "<li class='list-group-item bg-dark text-white'>Cargando películas, por favor espera...</li>";
            return;
    }

    const filteredMovies = movies.filter(movie => /*movie es un array con todas las pelis del api y filter recorre casa una y crea un array con las que cumplen la condición*/
        movie.title.toLowerCase().includes(query) || /* lo que escribe es query, si está vacio no hace nada*/
        movie.tagline.toLowerCase().includes(query) || /*tolowercase es para que no importe si escribe en mayuscula o minuscula*/
        movie.genres.map(g => g.name.toLowerCase()).join("").includes(query) || /*includes es para ver si si el texto escrito está dentro del título*/
        movie.overview.toLowerCase().includes(query)
    ); /*join lo convierte en string, tipo comedia o aventura*/

    filteredMovies.forEach(movie => { /*filtered es el array de pelis y for each recorre una por una*/
        const listItem = document.createElement("li"); /*crea un elemento lista p*/
        listItem.className = "list-group-item bg-dark text-white d-flex justify-content-between align-items-center"; /*le agrega la clase de bootstrap*/
        listItem.style.cursor = "pointer"; /* aca cambia el cursor a pointer*/

        const stars = createStars(movie.vote_average || 0); /*llama a la funcion createStars y le pasa el voto promedio de la peli*/

        listItem.innerHTML = `
            <div>
                <h6>${movie.title}</h6>  
                <small class="text-muted">${movie.tagline}</small> 
            </div> 
            <div>${stars}</div> 
        `; /*aca va el titulo de la pelicula, tagline y las estrellas creadas*/ 

        /*cuando hago click en el item de la lista, llama a la funcion showMovieDetails y le pasa la pelicula*/
        listItem.addEventListener("click", () => showMovieDetails(movie)); 
        resultsList.appendChild(listItem); /*appendChild agrega el elemento creado a la lista de resultados*/

    });
}

function showMovieDetails(movie) {
    document.getElementById("movieTitle").textContent = movie.title; /*titulo de la pelicula*/
    document.getElementById("movieOverview").textContent = movie.overview; /*aca va el overview de la pelicula*/
    document.getElementById("movieGenres").textContent = movie.genres.map(g => g.name).join(", "); /* generos de la pelicula*/

    /*dropdown*/
    document.getElementById("movieYear").textContent = "" + movie.release_date.split("-")[0]; /*split separa el string en un array, y [0] toma el primer elemento, que es el año*/
    document.getElementById("movieRuntime").textContent = "" + movie.runtime + " min"; /*duracion de la pelicula*/
    document.getElementById("movieBudget").textContent = "" + movie.budget.toLocaleString(); /*presupuesto de la pelicula*/
    document.getElementById("movieRevenue").textContent = "" + movie.revenue.toLocaleString(); /*recaudacion de la pelicula*/

    /*offcanvas*/
    const offcanvas = new bootstrap.Offcanvas(document.getElementById("movieDetails"));
    offcanvas.show();
}
});
