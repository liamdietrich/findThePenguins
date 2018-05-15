$(document).ready(function () {
    /*This code will run after your page loads*/
    //Globals
    var elScoreboard = document.getElementById('scoreCount');
    var gameoverMsg = document.getElementById('gameoverMsg');
    var newGameIdsArr;
    var newMoundsArr;

    var gameIdsArr = ['penguin1', 'penguin2', 'penguin3', 'penguin4', 'penguin5', 'penguin6', 'penguin7', 'penguin8', 'yeti'];

    var moundsArr = ['./images/mound_1.png', './images/mound_2.png', './images/mound_3.png', './images/mound_4.png', './images/mound_5.png', './images/mound_6.png', './images/mound_7.png', './images/mound_8.png', './images/mound_9.png'];


    //Capturing all the game pieces in an array
    var gamePieces = document.getElementsByClassName('gamePiece');

    //Randomize gameboard
    shuffleBoard();

    //Add events
    addPieceEvents();


    //Adding eventlistener to game pieces
    function addPieceEvents() {
        for (var i = 0; i < gamePieces.length; i++) {
            var curPiece = gamePieces[i];
            curPiece.addEventListener('click', togglePiece, false);

        }
    }



    //Function to make the game pieces stay
    function togglePiece(e) {

        if (this.id.indexOf('yeti') != -1) {

            //Set background image for the yeti
            this.setAttribute('style', 'background-image:url(\'./images/yeti.png\'); background-repeat:no-repeat; background-size:contain; background-position:center;');

            //Audio trigger for yeti
            var yetiGrowl = new Audio('./media/yeti.wav');
            yetiGrowl.play();

            //Open Game Over window
            gameoverMsg.textContent = 'Game Over!';
            gameoverMsg.setAttribute('style', 'color: red;');
            gameoverModal.style.display = 'block';


        } else {

            //Set background image of the penguin clicked
            var pieceID = this.id;
            var bgImgPath = './images/penguin_' + pieceID.slice(7, 8) + '.png';
            this.setAttribute('style', 'background-image: url(' + bgImgPath + '); background-repeat:no-repeat; background-size:contain; background-position:center;');

            //Increase the score
            if (elScoreboard.value == '') {
                elScoreboard.value = 1;
            } else {
                var curScore = parseInt(elScoreboard.value) + 1;
                elScoreboard.value = curScore;
            }

            //Remove eventlistener
            this.removeEventListener('click', togglePiece);


            //Audio trigger for penguins
            var penguinSquawk = new Audio('./media/penguin.wav');
            penguinSquawk.play();

            //Check to see if player found all penguins
            if (parseInt(elScoreboard.value) == 8){
                //Set game message
                gameoverMsg.textContent = 'You Win!!!';
                gameoverMsg.setAttribute('style', 'color: green;');
                //Open Game Over window
                gameoverModal.style.display = 'block';
            }
        }

    }


    /**Code to display/hide the Game Over modal window and reset gameboard**/
    //Capture modal div
    var gameoverModal = document.getElementById('gameoverModal');
    //Capture modal close button
    var span = document.getElementsByClassName('close')[0];

    //Close modal if 'X' clicked
    span.onclick = function () {
        resetGame();
    }
    //Close modal if window clicked
    window.onclick = function (e) {
        if (e.target == gameoverModal) {
            resetGame();
        }
    }

    //Function to reset the gameboard
    function resetGame() {
        //Update the highscore
        updateHighscore();
        //Reset the game score
        elScoreboard.value = '';
        //Reset game piece background-image
        for (var i = 0; i < gamePieces.length; i++) {
            var curPiece = gamePieces[i];
            curPiece.removeAttribute('style');
        }
        //Remove game over modal window
        gameoverModal.style.display = 'none';

        shuffleBoard();
        addPieceEvents();
    }

    //Function to update the high-score
    function updateHighscore() {
        var elHighscore = document.getElementById('highscoreCount');
        curScore = parseInt(elScoreboard.value);
        curHighscore = elHighscore.value;

        console.log('curScore: ' + curScore + ' - ' + curHighscore);

        if (curHighscore == '' && !isNaN(curScore)) {
            elHighscore.value = curScore;
        } else {
            curHighscore = parseInt(curHighscore);
            if (curHighscore < curScore) {
                elHighscore.value = curScore;
            }

        }
    }

    //Function to shuffle the gameboard pieces
    function shuffleBoard() {
        newGameIdsArr = shuffle(gameIdsArr);
        newMoundsArr = shuffle(moundsArr);

        for (var i = 0; i < gameIdsArr.length; i++) {
            gamePieces[i].setAttribute('id', newGameIdsArr[i]);
            gamePieces[i].setAttribute('style', 'background-image: url(' + newMoundsArr[i] + '); background-repeat:no-repeat; background-size:contain; background-position:center;');
        }
    }


    //Fisher-Yates shuffle code
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

});
