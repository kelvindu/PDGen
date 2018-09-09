let counter = 0;
let tBody = document.getElementById('document-log-form');
let charterLog = document.getElementById('after-charter');
let stakeholdersLog = document.getElementById('after-stakeholders');
let scheduleLog = document.getElementById('after-schedule');
let costLog = document.getElementById('after-cost');
let commLog = document.getElementById('after-comm');

if ( Object.keys(project.documentLog).length != 0 ) {

    if ( project.documentLog.charter != null ) {
        document.getElementById('charter-version').innerText = project.documentLog.charter[0].version;
        document.getElementById('charter-date').innerText = project.documentLog.charter[0].date;
        document.getElementById('charter-pic').innerText = project.documentLog.charter[0].pic;
        document.getElementById('charter-reason').innerText = project.documentLog.charter[0].reason;

        project.documentLog.charter.forEach((el, index) => {
            if ( index === 0 )
                return;

            let tr = document.createElement('tr');
            let td = [];

            tr.className = 'collapse collapse-charter table-secondary';

            for (i = 0; i < 5; i++) {
                td[i] = document.createElement('td');
            }
            td[1].innerText = el.version;
            td[2].innerText = el.date;
            td[3].innerText = el.pic;
            td[4].innerText = el.reason;
            td.forEach(x => {
                tr.appendChild(x);
            });

            charterLog.parentElement.insertBefore( tr, charterLog);
        });
    }
    if ( project.documentLog.stakeholders != null ) {
        document.getElementById('stakeholders-version').innerText = project.documentLog.stakeholders[0].version;
        document.getElementById('stakeholders-date').innerText = project.documentLog.stakeholders[0].date;
        document.getElementById('stakeholders-pic').innerText = project.documentLog.stakeholders[0].pic;
        document.getElementById('stakeholders-reason').innerText = project.documentLog.stakeholders[0].reason;

        project.documentLog.stakeholders.forEach((el, index) => {
            if ( index === 0 )
                return;

            let tr = document.createElement('tr');
            let td = [];

            tr.className = 'collapse collapse-stakeholders table-secondary';

            for (i = 0; i < 5; i++) {
                td[i] = document.createElement('td');
            }
            td[1].innerText = el.version;
            td[2].innerText = el.date;
            td[3].innerText = el.pic;
            td[4].innerText = el.reason;
            td.forEach(x => {
                tr.appendChild(x);
            });

            stakeholdersLog.parentElement.insertBefore( tr, stakeholdersLog );
        });
    }
    if ( project.documentLog.schedule != null ) {
        document.getElementById('schedule-version').innerText = project.documentLog.schedule[0].version;
        document.getElementById('schedule-date').innerText = project.documentLog.schedule[0].date;
        document.getElementById('schedule-pic').innerText = project.documentLog.schedule[0].pic;
        document.getElementById('schedule-reason').innerText = project.documentLog.schedule[0].reason;

        project.documentLog.schedule.forEach((el, index) => {
            if ( index === 0 )
                return;

            let tr = document.createElement('tr');
            let td = [];

            tr.className = 'collapse collapse-schedule table-secondary';

            for (i = 0; i < 5; i++) {
                td[i] = document.createElement('td');
            }
            td[1].innerText = el.version;
            td[2].innerText = el.date;
            td[3].innerText = el.pic;
            td[4].innerText = el.reason;
            td.forEach(x => {
                tr.appendChild(x);
            });

            scheduleLog.parentElement.insertBefore( tr, scheduleLog );
        });
    }
    if ( project.documentLog.cost != null ) {
        document.getElementById('cost-version').innerText = project.documentLog.cost[0].version;
        document.getElementById('cost-date').innerText = project.documentLog.cost[0].date;
        document.getElementById('cost-pic').innerText = project.documentLog.cost[0].pic;
        document.getElementById('cost-reason').innerText = project.documentLog.cost[0].reason;

        project.documentLog.cost.forEach((el, index) => {
            if ( index === 0 )
                return;

            let tr = document.createElement('tr');
            let td = [];

            tr.className = 'collapse collapse-cost table-secondary';

            for (i = 0; i < 5; i++) {
                td[i] = document.createElement('td');
            }
            td[1].innerText = el.version;
            td[2].innerText = el.date;
            td[3].innerText = el.pic;
            td[4].innerText = el.reason;
            td.forEach(x => {
                tr.appendChild(x);
            });

            costLog.parentElement.insertBefore( tr, costLog );
        });
    }
    if ( project.documentLog.comm != null ) {
        document.getElementById('comm-version').innerText = project.documentLog.comm[0].version;
        document.getElementById('comm-date').innerText = project.documentLog.comm[0].date;
        document.getElementById('comm-pic').innerText = project.documentLog.comm[0].pic;
        document.getElementById('comm-reason').innerText = project.documentLog.comm[0].reason;

        project.documentLog.comm.forEach((el, index) => {
            if ( index === 0 )
                return;

            let tr = document.createElement('tr');
            let td = [];

            tr.className = 'collapse collapse-comm table-secondary';

            for (i = 0; i < 5; i++) {
                td[i] = document.createElement('td');
            }
            td[1].innerText = el.version;
            td[2].innerText = el.date;
            td[3].innerText = el.pic;
            td[4].innerText = el.reason;
            td.forEach(x => {
                tr.appendChild(x);
            });

            commLog.parentElement.insertBefore( tr, commLog );
        });
    }
} else {

    alert('Project Charter belum dibuat! silahkan buat Project Charter terlebih dulu!');
    window.location.replace(window.location.hostname + 'edit-project-charter.html');

}


document.getElementById('return-button').onclick = returnToDocumentLog;
document.getElementById('cancel-button').onclick = returnToDocumentLog;
