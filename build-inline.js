const fs = require('fs');
const path = require('path');

// Function to inline CSS and JS into HTML
function createInlineHTML() {
  const distPath = path.join(__dirname, 'dist');
  const htmlPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found in dist folder. Run webpack build first.');
    process.exit(1);
  }

  let html = fs.readFileSync(htmlPath, 'utf8');

  // Find and inline CSS files
  const cssFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.css'));
  cssFiles.forEach(cssFile => {
    const cssContent = fs.readFileSync(path.join(distPath, cssFile), 'utf8');
    const linkRegex = new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`, 'g');
    html = html.replace(linkRegex, `<style>${cssContent}</style>`);
  });

  // Find and inline JS files
  const jsFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.js'));
  jsFiles.forEach(jsFile => {
    const jsContent = fs.readFileSync(path.join(distPath, jsFile), 'utf8');
    const scriptRegex = new RegExp(`<script[^>]*src="[^"]*${jsFile}"[^>]*></script>`, 'g');
    html = html.replace(scriptRegex, `<script>${jsContent}</script>`);
  });

  // Write the inlined HTML
  const inlineHtmlPath = path.join(distPath, 'index-inline.html');
  fs.writeFileSync(inlineHtmlPath, html, 'utf8');

  console.log('✅ Inline HTML created successfully at:', inlineHtmlPath);
  console.log('📁 This file contains all CSS and JS inlined for OmmaWorks upload.');
}

createInlineHTML();
