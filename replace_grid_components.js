const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function replaceGridComponents(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Grid from imports
  content = content.replace(
    /import\s*{\s*([^}]*),\s*Grid\s*([^}]*)\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
    (match, before, after) => {
      const beforeText = before.trim();
      const afterText = after.trim();
      if (beforeText && afterText) {
        return `import { ${beforeText}, ${afterText} } from '@inkonchain/ink-kit'`;
      } else if (beforeText) {
        return `import { ${beforeText} } from '@inkonchain/ink-kit'`;
      } else if (afterText) {
        return `import { ${afterText} } from '@inkonchain/ink-kit'`;
      } else {
        return '';
      }
    }
  );

  // Remove standalone Grid import
  content = content.replace(
    /import\s*{\s*Grid\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
    ''
  );

  // Replace Grid container with div
  content = content.replace(
    /<Grid\s+container\s+([^>]*)>/g,
    '<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} $1>'
  );

  // Replace Grid item with div
  content = content.replace(
    /<Grid\s+item\s+([^>]*)>/g,
    '<div style={{ flex: "1 1 300px", minWidth: "300px" }} $1>'
  );

  // Replace closing Grid tags
  content = content.replace(/<\/Grid>/g, '</div>');

  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Process all .tsx files in components directory
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  replaceGridComponents(filePath);
});

console.log('Grid component replacement completed!'); 