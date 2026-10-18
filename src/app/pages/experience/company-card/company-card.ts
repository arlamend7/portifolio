import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Company, ProjectEntry } from '../../../core/content/portfolio.schema';
import { LocaleStore } from '../../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../../core/i18n/localized-text.pipe';
import { Icon } from '../../../shared/icon/icon';
import { ProjectCard } from '../../../shared/project-card/project-card';

@Component({
  selector: 'app-company-card',
  imports: [TranslatePipe, LocalizedTextPipe, Icon, ProjectCard],
  templateUrl: './company-card.html',
  styleUrl: './company-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCard {
  readonly company = input.required<Company>();
  readonly projects = input<readonly ProjectEntry[]>([]);
  readonly expanded = input(false);
  readonly toggled = output<string>();
  protected readonly locale = inject(LocaleStore);
}
