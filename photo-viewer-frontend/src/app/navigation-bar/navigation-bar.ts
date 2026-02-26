import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/service/auth-service';

@Component({
  selector: 'navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
})
export class NavigationBar {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

}
