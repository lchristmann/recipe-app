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

    // Assign unique IDs based on their order in the file
    recipes.forEach((recipe, index) => {
      recipe.id = index + 1; // Ensure IDs start from 1
    });

    // Write the updated JSON back to the file
    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

    console.log(`\x1b[32m✅ Generated id property for recipes in ${file}\x1b[0m`); // Green color output
  } catch (error) {
    console.error(`Error processing file "${file}":`, error);
  }
});
