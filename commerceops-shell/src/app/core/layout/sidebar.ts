import { Component, ElementRef, output, viewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'co-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly navigationSelected = output<void>();
  // readonly firstNavLink =
  // viewChild<ElementRef<HTMLAnchorElement>>('firstNavLink');
  readonly firstNavLink = viewChildren<ElementRef<HTMLAnchorElement>>(
    'firstNavLink'
  );

  readonly navigation = [
    { label: 'Dashboard', path: '/dashboard', icon: '◫' },
    { label: 'Products', path: '/products', icon: '▦' },
    { label: 'Orders', path: '/orders', icon: '▤' },
    { label: 'Inventory', path: '/inventory', icon: '▥' },
    { label: 'Analytics', path: '/analytics', icon: '◷' },
  ];
  // ADD THIS
focusFirstLink(): void {
  this.firstNavLink()[0]?.nativeElement.focus();
}
}
