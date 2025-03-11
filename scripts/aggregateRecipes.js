import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';
import { recipeFileNameToTitle } from '../src/utils/stringUtils.js';
import { shuffleArray } from '../src/utils/arrayUtils.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directories
const baseRecipesDir = path.join(__dirname, '..', 'src', 'assets', 'recipes');
const baseImagesDir = path.join(__dirname, '..', 'public', 'images');

// Process each category from the allowed CATEGORIES
CATEGORIES.forEach(category => {
  const categoryDir = path.join(baseRecipesDir, category);
  const categoryImagesDir = path.join(baseImagesDir, category);

  // Ensure the category directory exists
  if (!fs.existsSync(categoryDir)) {
    console.error(`❌ Category directory not found: ${categoryDir}`);
    return;
  }
  
  // Get all .json files in the category directory
  const files = fs.readdirSync(categoryDir).filter(file => file.toLowerCase().endsWith('.json'));

  const aggregate = [];

  files.forEach(file => {
    const filePath = path.join(categoryDir, file);
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      let recipe = JSON.parse(data);
      
      // Compute a title from the file name
      const title = recipeFileNameToTitle(file);

      // Check for corresponding image:
      const imageFileName = file.replace(/\.json$/i, '.webp');
      const imagePath = path.join(categoryImagesDir, imageFileName);
      const hasImage = fs.existsSync(imagePath);
      const imageUrl = `/images/${category}/${imageFileName}`;

      // Update single recipe JSON file with new properties
      recipe.hasImage = hasImage;
      if (hasImage) recipe.imageUrl = imageUrl;
      fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));

      // Build recipe object with only necessary fields for aggregation
      const recipeData = {
        title,
        labels: recipe.labels,
        time: recipe.time,
        cost: recipe.cost,
        hasImage
      };
      if (hasImage) recipeData.imageUrl = imageUrl;

      aggregate.push(recipeData);
    } catch (error) {
      console.error(`❌ [${category}/${file}] Error reading or parsing JSON:`, error.message);
    }
  });

  // Shuffle the recipes array to always bring some new variation on every deployment of the app
  shuffleArray(aggregate);

  // Write the aggregate JSON file in the base recipes directory
  const outputFilePath = path.join(baseRecipesDir, `${category}.json`);
  try {
    fs.writeFileSync(outputFilePath, JSON.stringify(aggregate, null, 2));
    console.log(`\x1b[32m✅ Aggregate file created: ${outputFilePath}\x1b[0m`);
  } catch (error) {
    console.error(`❌ Error writing aggregate file for category "${category}": ${error.message}`);
  }
});

console.log('');