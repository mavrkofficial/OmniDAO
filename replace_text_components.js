const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function replaceTextComponents(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove Text from imports
  content = content.replace(
    /import\s*{\s*([^}]*),\s*Text\s*([^}]*)\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
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
  
  // Remove standalone Text import
  content = content.replace(
    /import\s*{\s*Text\s*}\s*from\s*['"]@inkonchain\/ink-kit['"]/g,
    ''
  );
  
  // Replace <Text> with <p> or <span> based on context
  content = content.replace(
    /<Text\s+([^>]*)>/g,
    (match, props) => {
      // Check if it's a label or small text (use span)
      if (props.includes('className="omni-stat-label"') || 
          props.includes('className="omni-stat-value"') ||
          props.includes('fontSize') ||
          props.includes('color')) {
        return `<span ${props}>`;
      }
      // Default to p for regular text
      return `<p ${props}>`;
    }
  );
  
  // Replace closing </Text> tags
  content = content.replace(/<\/Text>/g, (match) => {
    // We need to determine if it should be </p> or </span>
    // For now, let's use </p> as default and handle specific cases
    return '</p>';
  });
  
  // Handle specific cases where we know it should be span
  content = content.replace(
    /<p\s+([^>]*className="omni-stat-label"[^>]*)>/g,
    '<span $1>'
  );
  content = content.replace(
    /<p\s+([^>]*className="omni-stat-value"[^>]*)>/g,
    '<span $1>'
  );
  content = content.replace(
    /<\/p>/g,
    (match, offset, string) => {
      // Check if the corresponding opening tag was a span
      const beforeText = string.substring(0, offset);
      const lastSpanIndex = beforeText.lastIndexOf('<span');
      const lastPIndex = beforeText.lastIndexOf('<p');
      
      if (lastSpanIndex > lastPIndex) {
        return '</span>';
      }
      return '</p>';
    }
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Process all .tsx files in components directory
const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  replaceTextComponents(filePath);
});

console.log('Text component replacement completed!'); 