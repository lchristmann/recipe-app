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