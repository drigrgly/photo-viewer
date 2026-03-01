import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = "http://localhost:3000"
  apiUrl = `${this.baseUrl}/api`
  authUrl = `${this.baseUrl}/auth`
  http = inject(HttpClient)
  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  }
}