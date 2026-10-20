import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsAchievement as Achievement } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-sports-achievement',
  imports: [TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './sports-achievement.html',
  styleUrl: './sports-achievement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsAchievement {
  readonly achievement = input.required<Achievement>();
  protected readonly locale = inject(LocaleStore);
}
