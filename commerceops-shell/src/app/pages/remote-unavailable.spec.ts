import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoteUnavailable } from './remote-unavailable';

describe('RemoteUnavailable', () => {
  let fixture: ComponentFixture<RemoteUnavailable>;
  let component: RemoteUnavailable;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteUnavailable],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteUnavailable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the Products unavailable message', () => {
    // ADD THIS — Verify the fallback UI
    const heading = fixture.nativeElement.querySelector('h1');

    expect(heading.textContent).toContain(
      'Products is temporarily unavailable'
    );
  });

  it('should reload the application when Retry is clicked', () => {
    // ADD THIS — Spy on the component method
    const retrySpy = jest
      .spyOn(component, 'retry')
      .mockImplementation(() => undefined);

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();

    expect(retrySpy).toHaveBeenCalledTimes(1);

    retrySpy.mockRestore();
  });
});