import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Respuesta, Data } from '../interfaces/login';
import { User } from 'src/app/auth/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  public login(data: Data): Observable<Respuesta> {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<Respuesta>(this.URL + `users/login`, data, {
      headers: headers,
    });
  }

  public logout(): Observable<Respuesta> {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get<Respuesta>(this.URL + `users/logout`, {
      headers: headers,
    });
  }

  public me(): Observable<User> {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http
      .get<User>(this.URL + `users/me`, {
        headers: headers,
      })
      .pipe(map((resp: User) => resp));
  }

  public auth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http
      .get<Respuesta>(this.URL + `users/me`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          if (res.success) {
            return true;
          }

          return false;
        })
      );
  }
}
