import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { AuthService } from '../shared/service/auth-service';
import { ErrorDisplayInput } from "../shared/error-display-input/error-display-input.component";
import { RouterLink } from '@angular/router';
import { PhotoService } from './photo-service';

@Component({
  selector: 'photo-upload',
  imports: [ReactiveFormsModule, RouterLink, NavigationBar, ErrorDisplayInput],
  templateUrl: './photo-upload.html',
  styleUrl: './photo-upload.scss',
})
export class PhotoUpload {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  photoService = inject(PhotoService);

  photoToUpload: File | undefined;

  photoForm = this.formBuilder.group({
    name: ['',
      [Validators.required, Validators.minLength(1), Validators.maxLength(40)]
    ],
    userId: [this.authService.currentUserSig()?.id,
      [Validators.required]
    ],
    photo: [null, Validators.required]
  });

  onPhotoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    console.log(this.photoForm.controls.userId.errors);
    this.photoForm.updateValueAndValidity;

    this.photoToUpload = file;
  }

  submitForm() {
    console.log("huh?");
    if (this.photoForm.invalid || this.photoToUpload === undefined) {
      console.warn(this.photoToUpload);

      return;
    }

    let fd = new FormData();
    fd.append('photo', this.photoToUpload);
    fd.append('name', this.photoForm.controls.name.value!);


    this.photoService.uploadPhoto(fd).subscribe({
      next: () => {
        console.log("upload successful");
      },
      error: () => {
        console.log("Error in uploading photo");
      }
    });

  }


}
