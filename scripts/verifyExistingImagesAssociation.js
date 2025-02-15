import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeRecipeTitle } from '../src/utils/stringUtils.js';

// This script checks every image file in the public/images folder against the set of expected image names from the recipes in src/assets/recipes/*.json files.
// It logs a warning if an image isn’t associated with any recipe.

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define categories and base directories
const categories = ['main', 'side', 'supper', 'dessert'];
const imagesBaseDir = path.join(__dirname, '..', 'public', 'images');
const recipesBaseDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

let issuesFound = false; // Track if any warnings are printed

categories.forEach((category) => {

  // Read image files from /public/images/<category>
  const categoryImagesDir = path.join(imagesBaseDir, category);
  let imageFiles = [];
  try {
    imageFiles = fs.readdirSync(categoryImagesDir).filter((file) => file.endsWith('.webp'));
  } catch (error) {
    console.error(`Error reading images directory for category "${category}":`, error);
    issuesFound = true;
    return;
  }

  // Read recipes from /src/assets/recipes/<category>.json
  const recipesPath = path.join(recipesBaseDir, `${category}.json`);
  let recipes = [];
  try {
    const recipesData = fs.readFileSync(recipesPath, 'utf8');
    recipes = JSON.parse(recipesData);
  } catch (error) {
    console.error(`Error reading recipes for category "${category}" from ${recipesPath}:`, error);
    issuesFound = true;
    return;
  }

  // Create a set of expected image names from the recipes
  const expectedImageNames = new Set(
    recipes.map((recipe) => normalizeRecipeTitle(recipe.title) + '.webp')
  );

  // Verify that every image in the folder is associated with a recipe
  imageFiles.forEach((imageFile) => {
    if (!expectedImageNames.has(imageFile)) {
      console.warn(
        `❌ "${imageFile}" in category "${category}" is not associated with any recipe.`
      );
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