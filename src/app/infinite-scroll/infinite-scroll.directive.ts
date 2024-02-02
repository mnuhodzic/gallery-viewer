import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  // notify parent element
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  @Input() stop: boolean = false;

  constructor() {}

  @HostListener('window:scroll')
  onScroll(): void {
    // calculate height of the visible window
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    // calculate maximum height of the document by taking the maximum value among different height properties
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    
    // calculate distance from the top of the visible window to the bottom of the visible window by adding the window's height to the current vertical scroll position
    const windowBottom = windowHeight + window.scrollY;
    // check whether the bottom of the visible window is within 100 pixels from the bottom of the entire document
    if (windowBottom >= docHeight - 100 && !this.stop) {
      this.nearEnd.emit();
    }
  }
}
