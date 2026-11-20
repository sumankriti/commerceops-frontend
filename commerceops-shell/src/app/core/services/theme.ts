import {
    computed,
    effect,
    Injectable,
    signal,
  } from '@angular/core';

  export type ThemePreference = 'light' | 'dark' | 'system';
  export type ResolvedTheme = 'light' | 'dark';

  @Injectable({
    providedIn: 'root',
  })
  export class ThemeService {
    private readonly storageKey = 'commerceops-theme';

    private readonly mediaQuery =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    private readonly systemDark = signal(
      this.mediaQuery?.matches ?? false
    );

    readonly theme = signal<ThemePreference>(
      this.readSavedTheme()
    );

    readonly resolvedTheme = computed<ResolvedTheme>(() => {
      const preference = this.theme();

      if (preference === 'system') {
        return this.systemDark() ? 'dark' : 'light';
      }

      return preference;
    });

    constructor() {
      // ADD THIS — synchronize the document with theme state
      effect(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.dataset['theme'] =
            this.resolvedTheme();
        }
      });

      // ADD THIS — react to operating system theme changes
      this.mediaQuery?.addEventListener('change', (event) => {
        this.systemDark.set(event.matches);
      });
    }

    setTheme(preference: ThemePreference): void {
      this.theme.set(preference);

      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(this.storageKey, preference);
        } catch {
          // Storage may be unavailable in restricted environments.
        }
      }
    }

    private readSavedTheme(): ThemePreference {
      if (typeof localStorage === 'undefined') {
        return 'system';
      }

      try {
        const saved = localStorage.getItem(this.storageKey);

        if (
          saved === 'light' ||
          saved === 'dark' ||
          saved === 'system'
        ) {
          return saved;
        }
      } catch {
        // Fall back to the system preference.
      }

      return 'system';
    }
  }