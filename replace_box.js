const fs = require('fs');
const path = require('path');

// Function to process all TypeScript React files
function processFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (file.endsWith('.tsx')) {
      console.log(`Processing ${filePath}`);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remove Box from imports
      content = content.replace(/import\s*{\s*([^}]*),\s*Box\s*([^}]*)\s*}\s*from\s*['"]@inkonchain\/ink-kit['"];?/g, 
        (match, before, after) => {
          return `import { ${before}${after} } from '@inkonchain/ink-kit';`;
        });
      
      content = content.replace(/import\s*{\s*Box\s*}\s*from\s*['"]@inkonchain\/ink-kit['"];?/g, '');
      
      // Replace Box components with div
      content = content.replace(/<Box\s+([^>]*)>/g, '<div>');
      content = content.replace(/<\/Box>/g, '</div>');
      
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  });
}

// Process the components directory
const componentsDir = path.join(__dirname, 'src', 'components');
if (fs.existsSync(componentsDir)) {
  processFiles(componentsDir);
  console.log('All Box components have been replaced with div elements!');
} else {
  console.log('Components directory not found');
} 