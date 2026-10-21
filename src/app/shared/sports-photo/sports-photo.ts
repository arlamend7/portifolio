import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SportsPhotoContent } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';

@Component({
  selector: 'app-sports-photo',
  imports: [LocalizedTextPipe],
  templateUrl: './sports-photo.html',
  styleUrl: './sports-photo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.match-height]': 'matchHeight()' },
})
export class SportsPhoto {
  readonly photo = input.required<SportsPhotoContent>();
  readonly matchHeight = input(false);
  protected readonly locale = inject(LocaleStore);
}
