import { Component, inject, OnInit } from '@angular/core';
import { PhotoListItem } from "./photo-list-item/photo-list-item";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { PhotoService } from '../photo-upload/photo-service';
import { PhotoModel } from './photo-list-item/photo-model';

@Component({
  selector: 'photo-list',
  imports: [PhotoListItem, NavigationBar],
  templateUrl: './photo-list.html',
  styleUrl: './photo-list.scss',
})
export class PhotoList implements OnInit{
  photoService = inject(PhotoService);
  photoList: PhotoModel[] = [];

  ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe({
      next: (result: PhotoModel[]) => {
        console.log(result);
        this.photoList = result.map((pm: PhotoModel) => ({
          ...pm, uploadDate: new Date(pm.uploadDate)
        }));
      },
      error: () => {
        console.warn("Could not get photos");
      }
    });
    
  }


}
