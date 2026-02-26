import { Injectable } from '@angular/core';
import { RegisterRequest } from '../model/register-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { HttpService } from './http-service';
import { LoginCredentials } from '../model/login-credentials';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService extends HttpService {

  register(registerObject: RegisterRequest): Observable<AuthResponse>  {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, registerObject, this.httpOptions);
  }

  login(loginObject: LoginCredentials): Observable<UserModel | null>  {
    return this.http.post<UserModel | null>(`${this.apiUrl}/auth/login`, loginObject, this.httpOptions);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, this.httpOptions);
  }
}
