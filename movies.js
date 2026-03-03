// OMDB API -> https://www.omdbapi.com/

// Faire une barre de recherche avec bouton pour rechercher et ajouter en favoris 

// On doit pouvoir recghercher un film par son nom et afficher les résultatrs en dessous 
// On doit également pouvoir accéder à une liste de fazvoris en cliquant sur le bouton de favoris 
// Chaque div de film doit contenir un bouton d'ajout au favoris / suppression des favoris sui déjà dedans 
// Les favoris doivent etre enregistrés en LocalStorage 

// BONUS : Tenter de le faire avec un système de classes et d'objets 

// Récupération des éléments HTML 
const apiUrl = "http://www.omdbapi.com/?apikey=eed08b06&s="
const input = document.querySelector(".searchInput")
const searchBtn = document.querySelector(".searchBtn")
const favBtn = document.querySelector(".favBtn")
const resultsZone = document.querySelector(".resultsZone")

let favs = JSON.parse(localStorage.getItem("favorites")) || []


// Fonction de recherche de films 
async function searchMovie(query) {

    resultsZone.innerHTML = ""
    input.value = ""

    const res = await fetch(apiUrl + query, { headers : {
        "Accept": "application/json"
    }})

    const data = await res.json()

    if (!data.Response) {
        resultsZone.innerHTML = "Aucun film trouvé ... " + data.Error
        return
    } else {

        let movies = data.Search 
        console.log(movies)

        movies.forEach(movie => {
            
            displayMovie(movie)

        });
    }
}

function displayMovie(movie) {
    // Créer les éléments HTML : div, titre, image etc 
    let h3 = document.createElement("h3")
    let img = document.createElement("img")
    let h4 = document.createElement("h4")
    let h5 = document.createElement("h5")
    let btn = document.createElement("button")

    // Ajouter du contenu à ces éléments 
    h3.textContent = movie.title
    img.src = movie.Poster
    h4.textContent = movie.Year
    h5.textContent = movie.Type
    btn.textContent = "Ajouter aux favoris"

    btn.addEventListener("click", () => {
        // Ajout du movie dans les favs
        favs.push(movie)

        // On enregistre aussi en LS
        localStorage.setItem("favorites", JSON.stringify(favs))
    })

    // Insérere ces éléments dans notre div de container 
    resultsZone.append(h3, img, h4, h5, btn)

}

// Ecouteurs d'événements 
searchBtn.addEventListener("click", () => {
    searchMovie(input.value)
})

favBtn.addEventListener("click", () => {
    resultsZone.innerHTML = ""

    if (!favs.length) {
        resultsZone.innerText = "Aucun favori enregistré"
    } else {
        favs.forEach(fav => {
            displayMovie(fav)
        })
    }
}) 