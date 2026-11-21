import { Component, input } from '@angular/core';

@Component({
  selector: 'co-remote-unavailable',
  imports: [],
  templateUrl: './remote-unavailable.html',
  styleUrl: './remote-unavailable.scss',
})
export class RemoteUnavailable {
  readonly featureName = input('Products');

  retry(): void {
    window.location.reload();
  }
}
