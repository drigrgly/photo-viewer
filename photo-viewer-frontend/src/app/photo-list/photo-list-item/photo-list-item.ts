import { Component, inject, input } from '@angular/core';
import { PhotoModel } from './photo-model'
import { RouterLink } from "@angular/router";
import { AuthService } from '../../shared/service/auth-service';
import { PhotoService } from '../../photo-upload/photo-service';

@Component({
  selector: 'photo-list-item',
  imports: [RouterLink],
  templateUrl: './photo-list-item.html',
  styleUrl: './photo-list-item.scss',
  host: {class: "panel"}
})
export class PhotoListItem {
  photoService = inject(PhotoService);
  authService = inject(AuthService);
  photoModel = input.required<PhotoModel>();

  deletePhoto() {
    this.photoService.deletePhoto(this.photoModel().id).subscribe({
      next: () => {},
      error: () => {
        console.warn("Could not delete the photo");
      }

    });
  }
}
