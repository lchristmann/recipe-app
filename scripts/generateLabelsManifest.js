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

// Initialize a Set to store unique labels
const labelsSet = new Set();

// Process each recipe file
recipeFiles.forEach(file => {
  const filePath = path.join(recipesDir, file);

  try {
    // Read and parse the JSON file
    const recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Iterate over each recipe
    recipes.forEach(recipe => {
      // Add all labels to the set to ensure uniqueness
      if (recipe.labels && Array.isArray(recipe.labels)) {
        recipe.labels.forEach(label => {
          labelsSet.add(label);
        });
      }
    });
  } catch (error) {
    console.error(`Error processing file "${file}":`, error);
  }
});

// Convert the Set to an array to write to JSON
const labelsArray = Array.from(labelsSet);

// Sort the array in alphabetical and ascending order
labelsArray.sort()

// Define the output path for the labels manifest
const outputPath = path.join(__dirname, '..', 'src', 'assets', 'labelsManifest.json');

// Write the unique labels to the output file
fs.writeFileSync(outputPath, JSON.stringify(labelsArray, null, 2));

console.log(`\x1b[32m✅ Generated labels manifest at ${outputPath}\x1b[0m`);
