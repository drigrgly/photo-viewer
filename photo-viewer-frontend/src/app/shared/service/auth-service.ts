import { Injectable } from '@angular/core';
import { RegisterRequest } from '../model/register-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { HttpService } from './http-service';
import { LoginRequest } from '../model/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpService {
  

  register(registerObject: RegisterRequest): Observable<AuthResponse>  {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, registerObject, this.httpOptions);
  }

  login(loginObject: LoginRequest): Observable<AuthResponse>  {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginObject, this.httpOptions);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, this.httpOptions);
  }
}
