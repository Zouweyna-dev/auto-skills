
let voitureGrey = document.getElementById("voituregry");
let voitureBlue = document.getElementById("voitureblue");
let voitureBlack = document.getElementById("voitureblack");
let maVoiture = document.getElementById("maVoiture");




let startPause = document.getElementById('start');
let scoreDisplay = document.getElementById('score');
let score = 0;
let scoreInterval;


let route = document.getElementById("route");
let timerDisplay = document.getElementById('timer');

let isPlaying = false;
let gameInterval;

let startTime;
let timerInterval;
let elapsedTime=0;


let voitureBlackInterval;
let voitureGreyInterval;
let voitureBlueInterval;

const modalContainer = document.getElementById('modal-container');
const btnReplay = document.getElementById('btn-replay');
const btnExit = document.getElementById('btn-exit');

let showInterval;

let imgElement = document.createElement("img");

const dialog = document.getElementById('dialog');
const cv=document.getElementById('cv');
const quitLink = document.getElementById('retour');


const rulesBtn = document.getElementById('rulesBtn');
const rulesModal = document.getElementById('rulesModal');
const closeBtn = document.getElementById('closeBtn');


rulesBtn.addEventListener('click', () => {
    rulesModal.showModal();
});

// Ajoutez un événement de clic au bouton de fermeture pour fermer le dialog
closeBtn.addEventListener('click', () => {
    rulesModal.close();
});


window.addEventListener("keydown", moveVoiture);

// Ajoute un écouteur d'événements pour détecter quand le bouton startPause est cliqué
// Si le jeu est en cours (isPlaying est true), la fonction pauseGame() est appelée pour mettre le jeu en pause
// Si le jeu est en pause (isPlaying est false), la fonction startGame() est appelée pour démarrer ou reprendre le jeu

startPause.addEventListener('click', () => {
    if (isPlaying) {
        pauseGame();
    } else {
        startGame();
    }
});
// Fonction qui permet de vérifier si le bouton PAUSE est appuyé
// Si oui, tout se met en pause : les voitures et le chronomètre s'arrêtent
function pauseGame() {
    isPlaying = false;
    startPause.textContent = 'PLAY';
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    clearInterval(voitureBlackInterval);
    clearInterval(voitureGreyInterval);
    clearInterval(voitureBlueInterval);
    clearInterval(scoreInterval);
    clearInterval(showInterval);

    route.style.animationPlayState = 'paused';
    voitureBlack.style.animationPlayState = 'paused';
    voitureGrey.style.animationPlayState = 'paused';
    voitureBlue.style.animationPlayState = 'paused';
    imgElement.style.animationPlayState = "paused";
}
// Fonction qui permet de vérifier si le bouton PLAY est appuyé
// Si oui, le bouton PLAY devient PAUSE et le jeu commence
//      : les voitures circulent, la recherche de collision est lancée, et le chronomètre démarre
function startGame() {
    isPlaying = true;
    startPause.textContent = 'PAUSE';
    // startTime = Date.now();

    gameInterval = setInterval(updateGame, 200);
    timerInterval = setInterval(updateTimer, 1000);
   // scoreInterval=setInterval(updateScore,2000);

    route.style.animationPlayState = 'running';
    voitureBlack.style.animationPlayState = 'running';
    voitureGrey.style.animationPlayState = 'running';
    voitureBlue.style.animationPlayState = 'running';
    imgElement.style.animationPlayState = "running";

    move();

}

function updateGame() {
    collision();
    // updateScore();
    // updateTimer();
}



