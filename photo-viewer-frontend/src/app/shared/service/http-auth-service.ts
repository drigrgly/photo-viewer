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
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, registerObject, this.httpOptions);
  }

  login(loginObject: LoginCredentials): Observable<UserModel | null>  {
    return this.http.post<UserModel | null>(`${this.authUrl}/login`, loginObject, this.httpOptions);
  }

  logout(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.authUrl}/logout`, this.httpOptions);
  }

  isAuthenticated(): Observable<UserModel | null> {
    return this.http.get<UserModel | null>(`${this.authUrl}/is-authenticated`, this.httpOptions);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.authUrl}/refresh-token`, this.httpOptions);
  }
}
