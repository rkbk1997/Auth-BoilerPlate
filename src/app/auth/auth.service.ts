import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  adduser(body): any{
    return this.http.post(environment.apiurl + '/register', body);
  }
  login(body): any{
    return this.http.post(environment.apiurl + '/login', body);
  }
}
