import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  signal,
} from '@angular/core';
import { PhotosService } from '../dependencies/photos.service';
import { AppConfig } from '../config';
import { FavoritesService } from '../dependencies/favorites.service';
import { delay, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollDirective } from '../infinite-scroll/infinite-scroll.directive';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatGridListModule,
        InfiniteScrollDirective,
        MatProgressSpinnerModule,
        MatCardModule,
    ],
})
export class PhotosComponent {
  private readonly apiUrl = AppConfig.apiUrl;
  private readonly photoWidth = AppConfig.photoWidth;
  private readonly photoHeight = AppConfig.photoHeight;
  private pageNumber: number = 1;
  private favorites: string[] = [];
  images: { id: string; url: string }[] = [];
  isLoading = signal<boolean>(true);
  columns: number = 5;
  @ViewChild('gallery', { static: true }) private readonly galleryRef?: ElementRef;

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
    this.isLoading.set(true);
    // random delay between 200ms and 300ms
    const randomDelay = Math.ceil(Math.random() * 100) + 200;

    this.photosService
      .getRandomImages(this.pageNumber)
      .pipe(delay(randomDelay), take(1))
      .subscribe((data) => {
        data.forEach((image) => {
          this.images.push({
            id: image.id,
            url: `${this.apiUrl}id/${image.id}/${this.photoWidth}/${this.photoHeight}`,
          });
        });
        this.pageNumber++;
        this.isLoading.set(false);
      });
  }

  private loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
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

    // Save the updated favorites array
    this.favoritesService.setFavorites(uniqueFavorites);

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
