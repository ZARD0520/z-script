const fs = require('fs').promises
const TurndownService = require('turndown')

async function scrapeToMarkdown(html) {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(html);
  fs.writeFile('output.md', markdown)
}

scrapeToMarkdown(`html str`)