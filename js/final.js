function showCustomAlert(message) {
  document.getElementById('modalMessage').innerText = message;
  document.getElementById('customModal').style.display = 'block';
}

function hideCustomAlert() {
  document.getElementById('customModal').style.display = 'none';
}

document.getElementById('button1').addEventListener('click', function() {
  alert('Button 1 clicked!');
  hideCustomAlert();
});

document.getElementById('button2').addEventListener('click', function() {
  alert('Button 2 clicked!');
  hideCustomAlert();
});

document.getElementById('closeButton').addEventListener('click', function() {
  hideCustomAlert();
});