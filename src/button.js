const BUTTON_DOWN_IMG_PATH = "./resources/button_down.png";
const BUTTON_UP_IMG_PATH = "./resources/button_up.png";
const CLICK_DURATION_MS = 100;
const SAVE_PERIOD_MS = 10_000;

let canClick = true;
let score = 0;
let scoreSaveData = localStorage.getItem("score");
if (scoreSaveData !== "") {
    score = parseInt(scoreSaveData);
}

const counterElement = document.getElementById("counter");
const imageElement = document.getElementById("image");

function save() {
    localStorage.setItem("score", `${score}`);
    console.log("Saved");
}

function updateCounter() {
    counterElement.textContent = `${score}`;
}

function release() {
    imageElement.src = BUTTON_UP_IMG_PATH;
    canClick = true;
}

function shake() {
    const steps = 5;
    const delta = 50;
    let amp = 5;
    let step = 0;

    for (step = 0; step < steps; step++) {
        setTimeout(function() {
            let xPos = Math.floor(Math.random() * amp - amp / 2);
            let yPos = Math.floor(Math.random() * amp - amp / 2);
            counterElement.style.left = `${xPos}px`;
            counterElement.style.top = `${yPos}px`;

            counterElement.style.transition = `${delta}ms`;
        }, delta * step);
    }

    setTimeout(function() {
        counterElement.style.left = "0px";
        counterElement.style.transition = `${delta}ms`;
    }, step * delta);
}

function click() {
    if (!canClick) {
        return;
    }
    canClick = false;
    imageElement.src = BUTTON_DOWN_IMG_PATH;
    setTimeout(release, CLICK_DURATION_MS);
    score = score + 1;
    updateCounter();
    shake();
}

document.querySelector("button").onclick = click;
counterElement.style.position = "relative";
updateCounter();
setInterval(save, SAVE_PERIOD_MS);