// Fonction qui met à jour le score lorsque le joueur récupère une récompense.
// S'il obtient toutes les récompenses, une boîte de dialogue s'affiche,
// donnant accès au CV ou permettant de quitter le jeu et revenir à la page d'accueil.
function updateScore() {

    score+=10;

    scoreDisplay.textContent = `Score: ${score}`;

    console.log('score', score);

    if (score >= 60) {

        // Boucle à travers tabcomp pour afficher toutes les images obtenues
        // for (let i = 0; i < tabcomp.length; i++) {
        //     console.log('dans if ',tabcomp[i]);
        //     let image = document.createElement('img');
        //     image.src = tabcomp[i]; // Chemin de l'image dans tabcomp[i]
        //
        //     console.log('img src ',image.src);
        //     image.style.width = '20px'; // Ajuster la taille des images si nécessaire
        //     image.style.height = 'auto';
        //     image.style.position='absolute';
        //
        //     image.style.zIndex="20";
        //
        //     // Ajoute l'image à la boîte de dialogue
        //     dialog.appendChild(image);
        // }
        // alert("bravoooo");

        dialog.style.display='flex';

        pauseGame();
        resetGame();
//Boite de dialogue : sile joueur arrive à récuperer toutes les competence il gange et il pourra afficher le cv

        cv.addEventListener('click', function(event) {

           dialog.style.display = 'none';
        });

        quitLink.addEventListener('click', function(event) {

            dialog.style.display = 'none';

        });



    }


}

// En cas de collision détectée entre le joueur et les autres voitures,
// une boîte de dialogue 'Game Over' s'affiche et tout est réinitialisé

function gameOver() {

    modalContainer.style.display = 'flex';

    pauseGame();

    btnReplay.addEventListener('click', () => {
        modalContainer.style.display = 'none';

        resetGame();
    });

    btnExit.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        resetGame();


    });


}


// Cette fonction est appelée à intervalles réguliers pour augmenter le temps écoulé et mettre à jour l'affichage du chronomètre

function updateTimer() {

    elapsedTime++;
    timerDisplay.textContent = `Time: ${elapsedTime}s`;
}

//Réinitialisation: cette fonction remet à 0 tous les paramètres du jeu et repositionne les voitures
function resetGame() {
    pauseGame();
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = 'Time: 0s';

    maVoiture.style.top = '75vh';
    maVoiture.style.left = '10vw';

    voitureBlack.style.top = '20vh';
    voitureGrey.style.top = '35vh';
    voitureBlue.style.top = '50vh';

    voitureBlack.style.left = '22vw';
    voitureGrey.style.left = '15vw';
    voitureBlue.style.left = '4vw';
}

//Fonction permet de déplacer la voiture (joueur) vers la gauche ou la droite en appuyant sur les touches de direction du clavier

function moveVoiture(event) {
    if (!isPlaying) return;

    let left = parseInt(window.getComputedStyle(maVoiture).getPropertyValue('left'));
    let top = parseInt(window.getComputedStyle(maVoiture).getPropertyValue('top'));

// Convertir la position en 'vw'

    left = (left / window.innerWidth) * 100;
    top=(top/ window.innerWidth) * 100;

    // console.log("left ", left);

    if (event.key === 'ArrowLeft' && left > 0) {
        maVoiture.style.left = `${left - 3}vw`;
    }
    let routeVw = (route.clientWidth / window.innerWidth) * 100;
    let voitureVw = (maVoiture.clientWidth / window.innerWidth) * 100;
    if (event.key === 'ArrowRight' && left < (routeVw - voitureVw)) {
        maVoiture.style.left = `${left + 3}vw`;
    }

    // console.log("left 2 ", left);

    if (event.key === 'ArrowUp' && top > 0) {
        console.log('top ' ,top)
        maVoiture.style.top = `${top - 1}vh`;
       // console.log( 'maVoiture.style.top ', maVoiture.style.top );
    }
    // if (event.key === 'ArrowDown' && top <  (route.clientHeight - maVoiture.clientHeight)) {
    //     console.log('top down ' ,top)
    //
    //     maVoiture.style.top = `${top + 2}vh`;
    //}
}

    // Fonction qui anime le déplacement aléatoire des voitures gauche ou droite
