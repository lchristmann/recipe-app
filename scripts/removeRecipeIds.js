import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the recipes directory
const recipesDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');

// Read all JSON files in the directory
const recipeFiles = fs.readdirSync(recipesDir).filter(file => file.endsWith('.json'));

recipeFiles.forEach(file => {
  const filePath = path.join(recipesDir, file);

  try {
    // Read and parse the JSON file
    const recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Remove the 'id' property from each recipe object
    recipes.forEach(recipe => {
      delete recipe.id;
    });

    // Write the updated JSON back to the file
    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

    console.log(`\x1b[32m✅ Removed id property from recipes in ${file}\x1b[0m`);
  } catch (error) {
    console.error(`Error processing file "${file}":`, error);
  }
});
