
class Cars{
    constructor(elementId, top, left){
    this.element = document.getElementById(elementId);
    this.top = top;
    this.left = left;
    // this.width = this.element.offsetWidth;
    // this.height = this.element.offsetHeight;
    }

    // Méthode pour déplacer la voiture du joueur en fonction des touches de direction gauche ou droite

    // Méthode pour déplacer la voiture vers la gauche
    moveLeft(distance) {
        this.left -= distance;
        this.element.style.left = `${this.left}vw`;
    }

    // Méthode pour déplacer la voiture vers la droite
    moveRight(distance) {
        this.left += distance;
        this.element.style.left = `${this.left}vw`;
    }


    // Méthode pour vérifier s'il y a une collision avec une autre voiture
        checkCollision(car) {
            let car1 = this.element.getBoundingClientRect();
            let car2 = car.element.getBoundingClientRect();

            return !(car1.right < car2.left ||
                car1.left > car2.right ||
                car1.bottom < car2.top ||
                car1.top > car2.bottom);
        }

        // Méthode pour réinitialiser la position de la voiture
        resetPosition(top, left) {
            this.top = top;
            this.left = left;
            this.element.style.top = `${this.top}vh`;
            this.element.style.left = `${this.left}vw`;
        }
}

class Game{


    constructor() {

        this.myCar = new Cars('maVoiture', 75, 10);
        this.blackCar = new Cars('voitureblack', 20, 22);
        this.greyCar = new Cars('voituregry', 35, 15);
        this.blueCar = new Cars('voitureblue', 50, 5);
        this.road=document.getElementById("route");

        this.roadVw=(this.road.clientWidth/window.innerWidth)*100;

        this.scoreDisplay = document.getElementById('score');
        this.timerDisplay = document.getElementById('timer');

        this.score = 0;
        this.elapsedTime = 0;
        this.isPlaying = false;

        this.dialog=document.getElementById('dialog');
        this.cv=document.getElementById('cv');
        this.quit=document.getElementById('quit');

        this.startPauseBtn = document.getElementById('start');

        this.modalContainer = document.getElementById('modal-container');
        this.btnReplay = document.getElementById('btn-replay');
        this.btnExit = document.getElementById('btn-exit');

        this.rulesModal = document.getElementById('rulesModal');
        this.rulesBtn = document.getElementById('rulesBtn');
        this.closeBtn = document.getElementById('closeBtn');

        this.imgElement = document.createElement('img');
        this.skills = [
            "img/html.png",
            "img/css.png",
            "img/js.png",
            "img/angular.png",
            "img/jquery.png",
            "img/node.png"
        ];

        this.initialize();

    }





    // Méthode pour initialiser le jeu
    initialize() {

        window.addEventListener('keydown', this.moveCar.bind(this));

        this.startPauseBtn.addEventListener('click',this.startPause.bind(this));

        this.btnReplay.addEventListener('click', () => this.resetGame.bind(this));

        this.btnExit.addEventListener('click', () =>
            this.modalContainer.style.display = 'none');

        this.rulesBtn.addEventListener( 'click', this.rules.bind(this));


    }


    rules(){

        // Ajoutez un événement de clic sur games Rules la boite de dialog s'ouvre
        this.rulesModal.style.display='flex';

        // Ajoutez un événement de clic au bouton de fermeture pour fermer le dialog

        this.closeBtn.addEventListener('click', () => {
            this.rulesModal.style.display='none';

        });
    }

    // Méthode pour démarrer ou mettre en pause le jeu
    startPause() {
        if (this.isPlaying) {
            this.pauseGame();
        } else {
            this.startGame();
        }
    }

    // Méthode pour démarrer le jeu
    startGame() {
        this.isPlaying = true;
        this.startPauseBtn.textContent = 'PAUSE';

        this.gameInterval = setInterval(() => { this.updateGame(); }, 200);
        this.timerInterval = setInterval(() => { this.updateTimer();}, 1000);


        this.move();
    }

    // Méthode pour mettre en pause le jeu

    pauseGame() {

        this.isPlaying = false;
        this.startPauseBtn.textContent = 'PLAY';

        clearInterval(this.gameInterval);
        clearInterval(this.timerInterval);
        //clearInterval(this.voitureBlackInterval);
        clearInterval(this.greyCarIntervaLeft);
        clearInterval(this.greyCarIntervalout);
      //  clearInterval(this.voitureBlueInterval);
        clearInterval(this.showInterval);

        this.pauseAnimation();
    }
    // Méthode pour mettre en pause l'animation des voitures et la route
    pauseAnimation() {

        this.road.style.animationPlayState="paused"
        this.blackCar.element.style.animationPlayState = 'paused';
        this.greyCar.element.style.animationPlayState = 'paused';
        this.blueCar.element.style.animationPlayState = 'paused';
        this.imgElement.style.animationPlayState = 'paused';
    }

    // Méthode pour animer la route et les voitures
  palyAnimation() {

      this.road.style.animation = "animRoute 8s linear infinite";
      this.blackCar.element.style.animation = "move2 8s linear infinite";
      this.greyCar.element.style.animation = "move3 9s linear infinite";
      this.blueCar.element.style.animation = "move4 7s linear infinite";
    }


