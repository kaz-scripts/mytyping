const accuracy = 0.93;
const speed = 2.5;
const n = Math.ceil(speed / 250);

function getKey() {
    const inputs = document.querySelectorAll(".mtjNowInput");
    return inputs.length > 1 ? inputs[1].textContent : false;
}

function press(key) {
    const down = new KeyboardEvent('keydown', { key: key, bubbles: true });
    document.dispatchEvent(down);
}

function main() {
    setInterval(() => {
        if (Math.random() > accuracy) press('_');
        const key = getKey();
        if (key) press(key);
    }, 1000 / speed * n);
}

for (let i = 1; i <= n; i++) {
    setTimeout(main, 1000 / (n + 1) * i - 1);
}
