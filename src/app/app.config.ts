import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from './app.routes';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { provideRouter, withComponentInputBinding } from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes, withComponentInputBinding()),
      importProvidersFrom(BrowserModule, MatProgressSpinnerModule, MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSnackBarModule, MatCardModule, MatGridListModule),
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimations(),
  ]
};