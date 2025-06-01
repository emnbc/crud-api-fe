import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-inner-pages',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    MatListModule,
    MatIcon,
  ],
  templateUrl: './inner-pages.component.html',
  styleUrl: './inner-pages.component.scss',
})
export class InnerPagesComponent {
  isDarkMode = signal(false);
}
