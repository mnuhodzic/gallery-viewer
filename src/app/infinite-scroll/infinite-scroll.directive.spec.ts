import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@Component({
    template: `
      <div appInfiniteScroll [stop]="stop" (nearEnd)="onNearEndScroll()"></div>
    `,
    standalone: true,
    imports: [InfiniteScrollDirective]
})
class HostComponent {
  stop: boolean = false;
  onNearEndScroll(): void {}
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfiniteScrollDirective, HostComponent],
    });

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

    const divElement = document.createElement('div');
    document.body.appendChild(divElement);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new InfiniteScrollDirective();
    expect(directive).toBeTruthy();
  });

  it('should emit nearEnd event when scrolled to the bottom', fakeAsync(() => {
    spyOn(component, 'onNearEndScroll');

    // Trigger a scroll event
    const event = new Event('scroll');
    window.dispatchEvent(event);

    // Wait for debounce time
    tick(300);
    fixture.detectChanges();

    // Ensure that the nearEnd event is emitted
    expect(component.onNearEndScroll).toHaveBeenCalled();
  }));

  it('should not emit nearEnd event when stop is true', fakeAsync(() => {
    spyOn(component, 'onNearEndScroll');

    component.stop = true;
    fixture.detectChanges();

    // Trigger a scroll event
    const event = new Event('scroll');
    window.dispatchEvent(event);

    // Wait for debounce time
    tick(300);
    fixture.detectChanges();

    // Ensure that the nearEnd event is not emitted
    expect(component.onNearEndScroll).not.toHaveBeenCalled();
  }));
});
