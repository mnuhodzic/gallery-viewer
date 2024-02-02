import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photo';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private apiUrl = AppConfig.apiUrl;
  private numberOfPhotos = AppConfig.photosLimit;

  constructor(private http: HttpClient) {}

  getRandomImages(page: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      `${this.apiUrl}v2/list?page=${page}&limit=${this.numberOfPhotos}`
    );
  }
}
