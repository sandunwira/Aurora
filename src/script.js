const responsesDiv = document.getElementById('responsesDiv');


setInterval(function () {
	localStorage.setItem('responsesDiv', responsesDiv.innerHTML);
}, 2000);

window.onload = function () {
	responsesDiv.innerHTML = localStorage.getItem('responsesDiv');
};