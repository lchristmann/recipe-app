import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { recipeTitleToFileName } from '../src/utils/stringUtils.js'; // Use the new function
import { CATEGORIES } from '../src/config/constants.js';

// This script checks every image file in the public/images folder against the set of expected recipe JSON files in the src/assets/recipes/*.json files.
// It logs a warning if an image isn’t associated with any recipe JSON file or if the image doesn't have a .webp extension.

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define base directories
const imagesBaseDir = path.join(__dirname, '..', 'public', 'images');
const recipesBaseDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

let issuesFound = false; // Track if any warnings are printed

CATEGORIES.forEach((category) => {

  // Read image files from /public/images/<category>
  const categoryImagesDir = path.join(imagesBaseDir, category);
  let imageFiles = [];
  try {
    imageFiles = fs.readdirSync(categoryImagesDir);
  } catch (error) {
    console.error(`Error reading images directory for category "${category}":`, error);
    issuesFound = true;
    return;
  }

  // Check for files that don't have a .webp extension
  imageFiles.forEach((file) => {
    if (!file.endsWith('.webp')) {
      console.warn(`❌ "${file}" in category "${category}" does not have a .webp extension.`);
      issuesFound = true;
    }
  });

  // Read recipe files from /src/assets/recipes/<category>
  const categoryRecipesDir = path.join(recipesBaseDir, category);
  let recipeFiles = [];
  try {
    recipeFiles = fs.readdirSync(categoryRecipesDir).filter((file) => file.endsWith('.json'));
  } catch (error) {
    console.error(`Error reading recipes directory for category "${category}":`, error);
    issuesFound = true;
    return;
  }

  // Create a set of expected recipe JSON names (without extension) based on recipe titles
  const expectedRecipeNames = new Set(
    recipeFiles.map((recipeFile) => recipeTitleToFileName(path.basename(recipeFile, '.json')))
  );

  // Verify that every image file corresponds to a recipe JSON file
  imageFiles.forEach((imageFile) => {
    const imageNameWithoutExtension = path.basename(imageFile, '.webp'); // Remove the .webp extension
    if (!expectedRecipeNames.has(imageNameWithoutExtension)) {
      console.warn(
        `❌ "${imageFile}" in category "${category}" does not have a corresponding recipe JSON file.`
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
