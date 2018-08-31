console.log(project);
/**
 * Mask the budget inputs
 */
var budgetMask = new IMask(
    document.getElementById('budget'),
    {
        mask: Number,
        thousandsSeparator: ','
    }
);

//delcaring all of the inputs.
var pName = document.getElementById('name'),
    code = document.getElementById('code'),
    startDate = document.getElementById('approval-date'),
    duration = document.getElementById('duration'),
    mName = document.getElementById('manager-name'),
    mPosition = document.getElementById('manager-position'),
    mEmail = document.getElementById('manager-email'),
    statement = document.getElementById('scope-statement'),
    budget = document.getElementById('budget');

if (!project.charter) {
    document.getElementById('create-edit-breadcrumb').innerText = "Create Project Charter";
    document.getElementById('page-title').innerText = "pml | Create Project Charter";
    document.getElementById('create-edit-header').innerHTML = "Create Project Charter"
    pName.value = project.name;
    code.value = project.code;
    project.manager = [
        null,// name
        document.getElementById('manager-role').value, //role
        null, //position
        null //email
    ];
    // project.manager = {
    //     'id':2,
    //     'name': null,
    //     'position': null,
    //     'role': document.getElementById('manager-role').value,
    //     'email': null
    // }
    project.status = false;
} else {
    document.getElementById('create-edit-header').innerHTML = "Edit Project Charter"
    document.getElementById('create-edit-breadcrumb').innerText = "Edit Project Charter";
    document.getElementById('page-title').innerText = "pml | Edit Project Charter";

    document.getElementById('name').value = project.name;
    document.getElementById('code').value = project.code;
    document.getElementById('approval-date').value = project.approvalDate;
    document.getElementById('duration').value = project.duration;
    document.getElementById('manager-name').value = project.manager[0];
    document.getElementById('manager-position').value = project.manager[2];
    document.getElementById('manager-email').value = project.manager[3];
    document.getElementById('scope-statement').value = project.statement;
    mName.setAttribute('readonly', true);
    mPosition.setAttribute('readonly', true);
    mEmail.setAttribute('readonly', true);
    if (project.budget != null)
        document.getElementById('budget').value = project.budget;
}

/*
* For inputs that requires form repeater
* */

var milestonesElement = document.getElementById('milestones'),
    mCounter = 0;

var objectivesElement = document.getElementById('objectives'),
    oCounter = 0;

var deliverablesElement = document.getElementById('deliverables'),
    dCounter = 0;

var methodsElement = document.getElementById('methods'),
    aCounter = 0;

function preventEnter(e, label) {
    if (e.keyCode === 13) {
        e.preventDefault();
        if (document.getElementById('add-' + label).value === '') {
            alert('Masukkan ' + label + '!');
        } else document.getElementById('add-' + label + '-btn').click();
    }
}

function readInputs(array, parentElement, label, c) {
    if (array != null) {
        array.forEach((el, i) => {
            let formGroup = document.createElement('div');
            formGroup.id = label + '-' + i;
            formGroup.className = 'form-group form-inline';

            let colDiv = document.createElement('div');
            colDiv.className = 'col-8'

            var input = document.createElement('input');
            input.style.cssText = "width: 100%";
            input.readOnly = true;
            input.className = 'form-control col-7 ' + label;
            input.value = el;

            var button = document.createElement('button');
            button.value = i;
            button.innerHTML = '&times;';
            button.className = 'btn btn-primary col-1 x-button';

            button.addEventListener('click', (e) => {
                e.preventDefault(e);
                var div = document.getElementById(label + '-' + button['value']);
                parentElement.removeChild(div);
                console.log(array);
            });

            colDiv.appendChild(input);
            colDiv.appendChild(button);

            formGroup.appendChild(colDiv);

            parentElement.appendChild(formGroup);
            switch (c) {
                case 0:
                    mCounter++;
                    break;
                case 1:
                    oCounter++;
                    break;
                case 2:
                    dCounter++;
                    break;
                case 3:
                    aCounter++;
                    break;
            }
        });
    }
}

