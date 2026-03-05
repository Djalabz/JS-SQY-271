// PHILO APP 

// On va utiliser la philo API -> https://philosophyapi.pythonanywhere.com/api/

// Objectif : 

// 1 - Afficher une citation random sur notre page -> La citatiobn entre guillemets + L'auteur
// 2 - A l'aide df'un bouton de refresh on pourra gébnérer à nouveau une citation lorsque l'on clique dessus 
// 3 - En plus du bouton de refresh je veux un autre bouton "Wiki" -> quand je clique sur cet autre bouton 
//     Je veux afficher dans un petit container le résumé wikipedia de l'auteur de la citation 

// Vous irez chercher par vous meme le endpoint pour Wikipedia :)

const app = document.querySelector(".app")
const quote = document.querySelector(".quote")
const author = document.querySelector(".author")
const refreshBtn = document.querySelector(".refresh")
const wikiBtn = document.querySelector(".wiki")
const wikiExtract = document.querySelector(".wikiExtract")

let url = "http://philosophyapi.pythonanywhere.com/api/ideas/"
let wiki = "http://en.wikipedia.org/api/rest_v1/page/summary/"
let cors = 'https://cors-anywhere.com/'

let fullUrl = 'https://cors-anywhere.com/' + url

generateQuote(fullUrl)

// On utilise un proxy (corsAnywhere) afin de controuner les restrictions du serveur 
function generateQuote(fullUrl) {
    // On vide systématiquement l'extrait sur l'auteur lorsque l'on génére une nouvelle quote
    wikiExtract.textContent = ""

    // On genere un chiffre random entre 1 et 254 (nbre de citations totales)
    let random = Math.floor(Math.random() * 254)

    fetch(fullUrl + random, {
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(data => data.json())
    .then(res => {
        console.log(res)
    
        // On ajoute aux ons éléments HTML le bon contenu texte recup depuis la philo API
        quote.textContent = res.quote
        author.textContent = res.author
    })
    .catch(err => console.log(err)) 
}

function searchWiki() {
    // On vide l'extrait sur l'auteur dès qu'on réappuie sur le bouton wiki
    wikiExtract.textContent = ""

    // On recup le nom de l'auteur afin de l'utiliser pour le endpoint Wikipedia
    let authorName = author.textContent

    // On fait notre req API et on ajoute la réponse en contenu texte à notre element wikiExtract
    fetch(cors + wiki + authorName, {
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(data => data.json())
    .then(res => {
        let extract = res.extract.slice(0, 150) + " ..."
        wikiExtract.textContent = extract
    })
    .catch(err => console.log(err))
}

// On écoutre le bouton de refresh afin d'affficher une nouvelle quote random
refreshBtn.addEventListener("click", () => {
    generateQuote(fullUrl)
}) 

// On écoute le bouton Wikiafin d'afficher un résumé sur l'auteur
wikiBtn.addEventListener("click", () => {
    searchWiki()
})



