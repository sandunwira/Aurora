const { appWindow } = window.__TAURI__.window;

const chatForm = document.getElementById('chat-form');
var messageInput = document.getElementById('message-input');
let responsesDiv = document.getElementById('responsesDiv');
var botResponse = document.querySelector('.botResponse');
const scrollContainer = document.getElementById('scrollContainer');
const startMsg = document.getElementById('startMsg');
const images = document.getElementsByTagName('img');


document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());


for (let i = 0; i < images.length; i++) {
	images[i].addEventListener('mousedown', function (e) {
		e.preventDefault();
	});
}


chatForm.addEventListener('submit', function (event) {
	event.preventDefault();

	let myResponseDiv = document.createElement('div');
	myResponseDiv.classList = 'myResponseCard flex flexRow';
	myResponseDiv.style = 'width: 100%; align-items: center;';
	myResponseDiv.innerHTML = `
		<div class="flex" style="width: 70px; height: 100%; align-items: center; justify-content: center;">A</div>
		<div class="myResponseText" style="height: auto; width: calc(100% - 70px); color: #CCCCCC; line-height: 1.5; font-family: var(--light); font-size: 14px; text-align: justify; text-align-last: left; word-break: break-word; padding: 30px 30px;">
			${messageInput.value}
		</div>
	`;

	responsesDiv.appendChild(myResponseDiv);

	startMsgStatus();

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
			let botResponseDiv = document.createElement('div');
			botResponseDiv.classList = 'botResponseCard flex flexRow';
			botResponseDiv.style = 'width: 100%; align-items: center;';
			botResponseDiv.innerHTML = `
				<div class="flex" style="width: 70px; height: 100%; align-items: center; justify-content: center;">A</div>
				<div class="botResponseText" style="height: auto; width: calc(100% - 70px); color: #CCCCCC; line-height: 1.5; font-family: var(--light); font-size: 14px; text-align: justify; text-align-last: left; word-break: break-word; padding: 30px 30px;">
					${data[0].text}
				</div>
			`;

			responsesDiv.appendChild(botResponseDiv);
			messageInput.value = '';

			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});


function startMsgStatus() {
	if (responsesDiv.innerHTML === '') {
		startMsg.style.display = 'flex';
	} else {
		startMsg.style.display = 'none';
	}
}