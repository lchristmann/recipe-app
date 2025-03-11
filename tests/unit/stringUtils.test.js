import { describe, it, expect } from 'vitest';
import { recipeFileNameToTitle } from '@/utils/stringUtils.js';
import { makeKebabCase } from '../../src/utils/stringUtils';

describe('makeKebabCase', () => {

    it('converts titles to lowercase and replaces spaces with hyphens', () => {
        expect(makeKebabCase('Spaghetti Bolognese')).toBe('spaghetti-bolognese');
    });

    it('removes leading and trailing whitespaces', () => {
        expect(makeKebabCase('  Lasagne  ')).toBe('lasagne');
    });

    it('lowercases German umlauts correctly', () => {
        expect(makeKebabCase('Käsekuchen')).toBe('käsekuchen');
        expect(makeKebabCase('Möhrenkuchen')).toBe('möhrenkuchen');
        expect(makeKebabCase('Süße Brezel')).toBe('süße-brezel');
        expect(makeKebabCase('Fußball-Torte')).toBe('fußball-torte');
    });

});

describe('makeKebabCase', () => {

    it('converts titles to lowercase and replaces spaces with hyphens', () => {
        expect(makeKebabCase('Kartoffel')).toBe('kartoffel');
    });
    
    it('turns whitespaces and other non-word characters into hyphens and even collapses those', () => {
        expect(makeKebabCase('Quick & Easy')).toBe('quick-&-easy');
    });

    it('eleminates trailing non-word characters', () => {
        expect(makeKebabCase('Nice')).toBe('nice');
    });

    it('converts German umlauts correctly', () => {
        expect(makeKebabCase('Gemüse')).toBe('gemüse');
        expect(makeKebabCase('Käse')).toBe('käse');
        expect(makeKebabCase('Spaß')).toBe('spaß');
        expect(makeKebabCase('Süßes')).toBe('süßes');
        expect(makeKebabCase('Hülsenfrüchte')).toBe('hülsenfrüchte');
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

describe('makeKebabCase', () => {

    it('converts a recipe title to the correct JSON filename', () => {
        expect(makeKebabCase('Gebratene Bananen')).toBe('gebratene-bananen');
    });
    
    it('converts a recipe title to the correct JSON filename', () => {
        expect(makeKebabCase('Käsekuchen')).toBe('käsekuchen');
    });

    it('converts a recipe title to the correct JSON filename', () => {
        expect(makeKebabCase('Pommes Bowl')).toBe('pommes-bowl');
    });
    
});