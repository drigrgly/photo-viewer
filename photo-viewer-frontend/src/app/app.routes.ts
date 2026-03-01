import { Routes } from '@angular/router';
import { PhotoList } from './photo-list/photo-list';
import { Login } from './login/login';
import { Register } from './register/register';
import { PhotoUpload } from './photo-upload/photo-upload';
import { PhotoView } from './photo-view/photo-view';

export const routes: Routes = [
  {
    path: "login",
    component: Login
  },
  {
    path: "register",
    component: Register
  },
  {
    path: "upload",
    component: PhotoUpload
  },
  {
    path: "photo/:id",
    component: PhotoView
  },
  {
    path: "**",
    component: PhotoList
  }
];
