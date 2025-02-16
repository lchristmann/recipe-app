import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define base images directory
const imagesBaseDir = path.join(__dirname, '..', 'public', 'images');

let issuesFound = false; // Track if any warnings are printed

CATEGORIES.forEach((category) => {

  const categoryDir = path.join(imagesBaseDir, category);
  let files = [];
  try {
    files = fs.readdirSync(categoryDir);
  } catch (error) {
    console.error(`Error reading directory "${categoryDir}":`, error);
    issuesFound = true;
    return;
  }
  
  // Check that each file has a .webp extension
  files.forEach((file) => {
    if (!file.toLowerCase().endsWith('.webp')) {
      console.warn(`❌ "${file}" in category "${category}" does not have a .webp extension.`);
      issuesFound = true;
    }
  });

});

// Print green success message if no issues were found
if (!issuesFound) {
  console.log('\x1b[32m✅ All fine!\x1b[0m\n'); // Green color output
} else {
  console.log('');
}