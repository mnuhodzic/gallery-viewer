import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../dependencies/favorites.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let component: FavoritesComponent;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'getFavorites',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [MatGridListModule, MatCardModule, MatTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoritesServiceSpy.getFavorites.and.returnValue([
      '1',
      '2',
      '3',
    ]);
    fixture.detectChanges();
  });

  it('should create favorites component', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on ngOnInit', () => {
    fixture.detectChanges();

    expect(component.favoriteIds).toEqual(['1', '2', '3']);
  });

  it('should navigate to photos page on handleFavoriteClick', () => {
    const mockImageId = '1';
    component.handleFavoriteClick(mockImageId);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/photos', mockImageId]);
  });
});
