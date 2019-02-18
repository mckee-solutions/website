import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  pageData: string;

  constructor(private pageService: PageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
      }
    });
  }

}
