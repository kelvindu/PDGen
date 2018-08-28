const color = ['gmilestone', 'black', 'blue','red', 'yellow', 'green', 'purple', 'pink'];
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

let counter = 0;
let wbsMask = [];
let tBody = document.getElementById('wbs-form');
if (project.wbs == null) {
    createInputRows();
} else {
    readInputRows(project.wbs);
    createInputRows();
}

function plusListener() {
    let td = Array.from(document.getElementById('wbs-' + (counter - 1)).children);
    for (let i = 0; i < 7; i++) {
        if (td[i].children[0].value === '') {
            if (td[i].children[0].classList.contains('predecessor')) {
                continue;
            } else if (td[i].children[0].classList.contains('dates')) {
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
    for (let i = parseInt(this.id); i < parseInt((counter - 1)); i++) {
        let x = Array.from(document.getElementById('wbs-' + i).children);
        let y = Array.from(document.getElementById('wbs-' + (i + 1)).children);
        for (let index = 0; index < 7; index++) {
            x[index].children[0].value = y[index].children[0].value;
        }
        if ((i + 1) === (counter - 1)) {
            x[7].children[0].innerHTML = '&plus;';
            x[7].children[0].style.color = '#247BA0';
            x[7].children[0].removeEventListener('click', removeListener);
            x[7].children[0].addEventListener('click', plusListener);
            let z = document.getElementById('wbs-' + (i + 1));
            z.parentElement.removeChild(z);
            wbsMask[i + 1][0].destroy();
            wbsMask[i + 1][1].destroy();
        }
    }
    counter--;
}

function wbsListener() {     
    let inputId = wbsMask[this.parentElement.id][0].unmaskedValue; 
    let parentId;
    let wbsId = inputId.toString().split('').pop();
    if (parseInt(wbsId) === inputId) {
        return;
    } else {
        var parentInput = parseInt(inputId/10).toString();
        wbsMask.forEach(unmaskVal => {
            if (unmaskVal[0].unmaskedValue === parentInput) {
                wbsMask[this.parentElement.id][1].unmaskedValue = parentInput;
                parentId = unmaskVal[0].el.input.parentElement.id;
            }
        });
    }
    if (parentId == null) {
        wbsMask[this.parentElement.id][0].unmaskedValue = wbsId;
        return;
    }
    changeDate(this.parentElement.id, parentId)
}

function dateListener() {
    let td = Array.from(document.getElementById('wbs-' + this.parentElement.id).children);
    let approvedDate = new Date(project.approvalDate);
    if (td[3].children[0].value == '') {
        td[2].children[0].value = '';
        td[4].children[0].value = '';
        return;
    }
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
        findWbsParent(this.parentElement.id);
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
    findWbsParent(this.parentElement.id);
}

function predecessorListener() {
    let wbsId = wbsMask[this.parentElement.id][0].unmaskedValue;
    let pre = wbsMask[this.parentElement.id][1].unmaskedValue.toString();    
    let parentId;

    wbsMask.forEach((unmaskVal)=> {
        if (unmaskVal[0].unmaskedValue === wbsMask[this.parentElement.id][1].unmaskedValue) {
            wbsMask[this.parentElement.id][0].unmaskedValue = pre + wbsId.toString().split('').pop();
            parentId = unmaskVal[0].el.input.parentElement.id;
        } 
    });
    if (parentId == null) {
        wbsMask[this.parentElement.id][1].unmaskedValue = '';
        return;
    }
    changeDate(this.parentElement.id, parentId);
}

function changeDate(id, parentId) {
    let td = Array.from(document.getElementById('wbs-' + id).children);
    let predecessor = Array.from(document.getElementById('wbs-' + parentId ).children);
    let inputDate = new Date(predecessor[3].children[0].value);
    let predecessorDate = new Date(predecessor[4].children[0].value);
    let days = parseInt(td[2].children[0].value);
    
    td[3].children[0].value = predecessor[3].children[0].value;
    if (!isNaN(days)) {
        inputDate.setDate(inputDate.getDate() + days);
        td[4].children[0].value = inputDate.toISOString().split('T')[0];
        if (inputDate > predecessorDate) {
            predecessor[4].children[0].value = inputDate.toISOString().split('T')[0];
            predecessor[2].children[0].value = days;
        }
    }
}

function findWbsParent(childId) {
    let parentId;
    wbsMask.forEach(unmaskVal => {
        if (unmaskVal[0].unmaskedValue === wbsMask[childId][1].unmaskedValue) {
            parentId = unmaskVal[0].el.input.parentElement.id;
        }
    });
    if (parentId == null) {
        return;
    }
    let child = Array.from(document.getElementById('wbs-' + childId).children);
    let parent = Array.from(document.getElementById('wbs-' + parentId).children);

    let childDate = new Date(child[4].children[0].value);
    let parentDate = new Date(parent[4].children[0].value);

    if (childDate > parentDate) {
        parent[4].children[0].value = child[4].children[0].value;
        var parentStart = new Date(parent[3].children[0].value);
        parent[2].children[0].value = ((childDate - parentStart) / (1000 * 3600 * 24));
    }
}

function createInputRows() {
    let tr = document.createElement('tr');
    tr['id'] = 'wbs-' + counter;
    wbsMask[counter] = [];
    let td = [];
    for (let i = 0; i < 7; i++) {
        td[i] = document.createElement('td');
        td[i].id = counter;
    }
    td[0].innerHTML = "<input type='text' class='form-control data'>";
    wbsMask[counter][0] = new IMask(td[0].children[0], {
        mask: '0.0.0.0.0'
    });
    td[0].children[0].onchange = wbsListener;

    td[1].innerHTML = "<input type='text' class='form-control data'>"
    td[2].innerHTML = "<input type='number' class='form-control dates data'>";
    td[3].innerHTML = "<input type='date' class='form-control dates data' value='" + project.approvalDate + "'>";
    td[4].innerHTML = "<input type='date' class='form-control dates data'>";
    td[5].innerHTML = "<input type='text' class='form-control data predecessor'>";
    wbsMask[counter][1] = new IMask(td[5].children[0], {
        mask: '0.0.0.0.0'
    });
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
        let tr = document.createElement('tr');
        tr['id'] = 'wbs-' + i;
        wbsMask[i] = [];
        let td = [];
        for (let index = 0; index < 7; index++) {
            td[index] = document.createElement('td');
            td[index].id = i;
        }
        var duration = ((new Date(el.finishDate) - new Date(el.startDate)) / (1000 * 3600 * 24));

        td[0].innerHTML = "<input type='text' class='form-control data'>";
        wbsMask[i][0] = new IMask(td[0].children[0], {
            mask: '0.0.0.0.0'
        });
        wbsMask[i][0].unmaskedValue = el.id;
        td[1].innerHTML = "<input type='text' class='form-control data' value='" + el.taskName + "'>";
        td[2].innerHTML = "<input type='number' class='form-control dates data' value='" + duration + "'>";
        td[3].innerHTML = "<input type='date' class='form-control dates data' value='" + el.startDate + "'>";
        td[4].innerHTML = "<input type='date' class='form-control dates data' value='" + el.finishDate + "'>";
        td[5].innerHTML = "<input type='number' class='form-control data predecessor'>";
        wbsMask[i][1] = new IMask(td[5].children[0], {
            mask: '0.0.0.0.0'
        });
        wbsMask[i][1].unmaskedValue = el.parentId;
        td[6].innerHTML = "<textarea class='form-control data' cols='30' rows='3'></textarea>";
        td[6].children[0].value = el.taskNotes;
        
        td[0].children[0].onchange = wbsListener;
        td[2].children[0].onchange = durationListener;

        td[3].children[0].onchange = dateListener;
        td[4].children[0].onchange = dateListener;

        td[5].children[0].onchange = predecessorListener;


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
    for (let i = 0; i < table.length - 7; i++) {
        if (table[i].classList.contains('predecessor')) {
            continue;
        } else if (table[i].classList.contains('dates')){
            continue;
        } else if (table[i].value === '') {
            incomplete = true;
        }
    }
    if (!incomplete) {
        project.wbs = [];
        for (let i = 0; i< counter-1; i++) {
            if (document.getElementById('wbs-' + i) == null) {
                continue;
            }
            let div = Array.from(document.getElementById('wbs-' + i).children);
            var theme, colorString = null, isMilestone = 0;
            project.milestones.forEach(milestone => {
                if (div[1].children[0].value === milestone) {
                    colorString = color[0];
                    isMilestone = 1;
                }
            });
            theme = wbsMask[i][0].unmaskedValue.toString().split('').pop();
            theme = parseInt(theme);
            
            if (colorString == null) {
                if (parseInt(wbsMask[i][0].unmaskedValue/10) != 0) {
                    colorString = 'gtask' + color[theme];
                } else {
                    colorString = 'ggroup' + color[theme];
                }
            }
            let item = {
                id: wbsMask[i][0].unmaskedValue,
                maskedId: wbsMask[i][0].value,
                taskName: div[1].children[0].value,
                startDate: div[3].children[0].value,
                finishDate: div[4].children[0].value,
                style: colorString,
                parentId: (wbsMask[i][1].unmaskedValue != '') ? wbsMask[i][1].unmaskedValue : 0,
                maskedParentId: (wbsMask[i][1].unmaskedValue != '') ? wbsMask[i][1].value : '-',
                taskNotes: div[6].children[0].value,
                isMilestone: isMilestone
            };
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