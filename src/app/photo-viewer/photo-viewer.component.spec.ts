import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { PhotoViewerComponent } from './photo-viewer.component';
import { FavoritesService } from '../dependencies/favorites.service';
import { By } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PhotoViewerComponent', () => {
  let component: PhotoViewerComponent;
  let fixture: ComponentFixture<PhotoViewerComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' }),
    });
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'setFavorites',
      'getFavorites',
      'removeFromFavorites',
    ]);

    TestBed.configureTestingModule({
      declarations: [PhotoViewerComponent],
      providers: [ MatSnackBar,
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
      ],
      imports: [MatCardModule, MatSnackBarModule, BrowserAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(PhotoViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create the photo-viewer component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Remove from favorites button', () => {
    component['imageId'] = '1';
    component.imageUrl = 'https://picsum.photos/id/1/450/450';

    fixture.detectChanges();
    const removeButton = fixture.debugElement.query(By.css('.active'));

    expect(!!removeButton).toBe(true);
    expect(removeButton.nativeElement.textContent.trim()).toBe(
      'Remove from favorites'
    );
  });

  it('should initialize imageId and imageUrl on ngOnInit', () => {
    expect(component['imageId']).toBe('');
    expect(component.imageUrl).toBe('');

    fixture.detectChanges();

    expect(component['imageId']).toBe('1');
    expect(component.imageUrl).toBe(
      `https://picsum.photos/id/1/${component['photoWidth']}/${component['photoHeight']}`
    );
  });

  it('should remove from favorites array and navigate to /favorites', () => {
    component['imageId'] = '1';

    component.removeFromFavorites();

    expect(favoritesServiceSpy.removeFromFavorites).toHaveBeenCalledWith('1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
