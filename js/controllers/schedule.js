if (project.wbs == null) {
    document.getElementById('wbs-gantt-chart').innerHTML = "<img class='col-sm-12' src='asset/gantt404.png'>";
} else {
    let g = new JSGantt.GanttChart(document.getElementById('wbs-gantt-chart'), 'week');
    
    if (g.getDivId() != null) {
        g.setCaptionType('None');
        g.setDateTaskDisplayFormat('day dd month yyyy');
        g.setDayMajorDateDisplayFormat('mon yyyy - Week ww');
        g.setWeekMinorDateDisplayFormat('dd mon');
        g.setShowTaskInfoLink(1);
        g.setShowEndWeekDate(0);
        g.setUseSingleCell(1000);
        g.setFormatArr('Day', 'Week', 'Month', 'Quarter');
        project.wbs.forEach(wbs => {
            g.AddTaskItem(new JSGantt.TaskItem(
                wbs.id,
                wbs.taskName,
                (wbs.startDate === '') ? '' : wbs.startDate,
                (wbs.finishDate === '') ? '' : wbs.finishDate,
                wbs.style,
                '',
                wbs.isMilestone,
                '', 0,
                wbs.hasChild,
                wbs.parentId,
                1, '', '',
                wbs.taskNotes, g
            ));
        });

        g.Draw();
    }

    document.getElementById('save-document').onclick = function () {
        var printContents = document.getElementById('wbs-gantt-chart').innerHTML;
        var originalContents = document.body.innerHTML;
    
        document.body.innerHTML = printContents;
    
        window.print();
    
        document.body.innerHTML = originalContents;
    }
}
document.getElementById('return-button').onclick = returnToDashboard;