import { Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';

export const routes: Routes = [
  { path: '', component: PhotosComponent },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  { path: 'photos/:id',
    loadComponent: () =>
        import('./photo-viewer/photo-viewer.component').then((m) => m.PhotoViewerComponent),
  },  
  { path: '**', redirectTo: '' },
];
