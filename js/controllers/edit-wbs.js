if (project.charter) {
    document.getElementById('scope-statement').innerText = project.statement;
    project.milestones.forEach(item => {
        let node = document.createElement('li');
        node.className = 'list-group-item';
        node.innerText = item;
        document.getElementById('milestones-list').appendChild(node);
    });
    project.objectives.forEach(item =>{
        let node = document.createElement('li');
        node.className = 'list-group-item';
        node.innerText = item;
        document.getElementById('objectives-list').appendChild(node);
    });
    project.deliverables.forEach(item => {
        let node = document.createElement('li');
        node.className = 'list-group-item';
        node.innerText = item;
        document.getElementById('deliverables-list').appendChild(node);
    });
    project.methods.forEach(item => {
        let node = document.createElement('li');
        node.className = 'list-group-item';
        node.innerText = item;
        document.getElementById('methods-list').appendChild(node);
    });
} else {
    alert('Project Charter belum dibuat, silahkan buat Project Charter terlebih dahulu!');
    window.location.replace(window.location.hostname + 'edit-project-charter.html');
}

let counter = 1;
let tBody = document.getElementById('wbs-form');
if (project.wbs == null) {
    createInputRows();
} else {
    readInputRows(project.wbs);
    createInputRows();
}

function plusListener() {
    let td = Array.from(document.getElementById('wbs-' + (counter - 1)).children);
    for (let i = 1; i < 6; i++) {
        if (td[i].children[0].value === '') {
            if (td[i].children[0].classList.contains('predecessor')) {
                continue;
            }
            alert('Lengkapi data WBS!');
            return;
        }
    }
    td[7].children[0].innerHTML = '&times;';
    td[7].children[0].style.color = '#FB3640';
    td[7].children[0].removeEventListener('click', plusListener);
    td[7].children[0].addEventListener('click', removeListener);
    createInputRows();
}

function removeListener() {
    let predecessor = document.querySelector('#wbs-form').querySelectorAll('.predecessor');
    predecessor.forEach((el) => {
        if (el.value === this.id) {
            el.value = '';
        }
    });
    for (let i = parseInt(this.id); i < parseInt((counter - 1)); i++) {
        let x = Array.from(document.getElementById('wbs-' + i).children);
        let y = Array.from(document.getElementById('wbs-' + (i + 1)).children);
        for (let index = 1; index < 6; index++) {
            x[index].children[0].value = y[index].children[0].value;
        }
        if ((i + 1) === (counter - 1)) {
            x[7].children[0].innerHTML = '&plus;';
            x[7].children[0].style.color = '#247BA0';
            x[7].children[0].removeEventListener('click', removeListener);
            x[7].children[0].addEventListener('click', plusListener);
            let z = document.getElementById('wbs-' + (i + 1));
            z.parentElement.removeChild(z);
        }
    }
    counter--;
}

function dateListener() {
    let td = Array.from(document.getElementById('wbs-' + this.parentElement.id).children);
    let approvedDate = new Date(project.approvalDate);
    let startDate = new Date(td[3].children[0].value);

    if (startDate >= approvedDate) {
        let finishDate = new Date(td[4].children[0].value);
        let x = ((finishDate - startDate) / (1000 * 3600 * 24));

        if (x > 0) {
            td[2].children[0].value = x;

        } else {
            finishDate.setDate(startDate.getDate() + 1);
            td[4].children[0].value = finishDate.toISOString().split('T')[0];
            td[2].children[0].value = ((finishDate - startDate) / (1000 * 3600 * 24));

        }
    } else {
        td[3].children[0].value = approvedDate.toISOString().split('T')[0];
    }
}

function durationListener() {
    if (parseInt(this.value) < 0) {
        this.value = 0;
    }
    let td = Array.from(document.getElementById('wbs-' + this.parentElement.id).children);
    let days = parseInt(this.value);
    let inputDate = new Date(td[3].children[0].value);
    inputDate.setDate(inputDate.getDate() + days);
    td[4].children[0].value = inputDate.toISOString().split('T')[0];
}

function predecessorListener() {
    if (this.parentElement.id <= parseInt(this.value)) {
        this.value = '';
        return;
    } else if (this.value == 0) {
        return;
    }
    
    let td = Array.from(document.getElementById('wbs-' + this.parentElement.id).children);
    let predecessor = Array.from(document.getElementById('wbs-' + parseInt(this.value)).children);
    let inputDate = new Date(predecessor[4].children[0].value);
    let days = parseInt(td[2].children[0].value);

    td[3].children[0].value = predecessor[4].children[0].value;
    inputDate.setDate(inputDate.getDate() + days);
    td[4].children[0].value = inputDate.toISOString().split('T')[0];
}

