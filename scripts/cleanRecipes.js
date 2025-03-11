import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory where recipes are stored
const baseRecipesDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

CATEGORIES.forEach(category => {
  const categoryDir = path.join(baseRecipesDir, category);

  // Ensure the category directory exists
  if (!fs.existsSync(categoryDir)) {
    console.error(`❌ Category directory not found: ${categoryDir}`);
    return;
  }

  // Get all .json files in the category directory
  const files = fs.readdirSync(categoryDir).filter(file => file.toLowerCase().endsWith('.json'));

  files.forEach(file => {
    const filePath = path.join(categoryDir, file);
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      let recipe = JSON.parse(data);

      // Remove unwanted properties if they exist
      delete recipe.id;
      delete recipe.hasImage;
      delete recipe.imageUrl;

      // Write the cleaned recipe JSON back to the file
      fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));
    } catch (error) {
      console.error(`❌ [${category}/${file}] Error processing JSON:`, error.message);
    }
  });
});

console.log('\x1b[36m🧹 Cleaning process complete.\x1b[0m\n');
