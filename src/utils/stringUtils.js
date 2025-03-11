// Convert a recipe JSON file name like "pommes-bowl.json" into a title "Pommes Bowl"
export function recipeFileNameToTitle(fileName) {
    // Remove the ".json" extension
    const nameWithoutExt = fileName.replace(/\.json$/i, '');
    // Split by hyphen
    const words = nameWithoutExt.split('-');
    // Capitalize each word
    const capitalized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalized.join(' ');
}

// Converts e.g. a recipe title like "Pommes Bowl" into its corresponding JSON file name like "pommes-bowl"
export function makeKebabCase(string) {
    // Convert the title to lowercase and replace spaces with hyphens
    return string
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
}