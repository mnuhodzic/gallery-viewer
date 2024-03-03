import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../dependencies/favorites.service';
import { AppConfig } from '../config';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-photo-viewer',
    templateUrl: './photo-viewer.component.html',
    styleUrls: ['./photo-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCardModule, MatButtonModule]
})
export class PhotoViewerComponent {
  private readonly apiUrl = AppConfig.apiUrl;
  private readonly photoWidth = AppConfig.photoWidthBig;
  private readonly photoHeight = AppConfig.photoHeightBig;
  private imageId: string = '';
  imageUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.imageId = params['id'];
      this.imageUrl = `${this.apiUrl}id/${this.imageId}/${this.photoWidth}/${this.photoHeight}`;
    });
  }

  removeFromFavorites(): void {
    if (this.imageId) {
      this.favoritesService.removeFromFavorites(this.imageId);
      this.router.navigate(['/favorites']);

      this.snackBar.open('Photo removed from favorites', 'Close', {
        duration: 1600,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
