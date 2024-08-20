import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() color: any;
  @Input() text: any;
  @Input() type: any;
  @Input() icon: any;
  @Input() size: string = 'normal';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() options: string[] = [];
  @Input() dropdownPos: { fixTop?: boolean; fixRight?: boolean } = {
    fixTop: false,
    fixRight: false,
  };

  @Output() clickEmitter: EventEmitter<{ e: MouseEvent; value: string }> =
    new EventEmitter();

  isOpened: boolean = false;

  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  @ViewChild('ddButton', { static: false }) ddButton!: any;
  @HostListener('document:click', ['$event'])
  onMouseUp(e: MouseEvent): void {
    if (!this.ddButton) return;
    if (
      !this.ddButton.nativeElement.contains(e.target)
    ) {
      this.isOpened = false;
    }
  }

  constructor() {}
}
