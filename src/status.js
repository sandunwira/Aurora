const statusIndicator = document.getElementById('statusIndicator');
const statusImg = document.getElementById('statusImg');
const serverStatus = document.getElementById('serverStatus');
const networkBtn = document.getElementById('networkBtn');
const networkIndicator = document.getElementById('networkIndicator');
const connectionMsg = document.getElementById('connectionMsg');


async function botStatus() {
	try {
		const response = await fetch('http://192.168.1.142:5005');
		if (response.ok) {
			return 'Online';
		}
	} catch (error) {
		console.clear();
		return 'Offline';
	}
}

function updateBotStatus() {
	botStatus()
		.then(status => {
			if (status === 'Online') {
				statusImg.style.filter = 'invert(44%) sepia(87%) saturate(545%) hue-rotate(62deg) brightness(93%) contrast(87%)';
				statusIndicator.title = 'Aurora is Online';
			} else {
				statusImg.style.filter = 'invert(22%) sepia(1%) saturate(0%) hue-rotate(290deg) brightness(97%) contrast(84%)';
				statusIndicator.title = 'Aurora is Offline';
			}
		});
}


async function networkStatus() {
	return fetch('https://github.com/sandunwira/Aurora', {
		method: 'HEAD',
		mode: 'no-cors'
	})
		.then(() => {
			return 'Online';
		})
		.catch(() => {
			console.clear();
			return 'Offline';
		});
}

function updateNetworkStatus() {
	networkStatus()
		.then(status => {
			if (status === 'Online') {
				networkIndicator.style.filter = 'invert(44%) sepia(87%) saturate(545%) hue-rotate(62deg) brightness(93%) contrast(87%)';
				networkBtn.title = 'You are Online';
			} else {
				networkIndicator.style.filter = 'invert(22%) sepia(1%) saturate(0%) hue-rotate(290deg) brightness(97%) contrast(84%)';
				networkBtn.title = 'You are Offline';
			}
		});
}


async function updateConnectionMsg() {
	const bot_status = await botStatus();
	const network_status = await networkStatus();

	if (bot_status === 'Online') {
		connectionMsg.style.display = 'none';
		connectionMsg.innerHTML = '';
	} else if (network_status === 'Online' && bot_status === 'Online') {
		connectionMsg.style.display = 'none';
		connectionMsg.innerHTML = '';
	} else if (bot_status === 'Offline' || network_status === 'Offline') {
		connectionMsg.style.display = 'block';
		connectionMsg.style.textTransform = 'uppercase'
		connectionMsg.innerHTML = 'Aurora is Offline';
	}
}



setInterval(() => {
	updateBotStatus();
	botStatus();
	networkStatus();
	updateNetworkStatus();
	updateConnectionMsg();
}, 2000);


window.onload = () => {
	updateBotStatus();
	botStatus();
	networkStatus();
	updateNetworkStatus();
	updateConnectionMsg();
};