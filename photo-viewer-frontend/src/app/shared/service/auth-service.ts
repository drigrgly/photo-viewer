import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials';
import { HttpAuthService } from './http-auth-service';
import { UserModel } from '../model/user';
import { AuthResponse } from '../model/auth-response';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpAuthService = inject(HttpAuthService);

  currentUserSig = signal<UserModel | undefined | null>(undefined); 

  // On page refresh, send an isAuthenticated request to the server with the token

  login(credentials: LoginCredentials ): Observable<AuthResponse> {
    let loginSuccess$: Subject<AuthResponse> = new Subject();
    this.httpAuthService.login(credentials).subscribe({
      next: (loginResponse: UserModel | null) => {
        console.log(loginResponse);
        this.currentUserSig.set(loginResponse)

        loginSuccess$.next({
          isOperationSuccessful: true,
          message: "Logged in successfully"
        });
      },
      error: (error) => {
        console.error(error);

        loginSuccess$.next({
          isOperationSuccessful: false,
          message: "Login failed"
        });
      }
    });
    return loginSuccess$;
  }

  async logout() {
    this.currentUserSig.set(null);

    // Delete the cookies 
  }
}
