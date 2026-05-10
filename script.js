let mcqs = [];
let questions = [];

// ✅ MCQ = Question 1 only
function addMCQ() {
    let question = prompt("Enter MCQ Question:");
    let a = prompt("Option A:");
    let b = prompt("Option B:");
    let c = prompt("Option C:");
    let d = prompt("Option D:");

    if (!question || !a || !b || !c || !d) return;

    mcqs = [{
        question: question,
        options: { A: a, B: b, C: c, D: d }
    }];

    renderPaper();
}

// ✅ Normal Questions (Q2, Q3...)
function addQuestion() {
    let q = prompt("Enter Question:");
    if (!q) return;

    questions.push(q);
    renderPaper();
}

// ✅ Render Paper
function renderPaper() {
    let output = "";

    // MCQ = Q1
    if (mcqs.length > 0) {
        let mcq = mcqs[0];

        output += `
        <div>
            <b>Q1: Choose the correct option.</b><br><br>
            ${mcq.question}<br><br>

            A) ${mcq.options.A}<br>
            B) ${mcq.options.B}<br>
            C) ${mcq.options.C}<br>
            D) ${mcq.options.D}<br>
        </div>
        <hr>
        `;
    }

    // Normal Questions
    questions.forEach((q, index) => {
        output += `
        <div>
            <b>Q${index + 2}:</b> ${q}
        </div>
        <hr>
        `;
    });

    document.getElementById("paperArea").innerHTML = output;
}

// ✅ PDF Download (Professional Format)
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let y = 10;

    doc.setFontSize(14);
    doc.text("SCHOOL / INSTITUTE NAME", 50, y);
    y += 10;

    doc.setFontSize(10);
    doc.text("Annual Examination 2026", 60, y);
    y += 10;

    doc.text("Subject: __________  Time: 2 Hours", 10, y);
    y += 7;

    doc.text("Total Marks: 50", 10, y);
    y += 10;

    doc.text("Name: __________  Roll No: __________", 10, y);
    y += 15;

    doc.line(10, y, 200, y);
    y += 10;

    // MCQ
    if (mcqs.length > 0) {
        let mcq = mcqs[0];

        doc.text("Q1: Choose the correct option.", 10, y);
        y += 7;

        doc.text(mcq.question, 10, y);
        y += 7;

        doc.text("A) " + mcq.options.A, 10, y); y += 6;
        doc.text("B) " + mcq.options.B, 10, y); y += 6;
        doc.text("C) " + mcq.options.C, 10, y); y += 6;
        doc.text("D) " + mcq.options.D, 10, y); y += 10;
    }

    // Normal Questions
    questions.forEach((q, i) => {
        doc.text(`Q${i + 2}: ${q}`, 10, y);
        y += 10;
    });

    doc.save("Exam_Paper.pdf");
}