function createInputRows() {
    let tr = document.createElement('tr');
    tr['id'] = 'wbs-' + counter;
    let td = [];
    for (let i = 0; i < 7; i++) {
        td[i] = document.createElement('td');
        td[i].id = counter;
    }
    td[0].innerHTML = counter;

    td[1].innerHTML = "<input type='text' class='form-control data'>"
    td[2].innerHTML = "<input type='number' class='form-control data'>";
    td[3].innerHTML = "<input type='date' class='form-control data' value='" + project.approvalDate + "'>";
    td[4].innerHTML = "<input type='date' class='form-control data'>";
    td[5].innerHTML = "<input type='number' class='form-control data predecessor'>";
    td[6].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";

    td[2].children[0].onchange = durationListener;

    td[3].children[0].onchange = dateListener;
    td[4].children[0].onchange = dateListener;

    td[5].children[0].onchange = predecessorListener;

    td[7] = document.createElement('td');
    td[7].innerHTML = "<a href='#wbs-form' id='" + counter + "' style='font-size: 1.5em; color: #247BA0'>&plus;</a>";
    td[7].children[0].addEventListener('click', plusListener);
    for (let i = 0; i < 8; i++) {
        tr.appendChild(td[i]);
    }
    tBody.appendChild(tr);
    counter++;
}

function readInputRows(lists) {
    lists.forEach((el, i) => {
        if (i < 1) {
            return;
        }
        let tr = document.createElement('tr');
        tr['id'] = 'wbs-' + i;
        let td = [];
        for (let index = 0; index < 7; index++) {
            td[index] = document.createElement('td');
            td[index].id = i;
        }
        let predecessor = '';
        if (el[7] !== null) {
            predecessor = el[7].replace(/^\D+/g, '');
        }

        td[0].innerHTML = i;
        td[1].innerHTML = "<input type='text' class='form-control data' value='" + el[1] + "'>";
        td[2].innerHTML = "<input type='number' class='form-control data' value='" + el[5] + "'>";
        td[3].innerHTML = "<input type='date' class='form-control data' value='" + el[3] + "'>";
        td[4].innerHTML = "<input type='date' class='form-control data' value='" + el[4] + "'>";
        td[5].innerHTML = "<input type='number' class='form-control data predecessor' value='" + predecessor + "'>";
        td[6].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";
        

        td[2].children[0].onchange = durationListener;

        td[3].children[0].onchange = dateListener;
        td[4].children[0].onchange = dateListener;

        td[5].children[0].onchange = predecessorListener;

        td[6].children[0].value = el[8];

        td[7] = document.createElement('td');
        td[7].innerHTML = "<a href='#wbs-form' id='" + i + "' style='font-size: 1.5em; color: #FB3640'>&times;</a>";
        td[7].children[0].addEventListener('click', removeListener);
        for (let i = 0; i < 8; i++) {
            tr.appendChild(td[i]);
        }
        tBody.appendChild(tr);
        counter++;
    });
}

function returnToWBS() {
    window.location.replace(window.location.hostname + 'wbs.html');
}
document.getElementById('return-button').onclick = returnToWBS;
document.getElementById('cancel-button').onclick = returnToWBS;

document.getElementById('wbs-submit').onclick = function () {
    let incomplete;
    let table = document.querySelector('#wbs-form').querySelectorAll('.data');
    for (let i = 0; i < 7; i++) {
        if (table[i].classList.contains('predecessor')) {
            continue;
        } else if (table[i].value === '') {
            incomplete = true;
            return;
        }
    }
    if (!incomplete) {
        let endDate = new Date(project.approvalDate);
        endDate.setMonth(endDate.getMonth() + parseInt(project.duration));
        project.wbs = [
            [
                'wbs-0',
                project.name,
                'phase 0',
                project.approvalDate,
                endDate.toISOString().split('T')[0],
                project.duration,
                null,
                null
            ]
        ];
        let phase = 1;
        for (let i = 0; i < (counter - 1); i++) {
            if (document.getElementById('wbs-' + i) === null)
                continue;
            let div = Array.from(document.getElementById('wbs-' + i).children);

            let item = [
                'wbs-' + div[0].innerHTML,
                div[1].children[0].value,
                null,
                div[3].children[0].value,
                div[4].children[0].value,
                div[2].children[0].value,
                0,
                'wbs-' + div[5].children[0].value,
                div[6].children[0].value
            ];
            if (div[5].children[0].value == '' || div[5].children[0].value == 0) {
                item[7] = null;
                item[2] = 'phase ' + phase;
                phase++;
            } else {
                item[2] = project.wbs[parseInt(div[5].children[0].value)][2];
            }
            project.wbs.push(item);
        }

        localStorage.setItem('project', JSON.stringify(project));

        createWBS(new jsPDF());
        if (parseInt(project.duration) > 6) {
            createCost(new jsPDF('l'), true);
        } else createCost(new jsPDF(), false);
        alert('Work Breakdown Structure telah berhasil diperbaharui!');
        window.location.replace(window.location.hostname + 'wbs.html');
    } else {
        alert('Data WBS tidak boleh kosong!');
        return;
    }
}