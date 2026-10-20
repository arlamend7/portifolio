import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Portfolio } from '../../../core/content/portfolio.schema';
import { LocaleStore } from '../../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../../core/i18n/localized-text.pipe';
import { Icon } from '../../../shared/icon/icon';
@Component({
  selector: 'app-connection-card',
  imports: [TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './connection-card.html',
  styleUrl: './connection-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionCard {
  readonly link = input.required<Portfolio['profile']['socialLinks'][number]>();
  protected readonly locale = inject(LocaleStore);
}
