import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PhotosComponent } from './photos.component';
import { PhotosService } from '../dependencies/photos.service';
import { FavoritesService } from '../dependencies/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Directive, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  @Directive({
    selector: '[appInfiniteScroll]',
    standalone: true
  })
  class appInfiniteScroll {
    @Input() stop?: boolean;
  }

  beforeEach(() => {
    photosServiceSpy = jasmine.createSpyObj('PhotosService', [
      'getRandomImages',
    ]);
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'setFavorites',
      'getFavorites',
    ]);

    TestBed.configureTestingModule({
      providers: [
          MatSnackBar,
          { provide: PhotosService, useValue: photosServiceSpy },
          { provide: FavoritesService, useValue: favoritesServiceSpy },
      ],
      imports: [
          MatGridListModule,
          MatProgressSpinnerModule,
          BrowserAnimationsModule,
          MatCardModule,
          PhotosComponent, appInfiniteScroll,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    photosServiceSpy.getRandomImages.and.returnValue(of([]));
    favoritesServiceSpy.getFavorites.and.returnValue(['1', '2']);
    fixture.detectChanges();
  });

  it('should create the photos component', () => {
    expect(component).toBeTruthy();
  });

  it('should load images on ngOnInit', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(photosServiceSpy.getRandomImages).toHaveBeenCalled();
  }));

  it('should load favorites on ngOnInit', () => {
    fixture.detectChanges();

    expect(component['favorites']).toEqual(['1', '2']);
  });

  it('should add image to favorites on handleImageClick', () => {
    const imageId = 'testImageId';
    component.handleImageClick(imageId);

    expect(component['favorites']).toEqual([imageId, '1', '2']);
  });

  it('should display no data message when images are not loaded', () => {
    component.isLoading.set(false);
    component.images = [];

    fixture.detectChanges();

    const noDataCard = fixture.debugElement.query(By.css('.no-data'));

    expect(noDataCard).toBeTruthy();
    expect(noDataCard.nativeElement.textContent).toContain(
      'No photos loaded. Please refresh the page!'
    );
  });
});
