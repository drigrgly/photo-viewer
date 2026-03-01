import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './shared/service/auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.checkAuth();
    }),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
