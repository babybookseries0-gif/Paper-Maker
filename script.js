let questions = [];

function addQuestion() {
  let q = document.getElementById("questionBox").value;

  if (q === "") {
    alert("Question enter karo");
    return;
  }

  questions.push(q);

  let li = document.createElement("li");
  li.innerText = q;
  document.getElementById("questionList").appendChild(li);

  document.getElementById("questionBox").value = "";
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 10;

  doc.text("Question Paper", 10, y);
  y += 10;

  questions.forEach((q, i) => {
    doc.text((i + 1) + ". " + q, 10, y);
    y += 10;
  });

  doc.save("paper.pdf");
}