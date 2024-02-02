import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotosService } from './photos.service';
import { Photo } from './photo';
import { AppConfig } from '../config';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(PhotosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get random images from the API', () => {
    const page = 1;

    const mockResponse: Photo[] = [
      { id: '1', author: 'John Doe', download_url: 'https://example.com/1' } as Photo,
      { id: '2', author: 'Jane Doe', download_url: 'https://example.com/2' } as Photo,
    ];

    service.getRandomImages(page).subscribe((photos) => {
      expect(photos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${AppConfig.apiUrl}v2/list?page=${page}&limit=${AppConfig.photosLimit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
