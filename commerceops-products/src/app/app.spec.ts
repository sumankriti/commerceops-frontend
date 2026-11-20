import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { NxWelcome } from './nx-welcome';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NxWelcome],
    }).compileComponents();
  });

 // CHANGE HERE — Verify the actual Products MFE heading
it('should render the Products MFE heading', async () => {
  const fixture = TestBed.createComponent(App);

  fixture.detectChanges();
  await fixture.whenStable();

  const compiled = fixture.nativeElement as HTMLElement;

  const heading = compiled.querySelector('h2');

  expect(heading).not.toBeNull();
  expect(heading?.textContent?.trim()).toBe(
    'Products MFE loaded successfully!',
  );
});
});
