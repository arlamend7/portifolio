import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Company } from '../../../core/content/portfolio.schema';
import { LocaleStore } from '../../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../../core/i18n/localized-text.pipe';
import { Icon } from '../../../shared/icon/icon';
@Component({
  selector: 'app-job-preview',
  imports: [RouterLink, TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './job-preview.html',
  styleUrl: './job-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobPreview {
  readonly company = input.required<Company>();
  protected readonly locale = inject(LocaleStore);
}
