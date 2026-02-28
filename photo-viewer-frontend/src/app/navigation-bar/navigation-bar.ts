import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/service/auth-service';

@Component({
  selector: 'navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
})
export class NavigationBar {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
  }

}
