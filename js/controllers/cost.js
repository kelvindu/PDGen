let documentString;

if (project.status) {
    document.getElementById('edit-cost-btn').setAttribute('disabled', 'disabled');
}

if (project.wbs != null) {
    documentString = 'cost';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else documentString = 'wbs404';

document.getElementById('return-button').onclick = returnToDashboard;
document.getElementById('edit-cost-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'edit-cost.html');
}