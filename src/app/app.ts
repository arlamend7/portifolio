import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from './core/content/portfolio-store';
import { SiteHeader } from './shared/site-header/site-header';
import { SiteFooter } from './shared/site-footer/site-footer';
import { ReadingPreferences } from './shared/reading-preferences/reading-preferences';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, SiteHeader, SiteFooter, ReadingPreferences],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly content = inject(PortfolioStore);
}
