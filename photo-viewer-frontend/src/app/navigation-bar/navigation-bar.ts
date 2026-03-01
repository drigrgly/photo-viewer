import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterLink } from '@angular/router';
import { AuthService } from '../shared/service/auth-service';
import { filter } from 'rxjs';

@Component({
  selector: 'navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
  host: {class:"panel"}
})
export class NavigationBar {
  authService = inject(AuthService);
  router = inject(Router);
  isUploadPage = false;
  isPhotoViewPage = false;

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.isUploadPage = e.url.includes("upload");
      this.isPhotoViewPage = e.url.includes("/photo/");
    });
  }

  logout() {
    this.authService.logout();
  }
}
