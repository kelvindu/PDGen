let documentString;

if (project.status) {
    document.getElementById('edit-document-log-btn').setAttribute('disabled', 'disabled');
}

if (project.documentLog != null) {
    documentString = 'documentLog';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else
    documentString = 'document404';

document.getElementById('return-button').onclick = returnToCharter;
document.getElementById('edit-document-log-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'edit-document-log.html');
}