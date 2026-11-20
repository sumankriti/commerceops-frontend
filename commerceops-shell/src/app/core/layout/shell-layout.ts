import { afterNextRender, Component, HostListener, inject, Injector, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'co-shell-layout',
  imports: [RouterOutlet, Sidebar, Header, A11yModule],
  templateUrl: './shell-layout.html',
  styleUrl: './shell-layout.scss',
})
export class ShellLayout {
  // ADD THIS — close mobile navigation using Escape
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isSidebarOpen()) {
      this.closeSidebar();
    }
  }
  private readonly injector = inject(Injector);
  private readonly breakpointObserver = inject(BreakpointObserver);
readonly sidebar = viewChild(Sidebar);
  readonly header = viewChild(Header);
  readonly isSidebarOpen = signal(false);

  constructor() {
    this.breakpointObserver
      .observe('(min-width: 48.0625rem)')
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        if (matches && this.isSidebarOpen()) {
          this.isSidebarOpen.set(false);
        }
      });
  }

  toggleSidebar(): void {
    const shouldOpen = !this.isSidebarOpen();

    this.isSidebarOpen.set(shouldOpen);

    if (shouldOpen) {
      afterNextRender(() => {
        if (this.isSidebarOpen()) {
          this.sidebar()?.focusFirstLink();
        }
      }, { injector: this.injector });
    }
  }
  // CHANGE HERE
  closeSidebar(): void {
    if (!this.isSidebarOpen()) {
      return;
    }

    this.isSidebarOpen.set(false);
    this.header()?.focusMenuButton();
  }

}
