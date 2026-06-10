import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

/** Keep the global spinner visible long enough to notice (demo / slow networks). */
const MIN_NAVIGATION_LOADING_MS = 600;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isNavigating = signal(false);

  constructor() {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    let navigationStartedAt = 0;

    const scheduleHide = (): void => {
      const remaining = Math.max(0, MIN_NAVIGATION_LOADING_MS - (Date.now() - navigationStartedAt));
      hideTimeout = setTimeout(() => this.isNavigating.set(false), remaining);
    };

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = undefined;
        }
        navigationStartedAt = Date.now();
        this.isNavigating.set(true);
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        scheduleHide();
      }
    });
  }
}
