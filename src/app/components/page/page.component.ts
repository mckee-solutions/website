import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  pageData: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('pages/about.html', {responseType: 'text'}).subscribe(htmlData => {
      this.pageData = htmlData;
    });
  }

}