function addInputs(item, parentElement, label, c) {
    var counter;
    switch (c) {
        case 0:
            counter = mCounter;
            mCounter++;
            break;
        case 1:
            counter = oCounter;
            oCounter++;
            break;
        case 2:
            counter = dCounter;
            dCounter++;
            break;
        case 3:
            counter = aCounter;
            aCounter++;
            break;
    }

    let formGroup = document.createElement('div');
    formGroup.id = label + '-' + counter;
    formGroup.className = 'form-group form-inline';

    let colDiv = document.createElement('div');
    colDiv.className = 'col-8'

    var input = document.createElement('input');
    input.style.cssText = "width: 100%";
    input.readOnly = true;
    input.className = 'form-control col-7 ' + label;
    input.value = item;

    var button = document.createElement('button');
    button.value = counter;
    button.innerHTML = '&times;';
    button.className = 'btn btn-primary col-1 x-button';

    button.addEventListener('click', (e) => {
        if (e.detail === 0) return null;
        e.preventDefault();
        var div = document.getElementById(label + '-' + button['value']);
        parentElement.removeChild(div);
    });
    colDiv.appendChild(input);
    colDiv.appendChild(button);

    formGroup.appendChild(colDiv);

    parentElement.appendChild(formGroup);
}

readInputs(project.milestones, milestonesElement, 'milestone', 0);
document.getElementById('add-milestone').addEventListener('keyup', (e) => {
    preventEnter(e, 'milestone');
});
document.getElementById('add-milestone-btn').addEventListener('click', () => {
    var input = document.getElementById('add-milestone');
    if (input.value != '') {
        addInputs(input.value, milestonesElement, 'milestone', 0);
        input.value = '';
    } else alert('Masukkan milestone!');
});

readInputs(project.objectives, objectivesElement, 'objective', 1);
document.getElementById('add-objective').addEventListener('keyup', (e) => {
    preventEnter(e, 'objective');
});
document.getElementById('add-objective-btn').addEventListener('click', () => {
    var input = document.getElementById('add-objective');
    if (input.value != '') {
        addInputs(input.value, objectivesElement, 'objective', 1);
        input.value = '';
    } else alert('Masukkan objective!');
});

readInputs(project.deliverables, deliverablesElement, 'deliverable', 2);
document.getElementById('add-deliverable').addEventListener('keyup', (e) => {
    preventEnter(e, 'deliverable')
});
document.getElementById('add-deliverable-btn').addEventListener('click', () => {
    var input = document.getElementById('add-deliverable');
    if (input.value != '') {
        addInputs(input.value, deliverablesElement, 'deliverable', 2);
        input.value = '';
    } else alert('Masukkan deliverable!');
});

readInputs(project.methods, methodsElement, 'method', 3);
document.getElementById('add-method').addEventListener('keyup', (e) => {
    preventEnter(e, 'method')
});
document.getElementById('add-method-btn').addEventListener('click', () => {
    var input = document.getElementById('add-method');
    if (input.value != '') {
        addInputs(input.value, methodsElement, 'method', 3);
        input.value = '';
    } else alert('Masukkan method!');
});

function getInputs(parentElement, label) {
    let arr = [];
    let items = parentElement.querySelectorAll(label);
    items.forEach(element => {
        arr.push(element.value);
    });
    return arr;
}

/*
* Button functions().
* */

/*
* Return back to project charter page.
* */

document.getElementById('return-button').onclick = returnToCharter;
document.getElementById('cancel-button').onclick = returnToCharter;

/*
* Save all changes made by user and return back to project charter page.
* */

document.getElementById('charter-submit').onclick = function () {
    if (mName.value == '' || mPosition.value == '' || mEmail.value == '') {
        alert('lengkapi data project manager!');
        return;
    }
    project.name = pName.value;
    project.approvalDate = startDate.value;
    project.duration = duration.value;
    project.statement = statement.value;

    project.manager[0] = mName.value;
    project.manager[2] = mPosition.value;
    project.manager[3] = mEmail.value;

    project.milestones = getInputs(milestonesElement, '.milestone');
    project.objectives = getInputs(objectivesElement, '.objective');
    project.deliverables = getInputs(deliverablesElement, '.deliverable');
    project.methods = getInputs(methodsElement, '.method');

    if (!(budget.value === '' || budget.value === 0)) {
        project.budget = budgetMask.unmaskedValue;
    }

    if (!project.charter) {
        alert('Project Charter telah berhasil dibuat!');
        project.manager[0] = mName.value;
        project.manager[2] = mPosition.value;
        project.manager[3] = mEmail.value;
        project.charter = true;
    } else {
        alert('Project Charter telah berhasil di update!');
    }
    if (project.documentLog.charter == null) {
        var reason = "Inisiasi dokumen.";
        updateLog(1, reason, 0);

    } else {
        let version = parseInt(project.documentLog
            .charter[project.documentLog.charter.length - 1].version);
    }

    localStorage.setItem('project', JSON.stringify(project));
    createProjectCharter(new jsPDF());
    window.location.replace(window.location.hostname + 'project-charter.html');
}
