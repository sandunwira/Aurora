const statusImg = document.getElementById('statusImg');
const serverStatus = document.getElementById('serverStatus');

function checkStatus() {
	return fetch('http://192.168.1.142:5005')
		.then(response => {
			if (response.ok) {
				statusImg.style.filter = 'invert(44%) sepia(87%) saturate(545%) hue-rotate(62deg) brightness(93%) contrast(87%)';
				return 'Online';
			} else {
				statusImg.style.filter = 'invert(56%) sepia(1%) saturate(1914%) hue-rotate(317deg) brightness(89%) contrast(96%)';
				return 'Offline';
			}
		});
}

setInterval(() => {
	checkStatus()
		.then(status => serverStatus.innerHTML = status)
		.catch(error => console.error(error));
}, 3000);

window.onload = () => {
	checkStatus()
		.then(status => serverStatus.innerHTML = status)
		.catch(error => console.error(error));
};