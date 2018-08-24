google.charts.load('current', { packages: ['corechart', 'gantt'] });
google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

function drawChart() {
    if (project.wbs == null) {
        document.getElementById('wbs-gantt-chart').innerHTML = "<img class='col-sm-12' src='asset/gantt404.png'>";
        return;
    }
    var rows = [];
    project.wbs.forEach(el => {
        el[3] = new Date(el[3]);
        el[4] = new Date(el[4]);
        el[5] = daysToMilliseconds(parseInt(el[5]));
        el = el.slice(0, 8);
        rows.push(el);
    });

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    data.addRows(rows);

    var options = {
        height: 42 * (rows.length + 1),
        defaultStartDate: new Date(project.approvalDate),
        gantt: {
            criticalPathEnabled: true,
            criticalPathStyle: {
                stroke: '#10cc10',
                strokeWidth: 2
            }
        }
    };

    var chart = new google.visualization.Gantt(document.getElementById('wbs-gantt-chart'));

    google.visualization.events.addListener(chart, 'ready', function () {
        var canvas = document.createElement('canvas');

        canvg(canvas, chart.container.children[0].children[0].innerHTML);

        document.getElementById('save-document').href = canvas.toDataURL('image/png');
        localStorage.setItem('ganttChart', canvas.toDataURL('image/png'));
    });
    chart.draw(data, options);
}

document.getElementById('return-button').onclick = returnToDashboard;