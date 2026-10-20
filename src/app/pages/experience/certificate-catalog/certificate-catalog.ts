import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Certificate, certificateCategories } from '../../../core/content/portfolio.schema';
import { CertificateCard } from '../../../shared/certificate-card/certificate-card';
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
@Component({
  selector: 'app-certificate-catalog',
  imports: [TranslatePipe, CertificateCard],
  templateUrl: './certificate-catalog.html',
  styleUrl: './certificate-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateCatalog {
  readonly certificates = input.required<Certificate[]>();
  protected readonly categories = certificateCategories;
  protected readonly query = signal('');
  protected readonly category = signal('');
  protected readonly kind = signal('');
  protected readonly limit = signal(12);
  protected readonly filtered = computed(() => {
    const query = normalize(this.query());
    return this.certificates().filter(
      (item) =>
        (!this.category() || item.category === this.category()) &&
        (!this.kind() || item.kind === this.kind()) &&
        (!query ||
          normalize([...Object.values(item.title), item.provider].join(' ')).includes(query)),
    );
  });
  protected readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  protected setQuery(value: string): void {
    this.query.set(value);
    this.limit.set(12);
  }
  protected setCategory(value: string): void {
    this.category.set(value);
    this.limit.set(12);
  }
  protected setKind(value: string): void {
    this.kind.set(value);
    this.limit.set(12);
  }
  protected reset(): void {
    this.query.set('');
    this.category.set('');
    this.kind.set('');
    this.limit.set(12);
  }
  protected showMore(): void {
    this.limit.update((limit) => limit + 12);
  }
}
