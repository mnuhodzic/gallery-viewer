import { Component, ElementRef, ViewChild } from '@angular/core';
import { PhotosService } from '../dependencies/photos.service';
import { AppConfig } from '../config';
import { FavoritesService } from '../dependencies/favorites.service';
import { delay, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  apiUrl = AppConfig.apiUrl;
  photoWidth = AppConfig.photoWidth;
  photoHeight = AppConfig.photoHeight;
  images: { id: string; url: string }[] = [];
  favorites: string[] = [];
  pageNumber: number = 1;
  isLoading: boolean = true;
  @ViewChild('gallery', { static: true }) galleryRef?: ElementRef;
  columns: number = 5;

  constructor(
    private photosService: PhotosService,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadImages();
    this.loadFavorites();
    this.setColumns();
  }

  private loadImages(): void {
    this.isLoading = true;
    // random delay between 200ms and 300ms
    const randomDelay = Math.ceil(Math.random() * 100) + 200;

    this.photosService
      .getRandomImages(this.pageNumber)
      .pipe(delay(randomDelay), take(1))
      .subscribe((data) => {
        const newImages = data.map((image) => ({
          id: image.id,
          url: `${this.apiUrl}id/${image.id}/${this.photoWidth}/${this.photoHeight}`,
        }));
        this.images = [...this.images, ...newImages];
        this.pageNumber++;
        this.isLoading = false;
      });
  }

  private loadFavorites(): void {
    this.favorites = this.favoritesService.loadFavoritesFromLocalStorage();
  }

  setColumns() {
    const columnsNum = Math.floor(
      this.galleryRef?.nativeElement.clientWidth / 250
    );
    this.columns = columnsNum <= 5 ? columnsNum : 5;
  }

  handleImageClick(imageId: string): void {
    // Add the clicked image ID to the begining of the favorites array
    this.favorites.unshift(imageId);

    // Avoid duplicates before saving
    const uniqueFavorites = Array.from(new Set(this.favorites));

    // Save the updated favorites array back to LocalStorage
    localStorage.setItem('favorites', JSON.stringify(uniqueFavorites));

    this.snackBar.open('Photo added to favorites', 'Close', {
      duration: 1600,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // increase the number of displayed items
  onNearEndScroll(): void {
    this.loadImages();
  }
}
