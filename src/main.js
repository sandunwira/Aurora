const { appWindow } = window.__TAURI__.window;

document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());

const chatForm = document.getElementById('chat-form');
var messageInput = document.getElementById('message-input');
let responsesDiv = document.getElementById('responsesDiv');
var myResponse = document.querySelector('.myResponse');
var botResponse = document.querySelector('.botResponse');

chatForm.addEventListener('submit', function (event) {
	event.preventDefault();

	// Create a new div for your message
	let myResponseDiv = document.createElement('div');
	myResponseDiv.className = 'myResponse';
	myResponseDiv.innerText = messageInput.value;

	// Append your message to the responsesDiv
	responsesDiv.appendChild(myResponseDiv);

	fetch('http://192.168.1.142:5005/webhooks/rest/webhook', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			sender: 'test_user',
			message: messageInput.value
		}),
	})
		.then(response => response.json())
		.then(data => {
			// Create a new div for the bot's response
			let botResponseDiv = document.createElement('div');
			botResponseDiv.className = 'botResponse';
			botResponseDiv.innerText = data[0].text;

			// Append the bot's response to the responsesDiv
			responsesDiv.appendChild(botResponseDiv);
			messageInput.value = '';
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});