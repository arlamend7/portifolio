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
  private readonly changingTheme = signal(false);
  readonly transitioning = this.changingTheme.asReadonly();

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
    if (theme === this.theme() || this.transitioning()) return;

    const root = this.document.documentElement;
    const applyTheme = () => {
      this.storage.write('theme', theme);
      this.selectedTheme.set(theme);
      // Update before the browser captures the new theme snapshot.
      root.dataset['theme'] = theme;
    };
    const reduceMotion = this.document.defaultView?.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) {
      applyTheme();
      return;
    }

    this.changingTheme.set(true);
    if (!this.document.startViewTransition) {
      this.revealWithSnapshot(applyTheme);
      return;
    }
    root.classList.add('theme-transition');
    const transition = this.document.startViewTransition(applyTheme);
    // A hidden tab or interrupted snapshot may skip the animation.
    void transition.ready.catch(() => undefined);
    const finish = () => {
      root.classList.remove('theme-transition');
      this.changingTheme.set(false);
    };
    void transition.finished.then(finish, finish);
  }

  /** Compatibility path for browsers without native page snapshots. */
  private revealWithSnapshot(applyTheme: () => void): void {
    const view = this.document.defaultView;
    const app = this.document.querySelector('app-root');
    if (!view || !app) {
      applyTheme();
      this.changingTheme.set(false);
      return;
    }
    const snapshot = this.document.createElement('div');
    snapshot.className = 'theme-transition-snapshot';
    snapshot.inert = true;
    snapshot.setAttribute('aria-hidden', 'true');
    const styles = view.getComputedStyle(this.document.documentElement);
    for (const property of Array.from(styles)) {
      if (property.startsWith('--')) {
        snapshot.style.setProperty(property, styles.getPropertyValue(property));
      }
    }
    snapshot.style.colorScheme = styles.colorScheme;
    const copy = app.cloneNode(true) as HTMLElement;
    copy.style.display = 'block';
    copy.style.marginTop = `-${view.scrollY}px`;
    snapshot.append(copy);
    this.document.body.append(snapshot);
    applyTheme();
    const finish = () => {
      snapshot.remove();
      this.changingTheme.set(false);
    };
    snapshot.addEventListener('animationend', finish, { once: true });
    // Also clean up if the browser suppresses or interrupts the CSS animation.
    view.setTimeout(finish, 3800);
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
