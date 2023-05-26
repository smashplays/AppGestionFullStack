import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Documents } from '../interfaces/documents';
import { Document } from '../interfaces/document';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Client } from '../interfaces/client';
import { Clients } from '../interfaces/clients';
import { Finished } from '../interfaces/finished';
import { Finisheds } from '../interfaces/finisheds';
import { DocumentCreate } from '../interfaces/document-create';
import { FinishedGet } from '../interfaces/finished-get';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:8000/api/';

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  public getDocuments(): Observable<Documents> {
    return this.http
      .get<Documents>(this.URL + `documents`)
      .pipe(map((resp: Documents) => resp));
  }

  public getTerminados(): Observable<Finisheds> {
    return this.http
      .get<Finisheds>(this.URL + `terminados`)
      .pipe(map((resp: Finisheds) => resp));
  }

  public getClients(): Observable<Clients> {
    return this.http
      .get<Clients>(this.URL + `clients`)
      .pipe(map((resp: Clients) => resp));
  }

  public deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(this.URL + `clients/${id}`, {
      headers: this.headers,
    });
  }

  public getDocumentById(id: number): Observable<Document> {
    return this.http
      .get<Document>(this.URL + `documents/${id}`)
      .pipe(map((resp: Document) => resp));
  }

  public getClientById(id: number): Observable<Client> {
    return this.http
      .get<Client>(this.URL + `clients/${id}`)
      .pipe(map((resp: Client) => resp));
  }

  public deleteDocument(id: number): Observable<Document> {
    return this.http.delete<Document>(this.URL + `documents/${id}`, {
      headers: this.headers,
    });
  }

  public generateDocument(data: FormGroup): Observable<Document> {
    return this.http.post<Document>(this.URL + `documents`, data, {
      headers: this.headers,
    });
  }

  public updateDocument(id: number, data: FormGroup): Observable<Document> {
    return this.http.patch<Document>(this.URL + `documents/${id}`, data, {
      headers: this.headers,
    });
  }

  public updateClient(id: number, data: FormGroup): Observable<Client> {
    return this.http.patch<Client>(this.URL + `clients/${id}`, data, {
      headers: this.headers,
    });
  }

  public clientDocument(id: number): Observable<Client> {
    return this.http
      .get<Client>(this.URL + `documents/${id}/client`)
      .pipe(map((resp: Client) => resp));
  }

  public postTerminado(data: Finished): Observable<Finished> {
    return this.http.post<Finished>(this.URL + `terminados`, data, {
      headers: this.headers,
    });
  }

  public postRetomado(data: DocumentCreate): Observable<DocumentCreate> {
    return this.http.post<DocumentCreate>(this.URL + `documents`, data, {
      headers: this.headers,
    });
  }

  public deleteFinished(id: number): Observable<Finished> {
    return this.http.delete<Finished>(this.URL + `terminados/${id}`, {
      headers: this.headers,
    });
  }

  public getFinishedById(id: number): Observable<FinishedGet> {
    return this.http
      .get<FinishedGet>(this.URL + `terminados/${id}`)
      .pipe(map((resp: FinishedGet) => resp));
  }
}
