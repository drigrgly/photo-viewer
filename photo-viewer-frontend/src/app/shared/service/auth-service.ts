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

  login(credentials: LoginCredentials ): Observable<AuthResponse> {
    let loginSuccess$: Subject<AuthResponse> = new Subject();
    this.httpAuthService.login(credentials).subscribe({
      next: (loginResponse: UserModel | null) => {
        this.currentUserSig.set(loginResponse)

        localStorage.setItem("userLoggedIn", "true");

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


  // Used in app.config.ts init provider
  // This way we check if the user is authenticated, before rendering anything
  checkAuth(): Observable<any> {
    let authSuccess$: Subject<String> = new Subject();

    if (localStorage.getItem("userLoggedIn") == null) {
       authSuccess$.complete()
       return authSuccess$;
    }

    this.httpAuthService.isAuthenticated().subscribe({
      next: (response: UserModel | null) => {
        this.currentUserSig.set(response);
        authSuccess$.complete()
      },
      error: (error) => {
        console.warn("Authentication expired");
        authSuccess$.complete()
      }
    })
    return authSuccess$
  }

  async logout() {
    this.httpAuthService.logout().subscribe({
      next: () => {
        this.currentUserSig.set(null);
        localStorage.removeItem("userLoggedIn");
        console.log("Logout was successful");
      },
      error: (error) => {
        console.warn("Could not log out");
        console.warn(error);

      }
    })
  }
}