    // Méthode pour mettre à jour le jeu à chaque intervalle
    updateGame() {

        this.collision();
    }

    // Méthode pour mettre à jour le score lorsque le joueur récupère une compétence
    updateScore() {

        this.score += 10;
        console.log(' update', this.score);
        this.scoreDisplay.textContent = `Score: ${this.score}`;

        if (this.score >= 60) {

            this.winDialog();

        }

    }

    // Méthode pour afficher la boîte de dialogue
    winDialog() {

        this.pauseGame();

        this.dialog.style.display = 'flex';

        this.cv.addEventListener('click', () => {
            this.dialog.style.display = 'none';


        });

        this.quit.addEventListener('click', () => {
            this.dialog.style.display = 'none';

            this.resetGame();

        });

    }

    // Méthode pour réinitialiser le jeu
    resetGame() {

       // this.pauseGame();

        this.score = 0;
        this.scoreDisplay.textContent = 'Score: 0';
        this.timerDisplay.textContent = 'Time: 0s';

        this.myCar.resetPosition(75, 10);
        this.blackCar.resetPosition(20, 22);
        this.greyCar.resetPosition(35, 15);
        this.blueCar.resetPosition(50, 4);
    }

    // Méthode pour mettre à jour le chronomètre
    updateTimer() {
        this.elapsedTime++;
        this.timerDisplay.textContent = `Time: ${this.elapsedTime}s`;
    }

    // Méthode pour déplacer la voiture du joueur en fonction des touches de direction
    moveCar(event) {
        console.log('moveCar', this);

        if (!this.isPlaying) return;

        let left =
            parseInt(window.getComputedStyle(this.myCar.element).getPropertyValue('left'));
        //  let top = parseInt(window.getComputedStyle(maVoiture).getPropertyValue('top'));


        console.log('left = ', left);
        left=(left/window.innerWidth)*100;

        if (event.key === 'ArrowLeft' && left >1.5) {

            this.myCar.element.style.left = `${left - 3}vw`;

        }

        console.log('route = ', this.roadVw);

        if (event.key === 'ArrowRight' && left < (this.roadVw - 3) ){
            this.myCar.element.style.left = `${left +3}vw`;
        }

        }



    // Méthode pour animer le mouvement aléatoire des voitures ennemies
    move() {

            this.palyAnimation()

        this.greyCarIntervaLeft = setInterval(() => {
            let num = Math.random() * 13;
            this.greyCar.moveLeft(num);
        }, 5000);


        this.greyCarIntervalout=setTimeout(() => {

            clearInterval(this.greyCarIntervaLeft);
            greyCarIntervaLeft
          setInterval(() => {
                let num = Math.random() * 10;
                this.greyCar.moveRight(num);
            }, 8000);

        }, 5000 + 8000);

        // this.blueCarInterval = setInterval(() => {
        //     let num = Math.random() * 18;
        //     this.blueCar.moveRight(num);
        // }, 5000);
        // this.blackCarInterval = setInterval(() => {
        //     let num = Math.random() * 18;
        //     this.blackCar.moveLeft(num);
        // }, 6000);

        this.showInterval = setInterval(() => {
            this.cvCompetence();
        }, 5000);
    }

    // Méthode pour vérifier s'il y a une collision entre le joueur et les voitures ennemies
    collision() {

        if (this.myCar.checkCollision(this.blackCar) ||
            this.myCar.checkCollision(this.greyCar) ||
            this.myCar.checkCollision(this.blueCar)) {

            this.gameOver();
        }
    }

    // Méthode pour gérer le game over
    gameOver() {

        this.pauseGame();
        this.modalContainer.style.display = 'flex';


        this.btnReplay.addEventListener('click', () => {
            this.modalContainer.style.display = 'none';

        });

        this.btnExit.addEventListener('click', () => {
            this.modalContainer.style.display = 'none';
        });
        this.resetGame();
    }

    // Méthode pour afficher aléatoirement une compétence que le joueur doit récupérer
    cvCompetence() {
        let randomImage = this.skills[Math.floor(Math.random() * this.skills.length)];

       this.road.querySelectorAll('.randomImage').forEach(img=>img.remove());

        this.imgElement.classList.add('randomImage');
        this.imgElement.src = randomImage;
        this.imgElement.style.position = 'absolute';
        this.imgElement.style.width = '10%';

        let randomLeft = Math.random() * (this.road.offsetWidth - this.imgElement.width);
        let randomTop = Math.random() * (600-540)+540;

        this.imgElement.style.top = `${randomTop}px`;
        this.imgElement.style.left = `${randomLeft}px`;
        this.imgElement.style.animation = "move4 13s linear infinite";

        this.road.appendChild(this.imgElement);

       setInterval(() => {

            if (this.myCar.checkCollision({ element: this.imgElement })) {

                this.updateScore();

                this.road.removeChild(this.imgElement);
               // clearInterval(collisionInterval);
            }
        }, 100);
    }


}

const game = new Game();



