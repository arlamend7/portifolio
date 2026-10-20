import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Feature } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
@Component({
  selector: 'app-feature-card',
  imports: [RouterLink, TranslatePipe, LocalizedTextPipe],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCard {
  readonly feature = input.required<Feature>();
  readonly documentationLink = input<string[] | null>(null);
  protected readonly locale = inject(LocaleStore);
}
