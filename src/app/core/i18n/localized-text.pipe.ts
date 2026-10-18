import { Pipe, PipeTransform } from '@angular/core';
import { Locale, LocalizedText } from '../content/portfolio.schema';

export function localizedText(value: LocalizedText | undefined, locale: Locale): string {
  return value?.[locale]?.trim() || value?.en || '';
}

@Pipe({ name: 'localize' })
export class LocalizedTextPipe implements PipeTransform {
  transform(value: LocalizedText | undefined, locale: Locale): string {
    return localizedText(value, locale);
  }
}
