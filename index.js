const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const result = document.getElementById("result");
var gameBody = document.getElementById('active');
var timer = document.getElementById('counter');
const mainPage = document.getElementById("controls-container");

let seconds = 0, minutes = 0;
let movesCount = 0, winCount = 0;

startButton.addEventListener("click",() => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    timer.removeAttribute("id")
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    // result.innerText = "";
    winCount = 0;

    if(document.querySelectorAll('.boxMatch').length == emojis.length){
        window.location.reload();
    }
    gameBody.removeAttribute("id")
    mainPage.id = 'active';
});

resetButton.addEventListener("click", () => {
    window.location.reload();
});

const timeGenerator = () => {
    seconds += 1;
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:<span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<h4>Moves: ${movesCount}</h4>`;
};

const emojis = ["😊","😊","😒","😒","😎","😎","😁","😁","😜","😜","🤩","🤩","😴","😴","😵‍💫","😵‍💫"];
var shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1);
for(var i=0; i<emojis.length; i++){
    let box = document.createElement('div')
    box.className = 'item';
    box.innerHTML = shuf_emojis[i]
    box.onclick = function(){
        this.classList.add('boxOpen')
        setTimeout(function(){
            if(document.querySelectorAll('.boxOpen').length > 1){
                movesCounter();
                if(document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML){
                    document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch')
                    document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch')
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')
                    if(document.querySelectorAll('.boxMatch').length == emojis.length){
                        endGame();
                    }
                }else{
                    document.querySelectorAll('.boxOpen')[0].classList.add('shake')
                    document.querySelectorAll('.boxOpen')[1].classList.add('shake')
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen')
                }
            }
        },600)
    }
    document.querySelector('.game').appendChild(box);
}

const endGame = () => {
    timer.id = 'counter';
    mainPage.removeAttribute("id")
    gameBody.id = 'active'
    result.innerHTML = `You  Won 🎉<br>Moves:${movesCount}<br>Time:${minutes}:${seconds}`;
};
