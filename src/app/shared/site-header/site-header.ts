import { ThemeStore } from '../../core/preferences/theme-store';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Portfolio } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  readonly profile = input.required<Portfolio['profile']>();
  protected readonly theme = inject(ThemeStore);

  protected toggleTheme(): void {
    this.theme.select(this.theme.theme() === 'dark' ? 'light' : 'dark');
  }

  protected changeAccent(event: Event): void {
    if (event.target instanceof HTMLInputElement) this.theme.changeAccent(event.target.value);
  }
  protected readonly locale = inject(LocaleStore);
  protected readonly activeOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored',
  } as const;
  protected readonly links = [
    { key: 'home', route: '/', fragment: undefined },
    { key: 'experience', route: '/work', fragment: undefined },
    { key: 'projects', route: '/projects', fragment: undefined },
    { key: 'sports', route: '/sports', fragment: undefined },
  ];
}
