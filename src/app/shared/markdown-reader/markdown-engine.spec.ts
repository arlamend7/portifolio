import { describe, expect, it } from 'vitest';
import { renderMarkdown, resolveMarkdownUrl } from './markdown-engine';

const baseUrl = 'https://portfolio.example/assets/projects/voar-prime/voar-prime.fr.md';

describe('Markdown rendering boundary', () => {
  it('renders tables and code, preserves copy text, and makes unique heading anchors', () => {
    const result = renderMarkdown(
      '# Heading\n\n## Heading\n\n## Heading-1\n\n| A | B |\n|---|---|\n|1|2|\n\n```ts\nconst value = 1;\n```',
      baseUrl,
      'Copy',
    );
    expect(result.html).toContain('<table>');
    expect(result.html).toContain('hljs-keyword');
    expect(result.headings.map((heading) => heading.id)).toEqual([
      'readme-heading',
      'readme-heading-1',
      'readme-heading-1-1',
    ]);
    expect(result.codeBlocks).toEqual(['const value = 1;\n']);
  });

  it('does not execute raw HTML, unsafe links, or code-fence attribute injection', () => {
    const result = renderMarkdown(
      '<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[bad](javascript:alert(1))\n\n```"><img src=x onerror=alert(1)>\n<script>bad</script>\n```',
      baseUrl,
      'Copy',
    );
    expect(result.html).not.toContain('<script>');
    expect(result.html).not.toContain('<img');
    expect(result.html).not.toContain('href="javascript:');
    expect(result.html).toContain('&lt;script&gt;');
  });

  it('resolves relative image paths and protects external links', () => {
    const result = renderMarkdown(
      '![Diagram](images/diagram.svg)\n\n[Library](https://example.org/library)\n\n[Heading](#heading)',
      baseUrl,
      'Copy',
    );
    expect(result.html).toContain(
      'src="https://portfolio.example/assets/projects/voar-prime/images/diagram.svg"',
    );
    expect(result.html).toContain('rel="noopener noreferrer"');
    expect(result.html).toContain('href="#readme-heading"');
  });

  it.each(['javascript:alert(1)', 'data:text/html,test', 'file:///etc/passwd', 'vbscript:test'])(
    'rejects unsafe resource URL %s',
    (url) => {
      expect(resolveMarkdownUrl(url, baseUrl)).toBeNull();
      expect(resolveMarkdownUrl(url, baseUrl, true)).toBeNull();
    },
  );
});
