import { Injectable } from '@angular/core';
import { HttpService } from '../shared/service/http-service';
import { ResponseMessageModel } from '../shared/model/response-message-model';
import { Observable } from 'rxjs';
import { PhotoModel } from '../photo-list/photo-list-item/photo-model';

@Injectable({
  providedIn: 'root',
})
export class PhotoService extends HttpService {
  photoHttpOptions = {
    withCredentials: true
  }
  
  uploadPhoto(photoForm: FormData): Observable<ResponseMessageModel>  {
    return this.http.post<ResponseMessageModel>(`${this.apiUrl}/photo`, photoForm, this.photoHttpOptions);
  }

  getPhoto(photoId: number): Observable<PhotoModel> {
    return this.http.get<PhotoModel>(`${this.apiUrl}/photo/${photoId}`, this.httpOptions);
  }

  getAllPhotos(): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(`${this.apiUrl}/photo/all`, this.httpOptions);
  }

  deletePhoto(photoId: number): Observable<ResponseMessageModel> {
    return this.http.delete<ResponseMessageModel>(`${this.apiUrl}/photo/${photoId}`, this.photoHttpOptions);
  }
}
