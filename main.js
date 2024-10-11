const n = 25;
const accuracy = 1;

function getKey() {
    const inputs = document.querySelectorAll(".mtjNowInput");
    if (inputs.length > 1) {
        return inputs[1].textContent;
    } else {
        return false;
    }
}

function press(key) {
    const event = new KeyboardEvent('keydown', {key: key, bubbles: true});
    document.dispatchEvent(event);
}

function main() {
	setInterval(() => {
		if (Math.random() <= accuracy) {
			const key = getKey();
			if (key) press(key);
		}
		else {
			press('_');
		}
	});
}

for (let i = 1; i <= n; i++) {
    main();
}
