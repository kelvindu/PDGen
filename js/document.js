/**
 * Generate project charter documents.
 */
function createProjectCharter(doc) {
    doc.setProperties({
        title: "Project Charter"
    });
    doc.setFontSize(14);
    if (project.charter) {
        let lineCounter = 50;
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(110, 110, 110);
        doc.rect(0, 0, 300, 28, 'F');
        doc.text('Project Name', 10, 10);
        doc.text('Project Code', 10, 16);
        doc.text('Approval Date', 10, 25);
        doc.text(': ' + project.name, 45, 10);
        doc.text(': ' + project.code, 45, 16);
        doc.text(': ' + project.approvalDate, 45, 25);
        doc.text('Duration', 80, 25);
        doc.text(': ' + project.duration + ' Bulan', 100, 25);

        doc.setTextColor(75, 75, 75);
        doc.setDrawColor(45, 45, 45);
        doc.setLineWidth(0.5);
        doc.text('Project Manager: ' + project.manager[0], 10, 35);
        doc.line(0, 38, 300, 38);

        doc.text('Key Milestones:', 10, 44);
        if (project.milestones != null) {
            project.milestones.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Objectives:', 10, lineCounter);
        lineCounter += 6;
        if (project.objectives != null) {
            project.objectives.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Deliverables:', 10, lineCounter);
        lineCounter += 6;
        if (project.deliverables != null) {
            project.deliverables.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Methods:', 10, lineCounter);
        lineCounter += 6;
        if (project.methods != null) {
            project.methods.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Scope Statement:', 10, lineCounter);
        lineCounter += 6;
        var statement = doc.splitTextToSize(project.statement, 200)
        doc.text(statement, 10, lineCounter);
        statement.forEach(sentence => {
            lineCounter += 6;
        })
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        lineCounter += 4;

        if (lineCounter >= 205) {
            doc.addPage('a4', 1);
            lineCounter = 20;
        }
        // console.log(lineCounter);
        doc.text('Pengesahan:', 10, lineCounter);
        lineCounter += 10;
        doc.text('Demikian Project Charter ini telah disetujui dan diserahkan kepada pihak-pihak yang\nbersangkutan untuk menjadi acuan dasar dalam proses pengerjaan proyek ini.', 10, lineCounter);
        lineCounter += 30;
        doc.text('Project Manager', 35, lineCounter);
        doc.text('Project Owner', 140, lineCounter);
        lineCounter += 35;
        if (project.stakeholders != null) {
            doc.text(project.stakeholders[1][0], 35, lineCounter);
            doc.text(project.stakeholders[0][0], 140, lineCounter);
        }
    }

    localStorage.setItem('charter', doc.output('datauristring'));
}

/**
 * Generate Stakeholders documents.
 */
function createStakeholders(doc) {
    var column = ['Name', 'Role', 'Position', 'Email'];
    doc.setProperties({
        title: "Stakeholders"
    });
    doc.autoTable(column, project.stakeholders, {
        theme: 'striped',
        headerStyles: { fillColor: [10, 36, 99] },
        margin: { top: 20 },
        addPageContent: function () {
            doc.text("Project Stakeholders", 15, 12);
        }
    });
    localStorage.setItem('stakeholders', doc.output('datauristring'));
}

/**
 * Generate Document Control report.
 */
function createDocumentLog(doc) {
    var column = ['Date', 'Version', 'Changed by', 'Reason for Change'];

    doc.setProperties({
        title: "Stakeholders"
    });
    doc.autoTable(column, project.documentLog, {
        theme: 'striped',
        headerStyles: { fillColor: [0, 188, 188] },
        margin: { top: 20 },
        addPageContent: function () {
            doc.text("Document Control", 15, 12);
        }
    });
    localStorage.setItem('documentLog', doc.output('datauristring'));
}

/**
 * Generate WBS Document.
 */
function createWBS(doc) {
    var column = ['ID', 'Task Name', 'Start Date',
        'Finish Date', 'Parent', 'Task Notes'];

    var data = [],
        s = project.wbs;

    s.forEach(row => {
        data.push([
            row.maskedId,
            row.taskName,
            row.startDate,
            row.finishDate,
            row.maskedParentId,
            row.taskNotes
        ]);
    });

    doc.setProperties({
        title: "Work Breakdown Structure"
    });
    doc.autoTable(column, data, {
        theme: 'striped',
        headerStyles: { fillColor: [70, 191, 94] },
        styles: { overflow: 'linebreak' },
        columnStyles: {
            0: { columnWidth: 'wrap' },
            1: { columnWidth: 40 },
            2: { columnWidth: 'wrap' },
            3: { columnWidth: 'wrap' },
            4: { columnWidth: 'wrap' },
            5: { columnWidth: 'auto' }
        },
        margin: { top: 20 },
        addPageContent: function () {
            doc.text("WBS List", 15, 12);
        }
    });
    localStorage.setItem('wbs', doc.output('datauristring'));
}

/**
 * Generate Communication Document.
 */
function createCommunication(doc) {
    var column = ['Type of Communication', 'Deliverables', 'Sender', 'Participant',
        'Purpose of Communication', 'Frequency', 'Communication Method'];

    doc.setProperties({
        title: "Project Communication"
    });
    doc.autoTable(column, project.communication, {
        theme: 'striped',
        headerStyles: { fillColor: [198, 80, 69] },
        tableWidth: 'auto',
        styles : { overflow: 'linebreak' },
        margin: { top: 20 },
        addPageContent: function () {
            doc.text("Communication", 15, 12);
        }
    });
    localStorage.setItem('communication', doc.output('datauristring'));
}

/**
 * Generate Document Cost report.
 */
function createCost(doc, landscape) {
    var wholeMonths = parseInt(project.duration),
        cursor = 1,
        totalMonths = (wholeMonths > 12) ? 12 : wholeMonths,
        budget;
    if (project.budget != null) {
        budget = 'Rp ' + parseFloat(project.budget).toLocaleString('en') + ',-';
    } else budget = 'Rp -,-';
    doc.setProperties({
        title: "Project Cost"
    });
    doc.text("Project Cost", 15, 12);   
    let lastColumn = (wholeMonths > 12) ? false : true;

    /**
     * For each year make a new cost table.
     */
    while (true) {
        var column = ['WBS'];
        for (let i = cursor; i <= totalMonths; i++) {
            column.push('Month-' + i);
        }
        if (lastColumn) 
            column.push('Total');
        var data = [];
        project.wbs.forEach((el, index) => {
            var x = [];
            x.push(el.taskName);
            if (el.cost == null) {
                for (let i = cursor; i <= totalMonths; i++) {
                    x.push('');
                }
                if (lastColumn)
                    x.push('');
            } else {
                for (let i = cursor; i <= totalMonths; i++) {
                    x.push('');
                    el.cost.forEach(cost => {
                        if (i === parseInt(cost.month)) {
                            x[i] = (cost.maskedValue);
                        }
                    });
                }
                if (lastColumn)
                    x.push(project.wbsCost[index]);
            }
            data.push(x);
        });
        var monthlyCost = ['Total'];
        if (project.monthlyCost != null) {
            for (let i = cursor; i <= totalMonths; i++) {
                monthlyCost.push((isNaN(parseFloat(project.monthlyCost[i-1]))) ? 
                    '' : parseFloat(project.monthlyCost[i-1]).toLocaleString('en'));
            }
            if (lastColumn)
                monthlyCost.push(project.monthlyCost[project.monthlyCost.length - 1]);
        } else {
            for (let i = cursor; i <= totalMonths; i++) {
                monthlyCost.push('');
            }
        }
        data.push(monthlyCost);
        console.log(data);
    
        doc.autoTable(column, data, {
            theme: 'striped',
            headerStyles: { fillColor: [111, 80, 96] },
            tableWidth: 'auto',
            styles: {
                overflow: 'linebreak',
                columnWidth: 'wrap'
             },
            columnStyles: { 0: { columnWidth: 'auto' } },
            margin: { top: 20 }
        });

        if (lastColumn) {
            break;
        } else if (wholeMonths - totalMonths > 12) {
            cursor += 12;
            totalMonths += 12;
        } else {
            cursor += 12;
            totalMonths = wholeMonths;
            lastColumn = true;
        }
        doc.addPage('a4', 'l');
    }


    let line = doc.autoTable.previous.finalY ;

    line += 20;
    doc.text('Project Budget:', 20, line);
    line += 10;
    doc.setFontSize(24);
    doc.text(budget, 20, line);

    doc.setFontSize(12);
    if (landscape) {
        doc.addPage('a4', 1);
        line = 20;
    } else {
        if (line >= 195) {
            doc.addPage('a4', 1);
            line = 20;
        }
        line += 20;
    }
    doc.text('Pengesahan:', 10, line);
    line += 10;
    var statement = doc.splitTextToSize('Demikian Anggaran biaya proyek ini telah dirancang dan disetujui oleh pihak-pihak yang bersangkutan dan akan digunakan untuk pengerjaan proyek ini sesuai dengan jumlah nominal yang tertera pada laporan di atas.', 190)
    doc.text(statement, 10, line);
    line += 30;
    doc.text('Project Manager', 35, line);
    doc.text('Project Owner', 140, line);
    line += 35;
    if (project.stakeholders != null) {
        doc.text(project.stakeholders[1][0], 35, line);
        doc.text(project.stakeholders[0][0], 140, line);
    }
    localStorage.setItem('cost', doc.output('datauristring'));
}

/**
 * Generate Document Closing report.
 */
function createClosing(doc) {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    doc.setProperties({
        title: "Proposal Closing Document"
    });

    doc.setFontSize(20);
    doc.text('Proposal Pengajuan Proyek', 58, 25);
    doc.line(55, 27, 150, 27);
    doc.setFontSize(14);
    doc.text('Proyek no: [' + project.code + ']', 87, 33)

    doc.setFontSize(12);
    doc.text('Yang bertanda tangan di bawah ini:', 20, 55);
    doc.text('1.', 30, 65);
    doc.text('Nama', 35, 65);
    doc.text(': ' + project.stakeholders[0][0], 80, 65);
    doc.text('Jabatan', 35, 71);
    doc.text(': ' + project.stakeholders[0][1], 80, 71);
    doc.text('Alamat Email', 35, 77);
    doc.text(': ' + project.stakeholders[0][3], 80, 77);
    doc.text('Selanjutnya disebut', 35, 83);
    doc.text(': Pengawas Proyek', 80, 83)

    doc.text('2.', 30, 93);
    doc.text('Nama', 35, 93);
    doc.text(': ' + project.stakeholders[1][0], 80, 93);
    doc.text('Jabatan', 35, 99);
    doc.text(': ' + project.stakeholders[1][1], 80, 99);
    doc.text('Alamat Email', 35, 105);
    doc.text(': ' + project.stakeholders[1][3], 80, 105);
    doc.text('Selanjutnya disebut', 35, 111);
    doc.text(': Pengawas Proyek', 80, 111)

    doc.text('Menerangkan sebagai berikut:', 30, 121);
    doc.text('1.', 30, 131);
    doc.text('Proposal Proyek', 35, 131);
    doc.text(':', 93, 131);
    doc.text(project.name, 97, 131);
    doc.text('2.', 30, 137);
    doc.text('Nomor Kode Proyek / Tanggal', 35, 137);
    doc.text(':', 93, 137);
    doc.text('[' + project.code + '] / tanggal ' + project.closeDate.date +
        ' bulan ' + project.closeDate.month + ' tahun ' + project.closeDate.year, 97, 137)
    doc.text('telah siap diajukan.', 30, 147);

    doc.text('Demikian Proposal ini diajukan untuk dapat dipergunakan sebagaimana mestinya.', 30, 162);

    var today = new Date();
    doc.text('Jakarta, ' + today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear(), 145, 172);

    doc.text('Pelaksana Proyek', 35, 185);
    doc.text('Pengawas Proyek', 140, 185);

    doc.setFontType("bold");
    doc.text(project.stakeholders[0][0], 35, 220);
    doc.text(project.stakeholders[1][0], 140, 220);

    doc.line(35, 221, 75, 221);
    doc.line(140, 221, 180, 221);

    doc.setFontType("normal");
    doc.text('Project Manager', 37, 226);
    doc.text('Project Owner', 142, 226);

    localStorage.setItem('closing', doc.output('datauristring'));
}

/**
 * Generate Document Proopsal.
 */
function createProposal(doc) {
    doc.setProperties({
        title: "Project Proposal",
        format: 'a4'
    });
    doc.setLineWidth(0.5);
    doc.line(0, 250, 300, 250);

    doc.setFillColor(61, 61, 112);
    doc.rect(10, 0, 5, 300, 'F');
    doc.setFillColor(150,150,150);
    doc.rect(5, 0, 5, 300, 'F');
    doc.setFillColor(11, 96, 79);
    doc.rect(15, 0, 15, 300, 'F');

    doc.text('Project[' + project.code + '] Proposal:', 30, 100);
    doc.setFontSize(48);
    var name = doc.splitTextToSize(project.name, 200);
    doc.text(name, 30, 120);
    doc.setFontSize(12);


    doc.text('Disusun oleh: ', 35, 255);
    doc.text(project.manager[0], 70, 255);
    doc.text(project.manager[3], 70, 260);

    doc.addPage('a4', 1);

    doc.setFontSize(14);
    if (project.charter) {
        let lineCounter = 50;
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(110, 110, 110);
        doc.rect(0, 0, 300, 28, 'F');
        doc.text('Project Name', 10, 10);
        doc.text('Project Code', 10, 16);
        doc.text('Approval Date', 10, 25);
        doc.text(': ' + project.name, 45, 10);
        doc.text(': ' + project.code, 45, 16);
        doc.text(': ' + project.approvalDate, 45, 25);
        doc.text('Duration', 80, 25);
        doc.text(': ' + project.duration + ' Bulan', 100, 25);

        doc.setTextColor(75, 75, 75);
        doc.setDrawColor(45, 45, 45);
        doc.setLineWidth(0.5);
        doc.text('Project Manager: ' + project.manager[0], 10, 35);
        doc.line(0, 38, 300, 38);

        doc.text('Key Milestones:', 10, 44);
        if (project.milestones != null) {
            project.milestones.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Objectives:', 10, lineCounter);
        lineCounter += 6;
        if (project.objectives != null) {
            project.objectives.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Deliverables:', 10, lineCounter);
        lineCounter += 6;
        if (project.deliverables != null) {
            project.deliverables.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Methods:', 10, lineCounter);
        lineCounter += 6;
        if (project.methods != null) {
            project.methods.forEach(element => {
                doc.text('-' + element, 15, lineCounter)
                lineCounter += 6;
            });
        }
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
        if (lineCounter >= 270) {
            doc.addPage('a4', 1);
            lineCounter = 10;
        }
        lineCounter += 4;
        doc.text('Scope Statement:', 10, lineCounter);
        lineCounter += 6;
        var statement = doc.splitTextToSize(project.statement, 200)
        doc.text(statement, 10, lineCounter);
        statement.forEach(sentence => {
            lineCounter += 6;
        })
        doc.line(0, lineCounter - 2, 300, lineCounter - 2);
    }

    doc.addPage('a4',1);
    createStakeholders(doc);

    doc.addPage('a4',1);
    createDocumentLog(doc);

    doc.addPage('a4', 1);
    createWBS(doc);

    if (parseInt(project.duration) > 6) {
        doc.addPage('a4', 'landscape');
    } else doc.addPage('a4', 1);
    createCost(doc);

    doc.addPage('a4', 'landscape');
    createCommunication(doc);

    doc.addPage('a4',1);
    createClosing(doc)

    localStorage.setItem('proposal', doc.output('bloburi'));
}

/**
 * functions to generate placeholder document when project data not found.
 *
 */
function createCharter404(doc) {
    doc.setProperties({
        title: "Project Charter"
    });
    doc.setFontSize(24);
    doc.text('Harap masukkan data Project Charter!', 32, 20);
    localStorage.setItem('charter404', doc.output('datauristring'));
}

function createStakeholders404(doc) {
    doc.setProperties({
        title: "Stakeholders"
    });
    doc.setFontSize(24);
    doc.text('Harap masukkan data Stakeholders!', 32, 20);
    localStorage.setItem('stakeholders404', doc.output('datauristring'));
}

function createDocument404(doc) {
    doc.setProperties({
        title: "Document Log"
    });
    doc.setFontSize(24);
    doc.text('Harap masukkan data Kontrol Dokumen!', 32, 20);
    localStorage.setItem('document404', doc.output('datauristring'));
}

function createWBS404(doc) {
    doc.setProperties({
        title: "Work Breakdown Structure"
    });
    doc.setFontSize(24);
    doc.text('Harap masukkan data WBS!', 48, 20);
    localStorage.setItem('wbs404', doc.output('datauristring'));
}

function createCommunication404(doc) {
    doc.setProperties({
        title: "Project Communication"
    });
    doc.setFontSize(24);
    doc.text('Harap masukkan data Komunikasi Proyek!', 25, 20);
    localStorage.setItem('communication404', doc.output('datauristring'));
}
