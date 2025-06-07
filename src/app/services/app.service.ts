import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { mobileBreakpoint } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  private readonly innerWidthSignal = signal(window.innerWidth);
  private readonly isMobileSignal = computed(
    () => this.innerWidthSignal() < mobileBreakpoint
  );

  constructor() {
    window.addEventListener('resize', () => {
      this.innerWidthSignal.set(window.innerWidth);
    });
  }

  readonly width$ = toObservable(this.innerWidthSignal);
  readonly isMobile$ = toObservable(this.isMobileSignal);

  readonly width = computed(() => this.innerWidthSignal());
  readonly isMobile = computed(() => this.isMobileSignal());
}
