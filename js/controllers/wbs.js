let documentString;

if (project.status) {
    document.getElementById('edit-wbs-btn').setAttribute('disabled', 'disabled');
}

if (project.wbs != null) {
    documentString = 'wbs';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else documentString = 'wbs404';

document.getElementById('return-button').onclick = returnToSchedule;
document.getElementById('edit-wbs-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'edit-wbs.html');
}