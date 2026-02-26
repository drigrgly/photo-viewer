import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = "http://localhost:3000"
  http = inject(HttpClient)
  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  }
}