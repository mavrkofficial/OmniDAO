const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function replaceCardInputComponents(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Card and Input from imports
  content = content.replace(
    /import\s*{\s*([^}]*),\s*Card\s*([^}]*)\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
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

  content = content.replace(
    /import\s*{\s*([^}]*),\s*Input\s*([^}]*)\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
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

  // Remove standalone Card or Input imports
  content = content.replace(
    /import\s*{\s*Card\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
    ''
  );
  content = content.replace(
    /import\s*{\s*Input\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
    ''
  );

  // Replace Card with div
  content = content.replace(
    /<Card\s+([^>]*)>/g,
    '<div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} $1>'
  );
  content = content.replace(/<\/Card>/g, '</div>');

  // Replace Input with input
  content = content.replace(
    /<Input\s+([^>]*)\s*\/>/g,
    '<input style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--omni-border)", background: "var(--omni-input-bg)", color: "var(--omni-text)" }} $1 />'
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Process all .tsx files in components directory
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  replaceCardInputComponents(filePath);
});

console.log('Card and Input component replacement completed!'); 