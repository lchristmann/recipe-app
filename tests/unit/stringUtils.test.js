import { describe, it, expect } from 'vitest';
import { normalizeRecipeTitle } from '@/utils/stringUtils.js';
import { normalizeQueryParam } from '@/utils/stringUtils.js';
import { recipeFileNameToTitle } from '@/utils/stringUtils.js';
import { recipeTitleToFileName } from '@/utils/stringUtils.js';

describe('normalizeRecipeTitle', () => {

    it('converts titles to lowercase and replaces spaces with hyphens', () => {
        expect(normalizeRecipeTitle('Spaghetti Bolognese')).toBe('spaghetti-bolognese');
    });

    it('removes leading and trailing whitespaces', () => {
        expect(normalizeRecipeTitle('  Lasagne  ')).toBe('lasagne');
    });

    it('converts German umlauts correctly', () => {
        expect(normalizeRecipeTitle('Käsekuchen')).toBe('kaesekuchen');
        expect(normalizeRecipeTitle('Möhrenkuchen')).toBe('moehrenkuchen');
        expect(normalizeRecipeTitle('Süße Brezel')).toBe('suesse-brezel');
        expect(normalizeRecipeTitle('Fußball-Torte')).toBe('fussball-torte');
    });

    it('can even remove special characters at the start or end or next to whitespaces', () => {
        expect(normalizeRecipeTitle('&Pizza! Döner & Feta!!')).toBe('pizza-doener-feta');
    });

});

describe('normalizeQueryParam', () => {

    it('converts titles to lowercase and replaces spaces with hyphens', () => {
        expect(normalizeQueryParam('Kartoffel')).toBe('kartoffel');
    });
    
    it('turns whitespaces and other non-word characters into hyphens and even collapses those', () => {
        expect(normalizeQueryParam('Quick & Easy')).toBe('quick-easy');
    });

    it('eleminates trailing non-word characters', () => {
        expect(normalizeQueryParam('Nice!')).toBe('nice');
    });

    it('converts German umlauts correctly', () => {
        expect(normalizeQueryParam('Gemüse')).toBe('gemuese');
        expect(normalizeQueryParam('Käse')).toBe('kaese');
        expect(normalizeQueryParam('Spaß')).toBe('spass');
        expect(normalizeQueryParam('Süßes')).toBe('suesses');
        expect(normalizeQueryParam('Hülsenfrüchte')).toBe('huelsenfruechte');
    });

});

describe('recipeFileNameToTitle', () => {

    it('converts a recipe JSON filename to the correct title', () => {
        expect(recipeFileNameToTitle('gebratene-bananen.json')).toBe('Gebratene Bananen');
    });
    
    it('converts a recipe JSON filename to the correct title', () => {
        expect(recipeFileNameToTitle('käsekuchen.json')).toBe('Käsekuchen');
    });

    it('converts a recipe JSON filename to the correct title', () => {
        expect(recipeFileNameToTitle('pommes-bowl.json')).toBe('Pommes Bowl');
    });

});

describe('recipeTitleToFileName', () => {

    it('converts a recipe title to the correct JSON filename', () => {
        expect(recipeTitleToFileName('Gebratene Bananen')).toBe('gebratene-bananen');
    });
    
    it('converts a recipe title to the correct JSON filename', () => {
        expect(recipeTitleToFileName('Käsekuchen')).toBe('käsekuchen');
    });

    it('converts a recipe title to the correct JSON filename', () => {
        expect(recipeTitleToFileName('Pommes Bowl')).toBe('pommes-bowl');
    });
    
});