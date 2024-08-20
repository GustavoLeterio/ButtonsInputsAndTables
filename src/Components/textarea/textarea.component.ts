import {
  Component,
  Input,
  forwardRef,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
  implements ControlValueAccessor, AfterContentInit
{
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() rows: string = '';
  @Input() setValue: string = '';
  @Input() label: string = '';
  @Input() length: { min?: Number; max?: Number } | undefined;
  @Input() disabled: boolean = false;
  contentLength: number = 0;

  constructor() {}

  //Form Group Emitter
  value: string = '';
  formControlBlur: () => void = () => {};
  formControlValue: (value: string | number[]) => void = () => {};

  ngAfterContentInit() {
    setTimeout(() => {
      this.value = this.setValue;
      this.contentLength = this.value ? this.value.length : 0;
      this.formControlBlur();
      this.formControlValue(this.value);
    }, 0);
  }

  changeValue(e: any) {
    const value = e.target.value;
    this.sendValueToFormGroup(value);
    this.contentLength = value.length;
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
