import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Events } from '../interfaces/events';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  public getEvents(): Observable<Events> {
    return this.http
      .get<Events>(this.URL + `events`)
      .pipe(map((resp: Events) => resp));
  }

  public getEventById(id: number): Observable<Event> {
    return this.http
      .get<Event>(this.URL + `events/${id}`)
      .pipe(map((resp: Event) => resp));
  }

  public deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.URL + `events/${id}`, {
      headers: this.headers,
    });
  }

  public updateEvent(id: number, data: FormGroup): Observable<Event> {
    return this.http.patch<Event>(this.URL + `events/${id}`, data, {
      headers: this.headers,
    });
  }

  public generateEvent(data: FormGroup): Observable<Event> {
    return this.http.post<Event>(this.URL + `events`, data, {
      headers: this.headers,
    });
  }
}
