import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { accentTextColor, isAccentColor } from './accent-color';
import { BrowserStorage } from './browser-storage';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly storage = inject(BrowserStorage);
  private readonly document = inject(DOCUMENT);
  private readonly selectedTheme = signal<Theme>(this.readTheme());
  private readonly selectedAccent = signal(this.readAccent());

  private readonly customAccent = signal(isAccentColor(this.storage.read('accent')));

  readonly theme = this.selectedTheme.asReadonly();
  readonly accent = this.selectedAccent.asReadonly();

  constructor() {
    effect(() => {
      const root = this.document.documentElement;
      root.dataset['theme'] = this.theme();
      root.style.setProperty('--custom-accent', this.accent());
      root.style.setProperty('--custom-on-accent', accentTextColor(this.accent()));
      root.dataset['customAccent'] = String(this.customAccent());
    });
  }

  select(theme: Theme): void {
    this.storage.write('theme', theme);
    this.selectedTheme.set(theme);
  }

  changeAccent(value: string): void {
    if (!isAccentColor(value)) return;
    this.storage.write('accent', value);
    this.selectedAccent.set(value);
    this.customAccent.set(true);
  }

  private readAccent(): string {
    const stored = this.storage.read('accent');
    return isAccentColor(stored) ? stored : '#245b45';
  }

  private readTheme(): Theme {
    const saved = this.storage.read('theme');
    return saved === 'dark' ? 'dark' : 'light';
  }
}
