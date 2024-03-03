import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FavoritesService } from '../dependencies/favorites.service';
import { Router } from '@angular/router';
import { AppConfig } from '../config';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatGridListModule,
        MatTooltipModule,
        MatCardModule,
    ],
})
export class FavoritesComponent {
  readonly apiUrl = AppConfig.apiUrl;
  readonly photoWidth = AppConfig.photoWidth;
  readonly photoHeight = AppConfig.photoHeight;
  favoriteIds: string[] = [];
  columns: number = 5;
  @ViewChild('favorites', { static: true }) private readonly favoritesRef?: ElementRef;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.setColumns();
  }

  private loadFavorites(): void {
    this.favoriteIds = this.favoritesService.getFavorites();
  }

  setColumns() {
    const columnsNum = Math.floor(
      this.favoritesRef?.nativeElement.clientWidth / 250
    );
    this.columns = columnsNum <= 5 ? columnsNum : 5;
  }

  handleFavoriteClick(imageId: string): void {
    this.router.navigate(['/photos', imageId]);
  }
}
