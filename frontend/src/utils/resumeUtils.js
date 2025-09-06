import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPdf = (resumeRef, filename = "resume.pdf") => {
  const input = resumeRef.current;
  if (!input) return;

  html2canvas(input, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 1) {
      position -= pdf.internal.pageSize.getHeight();
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    pdf.save(filename);
  });
};

export const downloadImage = (resumeRef, filename = "resume.png") => {
  const input = resumeRef.current;
  if (!input) return;

  html2canvas(input, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
  });
};
