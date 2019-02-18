import {Component} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './left-sidebar.component.html'
})
export class LeftSidebarComponent {
  constructor(private location: Location) {
  }

  page(newPath: string) {
    this.location.replaceState(newPath);
  }
}
