import { describe, it, expect } from 'vitest';
import { normalizeRecipeTitle } from '@/utils/stringUtils.js';

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
