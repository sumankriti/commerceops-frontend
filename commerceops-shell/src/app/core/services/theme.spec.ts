import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme'; // CHANGE HERE

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService); // CHANGE HERE
  });

  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to system preference', () => {
    expect(service.theme()).toBe('system');
  });

  it('should switch to dark theme', async () => {
    service.setTheme('dark');

    await TestBed.inject(
      // Angular effects are flushed through TestBed
      // during stabilization in component tests.
      ThemeService
    );

    expect(service.theme()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('should persist theme preference', () => {
    service.setTheme('light');

    expect(localStorage.getItem('commerceops-theme')).toBe(
      'light'
    );
  });

  // ADD THIS — Invalid saved theme should fall back to system
it('should fall back to system for invalid stored theme', () => {
  localStorage.setItem('commerceops-theme', 'invalid');

  // Recreate the service so its constructor reads storage again
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({});

  const newService = TestBed.inject(ThemeService);

  expect(newService.theme()).toBe('system');
});

// ADD THIS — Restore a previously saved dark theme
it('should restore a saved dark theme', () => {
  localStorage.setItem('commerceops-theme', 'dark');

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({});

  const newService = TestBed.inject(ThemeService);

  expect(newService.theme()).toBe('dark');
  expect(newService.resolvedTheme()).toBe('dark');
});

// ADD THIS — System preference resolves to light when OS is not dark
it('should resolve system preference to light when OS prefers light', () => {
  expect(service.theme()).toBe('system');
  expect(service.resolvedTheme()).toBe('light');
});

it('should switch to dark theme', () => {
  service.setTheme('dark');

  expect(service.theme()).toBe('dark');
  expect(service.resolvedTheme()).toBe('dark');
});

// ADD THIS — Theme changes should work even if storage fails
it('should update theme when localStorage throws an error', () => {
  const storageSpy = jest
    .spyOn(Storage.prototype, 'setItem')
    .mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

  try {
    expect(() => service.setTheme('dark')).not.toThrow();

    expect(service.theme()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
  } finally {
    storageSpy.mockRestore();
  }
});

// ADD THIS — Handle environments without localStorage
it('should default to system when localStorage is unavailable', () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    window,
    'localStorage'
  );

  try {
    // CHANGE HERE — Simulate unavailable browser storage
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: undefined,
    });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const newService = TestBed.inject(ThemeService);

    expect(newService.theme()).toBe('system');
    expect(newService.resolvedTheme()).toBe('light');
  } finally {
    // KEEP EXISTING — Restore browser storage
    if (originalDescriptor) {
      Object.defineProperty(
        window,
        'localStorage',
        originalDescriptor
      );
    }
  }
});

});