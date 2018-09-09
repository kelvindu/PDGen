let counter = 0;
let tBody = document.getElementById('comm-form');
let template = document.getElementsByTagName('template');

if (project.stakeholders == null) {
    alert('Stakeholders belum dibuat silahkan buat stakeholders terlebih dahulu!');
    window.location.replace(window.location.hostname + 'edit-stakeholders.html');
}
if (project.communication == null) {
    createInputRows();
} else {
    readInputs();
    createInputRows();
}

function readInputs() {
    project.communication.forEach((el, i) =>{
        let tr = document.createElement('tr');
        tr.id = 'comm-' + i;
        let td = [];
        for (let i = 0; i < 7; i++) {
            td[i] = document.createElement('td');
        }
        td[0].innerHTML = "<input type='text' class='form-control data' value='" + el[0] + "'>";
        td[1].innerHTML = "<select class='form-control data'></select>";

        td[1].children[0].options[td[1].children[0].options.length] = new Option('', '');
        project.deliverables.forEach((el, i) => {
            td[1].children[0].options[td[1].children[0].options.length] = new Option(el, i);
        });
        td[1].children[0].selectedIndex = el[7].deliverables;

        td[2].id = 'pic-' + i;
        td[2].innerHTML = "<select class='form-control data'>";
        td[2].children[0].options[td[2].children[0].options.length] = new Option('', '');
        td[2].children[0].onchange = onSenderSelected;

        // td[3].innerHTML = "<select class='form-control data' multiple></select>";
        td[3].innerHTML = "<div class='dropdown'>" +
            "<a class='btn btn-primary' data-toggle='collapse' href='#collapse-" + td[2].id + "' role='button' aria-expanded='false'>" +
            "Daftar Partisipan" +
            "</a>" +
            "<div class='collapse' id='collapse-" + td[2].id + "'>" +
            "</div>" +
            "</div>";

        project.stakeholders.forEach((person, i) => {
            var participant = document.createElement('div');
            participant.id = i;
            participant.className = 'checkbox';

            var participanLabel = document.createElement('label');
            participanLabel.innerHTML = "<input type='checkbox'>" + person[0];

            el[7].participant.forEach(id => {
                if (id === i) {
                    participanLabel.children[0].checked = true;
                }
            });

            participant.appendChild(participanLabel);

            td[2].children[0].options[td[2].children[0].options.length] = new Option(person[0], i);
            td[3].children[0].children[1].appendChild(participant);
        });
        td[2].children[0].selectedIndex = el[7].pic;

        td[4].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";
        td[4].children[0].value = el[4];
        td[5].appendChild(template[0].content.cloneNode(true));
        td[6].appendChild(template[1].content.cloneNode(true));

        td[5].children[0].selectedIndex = el[7].frequency;
        td[6].children[0].selectedIndex = el[7].communicationMethod;

        td[7] = document.createElement('td');
        td[7].innerHTML = "<a href='#comm-form' style='font-size: 1.5em; color: #FB3640'>&times;</a>";
        td[7].children[0].addEventListener('click', timesListener);

        for (let i = 0; i < 8; i++) {
            tr.appendChild(td[i]);
        }
        tBody.appendChild(tr);
        counter++;
    });
}

function createInputRows() {
    let tr = document.createElement('tr');
    tr.id = 'comm-' + counter;
    let td = [];
    for (let i = 0; i < 7; i++) {
        td[i] = document.createElement('td');
    }
    td[0].innerHTML = "<input type='text' class='form-control data'>";
    td[1].innerHTML = "<select class='form-control data'></select>";

    td[1].children[0].options[td[1].children[0].options.length] = new Option('', '');
    project.deliverables.forEach((el, i) => {
        td[1].children[0].options[td[1].children[0].options.length] = new Option(el, i);
    });

    td[2].id = 'pic-' + counter;
    td[2].innerHTML = "<select class='form-control data'>";
    td[2].children[0].options[td[2].children[0].options.length] = new Option('', '');
    td[2].children[0].onchange = onSenderSelected;

    // td[3].innerHTML = "<select class='form-control data' multiple></select>";
    td[3].innerHTML = "<div class='dropdown'>" +
            "<a class='btn btn-primary' data-toggle='collapse' href='#collapse-" + td[2].id + "' role='button' aria-expanded='false'>" +
                "Daftar Partisipan" +
            "</a>" +
            "<div class='collapse' id='collapse-" + td[2].id + "'>" +
            "</div>" +
        "</div>";

    project.stakeholders.forEach((el, i) => {
        var participant = document.createElement('div');
        participant.id = i;
        participant.className = 'checkbox';

        var participanLabel = document.createElement('label');
        participanLabel.innerHTML = "<input type='checkbox'>" + el[0];

        participant.appendChild(participanLabel);

        td[2].children[0].options[td[2].children[0].options.length] = new Option(el[0], i);
        td[3].children[0].children[1].appendChild(participant);
    });

    td[4].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";
    td[5].appendChild(template[0].content.cloneNode(true));
    td[6].appendChild(template[1].content.cloneNode(true));

    td[7] = document.createElement('td');
    td[7].innerHTML = "<a href='#comm-form' style='font-size: 1.5em; color: #247BA0'>&plus;</a>";
    td[7].children[0].addEventListener('click', plusListener);

    for (let i = 0; i < 8; i++) {
        tr.appendChild(td[i]);
    }
    tBody.appendChild(tr);
    counter++;
}

