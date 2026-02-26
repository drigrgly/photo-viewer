import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpAuthService } from './shared/service/http-auth-service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  authService = inject(HttpAuthService);

  constructor(
    private inject: Injector,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => this.handleAuthError(err)))
  }

  errCounter = 0;
  

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err && err.status == 401 && this.errCounter != 1) {
      this.errCounter++;
      this.authService.refreshToken().subscribe({
        next: (x: any) => {
          

        },
        error: (err: any) => {

        }
      })

      return of("Attempting to Refresh tokens");
    }
    else {
      this.errCounter = 0;
      return throwError(() => new Error("Non Authentication Error"));
    }

  }
}