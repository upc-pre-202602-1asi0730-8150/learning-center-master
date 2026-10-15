import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * @summary View shown when the requested route does not exist. Displays the missing route and a button to go back to Home.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, MatButtonModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  private readonly router = inject(Router);

  /** The route that was requested and could not be found. */
  protected readonly requestedPath = this.router.url;
}
