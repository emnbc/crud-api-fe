import { Component, input, WritableSignal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sidenav = input.required<MatSidenav>();
  isDarkMode = input.required<WritableSignal<boolean>>();

  get darkModeSignal() {
    return this.isDarkMode();
  }
}
