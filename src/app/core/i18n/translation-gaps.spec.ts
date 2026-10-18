import { describe, expect, it } from 'vitest';
import { hasTranslationGaps } from './translation-gaps';

describe('Translation notices', () => {
  it('disappears when the selected language is complete', () => {
    const content = { title: { en: 'Work', pt: 'Trabalho', fr: 'Travail' } };
    expect(hasTranslationGaps(content, 'pt')).toBe(false);
    expect(hasTranslationGaps(content, 'fr')).toBe(false);
    expect(hasTranslationGaps({ title: { en: 'Work', fr: null } }, 'fr')).toBe(true);
    expect(hasTranslationGaps({ title: { en: 'Work', fr: null } }, 'en')).toBe(false);
  });
});
