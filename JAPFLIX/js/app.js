fetch("https://japceibal.github.io/japflix_api/movies-data.json") /*aca se obtienen los datos, el fetch los pide al servidor*/
    .then((response) => response.json()) /*.json lo transforma en un objeto js*/
    .then((data) => movies = data); /*guardo la lista de pelis en movies*/

srchBtn.addEventListener("click", () => { /*aca se escucha el click del boton*/
    const query = srchInput.value.toLowerCase().trim();
    resultsList.innerHTML = "";
    if (!query) return;
    const filteredMovies = movies.filter(movie => /*movie es un array con todas las pelis del api y filter recorre casa una y crea un array con las que cumplen la condición*/
        movie.title.toLowerCase().includes(query)); || /* lo que escribe es query, si está vacio no hace nada*/
        movie.tagline.toLowerCase().includes(query) || /*tolowercase es para que no importe si escribe en mayuscula o minuscula*/
        movie.genres.join(" ").toLowerCase().includes(query) || /*includes es para ver si si el texto escrito está dentro del título*/
        movie.overview.toLowerCase().includes(query) ||
    ); /*join lo convierte en string, tipo comedia o aventura*/

