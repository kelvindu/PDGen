/**
 * Check if Project WBS exist.
*/
if (project.wbs == null) {
    window.location.replace(window.location.hostname + 'edit-wbs.html');
    alert('WBS proyek belum dibuat silahkan buat WBS terlebih dahulu!');
}

let tForm = document.getElementById('cost-form');

let approvalDate = new Date(project.approvalDate);
let totalRow = project.wbs.length;
let costMask = [];

/**
 * Looping for each wbs rows.
 */
project.wbs.forEach((el, i) => {
    let div = document.createElement('div');
    var startDate = new Date(el.startDate),
        finishDate = new Date(el.finishDate);
    let monthCounter = (startDate.getMonth() - approvalDate.getMonth() +
        (12 * (startDate.getFullYear() - approvalDate.getFullYear()))) + 1;
    costMask[i] = [];
    div.className = 'form-inline';
    div.innerHTML = "<div class='form-group col-3'>" +
        "<span>" + el.taskName + "</span>"
        "</div>";
    if (el.cost == null) {
        var x = finishDate.getMonth() - startDate.getMonth() +
            (12 * (finishDate.getFullYear() - startDate.getFullYear()));
        for (var y = 0; y <= x; y++) {
            let inputDiv = document.createElement('div');
            inputDiv.className = 'form-group';
            inputDiv.innerHTML = "<label> Month-" + monthCounter + "</label>" +
                "<input type='text' class='form-control'>" +
                "<input type='hidden' value=" + monthCounter + ">" +
                "<input type='hidden' value=" + i + ">";
            costMask[i][monthCounter-1] = new IMask(
                inputDiv.children[1],
                {
                    mask: Number,
                    thousandsSeparator: ','
                }
            );
            inputDiv.children[1].onchange = inputCost;
            div.appendChild(inputDiv);
            monthCounter++;
        }
    } else {
        el.cost.forEach(cost => {
            let inputDiv = document.createElement('div');
            inputDiv.className = 'form-group';
            inputDiv.innerHTML = "<label> Month-" + cost.month + "</label>" +
                "<input type='text' class='form-control'>" +
                "<input type='hidden' value=" + cost.month + ">" +
                "<input type='hidden' value=" + i + ">";
            costMask[i][parseInt(cost.month-1)] = new IMask(
                inputDiv.children[1],
                {
                    mask: Number,
                    thousandsSeparator: ','
                }
            );
            costMask[i][parseInt(cost.month-1)].unmaskedValue = cost.value;
            inputDiv.children[1].onchange = inputCost;
            div.appendChild(inputDiv);
        });
    }
    var total = document.createElement('div');
    total.className = 'form-group';
    total.innerHTML = "<label>Total: </label>" +
        "<input type='text' class='form-control' readonly>";
    costMask[i][costMask[i].length] = new IMask(
        total.children[1],
        {
            mask: Number,
            thousandsSeparator: ','
        }
    );
    if (project.wbsCost != null) {
        costMask[i][costMask[i].length - 1].unmaskedValue = project.wbsCost[i];
    }
    div.appendChild(total);
    tForm.appendChild(div);
});

/**
 * Adding the last row for total cost.
 * */
var totalDiv = document.createElement('div');
totalDiv.className = 'form-inline';
totalDiv.innerHTML = "<div class='form-group col-3'>" +
    "<h6>Total:</h6>" +
    "</div>" +
    "<div class='form-group'>" +
    "<input type='text' class='form-control' readonly>" +
    "</div>";

costMask[totalRow] = new IMask(
    totalDiv.children[1].children[0],
    {
        mask: Number,
        thousandsSeparator: ','
    }
);

if (project.monthlyCost != null) {
    costMask[totalRow].unmaskedValue = project.monthlyCost[project.monthlyCost.length - 1];
    if (project.budget != null) {
        if (parseFloat(project.budget) < parseFloat(costMask[project.wbs.length].unmaskedValue)) {
            costMask[totalRow].el.input.style.cssText = 'color: red';
        } else costMask[totalRow].el.input.style.cssText = '';
    }
}
tForm.appendChild(totalDiv);

/**
 * The listener for changes in all inputs.
 * */
function inputCost() {
    var id = this.parentElement.children[3].value;
    let totalR = 0,
        totalC = 0;
    //total in rows
    for (let i = 0; i < costMask[id].length - 1; i++) {
        if (costMask[id][i] == null || costMask[id][i].unmaskedValue == '')
            continue;
        totalR = totalR + parseInt(costMask[id][i].unmaskedValue);
    }
    costMask[id][costMask[id].length-1].unmaskedValue = totalR.toString();
    //total of every inputs
    costMask.forEach((input, i) => {
        if (i === project.wbs.length) {
            return;
        }
        if (input[input.length-1].unmaskedValue != '') {
            totalC += parseInt(input[input.length-1].unmaskedValue);
        }
    });
    costMask[totalRow].unmaskedValue = totalC.toString();
    if (project.budget != null) {
        if (parseFloat(project.budget) < parseFloat(costMask[project.wbs.length].unmaskedValue)) {
            costMask[totalRow].el.input.style.cssText = 'color: red';
        } else costMask[totalRow].el.input.style.cssText = '';
    }
}

if (project.budget != null) {
    document.getElementById('ifBudget').innerText = 'Rp ' + parseFloat(project.budget).toLocaleString('en') + ',-';
} else document.getElementById('ifBudget').innerText = 'Rp -,-'

document.getElementById('return-button').onclick = returnToCost;
document.getElementById('cancel-button').onclick = returnToCost;

document.getElementById('cost-save').onclick = function () {
    project.monthlyCost = [];
    project.wbsCost = [];

    //storing all the cost into the wbs.
    project.wbs.forEach((task, id) => {
        task.cost = [];
        costMask[id].forEach((el, i) => {
            if ( i === costMask[id].length - 1 )
                return;
            let cost = {
                month: el.el.input.parentElement.children[2].value,
                maskedValue: el.value,
                value: el.unmaskedValue
            };
            task.cost.push(cost);
        });
    });

    //calculating total cost for every months.
    for (let month = 0; month < project.duration; month++) {
        let x = 0;
        costMask.forEach((el, i) => {
            if ( month === el.length - 1 )
                return;
            if ( el[month] == null || el[month].unmaskedValue == '' )
                return;
            x += parseInt(el[month].unmaskedValue);
        });
        project.monthlyCost.push((x != 0) ? x : '');
    }
    project.monthlyCost.push(costMask[totalRow].unmaskedValue);

    //calculating total cost for every WBS.
    costMask.forEach((el, i) => {
        if (i === totalRow)
            return;
        project.wbsCost.push(el[el.length-1].unmaskedValue);
    });

    /*
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
    */

    console.log(project);

    localStorage.setItem('project', JSON.stringify(project));

    if (parseInt(project.duration) > 6) {
        createCost(new jsPDF('l'), true);
    } else createCost(new jsPDF(), false);
    alert('Biaya proyek telah tersimpan!');
    window.location.replace(window.location.hostname + 'cost.html');

}
