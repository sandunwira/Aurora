const responsesDiv = document.getElementById('responsesDiv');

// save innerHTML of responsesDiv to localStorage every 1 second
setInterval(function () {
	localStorage.setItem('responsesDiv', responsesDiv.innerHTML);
}, 2000);

// load innerHTML of responsesDiv from localStorage on page load
window.onload = function () {
	responsesDiv.innerHTML = localStorage.getItem('responsesDiv');
};