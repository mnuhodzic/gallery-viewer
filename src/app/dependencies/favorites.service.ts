import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  loadFavoritesFromLocalStorage(): string[] {
    const favoritesStr = localStorage.getItem('favorites');
    return favoritesStr ? JSON.parse(favoritesStr) : [];
  }

  removeFromFavorites(id: string): void {
    const favorites = this.loadFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }
}
