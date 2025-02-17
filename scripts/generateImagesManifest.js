import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/config/constants.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define where images are stored
const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Create an object to store the image names grouped by category
const manifest = {};

CATEGORIES.forEach((category) => {
  const categoryPath = path.join(imagesDir, category);
  try {
    // Read all files from the directory and filter for .webp images
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.webp'));
    manifest[category] = files;
  } catch (error) {
    console.error(`Error reading directory for category "${category}":`, error);
    manifest[category] = []; // Fallback to an empty array if the directory isn't found
  }
});

// Write the manifest to a JSON file inside the images folder (or any location you prefer)
const outputPath = path.join(__dirname, '..', 'src', 'assets', 'imagesManifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log(`\x1b[32m✅ Generated image manifest at ${outputPath}\x1b[0m`); // Green color output
