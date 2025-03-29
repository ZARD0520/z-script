const fs = require('fs')
const path = require('path')
const TurndownService = require('turndown')

async function scrapeToMarkdown(html) {
  const inputDir = path.join(__dirname, 'html')
  const outputDir = path.join(__dirname, 'md')
  const turndownService = new TurndownService();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const htmlFiles = fs.readdirSync(inputDir)
    .filter(file => path.extname(file) === '.html')

  htmlFiles.forEach(file => {
    try {
      const htmlPath = path.join(inputDir, file);
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      const markdownContent = turndownService.turndown(htmlContent);

      const outputFile = path.basename(file, '.html') + '.md';
      const outputPath = path.join(outputDir, outputFile);

      fs.writeFileSync(outputPath, markdownContent);
      console.log(`转换成功: ${file} → ${outputFile}`);
    } catch (err) {
      console.error(`转换失败: ${file}`, err.message);
    }
  })
}

scrapeToMarkdown(`html str`)