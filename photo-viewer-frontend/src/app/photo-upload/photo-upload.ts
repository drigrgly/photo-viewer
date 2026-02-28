import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationBar } from "../navigation-bar/navigation-bar";

@Component({
  selector: 'photo-upload',
  imports: [NavigationBar],
  templateUrl: './photo-upload.html',
  styleUrl: './photo-upload.scss',
})
export class PhotoUpload {
  private formBuilder = inject(FormBuilder);


}
