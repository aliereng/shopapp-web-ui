import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @HostListener('window:beforeunload', ['$event'])
  //  onWindowClose(event: any): void {
  //   // Do something
  //   localStorage.clear()
  //    event.preventDefault();
  //    event.returnValue = false;

  // }
  title = 'shopapp-web-ui';
}
