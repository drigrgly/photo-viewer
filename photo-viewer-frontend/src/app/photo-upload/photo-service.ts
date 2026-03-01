import { Injectable } from '@angular/core';
import { HttpService } from '../shared/service/http-service';
import { ResponseMessageModel } from '../shared/model/response-message-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService extends HttpService {

  photoHttpOptions = {...this.httpOptions, headers: { 'Content-Type': 'multipart/form-data' }}
    
  
  uploadPhoto(photoForm: FormData): Observable<ResponseMessageModel>  {
    return this.http.post<ResponseMessageModel>(`${this.apiUrl}/photo`, photoForm, this.photoHttpOptions);
  }
}
