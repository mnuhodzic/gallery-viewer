import { Component, ElementRef, ViewChild } from '@angular/core';
import { FavoritesService } from '../dependencies/favorites.service';
import { Router } from '@angular/router';
import { AppConfig } from '../config';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  apiUrl = AppConfig.apiUrl;
  photoWidth = AppConfig.photoWidth;
  photoHeight = AppConfig.photoHeight;
  favoriteIds: string[] = [];
  @ViewChild('favorites', { static: true }) favoritesRef?: ElementRef;
  columns: number = 5;
  
  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.setColumns();
  }

  private loadFavorites(): void {
    this.favoriteIds = this.favoritesService.loadFavoritesFromLocalStorage();
  }

  setColumns() {
    const columnsNum = Math.floor(this.favoritesRef?.nativeElement.clientWidth / 250);
    this.columns = columnsNum <= 5 ? columnsNum : 5; 
  }

  handleFavoriteClick(imageId: string): void {
    this.router.navigate(['/photos', imageId]);
  }
}
