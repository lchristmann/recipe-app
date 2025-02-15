import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the categories and where your images are stored
const categories = ['main', 'side', 'supper', 'dessert'];
const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Create an object to store the image names grouped by category
const manifest = {};

categories.forEach((category) => {
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

console.log(`Image manifest generated at: ${outputPath}`);
