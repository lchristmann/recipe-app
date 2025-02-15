import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeRecipeTitle } from '../src/utils/stringUtils.js';
import { CATEGORIES } from '@/config/constants.js';

// This script finds all recipes that have no image associated to them yet.

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define base directories
const imagesBaseDir = path.join(__dirname, '..', 'public', 'images');
const recipesBaseDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

let issuesFound = false; // Track if any warnings are printed

CATEGORIES.forEach((category) => {
  console.log(`\x1b[34m${category}\x1b[0m`); // Blue category log

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

  // Optionally, warn if any recipe is missing its corresponding image
  recipes.forEach((recipe) => {
    const expectedImage = normalizeRecipeTitle(recipe.title) + '.webp';
    if (!imageFiles.includes(expectedImage)) {
      console.warn(`❌ "${recipe.title}" is missing its image "${expectedImage}".`);
      issuesFound = true;
    }
  });

  // Print green success message if no issues were found
  if (!issuesFound) {
    console.log('\x1b[32m✅ All fine!\x1b[0m\n'); // Green color output
  } else {
    console.log('');
  }
  
});