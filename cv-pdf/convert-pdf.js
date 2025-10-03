// convert-pdf.js
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load your HTML file
  await page.goto(`file://${path.join(__dirname, 'cv.html')}`, {
    waitUntil: 'networkidle0'
  });

  // Generate PDF
  await page.pdf({
    path: 'youdexsof-fa-cv.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
})();
