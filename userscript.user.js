// ==UserScript==
// @name         mytyping hack
// @namespace    http://tampermonkey.net/
// @version      2024-10-11
// @description  lazy
// @author       wakka
// @match        https://typing.twi1.me/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twi1.me
// @grant        none
// ==/UserScript==

let loops = [];

const gameArea = document.getElementById("mtjAutoArea");

function start(speed, accuracy) {
    const n = Math.ceil(speed / 250);

    function getKey() {
        const inputs = document.querySelectorAll(".mtjNowInput");
        return inputs.length > 1 ? inputs[1].textContent : false;
    }

    function press(key) {
        const downEvent = new KeyboardEvent('keydown', { key: key, bubbles: true });
        gameArea.dispatchEvent(downEvent);
    }

    function main() {
        loops.push(setInterval(() => {
            if (Math.random() > accuracy) press('_');
            const key = getKey();
            if (key) press(key);
        }, 1000 / speed * n));
    }

    for (let i = 1; i <= n; i++) {
        loops.push(setTimeout(main, 1000 / (n + 1) * i - 1));
    }
}

function stop() {
    while (loops.length > 0) {
        clearInterval(loops.shift());
    }
}

const controlPanel = document.createElement("div");
const toggleButton = document.createElement("button");
const speedInput = document.createElement("input");
const accuracyInput = document.createElement("input");

toggleButton.textContent = "ON";
let isActive = false;

toggleButton.onclick = function () {
    isActive = !isActive;
    toggleButton.textContent = isActive ? "OFF" : "ON";

    if (isActive) {
        start(parseFloat(speedInput.value), parseFloat(accuracyInput.value));
    } else {
        stop();
    }
};

speedInput.type = "text";
speedInput.placeholder = "speed";
speedInput.value = "2.5";

accuracyInput.type = "text";
accuracyInput.placeholder = "accuracy";
accuracyInput.value = "0.93";

controlPanel.appendChild(toggleButton);
controlPanel.appendChild(speedInput);
controlPanel.appendChild(accuracyInput);
gameArea.appendChild(controlPanel);

speedInput.addEventListener("input", () => {
    stop();
    start(parseFloat(speedInput.value), parseFloat(accuracyInput.value));
});

accuracyInput.addEventListener("input", () => {
    stop();
    start(parseFloat(speedInput.value), parseFloat(accuracyInput.value));
});
