import { describe, expect, it } from 'vitest';
import { accentTextColor, isAccentColor } from './accent-color';

describe('Custom theme contrast', () => {
  it('uses dark text on light accents and light text on dark accents', () => {
    expect(accentTextColor('#ffffff')).toBe('#000000');
    expect(accentTextColor('#ffff00')).toBe('#000000');
    expect(accentTextColor('#002218')).toBe('#ffffff');
  });
  it('rejects malformed persisted colors', () => {
    expect(isAccentColor('url(example)')).toBe(false);
    expect(isAccentColor(null)).toBe(false);
    expect(isAccentColor('#245B45')).toBe(true);
  });
});
