let counter = 0;
let tBody = document.getElementById('document-log-form');
if (project.stakeholders == null) {
    alert('Stakeholders belum terdaftar! silahkan daftarkan para stakeholders terlebih dulu!');
    window.location.replace(window.location.hostname + 'edit-stakeholders.html');
} else if (project.documentLog == null)
    createInputRows();
else {
    readDocumentLogs(project.documentLog);
    createInputRows();
}

function plusListener() {
    let td = Array.from(document.getElementById('doc-' + (counter - 1)).children);
    for (let i = 0; i < 4; i++) {
        if (td[i].children[0].value === '') {
            console.log(td[i].children[0]);
            alert('Lengkapi data kontrol dokumen!');
            return;
        }
    }
    td[4].children[0].innerHTML = '&times;';
    td[4].children[0].style.color = '#FB3640';
    td[4].children[0].removeEventListener('click', plusListener);
    td[4].children[0].addEventListener('click', timesListener);
    createInputRows();
}

function timesListener() {
    let tr = document.getElementById('doc-' + this.id);
    tr.parentElement.removeChild(tr);
}

function createInputRows() {
    let tr = document.createElement('tr');
    tr['id'] = 'doc-' + counter;
    let td = [];
    for (let i = 0; i < 4; i++) {
        td[i] = document.createElement('td');
    }
    td[0].innerHTML = "<input type='date' class='form-control data'>";
    td[1].innerHTML = "<input type='text' class='form-control data'>";
    td[2].innerHTML = "<select class='form-control data'></select>";
    td[2].children[0].options[td[2].children[0].options.length] = new Option('', '');
    project.stakeholders.forEach((el, i) => {
        td[2].children[0].options[td[2].children[0].options.length] = new Option(el[0], i);
    });
    td[3].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";
    td[4] = document.createElement('a');
    td[4].innerHTML = "<a href='#' id='" + counter + "' style='font-size: 1.5em; color: #247BA0'>&plus;</a>";
    td[4].children[0].addEventListener('click', plusListener);
    for (let i = 0; i < 5; i++) {
        tr.appendChild(td[i]);
    }
    tBody.appendChild(tr);
    counter++;
}

function readDocumentLogs(lists) {
    lists.forEach((log, index) => {
        let tr = tBody.insertRow(index);
        tr['id'] = 'doc-' + index;
        let td = [];
        for (let i = 0; i < 4; i++) {
            td[i] = document.createElement('td');
        }
        td[0].innerHTML = "<input type='date' class='form-control data'>";
        td[1].innerHTML = "<input type='text' class='form-control data'>";
        td[2].innerHTML = "<select class='form-control data'></select>";
        td[2].children[0].options[td[2].children[0].options.length] = new Option('', '');
        project.stakeholders.forEach((el, i) => {
            td[2].children[0].options[td[2].children[0].options.length] = new Option(el[0], i);
        });
        td[3].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";
        td[4] = document.createElement('a');
        td[4].innerHTML = "<a href='#' id='" + index + "' style='font-size: 1.5em; color: #FB3640'>&times;</a>";
        
        //set the inputs
        td[0].children[0].value = log[0];
        td[1].children[0].value = log[1];
        td[2].children[0].selectedIndex = log[4];
        td[3].children[0].value = log[3];
        td[4].children[0].addEventListener('click', timesListener);
        for (let i = 0; i < 5; i++) {
            tr.appendChild(td[i]);
        }
        tBody.appendChild(tr);
        counter++;
    });
}

document.getElementById('return-button').onclick = returnToDocumentLog;
document.getElementById('cancel-button').onclick = returnToDocumentLog;

document.getElementById('document-log-submit').onclick = function () {
    let table = document.querySelector('#document-log-form').querySelectorAll('.data');
    let incomplete;

    for (let i = 0; i < table.length - 4; i++) {            
        if (table[i].value == '') {
            incomplete = true;
        }
    }

    if (!incomplete) {
        project.documentLog = [];
        for (let i = 0; i < counter - 1; i++) {
            if (document.getElementById('doc-' + i) === null)
                continue;
            let input = Array.from(document.getElementById('doc-' + i).children);
            let pic = input[2].children[0]
                .options[input[2].children[0].options.selectedIndex]
                .innerHTML;
            
            item = [
                input[0].children[0].value,
                input[1].children[0].value,
                pic,
                input[3].children[0].value,
                input[2].children[0].options.selectedIndex
            ];

            project.documentLog.push(item);
        }
        localStorage.setItem('project', JSON.stringify(project));

        createDocumentLog(new jsPDF());
        alert('Kontrol dokumen telah berhasil diperbaharui!');
        window.location.replace(window.location.hostname + 'document-log.html');
    } else {
        alert('Data kontrol dokumen tidak boleh kosong!');
        return;
    }
}