window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//initialize material design
$('body').bootstrapMaterialDesign();

let db;
let req = window.indexedDB.open('project_db');

/**
 * initialize the tables in database.
*/

req.onupgradeneeded = function (e) {
    db = e.target.result;
    var projectStore = db.createObjectStore('project', { keyPath: "code", autoIncrement: true });
    projectStore.onsuccess = function (e) {
        console.log(e);
    }
}

/**
 * Check if browser support indexedDB.
*/

req.onerror = function (e) {
    console.log(e);
    alert("Why didn't you allow my web app to use IndexedDB?!");
}

/**
 * if the existing table exist get all data into the list.
*/

req.onsuccess = function (e) {
    db = e.target.result;
    var req = db.transaction('project', 'readonly').objectStore('project').getAll();

    req.onsuccess = function () {
        req.result.forEach(project => {
            var a = document.createElement('a');
            a.className = 'list-group-item list-group-item-action';
            a.setAttribute('data-toggle', 'list');
            a.setAttribute('role', 'tab');
            a.href = '#';
            a.innerHTML = "<input type='hidden' value='" + project.code + "'>" +
                project.code + "&emsp;/&emsp;" +
                project.name + "&emsp;/&emsp;" +
                "Start:&nbsp;" + ((project.approvalDate != null) ? project.approvalDate : "Belum dimulai");
            a.ondblclick = openProject;

            document.getElementById('project-list').appendChild(a);
        });
    }
}

/*
* Checking if there's any previous project exist.
* */

if(localStorage.getItem('project') != null)
    window.location.replace(window.location.hostname + 'dashboard.html');

/*
 * Function to open the project files.
 * */
function openProject(){
    var code = parseInt(document.getElementById('project-list').querySelectorAll('.active')[0].children[0].value);

    var request = db.transaction('project', 'readonly').objectStore('project').get(code);

    request.onsuccess = function () {
        localStorage.setItem('project',JSON.stringify(request.result));
        window.location.replace(window.location.hostname + 'dashboard.html');
        db.close();
    }
    request.onerror = function () {
        alert('Project gagal dibuka!');
    }
}

/*
* If the enter button is pressed instead of create project button triggers the button click.
* */

document.getElementById('project-name').addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        console.log(e.keyCode);
        e.preventDefault();
        document.getElementById('create-project-btn').click();
    }
});

/*
* The operations to create new project.
* */

document.getElementById('create-project-btn').onclick = function(){
    if (document.getElementById('project-name').value === '') {
        return;
    }
    let project = {
        "name": document.getElementById('project-name').value,
        "documentLog": {}
    };

    var request = db.transaction('project', 'readwrite').objectStore('project').add(project);
    request.onsuccess = function () {
        console.log(request.result);

        var a = document.createElement('a');
        a.className = 'list-group-item list-group-item-action';
        a.setAttribute('data-toggle', 'list');
        a.setAttribute('role', 'tab');
        a.href = '#';
        a.innerHTML = "<input type='hidden' value='" + request.result + "'>" +
            request.result + "&emsp;/&emsp;" +
            project.name + "&emsp;/&emsp;" +
            "Start: belum dimulai";
        a.ondblclick = openProject;

        document.getElementById('project-list').appendChild(a);
        $('#create-project-modal').modal('hide');
        $.snackbar({ content: "Data proyek baru telah dibuat!" });
    }

    request.onerror = function () {
        alert('Project baru gagal dibuat!');
    }
};
$('#create-project-modal').on('hidden.bs.modal', function () {
    document.getElementById('project-name').value = '';
});

/*
* The Button listener.
*/

document.getElementById('new-btn').onclick = function (){
    $('#create-project-modal').modal('show');
    $('#create-project-modal').on('shown.bs.modal', function () {
        $('#project-name').trigger('focus');
    })
};

document.getElementById('open-btn').onclick = openProject;
