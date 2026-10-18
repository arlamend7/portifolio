import { describe, expect, it } from 'vitest';
import { localizedText } from './localized-text.pipe';

describe('Localized editorial content', () => {
  it('selects a supplied translation and falls back for empty or missing content', () => {
    const value = { en: 'Engineering', pt: 'Engenharia', fr: null };
    expect(localizedText(value, 'pt')).toBe('Engenharia');
    expect(localizedText(value, 'fr')).toBe('Engineering');
    expect(localizedText({ ...value, fr: '  ' }, 'fr')).toBe('Engineering');
  });
});
