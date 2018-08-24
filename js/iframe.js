/**
 * Declaring iframe document and it's behaviour to block interaction when modal is showing.
 */

let iframe = document.getElementById('document-frame');
iframe.setAttribute('src', localStorage.getItem(documentString));

$('#quit-project-modal').on('shown.bs.modal', function () {
    iframe.setAttribute('src', '');
});
$('#quit-project-modal').on('hidden.bs.modal', function () {
    iframe.setAttribute('src', doc.output('datauri'));
})

$('#close-project-modal').on('shown.bs.modal', function () {
    iframe.setAttribute('src', '');
});
$('#close-project-modal').on('hidden.bs.modal', function () {
    iframe.setAttribute('src', localStorage.getItem(documentString));
});

//doc.output('bloburl')
//doc.output('datauri')