window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (localStorage.getItem('project') == null)
    window.location.replace(window.location.hostname + 'index.html');

let project = JSON.parse(localStorage.getItem('project'));

/*
* Save the project into local computer as json files
* */

function saveProject() {
    let req = window.indexedDB.open('project_db');

    req.onsuccess =function (e) {
        let db = e.target.result;
        var request = db.transaction('project', 'readwrite').objectStore('project').put(project);
        request.onsuccess = function () {
            $.snackbar({ content: "Data proyek berhasil tersimpan :)" });
            db.close();
        }
        request.onerror = function () {
            $.snackbar({ content: "Gagal menyimpan proyek :(" });           
            db.close();
        }
    }
    req.onerror = function () {
        $.snackbar({ content: "Gagal membuka database :(" });
    }
}

document.getElementById('save-nav').onclick = saveProject;

function quitProject() {
    localStorage.clear();
    window.location.replace(window.location.hostname);
}

/*
* Quit the project and clear all localStorage data to start working on another project.
* */

function showQuitProject() {
    $('#quit-project-modal').modal('show');
    document.getElementById('save-project-modal-btn').onclick = function () {
        let req = window.indexedDB.open('project_db');

        req.onsuccess = function (e) {
            let db = e.target.result;
            var request = db.transaction('project', 'readwrite').objectStore('project').put(project);
            request.onsuccess = function () {
                $.snackbar({ content: "Data proyek berhasil tersimpan :)" });
                db.close();
                quitProject();
            }
            request.onerror = function () {
                $.snackbar({ content: "Gagal menyimpan proyek :(" });
                db.close();
            }
        }
        req.onerror = function () {
            $.snackbar({ content: "Gagal membuka database :(" });
        }
    };
    document.getElementById('quit-project-modal-btn').onclick = quitProject;
}
document.getElementById('quit-nav').onclick = showQuitProject;

/**
 * Close the project and lock all edit modules.
 */

function closeProject() {
    if (!project.status) {
        $('#close-project-modal').modal('show');
        document.getElementById('close-project-modal-btn').onclick = function () {
            let today = new Date();
            project.closeDate = {
                'date': today.getDate(),
                'month': today.getMonth() + 1,
                'year': today.getFullYear()
            }
            project.status = true;
            localStorage.setItem('project', JSON.stringify(project));
            createClosing(new jsPDF());

            window.location.replace(window.location.hostname + 'closing.html');
        }
    } else {
        createClosing(new jsPDF());
        window.location.replace(window.location.hostname + 'closing.html');
    }
}
document.getElementById('close-nav').onclick = closeProject;

/**
 * Return back functions.
 */

function returnToDashboard() {
    window.location.replace(window.location.hostname + 'dashboard.html');
}

function returnToCharter() {
    window.location.replace(window.location.hostname + 'project-charter.html');
}

function returnToStakeholders() {
    window.location.replace(window.location.hostname + 'stakeholders.html');
}

function returnToDocumentLog() {
    window.location.replace(window.location.hostname + 'document-log.html');
}

function returnToSchedule(){
    window.location.replace(window.location.hostname + 'schedule.html');
}

function returnToWBS() {
    window.location.replace(window.location.hostname + 'wbs.html');
}

function returnToCost() {
    window.location.replace(window.location.hostname + 'cost.html');
}

function returnToComm() {
    window.location.replace(window.location.hostname + 'communication.html');
}