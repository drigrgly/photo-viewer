import { Routes } from '@angular/router';
import { PhotoList } from './photo-list/photo-list';
import { Login } from './login/login';
import { Register } from './register/register';

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
    path: "**",
    component: PhotoList
  }
];
