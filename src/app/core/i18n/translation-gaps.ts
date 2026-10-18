import { Locale } from './locale';

/** Used only when content or language changes, not on every template expression. */
export function hasTranslationGaps(value: unknown, locale: Locale): boolean {
  if (locale === 'en' || value === null || typeof value !== 'object') return false;
  if (Array.isArray(value)) return value.some((item) => hasTranslationGaps(item, locale));
  const fields = value as Record<string, unknown>;
  if (typeof fields['en'] === 'string' && fields['en'].trim()) {
    return typeof fields[locale] !== 'string' || !fields[locale].trim();
  }
  return Object.values(fields).some((field) => hasTranslationGaps(field, locale));
}
