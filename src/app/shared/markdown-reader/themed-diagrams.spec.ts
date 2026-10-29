import { describe, expect, it } from 'vitest';
import { themedDiagram } from './themed-diagrams';
import { renderMarkdown } from './markdown-engine';

const base =
  'https://example.com/portifolio/assets/capabilities/performance-engineering/performance-engineering.en.md';
const image =
  'https://example.com/portifolio/assets/capabilities/performance-engineering/images/filter-first.en.svg';
describe('Theme-aware diagram boundary', () => {
  it('renders trusted diagrams with inherited colors and escaped alternative text', () => {
    const html = themedDiagram(image, base, 'A "quoted" <label>', 2)!;
    expect(html).toContain('var(--diagram-accent)');
    expect(html).toContain('var(--surface)');
    expect(html).toContain('A &quot;quoted&quot; &lt;label&gt;');
    expect(html).toContain('id="diagram-2-a"');
    expect(html).toContain('url(#diagram-2-a)');
  });
  it('does not inline remote or unregistered SVGs', () => {
    expect(
      themedDiagram(image.replace('example.com', 'untrusted.example'), base, '', 0),
    ).toBeNull();
    expect(themedDiagram(image.replace('filter-first', 'unknown'), base, '', 0)).toBeNull();
  });
  it('renders localized images through Markdown without changing ordinary image handling', () => {
    for (const lang of ['en', 'pt', 'fr']) {
      const html = renderMarkdown(`![Diagram](images/filter-first.${lang}.svg)`, base, 'Copy').html;
      expect(html).toContain('class="themed-diagram"');
      expect(html).not.toContain('<img');
    }
    expect(renderMarkdown('![Photo](images/photo.jpg)', base, 'Copy').html).toContain('<img');
  });
});
