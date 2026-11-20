import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidebar } from './sidebar';
import { provideRouter, Router} from '@angular/router';
import { Component } from '@angular/core';

// ADD THIS — Lightweight route component for testing
@Component({
  template: '',
})
class MockPage {}

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([
        { path: 'dashboard', component: MockPage },
        { path: 'products', component: MockPage },
        { path: 'orders', component: MockPage },
        { path: 'inventory', component: MockPage },
        { path: 'analytics', component: MockPage },
      ])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // ADD THIS — Verify navigation configuration
it('should contain all five navigation items', () => {
  expect(component.navigation).toHaveLength(5);

  expect(component.navigation.map(item => item.path)).toEqual([
    '/dashboard',
    '/products',
    '/orders',
    '/inventory',
    '/analytics',
  ]);
});

// ADD THIS — Verify first navigation link receives focus
it('should focus the first navigation link', () => {
  const firstLink =
    component.firstNavLink()[0]?.nativeElement;


  expect(firstLink).toBeDefined();

  component.focusFirstLink();

  expect(document.activeElement).toBe(firstLink);
});

// ADD THIS — Verify navigation output
it('should emit navigationSelected when requested', () => {
  const emitSpy = jest.spyOn(component.navigationSelected, 'emit');

  component.navigationSelected.emit();

  expect(emitSpy).toHaveBeenCalledTimes(1);
});

// ADD THIS — Verify actual navigation interaction
it('should emit navigationSelected when a link is clicked', () => {
  const emitSpy = jest.spyOn(component.navigationSelected, 'emit');

  const links = fixture.nativeElement.querySelectorAll(
    '.sidebar__link'
  ) as NodeListOf<HTMLAnchorElement>;

  expect(links.length).toBe(5);

  links[1].click(); // Products

  expect(emitSpy).toHaveBeenCalledTimes(1);
});

// ADD THIS — Verify active route accessibility
it('should mark the active route with aria-current', async () => {
  const router = TestBed.inject(Router);

  await router.navigateByUrl('/products');
  await fixture.whenStable();
  fixture.detectChanges();

  const productsLink = fixture.nativeElement.querySelector(
    'a[href="/products"]'
  ) as HTMLAnchorElement;

  expect(productsLink).not.toBeNull();
  expect(productsLink.getAttribute('aria-current')).toBe('page');
  expect(productsLink.classList.contains('sidebar-link__active'))
    .toBe(true);
});

});
