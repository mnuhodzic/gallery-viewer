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

  it('should save favorites', () => {
    const favorites = ['1', '2', '3'];
    service.setFavorites(favorites);
    const loadedFavorites = service.getFavorites();

    expect(loadedFavorites).toEqual(favorites);
  });

  it('should handle loading favorites when array is empty', () => {
    service.setFavorites([]);
    const loadedFavorites = service.getFavorites();

    expect(loadedFavorites).toEqual([]);
  });

  it('should remove an item from favorites', () => {
    const initialFavorites = ['1', '14', '18'];
    const idToRemove = '14';
    service.setFavorites(initialFavorites);

    service.removeFromFavorites(idToRemove);

    expect(service.getFavorites()).toEqual(['1', '18']);
  });

  it('should handle removing from favorites when there is only one item', () => {
    const idToRemove = '14';
    service.setFavorites(['14']);

    service.removeFromFavorites(idToRemove);

    expect(service.getFavorites()).toEqual([]);
  });
});
