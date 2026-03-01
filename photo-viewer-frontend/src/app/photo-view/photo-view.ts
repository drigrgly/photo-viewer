import { Component, inject, input } from '@angular/core';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { PhotoModel } from '../photo-list/photo-list-item/photo-model';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Observable, Subject } from 'rxjs';
import { HttpService } from '../shared/service/http-service';
import { PhotoService } from '../photo-upload/photo-service';

@Component({
  selector: 'photo-view',
  imports: [NavigationBar],
  templateUrl: './photo-view.html',
  styleUrl: './photo-view.scss',
})
export class PhotoView {
  httpService = inject(HttpService)
  photoService = inject(PhotoService);
  router = inject(Router);
  photo: PhotoModel | undefined;

  photoExists = false;
  errorText = "Loading...";

  constructor() {
    let photo$ = new Observable<PhotoModel>();
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      filter((e: NavigationEnd) => e.url.includes('/photo/')),
      map((e: NavigationEnd) => {
        // Extract the photo id from the url
        // If it isn't a number, use -1 as an invalid fallback id
        let photoId: number;
        try {
          let lastSegment = e.url.split("/").pop();
          photoId = Number.parseInt(lastSegment ?? "-1");

          if (Number.isNaN(photoId))
            photoId = -1;
        } catch {
          photoId = -1;
        }
        return photoId;
      }),
      mergeMap(photoId => this.photoService.getPhoto(photoId))
    ).subscribe({
      next: (response: PhotoModel) => {
        this.photo = response;
        this.photoExists = true;
      },
      error: (error) => {
        this.errorText = error.error.message;
      }
    });

    photo$.subscribe({
      next: (photo: PhotoModel) => {
        this.photo = photo
      }
    })

  }

}
