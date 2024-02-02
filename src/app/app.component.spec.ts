import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  @Component({ template: '' })
  class DummyComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent },
          { path: 'favorites', component: DummyComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Favorites button', () => {
    const favoritesButton = fixture.debugElement.query(
      By.css('button[routerLink="/favorites"]')
    );

    expect(!!favoritesButton).toBe(true);
    expect(favoritesButton.nativeElement.textContent.trim()).toBe('Favorites');
  });

  it('should have a Photos button', () => {
    const photosButton = fixture.debugElement.query(
      By.css('button[routerLink="/"]')
    );

    expect(!!photosButton).toBe(true);
    expect(photosButton.nativeElement.textContent.trim()).toBe('Photos');
  });

  it('should navigate to /favorites when Favorites button is clicked', fakeAsync(
    inject([Location], (location: any) => {
      const favoritesButton = fixture.debugElement.query(
        By.css('button[routerLink="/favorites"]')
      );

      favoritesButton.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(location.path()).toBe('/favorites');
    })
  ));

  it('should navigate to / when Photos button is clicked', fakeAsync(
    inject([Location], (location: any) => {
      const photosButton = fixture.debugElement.query(
        By.css('button[routerLink="/"]')
      );

      photosButton.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(location.path()).toBe('/');
    })
  ));

  it('should add active class to Favorites button when /favorites route is active', fakeAsync(() => {
    const favoritesButton = fixture.debugElement.query(
      By.css('button[routerLink="/favorites"]')
    );
    favoritesButton.nativeElement.click();
    fixture.detectChanges();
    tick();
    const button = fixture.debugElement.query(By.css('.active'));

    expect(!!button).toBe(true);
    expect(button.nativeElement.textContent.trim()).toBe('Favorites');
  }));

  it('should add active class to Photos button when / route is active', fakeAsync(() => {
    const photosButton = fixture.debugElement.query(
      By.css('button[routerLink="/"]')
    );

    photosButton.nativeElement.click();
    fixture.detectChanges();
    tick();
    const button = fixture.debugElement.query(By.css('.active'));

    expect(!!button).toBe(true);
    expect(button.nativeElement.textContent.trim()).toBe('Photos');
  }));
});
