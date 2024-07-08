let startPause = document.getElementById('start');
let scoreDisplay = document.getElementById('score');
let route = document.getElementById("route");
let voitureGrey = document.getElementById("voituregry");
let voitureBlue = document.getElementById("voitureblue");
let voitureBlack = document.getElementById("voitureblack");
let maVoiture = document.getElementById("maVoiture");

let isPlaying = false;
let gameInterval;
let score = 0;

let voitureBlackInterval;
let voitureGreyInterval;
let voitureBlueInterval;

window.addEventListener("keydown", moveVoiture);

startPause.addEventListener('click', () => {
    if (isPlaying) {
        pauseGame();
    } else {
        startGame();
    }
});

function pauseGame() {
    isPlaying = false;
    startPause.textContent = 'PLAY';
    clearInterval(gameInterval);
    clearInterval(voitureBlackInterval);
    clearInterval(voitureGreyInterval);
    clearInterval(voitureBlueInterval);

    route.style.animation = '';
    voitureBlack.style.animation = '';
    voitureGrey.style.animation = '';
    voitureBlue.style.animation = '';
}

function startGame() {
    isPlaying = true;
    startPause.textContent = 'Pause';
    gameInterval = setInterval(updateGame, 200);
    move();
}

function updateGame() {
    checkCollision();
    updateScore();
}

function updateScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    if (score >= 100) {
        alert('Félicitations! Vous avez gagné!');
        resetGame();
    }
}

function resetGame() {
    pauseGame();
    score = 0;
    scoreDisplay.textContent = 'Score: 0';

    maVoiture.style.top = '300px';
    maVoiture.style.left = '125px';

    voitureBlack.style.top = '-100px';
    voitureGrey.style.top = '-100px';
    voitureBlue.style.top = '-100px';

    voitureBlack.style.left = '120px';
    voitureGrey.style.left = '100px';
    voitureBlue.style.left = '-150px';
}

function move() {
    route.style.animation = "animRoute 20s linear infinite";
    voitureBlack.style.animation = "move2 3s linear infinite";
    voitureGrey.style.animation = "move3 6s linear infinite";
    voitureBlue.style.animation = "move4 9s linear infinite";

    voitureBlackInterval = setInterval(() => {
        let num = Math.floor(Math.random() * (140 - 50 + 1) + 50);
        voitureBlack.style.left = `${num}px`;
    }, 3000);

    voitureGreyInterval = setInterval(() => {
        let num = Math.floor(Math.random() * (-100 - 50 + 1) + 50);
        voitureGrey.style.left = `${num}px`;
    }, 5000);

    voitureBlueInterval = setInterval(() => {
        let num = Math.floor(Math.random() * (-140 - 40 + 1) + 40);
        voitureBlue.style.left = `${num}px`;
    }, 7000);
}

function moveVoiture(event) {
    if (!isPlaying) return;

    let left = parseInt(window.getComputedStyle(maVoiture).getPropertyValue('left'));
    let top = parseInt(window.getComputedStyle(maVoiture).getPropertyValue('top'));

    console.log('left = ', left);
    if (event.key === 'ArrowLeft' && left > 0) {

        maVoiture.style.left = `${left - 1}px`;
    }
    if (event.key === 'ArrowRight' && left < (route.clientWidth - maVoiture.clientWidth)) {
        maVoiture.style.left = `${left + 10}px`;
    }
    if (event.key === 'ArrowUp' && top > 0) {
        maVoiture.style.top = `${top - 10}px`;
    }
    if (event.key === 'ArrowDown' && top < (route.clientHeight - maVoiture.clientHeight)) {
        maVoiture.style.top = `${top + 10}px`;
    }
}

function checkCollision() {
    let voitureBlackPosition = voitureBlack.getBoundingClientRect();
    let voitureGreyPosition = voitureGrey.getBoundingClientRect();
    let voitureBluePosition = voitureBlue.getBoundingClientRect();
    let voiturePosition = maVoiture.getBoundingClientRect();

    if (collisionDetected(voiturePosition, voitureBlackPosition) ||
        collisionDetected(voiturePosition, voitureGreyPosition) ||
        collisionDetected(voiturePosition, voitureBluePosition)) {
        alert('Game Over! Vous avez perdu.');
        resetGame();
    }
}

function collisionDetected(rect1, rect2) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}
