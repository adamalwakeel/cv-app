import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

export const exportToDocx = async (content: string) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: content.split('\n').map(line => 
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24 // 12pt
            })
          ]
        })
      )
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'my-cv.docx');
};

export const exportToPdf = (content: string) => {
  const pdf = new jsPDF();
  const splitText = pdf.splitTextToSize(content, 180);
  
  let y = 20;
  pdf.setFontSize(12);
  
  splitText.forEach(line => {
    if (y > 280) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(line, 15, y);
    y += 7;
  });

  pdf.save('my-cv.pdf');
};