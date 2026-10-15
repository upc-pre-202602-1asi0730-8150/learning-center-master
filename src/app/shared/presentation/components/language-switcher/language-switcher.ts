import { Component, inject } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

/**
 * @summary Toggle buttons (EN / ES) to switch the interface language.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  /** Languages offered to the user. */
  protected readonly languages = ['en', 'es'];

  /** Reactive signal with the active language. */
  protected readonly currentLang = this.translate.currentLang;

  /** Switches the active language. */
  protected changeLanguage(event: MatButtonToggleChange): void {
    this.translate.use(event.value);
  }
}
