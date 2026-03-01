import { Component, input } from '@angular/core';
import { PhotoModel } from './photo-model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'photo-list-item',
  imports: [RouterLink],
  templateUrl: './photo-list-item.html',
  styleUrl: './photo-list-item.scss',
  host: {class: "panel"}
})
export class PhotoListItem {
  photoModel = input.required<PhotoModel>();

  

}
