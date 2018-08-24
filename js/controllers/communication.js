let documentString;

if (project.status) {
    document.getElementById('edit-comm-btn').setAttribute('disabled', 'disabled');
}

if (project.communication != null) {
    documentString = 'communication';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else documentString = 'communication404';

document.getElementById('return-button').onclick = returnToDashboard;
document.getElementById('edit-comm-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'edit-communication.html');
}