import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { catchError, Observable, tap } from 'rxjs';
import { LogService } from './log.service';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registerApi: string = `${environment.apiBaseUrl}/api/register`;

  constructor(private httpCient: HttpClient, private logger: LogService, private errorHandler: ErrorHandlerService) { }

  register(name: string, email: string, password: string): Observable<any> {
    return this.httpCient.post(this.registerApi, { 'name': name, 'username': email, 'password': password }).pipe(
      tap(
        data => {
          this.logger.write(`register new user: ${email}`);
        }
      ),
      catchError(
        this.errorHandler.handleError('register')
      )
    );
  }
}
