import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, TranslatePipe],
  template:
    '<main id="main-content" class="container page-section"><h1>{{ "common.notFound" | translate }}</h1><a routerLink="/">{{ "common.backHome" | translate }}</a></main>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
