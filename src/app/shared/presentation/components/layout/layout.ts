import { Component, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    RouterLink,
    MatListItem,
    RouterLinkActive,
    MatSidenavContent,
    RouterOutlet,
  ],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  /** Whether the side navigation is open. */
  protected readonly sidenavOpened = signal(true);
  /** Navigation options shown in the sidenav. */
  protected readonly navItems = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'New reservation', path: '/reservations/new', icon: 'add_circle' },
  ];
  /** Opens or closes the side navigation. */
  protected toggleSidenav(): void {
    this.sidenavOpened.update((opened) => !opened);
  }
}
