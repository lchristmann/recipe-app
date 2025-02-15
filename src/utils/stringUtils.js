export function normalizeRecipeTitle(title) {
    return title
        .trim() // Remove leading and trailing whitespaces
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\W+/g, '-') // Replace non-word characters like whitespaces with '-'
}  