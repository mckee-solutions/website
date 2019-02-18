import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpClient) {

  }

  getPageForPath(path: string): Observable<string> {
    if (path.startsWith('/')) {
      path = '/pages' + path;
    }
    if (!path.endsWith('.html')) {
      path = path + '.html';
    }
    return this.http.get(path, {responseType: 'text'});
  }
}
