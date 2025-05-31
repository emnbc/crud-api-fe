import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-inner-pages',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatSidenavModule],
  templateUrl: './inner-pages.component.html',
  styleUrl: './inner-pages.component.scss',
})
export class InnerPagesComponent {}
