import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Users } from '../interfaces/users';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  public getUsers(): Observable<Users> {
    return this.http
      .get<Users>(this.URL + `users`)
      .pipe(map((resp: Users) => resp));
  }

  public getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(this.URL + `users/${id}`)
      .pipe(map((resp: User) => resp));
  }

  public deleteUsers(id: number): Observable<User> {
    return this.http.delete<User>(this.URL + `users/${id}`, {
      headers: this.headers,
    });
  }

  public generateUser(data: FormGroup): Observable<User> {
    return this.http.post<User>(this.URL + `users/register`, data, {
      headers: this.headers,
    });
  }

  public updateUser(id: number, data: FormGroup): Observable<User> {
    return this.http.patch<User>(this.URL + `users/${id}`, data, {
      headers: this.headers,
    });
  }
}
