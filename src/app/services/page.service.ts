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
    return this.http.get(path, {responseType: 'text'});
  }
}
