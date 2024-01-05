const { appWindow } = window.__TAURI__.window;

document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());

const chatForm = document.getElementById('chat-form');
var messageInput = document.getElementById('message-input');
var responsesDiv = document.querySelector('.responsesDiv');
var myResponse = document.querySelector('.myResponse');
var botResponse = document.querySelector('.botResponse');

chatForm.addEventListener('submit', function (event) {
	event.preventDefault();
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
			botResponse.innerText = data[0].text;
			messageInput.value = '';
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});