// ==UserScript==
// @name         mytyping hack
// @namespace    http://tampermonkey.net/
// @version      2025-1-21
// @description  lazy
// @author       wakka
// @match        https://typing.twi1.me/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twi1.me
// @grant        none
// ==/UserScript==

function start(speed, accuracy) {
	while (loops.length > 0) clearInterval(loops.shift());
	const game = document.getElementById("mtjAutoArea");
	const n = Math.ceil(speed / 250);

	function getKey() {
		const inputs = document.querySelectorAll(".mtjNowInput");
		return inputs.length > 1 ? inputs[1].textContent : false;
	}
	
	function decodeHtmlEntities(str) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(str, "text/html");
		return doc.documentElement.textContent;
	}

	function press(key) {
		const down = new KeyboardEvent('keydown', {
			key: key,
			bubbles: true
		});
		game.dispatchEvent(down);
	}

	function main() {
		let counter = 0;
		const threshold = Math.round(accuracy * 100);

		loops.push(setInterval(() => {
			counter = (counter + 1) % 100;
			if (counter >= threshold) {
				press('_');
			} else {
				const key = decodeHtmlEntities(getKey());
				if (key) press(key);
			}
		}, 1000 / speed * n));
	}

	for (let i = 1; i <= n; i++) {
		loops.push(setTimeout(main, 1000 / (n + 1) * i - 1));
	}
}

function stop() {
	while (loops.length > 0) clearInterval(loops.shift());
}

let loops = new Array();

const game = document.getElementById("mtjAutoArea");

const newDiv = document.createElement("div");
const toggleButton = document.createElement("button");
toggleButton.textContent = "ON";
let isActive = false;

toggleButton.onclick = function() {
	isActive = !isActive;
	toggleButton.textContent = isActive ? "OFF" : "ON";

	if (isActive) {
		start(parseFloat(speedInput.value), parseFloat(accuracyInput.value));
	} else {
		stop();
	}
};

const speedInput = document.createElement("input");
speedInput.type = "text";
speedInput.placeholder = "speed";
speedInput.value = localStorage.speed || "2.5";

const accuracyInput = document.createElement("input");
accuracyInput.type = "text";
accuracyInput.placeholder = "accuracy";
accuracyInput.value = localStorage.accuracy || "0.93";

newDiv.appendChild(toggleButton);
newDiv.appendChild(speedInput);
newDiv.appendChild(accuracyInput);

game.appendChild(newDiv);

speedInput.addEventListener("input", () => {
	localStorage.speed = speedInput.value;
	stop()
	start(parseFloat(speedInput.value), parseFloat(accuracyInput.value));
});

accuracyInput.addEventListener("input", () => {
	localStorage.accuracy = accuracyInput.value;
	stop()
	start(parseFloat(speedInput.value), parseFloat(accuracyInput.value));
});

setTimeout(stop, 100);
