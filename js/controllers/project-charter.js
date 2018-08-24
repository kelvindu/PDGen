let documentString;
if (!project.charter) {
    // $(".alert").alert('close');
    // alert("Project Charter belum dibuat! silahkan buat Project Charter terlebih dulu!");
    var warning = document.getElementsByTagName('template')[0].content.cloneNode(true);
    $('#alert-section').append(warning);
    document.getElementById('alert-heading').innerText = 'Project Charter tidak ditemukan!';
    document.getElementById('alert-p').innerText = 'Project Charter belum dibuat! silahkan buat Project Charter terlebih dulu!';
    // document.getElementById('project-charter-frame').innerHTML = "Tidak ada Project Charter!"
    document.getElementById('edit-create-btn').innerHTML += "<span style='vertical-align: middle'>Create Project Charter</span>";
} else if (project.status) {
    document.getElementById('edit-create-btn').innerHTML += "<span style='vertical-align: middle'>Edit Project Charter</span>";
    document.getElementById('edit-create-btn').setAttribute('disabled', 'disabled');
} else document.getElementById('edit-create-btn').innerHTML += "<span style='vertical-align: middle'>Edit Project Charter</span>";

if (project.charter) {
    documentString = 'charter';
    document.getElementById('save-document').href = localStorage.getItem(documentString);
} else
    documentString = 'charter404';

document.getElementById('edit-create-btn').onclick = function () {
    window.location.replace(window.location.hostname + 'edit-project-charter.html');
}

document.getElementById('return-button').onclick = returnToDashboard;