function  move() {

//Animation de la route et des voitures
    route.style.animation = "animRoute 8s linear infinite";
    voitureBlack.style.animation = "move2 8s linear infinite";
    voitureGrey.style.animation = "move3 9s linear infinite";
    voitureBlue.style.animation = "move4 7s linear infinite";

    // maVoiture.style.animation="move4 2s linear infinite";

    // voitureBlackInterval = setInterval(() => {
    //     let num = Math.random() *  (route.offsetWidth - voitureBlackInterval.width);  // random entre 0 et 80
    //     voitureBlack.style.left = `${num}vw`;
    // }, 4000);
// Intervalles pour déplacer les voitures aléatoirement
    voitureGreyInterval = setInterval(() => {
        let num = (Math.random() *(route.offsetWidth - voitureGrey.offsetWidth) / window.innerWidth) * 100;
        voitureGrey.style.left = `${num}vw`;
    }, 5000);

    // voitureBlueInterval = setInterval(() => {
    //     let num = Math.random() *(route.offsetWidth - voitureBlueInterval.width);  // random entre 0 et 80
    //     voitureBlue.style.left = `${num}vw`;
    // }, 6000);

    showInterval=setInterval(cvCompetence, 5000);

}


// Fonction qui vérifie s'il y a une collision entre le joueur et les autres voitures
function collision(){

    if (collisionDetected(maVoiture, voitureBlack) ||
        collisionDetected(maVoiture, voitureGrey) ||
        collisionDetected(maVoiture, voitureBlue)) {

        // Fonction appelée en cas de collision entre le joueur et une des voitures, arrêtant ainsi le jeu
        gameOver();

    }


}
//Fonction qui vérifie s'il ya une collision entre deux éléments
function collisionDetected(object1, object2) {
    let obj1 = object1.getBoundingClientRect();
    let obj2 = object2.getBoundingClientRect();

    return !(obj1.right < obj2.left ||
        obj1.left > obj2.right ||
        obj1.bottom < obj2.top ||
        obj1.top > obj2.bottom);
}


let competence = [
    "img/html.png",
    "img/css.png",
    "img/js.png",
    "img/angular.png",
    "img/jquery.png",
    "img/node.png"
];
// Fonction qui affiche aléatoirement des images de compétences que le joueur doit récupérer
let tabcomp=[];
function cvCompetence() {

    let randomImage = competence[Math.floor(Math.random() * competence.length)];

    // Supprime toute image précédemment ajoutée à route avec la classe "randomImg"

    route.querySelectorAll('.randomImg').forEach(img => img.remove());
    // let existImage = route.querySelector('.randomImg');
    // if (existImage) {
    //     existImage.remove();
    // }
    // document.getElementById("image_X").style.display='none';

    // Crée et configurer l'image

    imgElement.classList.add('randomImg');
    imgElement.src = randomImage;
    imgElement.style.position = 'absolute';
    imgElement.style.width="10%";

    // Ajoute l'image à la route du jeu

    let randomLeft = Math.random() * (route.offsetWidth - imgElement.width);
    let min = 540;
    let max = 600;
    let randomTop = Math.random() * (max - min) + min;
            // console.log('top ', randomTop);
            // console.log('route.offsetHeight  ',route.offsetHeight);
            //console.log('imgElement.width ' , imgElement.width);
            // console.log('left ', randomLeft)
    imgElement.style.top = `${randomTop}px`;
    imgElement.style.left = `${randomLeft}px`;
    imgElement.style.animation = "move4 13s linear infinite";

    // Ajoute l'image à la route du jeu

    route.appendChild(imgElement);
    let i=0;

    // Vérifie toutes les 100 millisecondes si la voiture a touché l'image de compétence
   // Si oui, le joueur gagne 10 points et le score est mis à jour

    const collisionInterval = setInterval(() => {

        if (collisionDetected(maVoiture, imgElement)) {

            console.log(imgElement);
            tabcomp[i]=imgElement.src;
            console.log(tabcomp[i]);
            i++;

            updateScore();
          //  console.log(score);
            route.removeChild(imgElement);


            // Si la voiture (joueur) a touché l'image de compétence, supprime cette image de la route



            //clearInterval(collisionInterval);

        }
    }, 100);



    // Supprime l'image après un délai, s'il n'a pas déjà été supprimé

    // setTimeout(() => {
    //     clearInterval(collisionInterval);
    //     if (route.contains(imgElement)) {
    //         route.removeChild(imgElement);
    //     }
    // }, 5000);  // 5000 milliseconds = 5 seconds
    //



}

