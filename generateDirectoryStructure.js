const fs = require('fs');
const path = require('path');

// The directory you want to start from
const rootDir = path.join(__dirname, 'src'); // Change to your directory if necessary

// Function to recursively get directory structure
const getDirStructure = (dirPath, level = 0) => {
  let result = '';
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    // Indentation for nesting
    const indent = '  '.repeat(level);

    if (stats.isDirectory()) {
      result += `${indent}${item}/\n`;
      result += getDirStructure(fullPath, level + 1); // Recurse into subdirectories
    } else {
      result += `${indent}${item}\n`;
    }
  });

  return result;
};

// Get directory structure and save to a file
const structure = getDirStructure(rootDir);

fs.writeFileSync('directory-structure.txt', structure, 'utf-8');
console.log('Directory structure saved to directory-structure.txt');
