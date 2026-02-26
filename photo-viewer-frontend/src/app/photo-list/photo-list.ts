import { Component } from '@angular/core';
import { PhotoModel } from './photo-list-item/photo-model';
import { PhotoListItem } from "./photo-list-item/photo-list-item";
import { NavigationBar } from "../navigation-bar/navigation-bar";

@Component({
  selector: 'photo-list',
  imports: [PhotoListItem, NavigationBar],
  templateUrl: './photo-list.html',
  styleUrl: './photo-list.scss',
})
export class PhotoList {

  mockList: PhotoModel[] = [
    {
      id: 0,
      name: "A beautiful photo",
      ownerId: 0,
      date: new Date()
    },
    {
      id: 0,
      name: "A beautiful photo",
      ownerId: 0,
      date: new Date()
    },
    {
      id: 0,
      name: "A beautiful photo",
      ownerId: 0,
      date: new Date()
    },
    {
      id: 1,
      name: "A picture of an owl",
      ownerId: 0,
      date: new Date()
    },
    {
      id: 2,
      name: "A cat",
      ownerId: 0,
      date: new Date()
    },
    {
      id: 2,
      name: "A photo with a really really really real",
      ownerId: 0,
      date: new Date()
    },
  ]

}
