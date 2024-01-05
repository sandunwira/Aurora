const startMsg = document.getElementById('startMsg');
const responsesDiv = document.getElementById('responsesDiv');
const botResponse = document.querySelector('.botResponse');
const myResponse = document.querySelector('.myResponse');

// when response element has text, hide startMsg
botResponse.addEventListener('DOMSubtreeModified', () => {
	if (botResponse.innerText !== '') {
		startMsg.style.display = 'none';
	}
});