import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = "http://localhost:8080/api"
  http = inject(HttpClient)
  httpOptions = {
    headers: { 'Content-Type': 'application/json' }
  }

}
