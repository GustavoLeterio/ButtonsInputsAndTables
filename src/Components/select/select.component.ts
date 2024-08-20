import { Component, Input, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input() placeholder: String = '';
  @Input() options: String[] = [];
  @Input() label: String = '';
  @Input() setValue: String | null = null;
  @Input() setDisabled: boolean = false;

  constructor() {}

  //Form Group Emitter
  value: String | null = null;
  formControlBlur: () => void = () => {};
  formControlValue: (value: String | null) => void = () => {};
  disabled: boolean = false;

  hidePlaceholder: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.value = this.setValue;
      this.formControlBlur();
      this.formControlValue(this.value);
    }, 0);
  }

  changeValue(e: any) {
    this.sendValueToFormGroup(e.target.value);
    this.hidePlaceholder = true;
  }

  sendValueToFormGroup(value: any) {
    this.value = value;
    this.formControlBlur();
    this.formControlValue(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.formControlValue = fn;
  }

  registerOnTouched(fn: any): void {
    this.formControlBlur = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
