const statusIndicator = document.getElementById('statusIndicator');
const statusImg = document.getElementById('statusImg');
const serverStatus = document.getElementById('serverStatus');
const networkIndicator = document.getElementById('networkIndicator');


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
				serverStatus.title = 'Aurora is Online';
				serverStatus.innerHTML = 'Online';
			} else {
				statusImg.style.filter = 'invert(22%) sepia(1%) saturate(0%) hue-rotate(290deg) brightness(97%) contrast(84%)';
				serverStatus.title = 'Aurora is Offline';
				serverStatus.innerHTML = 'Offline';
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
				networkIndicator.title = 'You are Online';
			} else {
				networkIndicator.style.filter = 'invert(22%) sepia(1%) saturate(0%) hue-rotate(290deg) brightness(97%) contrast(84%)';
				networkIndicator.title = 'You are Offline';
			}
		});
}



setInterval(() => {
	updateBotStatus();
	botStatus();
	networkStatus();
	updateNetworkStatus();
}, 2000);


window.onload = () => {
	updateBotStatus();
	botStatus();
	networkStatus();
	updateNetworkStatus();
};