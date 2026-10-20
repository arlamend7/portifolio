import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsPhotoContent } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-sports-photo',
  imports: [TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './sports-photo.html',
  styleUrl: './sports-photo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsPhoto {
  readonly photo = input.required<SportsPhotoContent>();
  protected readonly locale = inject(LocaleStore);
}
