import { Component, input } from '@angular/core';
import { PhotoModel } from './photo-model';

@Component({
  selector: 'photo-list-item',
  imports: [],
  templateUrl: './photo-list-item.html',
  styleUrl: './photo-list-item.scss',
})
export class PhotoListItem {
  photoModel = input.required<PhotoModel>();

}