function plusListener() {
    let row = this.parentElement.parentElement.id;

    let td = Array.from(document.getElementById(row).children);
    for (let i = 0; i < 7; i++) {
        if (td[i].children[0].value === '') {
            alert('Lengkapi data komunikasi!');
            return;
        }
    }
    this.innerHTML = '&times;';
    this.style.color = '#FB3640';
    this.removeEventListener('click', plusListener);
    this.addEventListener('click', timesListener);
    createInputRows();
}

function timesListener() {
    let row = this.parentElement.parentElement.id;
    let tr = document.getElementById(row);
    tr.parentElement.removeChild(tr);
}

function onSenderSelected() {
    var participantList = document.getElementById('collapse-' + this.parentElement.id);

    while (participantList.firstChild) {
        participantList.removeChild(participantList.firstChild);
    }

    project.stakeholders.forEach((el, i) => {
        if (parseInt(this.value) === i) {
            return;
        }

        var participant = document.createElement('div');
        participant.id = i;
        participant.className = 'checkbox';

        var participanLabel = document.createElement('label');
        participanLabel.innerHTML = "<input type='checkbox'> <span class='checkbox-decorator'><span class='check'></span></span>" +
            el[0];

        participant.appendChild(participanLabel);
        participantList.appendChild(participant);
    });
}

document.getElementById('return-button').onclick = returnToComm;
document.getElementById('cancel-button').onclick = returnToComm;

document.getElementById('comm-submit').onclick = function () {
    let table = document.getElementById('comm-form').querySelectorAll('.data');
    let incomplete;


    for (let i = 0; i < table.length - 7; i++) {
        if (table[i].value === 'i') {
            incomplete = true;
        }
    }

    if (!incomplete) {
        project.communication = [];
        for (let i = 0; i < (counter-1); i++) {
            if (document.getElementById('comm-' + i) === null)
                continue;
            let input = Array.from(document.getElementById('comm-' + i).children);
            let pic = project.stakeholders[input[2].children[0]
                .options[input[2].children[0].options.selectedIndex]
                .value][0],
                participant = [],
                deliverables = project.deliverables[input[1].children[0]
                    .options[input[1].children[0].options.selectedIndex]
                    .value],
                frequency = input[5].children[0]
                    .options[input[5].children[0].options.selectedIndex]
                    .value,
                communicationMethod = input[6].children[0]
                    .options[input[6].children[0].options.selectedIndex]
                    .value,
                selectedList = {
                    'deliverables': input[1].children[0].options.selectedIndex,
                    'pic': input[2].children[0].options.selectedIndex,
                    'frequency': input[5].children[0].options.selectedIndex,
                    'communicationMethod': input[6].children[0].options.selectedIndex,
                    'participant': []
                };

            let checkboxes = Array.from(document.getElementById('collapse-' + input[2].id).children);

            checkboxes.forEach(el => {
                if (el.children[0].children[0].checked) {
                    participant.push(project.stakeholders[el.id][0]);
                    selectedList.participant.push(parseInt(el.id));
                }
            });
            let c = [
                input[0].children[0].value,
                deliverables,
                pic,
                participant,
                input[4].children[0].value,
                frequency,
                communicationMethod,
                selectedList
            ];
            project.communication.push(c);
        }
        if ( project.documentLog.comm == null ) {
            project.documentLog.comm = [];
            var reason = "Inisiasi dokumen.";
            updateLog(1, reason, 4);

            localStorage.setItem('project', JSON.stringify(project));

            createCommunication(new jsPDF('l'));
            createDocumentLog(new jsPDF());
            alert('Komunikasi proyek telah berhasil dibuat!');
            returnToComm();
        } else {
            $('#update-log-modal').modal('show');
            let version = parseInt(project.documentLog.comm[0].version);
            document.getElementById('update-log-modal-btn').onclick = function () {
                if ( document.getElementById('update-log-input').value === '' )
                    return;
                var reason = document.getElementById('update-log-input').value;
                version = version + 1;
                updateLog(version, reason, 4);

                localStorage.setItem('project', JSON.stringify(project));

                createCommunication(new jsPDF('l'));
                createDocumentLog(new jsPDF());
                alert('Komunikasi proyek telah berhasil diperbaharui!');
                returnToComm();
            }
        }
    } else {
        alert('Data komunikasi tidak boleh kosong!');
        return;
    }

}
