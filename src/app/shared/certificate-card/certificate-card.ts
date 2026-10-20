import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Certificate } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { Icon } from '../icon/icon';
@Component({
  selector: 'app-certificate-card',
  imports: [NgTemplateOutlet, TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './certificate-card.html',
  styleUrl: './certificate-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateCard {
  readonly certificate = input.required<Certificate>();
  protected readonly locale = inject(LocaleStore);
  protected readonly issued = computed(() =>
    new Intl.DateTimeFormat(this.locale.current(), {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(this.certificate().issued + '-01T12:00:00Z')),
  );
}
