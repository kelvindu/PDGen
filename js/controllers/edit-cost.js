/** 
 * Check if Project WBS exist.
*/
if (project.wbs == null) {
    window.location.replace(window.location.hostname + 'edit-wbs.html');
    alert('WBS proyek belum dibuat silahkan buat WBS terlebih dahulu!');
}

let tHead = document.getElementById('cost-header');
let tBody = document.getElementById('cost-form');
document.getElementById('month-span').colSpan = project.duration;

let totalRow = project.wbs.length;
let totalColumn = parseInt(project.duration) + 1;
let costTable = [];

project.wbs.forEach((el, i) => {
    if (i === 0) {
        return;
    }
    costTable[i] = el[9];
});

for (let row = 0; row < project.wbs.length + 1; row++) {
    let tr = document.createElement('tr');
    if (row === 0) {
        let data = [];
        data[0] = document.createElement('th');
        data[0].setAttribute('scope', 'col-2');
        data[0].innerText = 'WBS Items';
        for (let month = 1; month <= parseInt(project.duration); month++) {
            data[month] = document.createElement('th');
            data[month].setAttribute('scope', 'col')
            data[month].innerText = month;
        }
        data[totalColumn] = document.createElement('th');
        data[totalColumn].innerHTML = 'Total';
        data[totalColumn].setAttribute('scope', 'col-2');
        for (let i = 0; i < parseInt(project.duration) + 2; i++) {
            tr.appendChild(data[i]);
        }
        tHead.appendChild(tr);
    } else if (row === totalRow) {
        tr.id = 'total-row';
        let data = [];
        data[0] = document.createElement('th');
        data[0].innerText = 'Total';
        for (let month = 1; month <= project.duration; month++) {
            data[month] = document.createElement('td');
            data[month].id = 'month-' + month;
            data[month].innerHTML = "<input type='number' class='form-control totalR' readonly>";
        }
        data[totalColumn] = document.createElement('td');
        data[totalColumn].innerHTML = "<input type='number' class='form-control' id='total' readonly>";
        for (let i = 0; i < parseInt(project.duration) + 2; i++) {
            tr.appendChild(data[i]);
        }
        tBody.appendChild(tr);
    } else {
        tr.id = row;
        let data = [];
        data[0] = document.createElement('td');
        data[0].innerText = project.wbs[row][1];
        for (let month = 1; month <= project.duration; month++) {
            data[month] = document.createElement('td');
            if (project.wbs[row][9] == null) {
                data[month].innerHTML = "<input type='number' class='form-control data'>" +
                    "<input type='hidden' value='" + month + "'>";
            } else {
                data[month].innerHTML = "<input type='number' value='" + costTable[row][month - 1] + "' class='form-control data'>" +
                    "<input type='hidden' value='" + month + "'>";
            }
            data[month].onchange = inputCost;
        }

        data[totalColumn] = document.createElement('td');
        data[totalColumn].id = 'total-' + row;
        data[totalColumn].innerHTML = "<input type='number' class='form-control totalC' readonly>";
        for (let i = 0; i < parseInt(project.duration) + 2; i++) {
            tr.appendChild(data[i]);
        }
        tBody.appendChild(tr);
    }
}

if (project.monthlyCost != null && project.wbsCost != null) {
    let totalC = 0, totalR = 0;
    project.monthlyCost.forEach((el, i) => {
        document.getElementById('total-' + (i + 1)).children[0].value = el;
        if (el !== '') {
            totalC += parseFloat(el);
        }
    });
    project.wbsCost.forEach((el, i) => {
        document.getElementById('month-' + (i + 1)).children[0].value = el;
        if (el !== '') {
            totalR += parseFloat(el);
        }
    });

    console.log(totalC);

    document.getElementById('total').value = totalC || totalR;
    if (project.budget != null) {
        if (parseFloat(project.budget) < parseFloat(document.getElementById('total').value)) {
            document.getElementById('total').style.cssText = 'color: red';
        } else document.getElementById('total').style.cssText = '';
    }
}

function inputCost() {
    let row = this.parentElement.id;
    let month = this.children[1].value;

    let dataRow = document.getElementById(row).querySelectorAll('.data');
    let dataColumn = [];
    for (let row = 1; row < project.wbs.length; row++) {
        let cell = Array.from(document.getElementById(row).children)
        dataColumn.push(cell[month]);
    }

    let wbsCost = 0, monthlyCost = 0;
    let totalC = 0, totalR = 0;

    let totalCs = document.getElementById('cost-form').querySelectorAll('.totalC');
    let totalRs = document.getElementById('cost-form').querySelectorAll('.totalR');

    dataColumn.forEach(cell => {
        if (cell.children[0].value === '') {
            return;
        } else {
            wbsCost = wbsCost + parseInt(cell.children[0].value);
        }
    });
    dataRow.forEach(cell => {
        if (cell.value === '') {
            return;
        } else {
            monthlyCost = monthlyCost + parseInt(cell.value);
        }
    });

    document.getElementById('total-' + row).children[0].value = monthlyCost;
    document.getElementById('month-' + month).children[0].value = wbsCost;

    totalCs.forEach(element => {
        if (element.value === '') {
            return;
        }
        totalC += parseFloat(element.value);
    });
    totalRs.forEach(element => {
        if (element.value === '') {
            return;
        }
        totalR += parseFloat(element.value);
    });

    document.getElementById('total').value = totalC || totalR;
    if (project.budget != null) {
        if (parseFloat(project.budget) < parseFloat(document.getElementById('total').value)) {
            document.getElementById('total').style.cssText = 'color: red';
        } else document.getElementById('total').style.cssText = '';
    }
}

if (project.budget != null) {
    document.getElementById('ifBudget').innerText = 'Rp ' + project.budget + ',-';
} else document.getElementById('ifBudget').innerText = 'Rp -,-'

document.getElementById('return-button').onclick = returnToCost;
document.getElementById('cancel-button').onclick = returnToCost;

document.getElementById('cost-save').onclick = function () {
    project.monthlyCost = [];
    project.wbsCost = [];

    for (let row = 1; row < project.wbs.length; row++) {
        let tr = document.getElementById(row);
        project.wbs[row][9] = [];
        for (let month = 1; month <= project.duration; month++) {
            project.wbs[row][9].push(tr.children[month].children[0].value);
        }
    }
    let totalCs = document.getElementById('cost-form').querySelectorAll('.totalC');
    let totalRs = document.getElementById('cost-form').querySelectorAll('.totalR');

    console.log(totalRs);

    totalCs.forEach((el, i) => {
        project.monthlyCost.push(el.value);
    });
    totalRs.forEach((el, i) => {
        project.wbsCost.push(el.value);
    });

    console.log(project);

    localStorage.setItem('project', JSON.stringify(project));

    if (parseInt(project.duration) > 6) {
        createCost(new jsPDF('l'), true);
    } else createCost(new jsPDF(), false);
    alert('Biaya proyek telah tersimpan!');
    window.location.replace(window.location.hostname + 'cost.html');

}