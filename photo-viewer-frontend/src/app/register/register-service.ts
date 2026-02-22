import { Injectable } from '@angular/core';
import { AuthResponse } from '../shared/model/auth-response';
import { Observable } from 'rxjs';
import { RegisterRequest } from './register-request';
import { HttpService } from '../shared/service/http-service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends HttpService {
   submitForm(registerObject: RegisterRequest): Observable<AuthResponse>  {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerObject, this.httpOptions);
  }
}
