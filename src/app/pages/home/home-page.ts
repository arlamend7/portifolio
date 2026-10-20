import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { FeatureCard } from '../../shared/feature-card/feature-card';
import { CertificateCard } from '../../shared/certificate-card/certificate-card';
import { ConnectionCard } from './connection-card/connection-card';
import { JobPreview } from './job-preview/job-preview';
import { TechnologyList } from '../../shared/technology-list/technology-list';
import { Icon } from '../../shared/icon/icon';
import { ProjectGrid } from '../../shared/project-grid/project-grid';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { SportsAchievement } from '../../shared/sports-achievement/sports-achievement';
import { LanguageTests } from './language-tests/language-tests';
import { SportsPhoto } from '../../shared/sports-photo/sports-photo';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    TranslatePipe,
    LocalizedTextPipe,
    FeatureCard,
    Icon,
    ProjectGrid,
    SectionHeading,
    SportsAchievement,
    SportsPhoto,
    CertificateCard,
    ConnectionCard,
    JobPreview,
    TechnologyList,
    LanguageTests,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly store = inject(PortfolioStore);
  protected readonly locale = inject(LocaleStore);
  protected readonly recentCompanies = computed(
    () => this.store.portfolio()?.companies.slice(0, 3) ?? [],
  );
  protected readonly featuredCertificates = computed(() => {
    const content = this.store.portfolio();
    return (
      content?.home.certificateIds
        .slice(0, 3)
        .flatMap((id) => content.certificates.filter((item) => item.id === id)) ?? []
    );
  });
  protected readonly featuredProjects = computed(
    () => this.store.portfolio()?.projects.slice(0, 4) ?? [],
  );
  protected readonly sportsHighlights = computed(() => {
    const sports = this.store.portfolio()?.sports;
    return (
      sports?.highlightIds
        .slice(0, 3)
        .flatMap((id) => sports.achievements.filter((item) => item.id === id)) ?? []
    );
  });
}
