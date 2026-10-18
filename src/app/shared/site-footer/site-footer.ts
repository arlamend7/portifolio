import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Portfolio } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  readonly profile = input.required<Portfolio['profile']>();
  protected readonly locale = inject(LocaleStore);
  protected readonly year = new Date().getFullYear();
}
