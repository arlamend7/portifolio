import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { SportsAchievement } from '../../shared/sports-achievement/sports-achievement';
import { SportsPhoto } from '../../shared/sports-photo/sports-photo';

@Component({
  selector: 'app-sports-page',
  imports: [RouterLink, TranslatePipe, LocalizedTextPipe, SportsAchievement, SportsPhoto],
  templateUrl: './sports-page.html',
  styleUrl: './sports-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsPage {
  protected readonly store = inject(PortfolioStore);
  protected readonly locale = inject(LocaleStore);
  protected readonly seasons = computed(() => {
    const achievements = this.store.portfolio()?.sports.achievements ?? [];
    return [...new Set(achievements.map((achievement) => achievement.year))]
      .sort((a, b) => b - a)
      .map((year) => ({ year, achievements: achievements.filter((item) => item.year === year) }));
  });
}
