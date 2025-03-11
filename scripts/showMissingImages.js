import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';
import { recipeFileNameToTitle } from '../src/utils/stringUtils.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directories
const baseRecipesDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');
const baseImagesDir = path.join(__dirname, '..', 'public', 'images');

let missingImages = false;

CATEGORIES.forEach(category => {
  console.log(category);

  const categoryDir = path.join(baseRecipesDir, category);
  const categoryImagesDir = path.join(baseImagesDir, category);

  let missingImagesInCategory = false

  // Ensure the category directory exists
  if (!fs.existsSync(categoryDir)) {
    console.error(`❌ Category directory not found: ${categoryDir}`);
    return;
  }

  // Get all .json files in the category directory
  const files = fs.readdirSync(categoryDir).filter(file => file.toLowerCase().endsWith('.json'));

  files.forEach(file => {
    try {
      // Compute expected image filename
      const expectedImage = file.replace(/\.json$/i, '.webp');
      const imagePath = path.join(categoryImagesDir, expectedImage);

      // Check if image exists
      if (!fs.existsSync(imagePath)) {
        console.warn(`❌ "${recipeFileNameToTitle(file)}" has no image "${expectedImage}".`);
        missingImages = true;
        missingImagesInCategory = true;
      }
    } catch (error) {
      console.error(`❌ [${category}/${file}] Error reading JSON:`, error.message);
    }
  });
  if (!missingImagesInCategory) console.log(`\x1b[32m✅ ${category}: all recipes have images!\x1b[0m\n`);
  else console.log('')
});