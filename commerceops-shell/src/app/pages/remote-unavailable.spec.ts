import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoteUnavailable } from './remote-unavailable';

describe('RemoteUnavailable', () => {
  let component: RemoteUnavailable;
  let fixture: ComponentFixture<RemoteUnavailable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteUnavailable],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteUnavailable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the unavailable message', () => {
    const heading: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent).toContain('This feature is temprorary unavailable');
  });

  it('should invoke retry when clicked on button', () => {
    const retrySpy = jest
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .spyOn(component,'retry').mockImplementation(() => {});

    const button : HTMLButtonElement =
    fixture.nativeElement.querySelector('button');

    button.click();
    expect(retrySpy).toHaveBeenCalledTimes(1);
  });

});
