import { Component, inject, input, output } from '@angular/core';
import { ElementRef, viewChild } from '@angular/core';
import { ThemeService } from '../services/theme';

@Component({
  selector: 'co-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly menuToggle = output<void>();
  readonly isMenuOpen = input(false);
  readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  readonly themeService = inject(ThemeService);

  // ADD THIS
  focusMenuButton(): void {
    this.menuButton()?.nativeElement.focus();
  }
  // ADD THIS — handle theme selection
  changeTheme(value: string): void {
    if (value === 'light' || value === 'dark' || value === 'system') {
      this.themeService.setTheme(value);
    }
  }
}
