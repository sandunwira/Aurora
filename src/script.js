const startMsg = document.getElementById('startMsg');
const response = document.getElementById('response');

// when response element has text, hide startMsg
response.addEventListener('DOMSubtreeModified', () => {
	if (response.innerText) {
		startMsg.style.display = 'none';
	}
});