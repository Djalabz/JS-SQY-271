// PHILO APP 

// On va utiliser la philo API -> https://philosophyapi.pythonanywhere.com/api/

// Objectif : 

// 1 - Afficher une citation random sur notre page -> La citatiobn entre guillemets + L'auteur
// 2 - A l'aide df'un bouton de refresh on pourra gébnérer à nouveau une citation lorsque l'on clique dessus 
// 3 - En plus du bouton de refresh je veux un autre bouton "Wiki" -> quand je clique sur cet autre bouton 
//     Je veux afficher dans un petit container le résumé wikipedia de l'auteur de la citation 

// Vous irez chercher par vous meme le endpoint pour Wikipedia :)

const quote = document.querySelector(".quote")
const author = document.querySelector(".author")
const refreshBtn = document.querySelector(".refresh")
const wikiBtn = document.querySelector(".wiki")

let url = "http://philosophyapi.pythonanywhere.com/api/ideas/"
let wiki = "http://en.wikipedia.org/api/rest_v1/page/summary/"

let fullUrl = 'https://cors-anywhere.com/' + url

generateQuote(fullUrl)

// On utilise un proxy (corsAnywhere) afin de controuner les restrictions du serveur 
function generateQuote(fullUrl) {

    let random = Math.floor(Math.random() * 254)

    fetch(fullUrl + random, {
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(data => data.json())
    .then(res => {
        console.log(res)
    
        quote.textContent = res.quote
        author.textContent = res.author
    
        
    })
    .catch(err => console.log(err)) 
}

refreshBtn.addEventListener("click", () => {
    generateQuote(fullUrl)
}) 

