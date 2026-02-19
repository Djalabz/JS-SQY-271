// JEU AVEC MARIO 
const mario = document.querySelector(".mario")

window.addEventListener("keydown", (event) => {
    console.log(event)

    if (event.key == "ArrowLeft") {

        console.log(mario.style)

        // déplace Mario vers la gauche 
        mario.style.left += 2

        
    } else if (event.key == "ArrowRight") {
        // déplace vers la droite 
    } else if (event.key == "Space") {
        // mario saute 
    } else if (event.key == "ArrowDown" || event.key == "Control") {
        // Mario se baisse
    }

})