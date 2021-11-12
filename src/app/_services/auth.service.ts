import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_LOGIN = 'http://localhost:8080/api/login';
const AUTH_REGISTER = 'http://localhost:8080/api/register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_LOGIN, {
      username,
      password
    }, httpOptions);
  }

  register(name:string ,username: string, password: string): Observable<any> {
    return this.http.post(AUTH_REGISTER, {
      name,
      username,
      password
    }, httpOptions);
  }
}
