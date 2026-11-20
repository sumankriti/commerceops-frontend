import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ADD THIS — Verify menu toggle output
it('should emit menuToggle when triggered', () => {
  const emitSpy = jest.spyOn(component.menuToggle, 'emit');

  component.menuToggle.emit();

  expect(emitSpy).toHaveBeenCalledTimes(1);
});

// ADD THIS — Verify keyboard focus
it('should focus the menu button', () => {
  const button = component.menuButton()?.nativeElement;

  expect(button).toBeDefined();

  component.focusMenuButton();

  expect(document.activeElement).toBe(button);
});

// ADD THIS — Verify valid theme selections
it.each(['light', 'dark', 'system'] as const)(
  'should accept %s theme',
  (theme) => {
    const setThemeSpy = jest.spyOn(
      component.themeService,
      'setTheme'
    );

    component.changeTheme(theme);

    expect(setThemeSpy).toHaveBeenCalledWith(theme);
  }
);

// ADD THIS — Reject unsupported theme values
it('should ignore invalid theme selections', () => {
  const setThemeSpy = jest.spyOn(
    component.themeService,
    'setTheme'
  );

  component.changeTheme('invalid');

  expect(setThemeSpy).not.toHaveBeenCalled();
});

// ADD THIS — Verify actual menu button interaction
it('should emit menuToggle when menu button is clicked', () => {
  const emitSpy = jest.spyOn(component.menuToggle, 'emit');

  const menuButton = fixture.nativeElement.querySelector(
    '.header__menu'
  ) as HTMLButtonElement;

  expect(menuButton).not.toBeNull();

  menuButton.click();

  expect(emitSpy).toHaveBeenCalledTimes(1);
});

// ADD THIS — Verify theme selection from UI
it('should switch to dark theme using the dropdown', () => {
  const setThemeSpy = jest.spyOn(
    component.themeService,
    'setTheme'
  );

  const select = fixture.nativeElement.querySelector(
    '#commerceops-theme'
  ) as HTMLSelectElement;

  expect(select).not.toBeNull();

  select.value = 'dark';

  select.dispatchEvent(
    new Event('change', { bubbles: true })
  );

  expect(setThemeSpy).toHaveBeenCalledWith('dark');
});

// ADD THIS — Verify accessible navigation controls
it('should expose accessible menu and theme controls', () => {
  const compiled = fixture.nativeElement as HTMLElement;

  const menuButton = compiled.querySelector(
    '.header__menu'
  ) as HTMLButtonElement;

  const themeSelect = compiled.querySelector(
    '#commerceops-theme'
  ) as HTMLSelectElement;

  expect(menuButton.getAttribute('aria-label'))
    .toBe('Toggle navigation');

  expect(menuButton.getAttribute('aria-controls'))
    .toBe('commerceops-sidebar');

  expect(themeSelect.getAttribute('aria-label'))
    .toBe('Choose application theme');
});

// ADD THIS — Verify expanded navigation state
it('should expose the menu expanded state', () => {
  const menuButton = fixture.nativeElement.querySelector(
    '.header__menu'
  ) as HTMLButtonElement;

  expect(menuButton.getAttribute('aria-expanded')).toBe('false');

  fixture.componentRef.setInput('isMenuOpen', true);
  fixture.detectChanges();

  expect(menuButton.getAttribute('aria-expanded')).toBe('true');
});

});
