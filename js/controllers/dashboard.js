// console.log(project);
document.getElementById('project-name').innerHTML = project.name +
    ' [' + project.code + '] / ' + ((project.approvalDate != null) ? project.approvalDate : 'Belum dimulai');

// createSaveLink(document.getElementById('save-project'));
document.getElementById('save-project').onclick = saveProject;
document.getElementById('quit-project').onclick = showQuitProject;
document.getElementById('close-project').onclick = closeProject;

if (project.documentLog == null) {
    project.documentLog = {}
    localStorage.setItem('project', JSON.stringify(project));
}

/**
 * When Project has previous data in store generate the document now.
 */

if (project.charter) {
    createProjectCharter(new jsPDF());
}
if (project.stakeholders != null) {
    createStakeholders(new jsPDF());
}
if (project.documentLog != null) {
    createDocumentLog(new jsPDF());
}
if (project.wbs != null) {
    createWBS(new jsPDF());
    if (parseInt(project.duration) > 6) {
        createCost(new jsPDF('l'), true);
    } else createCost(new jsPDF(), false);
}
if (project.communication != null) {
    createCommunication(new jsPDF('l'));
}

/**
 * When Project first initialized create all the placeholder documents!
 */

if (localStorage.getItem('charter404') == null) {
    createCharter404(new jsPDF());
}
if (localStorage.getItem('stakeholders404') == null){
    createStakeholders404(new jsPDF());
}
if (localStorage.getItem('document404') == null) {
    createDocument404(new jsPDF());
}
if (localStorage.getItem('wbs404') == null) {
    createWBS404(new jsPDF());
}
if (localStorage.getItem('communication404') == null) {
    createCommunication404(new jsPDF());
}
