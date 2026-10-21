import { parse, safeParse } from 'valibot';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import content from '../../../assets/content/portfolio.json';
import en from '../../../assets/i18n/en.json';
import pt from '../../../assets/i18n/pt.json';
import fr from '../../../assets/i18n/fr.json';
import { portfolioSchema, projectEntrySchema } from './portfolio.schema';

function keys(value: object, prefix = ''): string[] {
  return Object.entries(value)
    .flatMap(([key, nested]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof nested === 'object' && nested !== null ? keys(nested, path) : [path];
    })
    .sort();
}

describe('Portfolio content contract', () => {
  it('has complete translations and dedicated locale files for every document', () => {
    function check(value: unknown, path = 'content'): void {
      if (Array.isArray(value)) {
        value.forEach((item, i) => check(item, `${path}[${i}]`));
        return;
      }
      if (!value || typeof value !== 'object') return;
      const record = value as Record<string, unknown>;
      if (typeof record['en'] === 'string') {
        for (const language of ['en', 'pt', 'fr']) {
          expect(typeof record[language], `${path}.${language}`).toBe('string');
          if (record['en'].trim())
            expect(String(record[language]).trim(), `${path}.${language}`).not.toBe('');
        }
      } else Object.entries(record).forEach(([key, item]) => check(item, `${path}.${key}`));
    }
    check(content);
    for (const item of [
      ...content.projects.filter((item) => item.kind === 'project'),
      ...content.home.capabilities,
    ]) {
      const documents = item.markdown!;
      for (const language of ['en', 'pt', 'fr'] as const) {
        const path = documents[language]!;
        expect(path.endsWith(`${item.id}.${language}.md`)).toBe(true);
        expect(existsSync(resolve('src', path))).toBe(true);
        expect(existsSync(resolve('src', path, '..', 'images'))).toBe(true);
      }
    }
  });

  it('validates supplied content and all configured Markdown files', () => {
    const result = parse(portfolioSchema, content);
    expect(existsSync(resolve('src', result.sports.image.src))).toBe(true);
    for (const project of result.projects) {
      if (project.kind !== 'project') continue;
      for (const path of Object.values(project.markdown)) {
        if (path) expect(existsSync(resolve('src', path)), path).toBe(true);
      }
    }
    for (const capability of result.home.capabilities) {
      for (const path of Object.values(capability.markdown)) {
        if (path) expect(existsSync(resolve('src', path)), path).toBe(true);
      }
    }
  });

  it('rejects missing or repeated sports highlights and duplicate achievement IDs', () => {
    for (const sports of [
      { ...content.sports, highlightIds: ['missing-achievement'] },
      {
        ...content.sports,
        highlightIds: [content.sports.highlightIds[0], content.sports.highlightIds[0]],
      },
      {
        ...content.sports,
        achievements: [...content.sports.achievements, content.sports.achievements[0]],
      },
    ]) {
      expect(safeParse(portfolioSchema, { ...content, sports }).success).toBe(false);
    }
  });

  it('accepts a package with just its kind and URL', () => {
    expect(
      parse(projectEntrySchema, {
        kind: 'package',
        url: 'https://pub.dev/packages/example_package',
      }),
    ).toMatchObject({ kind: 'package', name: 'example_package', id: 'example-package' });
  });

  it('rejects unsafe URLs, duplicate IDs and unresolved employer projects', () => {
    expect(
      safeParse(projectEntrySchema, { kind: 'package', url: 'javascript:alert(1)' }).success,
    ).toBe(false);
    expect(
      safeParse(portfolioSchema, {
        ...content,
        projects: [...content.projects, content.projects[0]],
      }).success,
    ).toBe(false);
    const invalid = {
      ...content,
      companies: content.companies.map((company, index) => ({
        ...company,
        projectIds: index === 0 ? ['unknown'] : company.projectIds,
      })),
    };
    expect(safeParse(portfolioSchema, invalid).success).toBe(false);
  });

  it('rejects documents outside assets and permits translated document paths', () => {
    const project = {
      kind: 'project',
      id: 'example',
      name: 'Example',
      description: { en: '' },
      markdown: { en: 'assets/example.md', fr: 'assets/fr/example.md' },
    };
    expect(safeParse(projectEntrySchema, project).success).toBe(true);
    expect(
      safeParse(projectEntrySchema, { ...project, markdown: { en: '../private.md' } }).success,
    ).toBe(false);
  });

  it('keeps EN, PT and FR UI dictionaries complete and aligned', () => {
    expect(keys(pt)).toEqual(keys(en));
    expect(keys(fr)).toEqual(keys(en));
  });

  it('validates contact links, certificate references and credential URLs', () => {
    expect(
      safeParse(portfolioSchema, {
        ...content,
        home: { ...content.home, certificateIds: ['missing'] },
      }).success,
    ).toBe(false);
    expect(
      safeParse(portfolioSchema, {
        ...content,
        certificates: content.certificates.map((item, index) =>
          index === 0 ? { ...item, url: 'javascript:alert(1)' } : item,
        ),
      }).success,
    ).toBe(false);
    expect(
      safeParse(portfolioSchema, {
        ...content,
        profile: {
          ...content.profile,
          socialLinks: [
            {
              label: 'Email',
              icon: 'mail',
              description: { en: '' },
              url: 'mailto:person@example.com?bcc=hidden@example.com',
            },
          ],
        },
      }).success,
    ).toBe(false);
    expect(safeParse(portfolioSchema, content).success).toBe(true);
  });
});
