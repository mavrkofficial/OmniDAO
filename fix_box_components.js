const fs = require('fs');
const path = require('path');

// Function to replace Box components with div elements
function replaceBoxComponents(content) {
  // Replace Box imports
  content = content.replace(/import\s*{\s*([^}]*),\s*Box\s*([^}]*)\s*}\s*from\s*['"]@inkonchain\/ink-kit['"];?/g, 
    (match, before, after) => {
      return `import { ${before}${after} } from '@inkonchain/ink-kit';`;
    });
  
  content = content.replace(/import\s*{\s*Box\s*}\s*from\s*['"]@inkonchain\/ink-kit['"];?/g, '');
  
  // Replace Box components with div elements
  content = content.replace(/<Box\s+([^>]*)>/g, (match, props) => {
    // Convert Box props to inline styles
    let style = '';
    let className = '';
    
    // Handle common Box props
    if (props.includes('marginBottom={')) {
      const marginMatch = props.match(/marginBottom=\{(\d+)\}/);
      if (marginMatch) {
        style += `margin-bottom: ${parseInt(marginMatch[1]) * 0.5}rem; `;
      }
    }
    
    if (props.includes('marginTop={')) {
      const marginMatch = props.match(/marginTop=\{(\d+)\}/);
      if (marginMatch) {
        style += `margin-top: ${parseInt(marginMatch[1]) * 0.5}rem; `;
      }
    }
    
    if (props.includes('textAlign=')) {
      const alignMatch = props.match(/textAlign="([^"]+)"/);
      if (alignMatch) {
        style += `text-align: ${alignMatch[1]}; `;
      }
    }
    
    if (props.includes('display=')) {
      const displayMatch = props.match(/display="([^"]+)"/);
      if (displayMatch) {
        style += `display: ${displayMatch[1]}; `;
      }
    }
    
    if (props.includes('justifyContent=')) {
      const justifyMatch = props.match(/justifyContent="([^"]+)"/);
      if (justifyMatch) {
        style += `justify-content: ${justifyMatch[1]}; `;
      }
    }
    
    if (props.includes('alignItems=')) {
      const alignMatch = props.match(/alignItems="([^"]+)"/);
      if (alignMatch) {
        style += `align-items: ${alignMatch[1]}; `;
      }
    }
    
    if (props.includes('gap={')) {
      const gapMatch = props.match(/gap=\{(\d+)\}/);
      if (gapMatch) {
        style += `gap: ${parseInt(gapMatch[1]) * 0.25}rem; `;
      }
    }
    
    if (props.includes('padding={')) {
      const paddingMatch = props.match(/padding=\{(\d+)\}/);
      if (paddingMatch) {
        style += `padding: ${parseInt(paddingMatch[1]) * 0.5}rem; `;
      }
    }
    
    // Handle style prop
    if (props.includes('style={{')) {
      const styleMatch = props.match(/style=\{\{([^}]+)\}\}/);
      if (styleMatch) {
        style += styleMatch[1] + '; ';
      }
    }
    
    // Handle className
    if (props.includes('className=')) {
      const classMatch = props.match(/className="([^"]+)"/);
      if (classMatch) {
        className = classMatch[1];
      }
    }
    
    return `<div${className ? ` className="${className}"` : ''}${style ? ` style={{ ${style.trim()} }}` : ''}>`;
  });
  
  // Replace closing Box tags
  content = content.replace(/<\/Box>/g, '</div>');
  
  return content;
}

// Function to process all TypeScript React files
function processFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (file.endsWith('.tsx') && file.includes('components')) {
      console.log(`Processing ${filePath}`);
      const content = fs.readFileSync(filePath, 'utf8');
      const updatedContent = replaceBoxComponents(content);
      fs.writeFileSync(filePath, updatedContent);
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