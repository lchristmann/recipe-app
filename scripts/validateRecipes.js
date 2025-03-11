import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base recipes directory: src/assets/recipes
const baseRecipesDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

// Allowed keys in each recipe JSON
const allowedKeys = ['labels', 'time', 'cost', 'ingredients', 'instructions', 'photoBy'];

// Function to validate an individual recipe object
function validateRecipe(recipe, fileName) {
  let valid = true;
  
  if (typeof recipe !== 'object' || recipe === null || Array.isArray(recipe)) {
    console.error(`❌ [${fileName}] The JSON is not a valid object.`);
    return false;
  }

  // Check that there are no extra keys
  const recipeKeys = Object.keys(recipe);
  const extraKeys = recipeKeys.filter(key => !allowedKeys.includes(key));
  if (extraKeys.length) {
    console.error(`❌ [${fileName}] Contains disallowed keys: ${extraKeys.join(', ')}`);
    valid = false;
  }
  
  // Check required fields and their types:
  // labels: must be an array (can be empty) and all elements are strings.
  if (!Array.isArray(recipe.labels)) {
    console.error(`❌ [${fileName}] "labels" must be an array.`);
    valid = false;
  } else if (!recipe.labels.every(label => typeof label === 'string')) {
    console.error(`❌ [${fileName}] All elements in "labels" must be strings.`);
    valid = false;
  }

  // time: must be a number.
  if (typeof recipe.time !== 'number') {
    console.error(`❌ [${fileName}] "time" must be a number.`);
    valid = false;
  }

  // cost: must be a number.
  if (typeof recipe.cost !== 'number') {
    console.error(`❌ [${fileName}] "cost" must be a number.`);
    valid = false;
  }

  // ingredients: must be an array (can be empty) and all elements are strings.
  if (!Array.isArray(recipe.ingredients)) {
    console.error(`❌ [${fileName}] "ingredients" must be an array.`);
    valid = false;
  } else if (!recipe.ingredients.every(ing => typeof ing === 'string')) {
    console.error(`❌ [${fileName}] All elements in "ingredients" must be strings.`);
    valid = false;
  }

  // instructions: must be an array (can be empty) and all elements are strings.
  if (!Array.isArray(recipe.instructions)) {
    console.error(`❌ [${fileName}] "instructions" must be an array.`);
    valid = false;
  } else if (!recipe.instructions.every(instr => typeof instr === 'string')) {
    console.error(`❌ [${fileName}] All elements in "instructions" must be strings.`);
    valid = false;
  }

  return valid;
}

let issuesFound = false;

// Loop through each category directory from CATEGORIES
CATEGORIES.forEach(category => {
  const categoryDir = path.join(baseRecipesDir, category);
  
  // Check if the directory exists
  if (!fs.existsSync(categoryDir)) {
    console.error(`❌ Directory not found: ${categoryDir}`);
    issuesFound = true;
    return;
  }
  
  // Read files in the category directory and filter for ".json" files
  const files = fs.readdirSync(categoryDir).filter(file => file.toLowerCase().endsWith('.json'));
  
  if (files.length === 0) {
    console.warn(`⚠️ No JSON files found in category "${category}".`);
  }
  
  files.forEach(file => {
    const filePath = path.join(categoryDir, file);
    
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const recipe = JSON.parse(data);
      
      // Build a relative file path in the format "category/filename"
      const relativeFilePath = `${category}/${file}`;
      const valid = validateRecipe(recipe, relativeFilePath);
      if (!valid) issuesFound = true;
    } catch (error) {
      console.error(`❌ [${category}/${file}] Error reading or parsing JSON:`, error.message);
      issuesFound = true;
    }
  });
});

// Print success or failure message based on issuesFound
if (!issuesFound) {
  console.log('\x1b[32m✅ All recipes JSON files are valid!\x1b[0m\n'); // Green color output
} else {
  console.log('');
}
