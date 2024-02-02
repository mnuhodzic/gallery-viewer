import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load favorites from local storage', () => {
    const favorites = ['1', '2', '3'];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(favorites));

    const loadedFavorites = service.loadFavoritesFromLocalStorage();

    expect(loadedFavorites).toEqual(favorites);
  });

  it('should handle loading favorites when local storage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const loadedFavorites = service.loadFavoritesFromLocalStorage();

    expect(loadedFavorites).toEqual([]);
  });

  it('should remove an item from favorites', () => {
    const initialFavorites = ['1', '14', '18'];
    const idToRemove = '14';

    spyOn(service, 'loadFavoritesFromLocalStorage').and.returnValue(
      initialFavorites
    );
    spyOn(localStorage, 'setItem');

    service.removeFromFavorites(idToRemove);

    expect(service.loadFavoritesFromLocalStorage).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(['1', '18'])
    );
  });

  it('should handle removing from favorites when local storage is empty', () => {
    const idToRemove = '14';

    spyOn(service, 'loadFavoritesFromLocalStorage').and.returnValue([]);
    spyOn(localStorage, 'setItem');

    service.removeFromFavorites(idToRemove);

    expect(service.loadFavoritesFromLocalStorage).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([])
    );
  });
});
