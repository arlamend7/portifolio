import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { FeatureCard } from '../../shared/feature-card/feature-card';
import { Icon } from '../../shared/icon/icon';
import { ProjectCard } from '../../shared/project-card/project-card';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { ReadingPreferencesStore } from '../../core/preferences/reading-preferences-store';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    TranslatePipe,
    LocalizedTextPipe,
    FeatureCard,
    Icon,
    ProjectCard,
    SectionHeading,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly preferences = inject(ReadingPreferencesStore);
  protected readonly store = inject(PortfolioStore);
  protected readonly locale = inject(LocaleStore);
  protected readonly steam = computed(() =>
    this.store.portfolio()?.profile.socialLinks.find((link) => link.label === 'Steam'),
  );
  protected readonly packages = computed(
    () => this.store.portfolio()?.projects.filter((project) => project.kind === 'package') ?? [],
  );
}
