const statusIndicator = document.getElementById('statusIndicator');
const statusImg = document.getElementById('statusImg');
const serverStatus = document.getElementById('serverStatus');


async function checkStatus() {
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

function changeStatus() {
	checkStatus()
		.then(status => {
			if (status === 'Online') {
				statusImg.style.filter = 'invert(44%) sepia(87%) saturate(545%) hue-rotate(62deg) brightness(93%) contrast(87%)';
				serverStatus.title = 'Aurora is Online';
			} else {
				statusImg.style.filter = 'invert(22%) sepia(1%) saturate(0%) hue-rotate(290deg) brightness(97%) contrast(84%)';
				serverStatus.title = 'Aurora is Offline';
			}
		});
}


setInterval(() => {
	changeStatus();
	checkStatus()
		.then(status => serverStatus.innerHTML = status);
}, 2000);


window.onload = () => {
	changeStatus();
	checkStatus()
		.then(status => serverStatus.innerHTML = status);
};