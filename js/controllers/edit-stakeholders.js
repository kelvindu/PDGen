/**
 * Declaring the Global Variables.
 */

let counter = 0;
let tBody = document.getElementById('stakeholders-form');

/**
 * If there's no project Charter exist.
 */
if (!project.charter) {
    alert('Project Charter belum dibuat! silahkan buat Project Charter terlebih dulu!');
    window.location.replace(window.location.hostname + 'edit-project-charter.html');
} else if (project.status) {
    /**
     * If the project has already been closed.
     */
    readStakeholders(project.stakeholders);
    let table = document.querySelector('#stakeholders-form').querySelectorAll('.data');
    table.forEach((el) => {
        el.setAttribute('disabled', 'disabled');
    });
} else if (project.stakeholders == null) {
    /**
     * If stakeholders hasn't been initialized.
     */
    lists = [
        [null, 'Owner', null, null],
        project.manager
    ];
    readStakeholders(lists);
    createInputRows();
} else {
    /**
     * Edit Existing Stakeholders datas.
     */
    readStakeholders(project.stakeholders);
    createInputRows();
}

/**
 * Adding new input rows.
 */

function createInputRows() {
    let tr = document.createElement('tr');
    tr['id'] = 'pic-' + counter;
    let td = [];
    for (let i = 0; i < 4; i++) {
        td[i] = document.createElement('td');
        td[i].innerHTML = "<input type='text' class='form-control data'>";
        tr.appendChild(td[i]);
    }
    td[4] = document.createElement('td');
    td[4].innerHTML = "<a href='#stakeholders-form' id=" + counter + " style='font-size: 1.5em; color: #247BA0'>&plus;</a>";
    td[4].children[0].addEventListener('click', plusListener);
    tr.appendChild(td[4]);
    tBody.appendChild(tr);
    counter++;
}
/**
 * The callback for plus new input listener.
 */
function plusListener() {
    event.preventDefault();
    let divs = Array.from(document.getElementById('pic-' + (counter - 1)).children);
    for (let i = 0; i < 4; i++) {        
        if (divs[i].children[0].value == '') {
            console.log(divs[i].children[0].value);
            alert('Lengkapi data stakeholders!');
            return;
        }
    }
    divs[4].children[0].innerHTML = '&times;';
    divs[4].children[0].style.color = '#FB3640';
    divs[4].children[0].removeEventListener('click', plusListener);
    const targetId = divs[4].children[0].id;
    divs[4].children[0].addEventListener('click', (e) => {
        e.preventDefault();
        let tr = document.getElementById('pic-' + targetId);
        tr.parentElement.removeChild(tr);
    });
    createInputRows();
}

/**
 * Reading existing Stakeholders.
 */

function readStakeholders(lists) {
    lists.forEach((stakeholder, index) => {
        let tr = tBody.insertRow(index);
        tr['id'] = 'pic-' + index;
        let td = [];
        for (let i = 0; i < 4; i++) {
            td[i] = tr.insertCell(i);
            td[i].innerHTML = "<input type='text' class='form-control data'>";
        }
        td[0].children[0].setAttribute('value', (stakeholder[0] != null) ? stakeholder[0] : '');
        td[1].children[0].setAttribute('value', stakeholder[1]);
        if (index < 2)
            td[1].children[0].setAttribute('readonly', true);
        td[2].children[0].setAttribute('value', (stakeholder[2] != null) ? stakeholder[2] : '');
        td[3].children[0].setAttribute('value', (stakeholder[3] != null) ? stakeholder[3] : '');
        if (index > 1) {
            td[4] = tr.insertCell(4);
            td[4].innerHTML = "<a href='#stakeholders-form' id=" + index + " style='font-size: 1.5em; color: #FB3640'>&times;</a>";
            td[4].children[0].addEventListener('click', (e) => {
                e.preventDefault();
                let divs = document.getElementById('pic-' + td[4].children[0].id);
                divs.parentElement.removeChild(divs);
            });
        }
        counter++
    });
}

/**
 * Go back to previous page.
 */

document.getElementById('return-button').onclick = returnToStakeholders;
document.getElementById('cancel-button').onclick = returnToStakeholders;

/**
 * Save all changes made and return to Project Charter Page.
 */

document.getElementById('stakeholder-submit').onclick = function () {
    let tbl = document.querySelector('#stakeholders-form').querySelectorAll('.data');
    let incomplete;
    for (let i = 0; i < tbl.length - 4; i++) {
        if (tbl[i].value === '') {
            incomplete = true;
        }
    }
    if (!incomplete) {
        project.stakeholders = [];
        for (let i = 0; i < counter - 1; i++) {
            if (document.getElementById('pic-' + i) === null)
                continue;
            let div = Array.from(document.getElementById('pic-' + i).children);
            item = [
                div[0].children[0].value,
                div[1].children[0].value,
                div[2].children[0].value,
                div[3].children[0].value
            ];
            project.stakeholders.push(item);
            if (i === 1) {
                project.manager = item;
            }
        }
        localStorage.setItem('project', JSON.stringify(project));
        createStakeholders(new jsPDF());
        alert('Stakeholders telah berhasil diperbaharui!');
        returnToStakeholders();
    } else {
        alert('Data stakeholders tidak boleh kosong!');
        return;
    }
}