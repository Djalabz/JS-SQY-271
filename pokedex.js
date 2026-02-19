// Faire Pokedex avec la Poke API -> https://pokeapi.co/api/v2/pokemon

// 1 - Faire une requete API avec l'outil de votre choix (axios, ou fetch)
// 2 - Afficher dès l'initialisation de la page la liste des pokemons (vous pouvez limiter leur nombre)
// 3 - Pour chaque pokemon -> le nom, la photo et le type
// 4 - Afficher les résultats de manière propre (grid par exemple) 

// On recu^p le container destiné à recevoir les divs des Pokemons 
const container = document.querySelector(".container-pokedex")

// L'URL qui permet de recup les pokemons (limité à 20 dans notre cas)
const pokeUrl = "https://pokeapi.co/api/v2/pokemon"

// La fonction qui vient fetch les pokemons mais aussi créer les éléments HTML et les remplir 
function fetchPokemons() {
    fetch(pokeUrl, {
        method: "GET", 
        headers : {
            "Accept" : "application/json"
        }}
    )
    .then(res => res.json())
    .then(data => {
        console.log(data)

        let pokemons = data.results

        pokemons.forEach(pokemon => {
            let name = pokemon.name
            let pokemonId = pokemons.indexOf(pokemon) + 1
            let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png` 

            // Récupération du type avec un fetch à nouveau
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res => res.json())
            .then (data => {
                // On recup le nom du type de pokemon à afficher 
                let type = data.types[0].type.name

                // On crée une div, container pour chaque pokemon, un h3 et une image pour le nom et la photo 
                let div = document.createElement("div")
                let h3 = document.createElement("h3")
                let h4 = document.createElement("h4")
                let img = document.createElement("img")
    
                // On donne du contenu à notre h3 et une source pour notre image 
                h3.textContent = name
                h4.textContent = type
                img.src = imgUrl
                div.append(h3, h4, img)
    
                // Enfin on vient insérer le tout dans notre container 
                container.appendChild(div)
            })
            .catch(err => console.log(err))
        })
    })
    .catch(err => console.log(err))
}

// On appelle notre fonction afin qu'elle s'éxecute
fetchPokemons()