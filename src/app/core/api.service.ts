import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(payload: object): Observable<any> {
    const url = `${this.BASE_URL}/api/login`;
    return this.http.post<User>(url, payload);
  }

  register(payload: object): any {
    const url = `${this.BASE_URL}/api/register`;
    return this.http.post(url, payload);
  }

  authenticateUser(token: string): any {
    const headersObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token
    );

    const url = `${this.BASE_URL}/api/get-user-details`;
    return this.http.post(url, token, {
      headers: headersObject,
      responseType: 'text',
    });
  }
}
