import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Observable, map } from 'rxjs';
import { User, UserRoles } from '@app/_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated() {
    return localStorage.getItem('user');
  }

  private registerApi: string = `${environment.apiBaseUrl}/api/register`;
  private loginApi: string = `${environment.apiBaseUrl}/api/login`;

  constructor(private httpCient: HttpClient) { }

  login(username: string, password: string) {
    const header = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    const body = `username=${username}&password=${password}`;
    return this.httpCient.post(this.loginApi, body, header).pipe(map(
      data => {
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      }
    ));
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.httpCient.post(this.registerApi, { 'name': name, 'username': email, 'password': password });
  }

  getCurrentUserRoles(): UserRoles[] {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      let user = JSON.parse(storedUser) as User;
      return user.roles;
    }
    return [];
  }

}
