import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ShellLayout } from './shell-layout';
import { provideRouter } from '@angular/router';
import { map, Subject } from 'rxjs';

describe('ShellLayout', () => {
  let component: ShellLayout;
  let fixture: ComponentFixture<ShellLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellLayout],
      providers: [
        provideRouter([]), // ADD THIS
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ADD THIS — Verify sidebar toggle
it('should toggle sidebar open and closed', () => {
  expect(component.isSidebarOpen()).toBe(false);

  component.toggleSidebar();
  expect(component.isSidebarOpen()).toBe(true);

  component.toggleSidebar();
  expect(component.isSidebarOpen()).toBe(false);
});

// ADD THIS — Verify Escape key behavior
it('should close sidebar when Escape is pressed', () => {
  component.toggleSidebar();

  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    })
  );

  expect(component.isSidebarOpen()).toBe(false);
});

// ADD THIS — Verify closing when already closed
it('should safely handle repeated close requests', () => {
  expect(component.isSidebarOpen()).toBe(false);

  component.closeSidebar();

  expect(component.isSidebarOpen()).toBe(false);
});

// ADD THIS — Verify keyboard focus restoration
it('should restore focus to the menu button when sidebar closes', () => {
  const header = component.header();

  expect(header).toBeDefined();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const focusSpy = jest.spyOn(header!, 'focusMenuButton');

  component.toggleSidebar();
  component.closeSidebar();

  expect(focusSpy).toHaveBeenCalledTimes(1);
  expect(component.isSidebarOpen()).toBe(false);
});

// ADD THIS — Verify desktop breakpoint behavior
it('should close the sidebar when switching to desktop', () => {
  const breakpointObserver = TestBed.inject(BreakpointObserver);

  const breakpointChanges = new Subject<boolean>();

  const observeSpy = jest
    .spyOn(breakpointObserver, 'observe')
    .mockReturnValue(
      breakpointChanges.asObservable().pipe(
        map((matches:unknown) => ({
          matches,
          breakpoints: {
            '(min-width: 48.0625rem)': matches,
          },
        }))
      )
    );

  // Recreate the component so its constructor subscribes to our mock
  fixture.destroy();

  fixture = TestBed.createComponent(ShellLayout);
  component = fixture.componentInstance;
  fixture.detectChanges();

  component.toggleSidebar();
  expect(component.isSidebarOpen()).toBe(true);

  breakpointChanges.next(true);

  expect(component.isSidebarOpen()).toBe(false);

  observeSpy.mockRestore();
});

// ADD THIS — Verify deferred focus is cancelled after closing
it('should not focus sidebar if it closes before the next render', async () => {
  const focusSpy = jest.spyOn(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    component.sidebar()!,
    'focusFirstLink'
  );

  component.toggleSidebar();
  expect(component.isSidebarOpen()).toBe(true);

  // CHANGE HERE — Close before the deferred callback executes
  component.closeSidebar();

  expect(component.isSidebarOpen()).toBe(false);

  fixture.detectChanges();
  await fixture.whenStable();

  expect(focusSpy).not.toHaveBeenCalled();
});
});
