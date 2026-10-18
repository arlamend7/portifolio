import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import english from '../../../assets/i18n/en.json';
import { Locale, supportedLocales } from './locale';
import { BrowserStorage } from '../preferences/browser-storage';

@Injectable({ providedIn: 'root' })
export class LocaleStore {
  private readonly translate = inject(TranslateService);
  private readonly storage = inject(BrowserStorage);
  private readonly document = inject(DOCUMENT);
  private readonly selected = signal<Locale>('en');
  private requestId = 0;

  readonly current = this.selected.asReadonly();
  readonly available = supportedLocales;

  async initialize(): Promise<void> {
    const saved = this.storage.read('locale');
    await this.select(supportedLocales.find((locale) => locale === saved) ?? 'en');
  }

  async select(locale: Locale): Promise<void> {
    const request = ++this.requestId;
    try {
      await firstValueFrom(this.translate.use(locale));
      if (request !== this.requestId) return;
      this.selected.set(locale);
      this.document.documentElement.lang = locale;
      this.storage.write('locale', locale);
    } catch {
      if (request !== this.requestId) return;
      try {
        await firstValueFrom(this.translate.use('en'));
      } catch {
        this.translate.setTranslation('en', english);
        await firstValueFrom(this.translate.use('en'));
      }
      this.selected.set('en');
      this.document.documentElement.lang = 'en';
    }
  }
}
