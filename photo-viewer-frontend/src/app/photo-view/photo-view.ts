import { Component, inject } from '@angular/core';
import { NavigationBar } from "../navigation-bar/navigation-bar";

@Component({
  selector: 'photo-view',
  imports: [NavigationBar],
  templateUrl: './photo-view.html',
  styleUrl: './photo-view.scss',
})
export class PhotoView {

}
