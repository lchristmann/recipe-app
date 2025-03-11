export function normalizeRecipeTitle(title) {
    return title
        .trim() // Remove leading and trailing whitespaces
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\W+/g, '-') // Replace non-word characters like whitespaces with '-'
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

// Same as above normlaizeRecipeTitle function
// While it could be merged to avoid duplicated code,
// the descripitive function names for the two use cases are nice to have
export function normalizeQueryParam(param) {
    return param
        .trim() // Remove leading and trailing whitespaces    
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\W+/g, '-') // Replace non-word characters like whitespaces with '-'
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

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

// Convert a recipe title like "Pommes Bowl" into its corresponding JSON file name like "pommes-bowl" (without the .json extension)
export function recipeTitleToFileName(title) {
    // Convert the title to lowercase and replace spaces with hyphens
    return title.toLowerCase().replace(/\s+/g, '-');
}