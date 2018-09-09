let documentString;

if (project.documentLog != null) {
    documentString = 'documentLog';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else
    documentString = 'document404';

document.getElementById('return-button').onclick = returnToCharter;
document.getElementById('view-document-log-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'view-document-log.html');
}
