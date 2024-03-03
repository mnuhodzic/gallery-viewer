import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true,
})
export class InfiniteScrollDirective {
  // notify parent element
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() stop: boolean = false;

  constructor() {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.stop) {
      this.nearEnd.emit();
    }
  }
}
