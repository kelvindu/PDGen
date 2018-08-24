let documentString = 'closing';

document.getElementById('save-document').href = localStorage.getItem(documentString);

document.getElementById('return-button').onclick = returnToDashboard;