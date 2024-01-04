// const { appWindow } = window.__TAURI__.window;

document.getElementById('chat-form').addEventListener('submit', function (event) {
	event.preventDefault();
	var messageInput = document.getElementById('message-input');
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
			var responseDiv = document.getElementById('response');
			responseDiv.innerText = data[0].text;
			messageInput.value = '';
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});