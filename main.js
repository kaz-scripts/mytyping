function getkey() {
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

setInterval(()=>{
	key = getkey()
	if (key) press(key)
})
