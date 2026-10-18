import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Feature } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-feature-card',
  imports: [Icon, LocalizedTextPipe],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCard {
  readonly feature = input.required<Feature>();
  readonly compact = input(false);
  protected readonly locale = inject(LocaleStore);
}
