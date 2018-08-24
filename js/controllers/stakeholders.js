let documentString;

if (project.status) {
    document.getElementById('edit-stakeholders-btn').setAttribute('disabled', 'disabled');
}

if (project.stakeholders != null) {
    documentString = 'stakeholders';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else
    documentString = 'stakeholders404';

document.getElementById('return-button').onclick = returnToCharter;
document.getElementById('edit-stakeholders-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'edit-stakeholders.html');
}