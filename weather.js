// APP WEATHER 

// Reproduire le widget Météo déjà effectuén en PHP 
// Afficher le temps, les degrés; le logo du temps, la description mais aussi que : 

// Par défaut la météo affiche le temps local -> il est possible grace au navigateur de récupérer votre position lat et long
// Pour la doc de la Géoloc -> https://www.w3schools.com/html/html5_geolocation.asp
// Pour l'api -> https://home.openweathermap.org/

// Bonus : Un in put qui permet de rechercher AUSSI via le nom de la ville 

// Etape 1 : Récupérer la localisation du Browser 


const locate = document.querySelector(".locate")

locate.addEventListener("click", () => {
    getLocation()
})


function getLocation() {
    if (navigator.geolocation) {

        console.log(navigator.geolocation)

        navigator.geolocation.getCurrentPosition(

        (position) => {
            console.log(position)
        }, 
        error)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
} 

// function fetchWeather(lat, lng) {
//     console.log(lat, lng)
// } 

// function success(position) {
    
//     console.log(position)

//     let lat = position["coords"]["latitude"]
//     let lng = position["coords"]["longitude"]

//     // Fonction d'appel cers l'API météo afin de récupérer les infos 
//     fetchWeather(lat, lng)
// }

function error(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
          break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
          break;
      }
}


