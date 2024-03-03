import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private data = signal<Array<string>>([]);

  setFavorites(favoritesArr: string[]) {
    this.data.set(favoritesArr);
  }

  getFavorites(): string[] {
    return this.data();
  }

  removeFromFavorites(id: string): void {
    this.data.update((favorites) =>
      favorites.filter((favoriteId) => favoriteId !== id)
    );
  }
}
