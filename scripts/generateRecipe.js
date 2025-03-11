import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if a parameter was provided
if (process.argv.length < 3) {
  console.error("Usage: node generateRecipe.js <category/recipe-name>");
  process.exit(1);
}

const inputParam = process.argv[2];
const parts = inputParam.split('/');
if (parts.length !== 2) {
  console.error("Error: Parameter must be in the format 'category/recipe-name'");
  process.exit(1);
}

const [category, recipeName] = parts;

// Enforce that the category is one of the allowed ones
if (!CATEGORIES.includes(category)) {
  console.error(
    `Error: Category "${category}" is not valid. Allowed categories are: ${CATEGORIES.join(', ')}`
  );
  process.exit(1);
}

// Define the base directory for recipes: src/assets/recipes
const baseDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

// Construct the category directory path
const categoryDir = path.join(baseDir, category);

// Ensure the category directory exists (create it recursively if not)
if (!fs.existsSync(categoryDir)) {
  fs.mkdirSync(categoryDir, { recursive: true });
}

// Construct the file path for the recipe
const filePath = path.join(categoryDir, `${recipeName}.json`);

// Scaffold content for the recipe JSON file
const scaffold = {
  "labels": [],
  "time": 15,
  "cost": 2,
  "ingredients": [],
  "instructions": []
};

// Write the scaffold JSON to the file
fs.writeFileSync(filePath, JSON.stringify(scaffold, null, 2));

console.log(`\x1b[32m✅ Recipe scaffold created at: ${filePath}\x1b[0m\n`);